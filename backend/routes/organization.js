import { verifyOrgAdmin } from '#utils';
import express from 'express';
import { orgController } from '#controllers';
import budgetRouter from './budget.js';

const organizationRouter = express.Router();

organizationRouter.get('', orgController.getOrganizationDetails);
organizationRouter.delete('', verifyOrgAdmin, orgController.deleteOrganization);

organizationRouter.get('/stats', orgController.getStats);
organizationRouter.get('/budgets', orgController.getBudgets);
organizationRouter.get('/teams', orgController.getTeams);

organizationRouter.post('/team', verifyOrgAdmin, orgController.createTeam);
// organizationRouter.post(
// 	'/team/:teamID/user/',
// 	verifyOrgAdmin,
// 	verifyTeamLeader,
// 	userController.googleAuth
// );
// organizationRouter.put(
// 	'/team/:teamID/user/:userID/role',
// 	verifyOrgAdmin,
// 	verifyTeamLeader,
// 	userController.googleAuth
// );
// organizationRouter.delete(
// 	'/team/:teamID/user',
// 	verifyOrgAdmin,
// 	verifyTeamLeader,
// 	userController.googleAuth
// );

organizationRouter.use('/budget', budgetRouter);

export default organizationRouter;
