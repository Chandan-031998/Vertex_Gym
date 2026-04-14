import api from './api';
export const getMembers = async (params = {}) => (await api.get('/members', { params })).data;
export const getMember = async (id) => (await api.get(`/members/${id}`)).data;
export const getMemberQr = async (id) => (await api.get(`/members/${id}/qr`)).data;
export const createMember = async (payload) => (await api.post('/members', payload)).data;
export const updateMember = async (id, payload) => (await api.put(`/members/${id}`, payload)).data;
export const deleteMember = async (id) => (await api.delete(`/members/${id}`)).data;
