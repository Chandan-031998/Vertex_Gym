import api from './api';

export const getWorkoutPlans = async () => (await api.get('/workout/plans')).data;
export const createWorkoutPlan = async (payload) => (await api.post('/workout/plans', payload)).data;
export const updateWorkoutPlan = async (id, payload) => (await api.put(`/workout/plans/${id}`, payload)).data;
export const deleteWorkoutPlan = async (id) => (await api.delete(`/workout/plans/${id}`)).data;
export const getWorkoutProgress = async () => (await api.get('/workout/progress')).data;
