import { pool } from '../config/db.js';

export async function listStockMovements() {
  const [rows] = await pool.query(
    `SELECT sm.*, p.product_name, p.sku
     FROM stock_movements sm
     JOIN products p ON p.id = sm.product_id
     ORDER BY sm.id DESC`
  );
  return rows;
}

export async function createStockMovement(data) {
  const [result] = await pool.query(
    `INSERT INTO stock_movements (product_id, movement_type, quantity, movement_date, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [data.product_id, data.movement_type, data.quantity, data.movement_date, data.notes || null]
  );
  await pool.query(
    `UPDATE products
     SET quantity = quantity + ?
     WHERE id = ?`,
    [data.movement_type === 'in' ? Number(data.quantity) : -Number(data.quantity), data.product_id]
  );
  const [rows] = await pool.query(`SELECT * FROM stock_movements WHERE id = ?`, [result.insertId]);
  return rows[0];
}
