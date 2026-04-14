import api from './api';
export const loginUser = async (payload) => (await api.post('/auth/login', payload)).data;
export const getMyProfile = async () => (await api.get('/auth/me')).data;
export const forgotPassword = async (payload) => (await api.post('/auth/forgot-password', payload)).data;
export const resetPassword = async (payload) => (await api.post('/auth/reset-password', payload)).data;
