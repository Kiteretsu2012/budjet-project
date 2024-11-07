import { orgController } from '#controllers';
import { Budget, Expense } from '#models';
import { logger, verifyAuthToken, verifyOrgMember, S3SignedPolicy } from '#utils';
import { Router } from 'express';
import organizationRouter from './organization.js';
import userRouter from './user.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.post('/org', verifyAuthToken, orgController.createOrganization);
apiRouter.use('/org/:orgID', verifyAuthToken, verifyOrgMember, organizationRouter);

apiRouter.get('/budget/:id', verifyAuthToken, async (req, res) => {
	try {
		const budgetID = req.params.id;
		const budget = await Budget.findById(budgetID);

		const isApprover = budget.approvers.some(({ email }) => email === res.locals.email);
		if (!isApprover) {
			return res.status(401);
		}

		if (!budget) {
			return res.status(404).json({ message: 'Budget not found.' });
		}

		const budgetPojo = budget.toObject();
		const expenses = await Expense.find({ budget: budget._id });

		res.status(200).json({
			...budgetPojo,
			expenses,
		});
	} catch (error) {
		logger.error(error);
		return res.status(401);
	}
});

apiRouter.get('/s3-signed-policy', (req, res) => {
	try {
		const signedPolicy = new S3SignedPolicy(process.env.AWS_BUCKET);
		return res.json(signedPolicy);
	} catch (error) {
		logger.error(error.message, error);
		return res.status(500, 'An error occurred. Please contact us or try again later.');
	}
});

apiRouter.get('/', async (req, res) => {
	res.send('This api was made by the monkeys of narmada');
	return;
});

export default apiRouter;
