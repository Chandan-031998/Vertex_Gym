import api from './api';

export const getClasses = async () => (await api.get('/classes')).data;
export const createClass = async (payload) => (await api.post('/classes', payload)).data;
export const updateClass = async (id, payload) => (await api.put(`/classes/${id}`, payload)).data;
export const deleteClass = async (id) => (await api.delete(`/classes/${id}`)).data;
export const getClassBookings = async () => (await api.get('/classes/bookings/list')).data;
export const createClassBooking = async (payload) => (await api.post('/classes/bookings', payload)).data;
