import { Member } from '#models';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import logger from './loggerUtils.js';

/**
 * @type {express.Handler}
 */
export const verifyAuthToken = (req, res, next) => {
	try {
		const payload = verify(req.headers.authorization, process.env.AUTH_TOKEN);

		res.locals = payload;
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

/**
 * @type {express.Handler}
 */
export const verifyOrgMember = async (req, res, next) => {
	try {
		const member = await Member.findOne({
			user: res.locals._id,
			organization: req.params.orgID,
		});
		if (!member) {
			return res.status(400).send({ message: 'Not a member' });
		}

		res.locals.orgID = req.params.orgID;
		res.locals.member = member;
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

/**
 * @type {express.Handler}
 */
export const verifyOrgAdmin = async (req, res, next) => {
	try {
		const isOrgAdmin = res.locals.member.roles.some(({ level }) => level === 'ADMIN');
		if (!isOrgAdmin) {
			return res.status(400).send({ message: 'Not an admin' });
		}
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

/**
 * @type {express.Handler}
 */
export const verifyAdminOrLeader = async (req, res, next) => {
	try {
		const isAdminOrLeader = res.locals.member.roles.some(
			({ level }) => level === 'ADMIN' || level === 'TEAM_LEADER'
		);

		if (!isAdminOrLeader) {
			return res.status(400).send({ message: 'Not allowed' });
		}
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};
