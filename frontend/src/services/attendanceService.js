import api from './api';
export const getAttendance = async (params = {}) => (await api.get('/attendance', { params })).data;
export const createAttendance = async (payload) => (await api.post('/attendance', payload)).data;
export const checkOutAttendance = async (id) => (await api.put(`/attendance/${id}/check-out`)).data;
export const qrCheckIn = async (payload) => (await api.post('/attendance/qr-check-in', payload)).data;
export const processQrAttendance = async (payload) => (await api.post('/attendance/qr-scan', payload)).data;
