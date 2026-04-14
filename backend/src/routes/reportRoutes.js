import { Router } from 'express';
import * as reportController from '../controllers/reportController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/dashboard-summary', reportController.getDashboardSummary);
router.get('/revenue', reportController.getRevenueReport);
router.get('/attendance', reportController.getAttendanceReport);
router.get('/membership', reportController.getMembershipReport);
router.get('/trainers', reportController.getTrainerReport);
router.get('/inventory', reportController.getInventoryReport);
export default router;
