import api from './api';

export const getEquipment = async () => (await api.get('/equipment')).data;
export const createEquipment = async (payload) => (await api.post('/equipment', payload)).data;
export const updateEquipment = async (id, payload) => (await api.put(`/equipment/${id}`, payload)).data;
export const deleteEquipment = async (id) => (await api.delete(`/equipment/${id}`)).data;
export const getMaintenance = async () => (await api.get('/equipment/maintenance/list')).data;
export const createMaintenance = async (payload) => (await api.post('/equipment/maintenance', payload)).data;
export const getDamagedEquipment = async () => (await api.get('/equipment/damaged/list')).data;
