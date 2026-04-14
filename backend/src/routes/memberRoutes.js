import { Router } from 'express';
import * as memberController from '../controllers/memberController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', memberController.getMembers);
router.get('/:id/qr', memberController.getMemberQr);
router.get('/:id', memberController.getMember);
router.post('/', memberController.createMember);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);
export default router;
