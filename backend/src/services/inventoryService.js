import { pool } from '../config/db.js';
import * as productModel from '../models/productModel.js';
import * as supplierModel from '../models/supplierModel.js';
import * as stockMovementModel from '../models/stockMovementModel.js';

export const getProducts = () => productModel.listProducts();
export const createProduct = (data) => productModel.createProduct(data);
export const updateProduct = (id, data) => productModel.updateProduct(id, data);
export const deleteProduct = (id) => productModel.deleteProduct(id);
export const getSuppliers = () => supplierModel.listSuppliers();
export const createSupplier = (data) => supplierModel.createSupplier(data);
export const updateSupplier = (id, data) => supplierModel.updateSupplier(id, data);
export const deleteSupplier = (id) => supplierModel.deleteSupplier(id);
export const getStockMovements = () => stockMovementModel.listStockMovements();
export const createStockMovement = (data) => stockMovementModel.createStockMovement(data);

export async function getSales() {
  const [rows] = await pool.query(`SELECT * FROM inventory_sales ORDER BY id DESC`);
  return rows;
}

export async function createSale(data) {
  const [result] = await pool.query(
    `INSERT INTO inventory_sales (invoice_number, customer_name, sale_date, payment_method, total_amount, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.invoice_number,
      data.customer_name || null,
      data.sale_date,
      data.payment_method || 'cash',
      data.total_amount,
      data.notes || null
    ]
  );
  return { id: result.insertId, ...data };
}
