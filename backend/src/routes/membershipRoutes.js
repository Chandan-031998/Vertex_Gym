import { Router } from 'express';
import * as membershipController from '../controllers/membershipController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/plans', membershipController.getPlans);
router.get('/plans/:id', membershipController.getPlan);
router.post('/plans', membershipController.createPlan);
router.put('/plans/:id', membershipController.updatePlan);
router.delete('/plans/:id', membershipController.deletePlan);
router.get('/memberships', membershipController.getMemberships);
router.post('/renew', membershipController.renewMembership);
router.put('/memberships/:id/pause', membershipController.pauseMembership);
router.get('/expiry-members', membershipController.getExpiryMembers);
export default router;
