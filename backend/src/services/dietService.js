import * as dietPlanModel from '../models/dietPlanModel.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getDietPlans = () => dietPlanModel.listDietPlans();
export const createDietPlan = (data) => {
  ensureRequired(data, ['member_id']);
  return dietPlanModel.createDietPlan(data);
};
export const updateDietPlan = (id, data) => dietPlanModel.updateDietPlan(id, data);
export const deleteDietPlan = (id) => dietPlanModel.deleteDietPlan(id);
