import api from './api';
export const getTrainers = async (params = {}) => (await api.get('/trainers', { params })).data;
export const getTrainer = async (id) => (await api.get(`/trainers/${id}`)).data;
export const createTrainer = async (payload) => (await api.post('/trainers', payload)).data;
export const updateTrainer = async (id, payload) => (await api.put(`/trainers/${id}`, payload)).data;
export const deleteTrainer = async (id) => (await api.delete(`/trainers/${id}`)).data;
