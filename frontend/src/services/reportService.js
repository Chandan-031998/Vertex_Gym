import api from './api';
export const getDashboardSummary = async () => (await api.get('/reports/dashboard-summary')).data;
export const getRevenueReport = async (params = {}) => (await api.get('/reports/revenue', { params })).data;
export const getAttendanceReport = async (params = {}) => (await api.get('/reports/attendance', { params })).data;
export const getMembershipReport = async (params = {}) => (await api.get('/reports/membership', { params })).data;
export const getTrainerReport = async () => (await api.get('/reports/trainers')).data;
export const getInventoryReport = async () => (await api.get('/reports/inventory')).data;
