import { pool } from '../config/db.js';

export async function getUsers() {
  const [rows] = await pool.query(`SELECT id, full_name, email, role, phone, status, created_at FROM users ORDER BY id DESC`);
  return rows;
}
