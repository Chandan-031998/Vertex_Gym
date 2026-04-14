import * as workoutPlanModel from '../models/workoutPlanModel.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getWorkoutPlans = () => workoutPlanModel.listWorkoutPlans();
export const createWorkoutPlan = (data) => {
  ensureRequired(data, ['member_id']);
  return workoutPlanModel.createWorkoutPlan(data);
};
export const updateWorkoutPlan = (id, data) => workoutPlanModel.updateWorkoutPlan(id, data);
export const deleteWorkoutPlan = (id) => workoutPlanModel.deleteWorkoutPlan(id);
export const getWorkoutProgress = () => workoutPlanModel.listWorkoutProgress();
