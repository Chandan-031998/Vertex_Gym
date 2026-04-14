import api from './api';
export const getPlans = async () => (await api.get('/membership/plans')).data;
export const createPlan = async (payload) => (await api.post('/membership/plans', payload)).data;
export const updatePlan = async (id, payload) => (await api.put(`/membership/plans/${id}`, payload)).data;
export const deletePlan = async (id) => (await api.delete(`/membership/plans/${id}`)).data;
export const getMemberships = async (params = {}) => (await api.get('/membership/memberships', { params })).data;
export const renewMembership = async (payload) => (await api.post('/membership/renew', payload)).data;
export const pauseMembership = async (id, payload) => (await api.put(`/membership/memberships/${id}/pause`, payload)).data;
export const getExpiryMembers = async () => (await api.get('/membership/expiry-members')).data;
