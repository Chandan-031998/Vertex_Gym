import { Router } from 'express';
import * as trainerController from '../controllers/trainerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();
router.use(protect);
router.get('/', trainerController.getTrainers);
router.get('/:id', trainerController.getTrainer);
router.post('/', trainerController.createTrainer);
router.put('/:id', trainerController.updateTrainer);
router.delete('/:id', trainerController.deleteTrainer);
export default router;
