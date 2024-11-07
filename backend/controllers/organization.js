import crypto from 'node:crypto';

import { Budget, Expense, Member, Organization, Team, User } from '#models';
import { logger } from '#utils';
import mongoose from 'mongoose';

export const createOrganization = async (req, res) => {
	try {
		const userID = res.locals._id;
		const joiningCode = crypto.randomBytes(12).toString('hex');

		const session = await mongoose.startSession();
		session.startTransaction();

		const newOrg = new Organization({
			name: req.body.name,
			joiningCode,
			creator: userID,
		});

		const member = new Member({
			user: userID,
			organization: newOrg._id,
			roles: [{ level: 'ADMIN' }],
		});

		await Promise.all[(newOrg.save({ session }), member.save({ session }))];

		session.commitTransaction();
		await session.endSession();

		res.status(200).json({ _id: newOrg._id });
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getOrganizationDetails = async (req, res) => {
	try {
		const organization = await Organization.findById(res.locals.orgID);

		res.status(200).json(organization.toObject());
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getStats = async (req, res) => {
	try {
		const recentExpenses = await Expense.find().sort({ lastUpdated: -1 }).limit(10);

		const tagWise = await Expense.aggregate([
			{ $project: { _id: 0, tags: 1, 'amounts.A': 1 } },
			{ $unwind: '$tags' },
			{ $group: { _id: '$tags', amount: { $sum: 'amounts.A' } } },
			{ $project: { _id: 0, tags: '$_id' } },
		]);

		res.status(200).json({
			recentExpenses,
			tagWise,
		});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getBudgets = async (req, res) => {
	try {
		const budgets = await Budget.find({ organization: res.locals.orgID });
		res.status(200).json(budgets);
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getTeams = async (req, res) => {
	try {
		const teams = await Team.find({ organization: res.locals.orgID }).populate(
			'organization',
			'name'
		);

		res.status(200).json(teams);
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const deleteOrganization = async (req, res) => {
	try {
		await Organization.findByIdAndDelete(req.params.id);

		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const createTeam = async (req, res) => {
	try {
		const membersData = req.body.members;
		if (membersData.every(({ email }) => email !== res.locals.email)) {
			membersData.push({
				email: res.locals.email,
				level: 'TEAM_LEADER',
			});
		}
		const users = await User.find(
			{ email: { $in: membersData.map(({ email }) => email) } },
			{ _id: 1, email: 1 }
		);
		const userIDs = users.map(({ _id }) => _id);

		const userEmailToID = Object.fromEntries(users.map(({ email, _id }) => [email, _id]));

		if (userIDs.length !== membersData.length) {
			return res.status(404).json({ message: "Some E-Mails don't have BudJet account." });
		}

		const members = await Member.find({
			user: { $in: userIDs },
			organization: res.locals.orgID,
		});

		if (members.length !== membersData.length) {
			return res.status(404).json({ message: "Some E-Mails aren't in the organization." });
		}

		const team = new Team({
			name: req.body.name,
			organization: res.locals.orgID,
		});
		await team.save();

		const memberUpdates = membersData.map((member) => {
			return {
				updateOne: {
					filter: {
						user: userEmailToID[member.email],
						organization: res.locals.orgID,
					},
					update: {
						$push: { roles: { level: member.level, team: team._id } },
					},
				},
			};
		});

		await Member.bulkWrite(memberUpdates);

		res.status(200).json(team.toObject());
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};
