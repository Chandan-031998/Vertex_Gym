import api from './api';
export const getPayments = async (params = {}) => (await api.get('/payments', { params })).data;
export const createPayment = async (payload) => (await api.post('/payments', payload)).data;
export const getPayment = async (id) => (await api.get(`/payments/${id}`)).data;
export const getDuePayments = async () => (await api.get('/payments/due')).data;
