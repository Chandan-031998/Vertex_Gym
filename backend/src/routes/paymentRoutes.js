import { Router } from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', paymentController.getPayments);
router.get('/due', paymentController.getDuePayments);
router.get('/:id', paymentController.getPayment);
router.post('/', paymentController.createPayment);
export default router;
