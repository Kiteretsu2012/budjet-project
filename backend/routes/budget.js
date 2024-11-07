import express from 'express';
import { budgetController } from '#controllers';
import { logger, verifyAdminOrLeader } from '#utils';
import { Budget } from '#models';

const budgetRouter = express.Router();

const verifyBudgetAccess = async (req, res, next) => {
	try {
		const budget = await Budget.findById(req.params.budgetID);

		if (res.locals.member.roles.some(({ level }) => level === 'ADMIN')) {
			res.locals.budgetID = req.params.budgetID;

			return next();
		}
		const isTeamParticipant = res.locals.member.roles.some(({ team }) => {
			if (!team) {
				return (budget.teams ?? []).some(team.equals);
			}
		});

		if (!isTeamParticipant) {
			return res.status(400).send({ message: 'Not in team' });
		}

		res.locals.budgetID = req.params.budgetID;
		return next();
	} catch (error) {
		logger.error(error.message, error);
		return res.status(400).send({ message: error.message || 'Unauthorized Request' });
	}
};

budgetRouter.post('', verifyAdminOrLeader, budgetController.createBudget);
budgetRouter.get('/:budgetID', verifyBudgetAccess, budgetController.getFullBudget);

budgetRouter.post('/:budgetID/expense', verifyBudgetAccess, budgetController.createExpense);
budgetRouter.post(
	'/:budgetID/expense/:expenseID',
	verifyBudgetAccess,
	budgetController.updateExpense
);
budgetRouter.delete(
	'/:budgetID/expense/:expenseID',
	verifyBudgetAccess,
	budgetController.deleteBudget
); // join

export default budgetRouter;
