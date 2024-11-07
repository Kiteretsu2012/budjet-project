import { Budget, Expense } from '#models';
import { logger } from '#utils';

export const createBudget = async (req, res) => {
	try {
		const budget = new Budget({
			title: req.body.title,
			teams: req.body.teams,
			organization: res.locals.orgID,
			description: req.body.title,
		});
		await budget.save();
		res.json(budget);
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const getFullBudget = async (req, res) => {
	try {
		const budget = await Budget.findById(res.locals.budgetID);
		if (!budget) {
			return res.status(404).json({ message: 'Budget not found.' });
		}

		const budgetPojo = budget.toObject();
		const expenses = await Expense.find({ budget: budget._id });

		res.status(200).json({
			...budgetPojo,
			expenses,
		});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const deleteBudget = async (req, res) => {
	try {
		await Budget.findByIdAndDelete(res.locals.budgetID);

		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const createExpense = async (req, res) => {
	try {
		const expense = new Expense({
			title: req.body.title,
			description: req.body.description,
			budget: res.locals.budgetID,
			amounts: req.body.amount,
			invoice: req.body.invoice,
		});
		await expense.save();
		res.status(200).json(expense.toObject());
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const updateExpense = async (req, res) => {
	try {
		const updatedExpense = await Expense.findByIdAndUpdate(req.params.expenseID, req.body, {
			new: true,
		});
		logger.info(updatedExpense);
		logger.info(req.body);
		res.status(200).json(updatedExpense.toObject());
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const deleteExpense = async (req, res) => {
	try {
		await Expense.findByIdAndDelete(req.params.id);
		res.status(200).json({});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};

export const approveBudget = async (req, res) => {
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
		budget.approvers = budget.approvers.map((ap) =>
			ap.email === res.locals.email ? { ...ap, approved: true } : ap
		);

		await budget.save();

		const budgetPojo = budget.toObject();
		const expenses = await Expense.find({ budget: budget._id });

		res.status(200).json({
			...budgetPojo,
			expenses,
		});
	} catch (err) {
		logger.error(err.message);
		res.status(500).json({ message: 'Error' });
	}
};
