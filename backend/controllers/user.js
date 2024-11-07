import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import { Member, Organization, User } from '#models';

import { logger } from '#utils';

export const googleAuth = async (req, res) => {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

	try {
		const ticket = await client.verifyIdToken({
			idToken: req.body.credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		const user = await User.findOne({ email: payload.email }).exec();

		if (user) {
			const { name, _id } = user.toObject();
			const token = jwt.sign({ name, email: payload.email, _id }, process.env.AUTH_TOKEN);

			await user.save();

			res.status(200).send({
				name,
				email: payload.email,
				token,
			});
		} else {
			const user = new User({
				name: payload.name,
				email: payload.email,
			});
			const { name, email, _id } = user.toObject();

			const token = jwt.sign(
				{ name: payload.name, email: payload.email, _id },
				process.env.AUTH_TOKEN
			);

			await user.save();

			res.status(200).send({ name, email, token });
		}
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const joinOrganization = async (req, res) => {
	try {
		const userID = res.locals._id;

		const organization = await Organization.findOne({
			joiningCode: req.params.joiningCode,
		});

		if (!organization) {
			return res.status(404).json({ message: 'Organization not found.' });
		}

		const member = new Member({
			user: userID,
			organization: organization._id,
			roles: [{ level: 'VIEWER' }],
		});

		await member.save();

		res.status(200).json({ _id: organization._id });
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getOrganizations = async (req, res) => {
	try {
		const userID = res.locals._id;

		const memberDocs = await Member.find({ user: userID }, { organization: 1, roles: 1 });
		const organizationIDs = memberDocs.map((doc) => doc.organization);
		const organizations = await Organization.find(
			{ _id: { $in: organizationIDs } },
			{ name: 1, description: 1 }
		);
		res.status(200).json(
			organizations.map((org) => ({
				...org.toObject(),
				roles: memberDocs.find((member) => org._id.equals(member.organization).roles),
			}))
		);
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const checkUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res
				.status(404)
				.json({ message: "The E-Mail provided isn't associated with a BudJet account." });
		}

		const member = await Member.findOne({
			user: user._id,
			organization: req.body.orgID,
		});

		if (!member) {
			return res.status(404).json({
				message:
					"The E-Mail provided isn't a part of the organization. Please add them to the organization.",
			});
		}

		return res.status(200).json({ message: 'Found' });
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};
