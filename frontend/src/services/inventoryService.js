import api from './api';

export const getProducts = async () => (await api.get('/inventory/products')).data;
export const createProduct = async (payload) => (await api.post('/inventory/products', payload)).data;
export const updateProduct = async (id, payload) => (await api.put(`/inventory/products/${id}`, payload)).data;
export const deleteProduct = async (id) => (await api.delete(`/inventory/products/${id}`)).data;
export const getSuppliers = async () => (await api.get('/inventory/suppliers')).data;
export const createSupplier = async (payload) => (await api.post('/inventory/suppliers', payload)).data;
export const updateSupplier = async (id, payload) => (await api.put(`/inventory/suppliers/${id}`, payload)).data;
export const deleteSupplier = async (id) => (await api.delete(`/inventory/suppliers/${id}`)).data;
export const getStockMovements = async () => (await api.get('/inventory/stock-movements')).data;
export const createStockMovement = async (payload) => (await api.post('/inventory/stock-movements', payload)).data;
export const getSales = async () => (await api.get('/inventory/sales')).data;
export const createSale = async (payload) => (await api.post('/inventory/sales', payload)).data;
