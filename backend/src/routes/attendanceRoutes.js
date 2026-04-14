import { Router } from 'express';
import * as attendanceController from '../controllers/attendanceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', attendanceController.getAttendance);
router.post('/', attendanceController.createAttendance);
router.put('/:id/check-out', attendanceController.checkOutAttendance);
router.post('/qr-check-in', attendanceController.qrCheckIn);
router.post('/qr-scan', attendanceController.processQrAttendance);
export default router;
