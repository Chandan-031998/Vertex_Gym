import api from './api';

export const getSettings = async () => (await api.get('/settings')).data;
export const updateGeneralSettings = async (payload) => (await api.put('/settings/general', payload)).data;
export const updateTaxSettings = async (payload) => (await api.put('/settings/tax', payload)).data;
export const updateProfileSettings = async (payload) => (await api.put('/settings/profile', payload)).data;
export const updateRolesPermissions = async (payload) => (await api.put('/settings/roles-permissions', payload)).data;
export const createBranch = async (payload) => (await api.post('/settings/branches', payload)).data;
