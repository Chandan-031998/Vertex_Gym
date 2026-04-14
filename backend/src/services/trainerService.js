import * as trainerModel from '../models/trainerModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getAllTrainers = (filters) => trainerModel.listTrainers(filters);
export const getTrainer = async (id) => {
  const trainer = await trainerModel.getTrainerById(id);
  if (!trainer) throw new ApiError(404, 'Trainer not found');
  const [assignedMembers, schedule] = await Promise.all([
    trainerModel.getAssignedMembers(id),
    trainerModel.getTrainerSchedule(id)
  ]);
  return { ...trainer, assignedMembers, schedule };
};
export const addTrainer = (data) => {
  ensureRequired(data, ['full_name']);
  return trainerModel.createTrainer(data);
};
export const editTrainer = async (id, data) => {
  const existing = await trainerModel.getTrainerById(id);
  if (!existing) throw new ApiError(404, 'Trainer not found');
  return trainerModel.updateTrainer(id, { ...existing, ...data });
};
export const removeTrainer = (id) => trainerModel.deleteTrainer(id);
