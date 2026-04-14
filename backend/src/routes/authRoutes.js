import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { loginValidation } from '../validations/authValidation.js';
import { handleValidation } from '../middlewares/validateMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.post('/login', loginValidation, handleValidation, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/me', protect, authController.me);
export default router;
