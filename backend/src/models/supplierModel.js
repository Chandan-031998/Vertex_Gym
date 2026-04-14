import { pool } from '../config/db.js';

export async function listSuppliers() {
  const [rows] = await pool.query(`SELECT * FROM suppliers ORDER BY supplier_name`);
  return rows;
}

export async function createSupplier(data) {
  const [result] = await pool.query(
    `INSERT INTO suppliers (supplier_name, phone, email, address) VALUES (?, ?, ?, ?)`,
    [data.supplier_name, data.phone || null, data.email || null, data.address || null]
  );
  const [rows] = await pool.query(`SELECT * FROM suppliers WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function updateSupplier(id, data) {
  await pool.query(
    `UPDATE suppliers SET supplier_name = ?, phone = ?, email = ?, address = ? WHERE id = ?`,
    [data.supplier_name, data.phone || null, data.email || null, data.address || null, id]
  );
  const [rows] = await pool.query(`SELECT * FROM suppliers WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function deleteSupplier(id) {
  await pool.query(`DELETE FROM suppliers WHERE id = ?`, [id]);
}
