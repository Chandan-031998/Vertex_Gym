import { asyncHandler } from '../utils/asyncHandler.js';
import * as trainerService from '../services/trainerService.js';
import { ok } from '../utils/responseHelper.js';

export const getTrainers = asyncHandler(async (req, res) => ok(res, await trainerService.getAllTrainers(req.query), 'Trainers fetched'));
export const getTrainer = asyncHandler(async (req, res) => ok(res, await trainerService.getTrainer(req.params.id), 'Trainer fetched'));
export const createTrainer = asyncHandler(async (req, res) => ok(res, await trainerService.addTrainer(req.body), 'Trainer created', 201));
export const updateTrainer = asyncHandler(async (req, res) => ok(res, await trainerService.editTrainer(req.params.id, req.body), 'Trainer updated'));
export const deleteTrainer = asyncHandler(async (req, res) => { await trainerService.removeTrainer(req.params.id); return ok(res, {}, 'Trainer deleted'); });
