import api from './api';

export const getDietPlans = async () => (await api.get('/diet/plans')).data;
export const createDietPlan = async (payload) => (await api.post('/diet/plans', payload)).data;
export const updateDietPlan = async (id, payload) => (await api.put(`/diet/plans/${id}`, payload)).data;
export const deleteDietPlan = async (id) => (await api.delete(`/diet/plans/${id}`)).data;
