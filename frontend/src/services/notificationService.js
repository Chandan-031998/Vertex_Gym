import api from './api';

export const getNotifications = async () => (await api.get('/notifications')).data;
export const createNotification = async (payload) => (await api.post('/notifications', payload)).data;
export const getReminderLogs = async () => (await api.get('/notifications/logs')).data;
export const syncReminderPreview = async () => (await api.get('/notifications/sync')).data;
