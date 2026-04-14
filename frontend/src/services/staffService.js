import api from './api';

export const getStaff = async () => (await api.get('/staff')).data;
export const createStaff = async (payload) => (await api.post('/staff', payload)).data;
export const updateStaff = async (id, payload) => (await api.put(`/staff/${id}`, payload)).data;
export const deleteStaff = async (id) => (await api.delete(`/staff/${id}`)).data;
export const getStaffAttendance = async () => (await api.get('/staff/attendance/list')).data;
export const createStaffAttendance = async (payload) => (await api.post('/staff/attendance', payload)).data;
export const getShifts = async () => (await api.get('/staff/shifts/list')).data;
export const createShift = async (payload) => (await api.post('/staff/shifts', payload)).data;
