import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as dietService from '../services/dietService.js';

export const getDietPlans = asyncHandler(async (_req, res) => ok(res, await dietService.getDietPlans(), 'Diet plans fetched'));
export const createDietPlan = asyncHandler(async (req, res) => ok(res, await dietService.createDietPlan(req.body), 'Diet plan created', 201));
export const updateDietPlan = asyncHandler(async (req, res) => ok(res, await dietService.updateDietPlan(req.params.id, req.body), 'Diet plan updated'));
export const deleteDietPlan = asyncHandler(async (req, res) => ok(res, await dietService.deleteDietPlan(req.params.id), 'Diet plan deleted'));
