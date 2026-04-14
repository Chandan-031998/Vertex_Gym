import { pool } from '../config/db.js';

export async function listProducts() {
  const [rows] = await pool.query(
    `SELECT p.*, s.supplier_name
     FROM products p
     LEFT JOIN suppliers s ON s.id = p.supplier_id
     ORDER BY p.id DESC`
  );
  return rows;
}

export async function createProduct(data) {
  const [result] = await pool.query(
    `INSERT INTO products (product_name, supplier_id, sku, quantity, price, low_stock_threshold, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.product_name,
      data.supplier_id || null,
      data.sku || null,
      data.quantity || 0,
      data.price || 0,
      data.low_stock_threshold || 5,
      data.status || 'active'
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function updateProduct(id, data) {
  await pool.query(
    `UPDATE products
     SET product_name = ?, supplier_id = ?, sku = ?, quantity = ?, price = ?, low_stock_threshold = ?, status = ?
     WHERE id = ?`,
    [
      data.product_name,
      data.supplier_id || null,
      data.sku || null,
      data.quantity || 0,
      data.price || 0,
      data.low_stock_threshold || 5,
      data.status || 'active',
      id
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM products WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function deleteProduct(id) {
  await pool.query(`DELETE FROM products WHERE id = ?`, [id]);
}
