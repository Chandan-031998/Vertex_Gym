import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as workoutService from '../services/workoutService.js';

export const getWorkoutPlans = asyncHandler(async (_req, res) => ok(res, await workoutService.getWorkoutPlans(), 'Workout plans fetched'));
export const createWorkoutPlan = asyncHandler(async (req, res) => ok(res, await workoutService.createWorkoutPlan(req.body), 'Workout plan created', 201));
export const updateWorkoutPlan = asyncHandler(async (req, res) => ok(res, await workoutService.updateWorkoutPlan(req.params.id, req.body), 'Workout plan updated'));
export const deleteWorkoutPlan = asyncHandler(async (req, res) => ok(res, await workoutService.deleteWorkoutPlan(req.params.id), 'Workout plan deleted'));
export const getWorkoutProgress = asyncHandler(async (_req, res) => ok(res, await workoutService.getWorkoutProgress(), 'Workout progress fetched'));
