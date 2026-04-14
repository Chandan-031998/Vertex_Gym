import { pool } from '../config/db.js';

export async function listBranches() {
  const [rows] = await pool.query(`SELECT * FROM branches ORDER BY id DESC`);
  return rows;
}

export async function createBranch(data) {
  const [result] = await pool.query(
    `INSERT INTO branches (branch_name, city, address, phone) VALUES (?, ?, ?, ?)`,
    [data.branch_name, data.city || null, data.address || null, data.phone || null]
  );
  const [rows] = await pool.query(`SELECT * FROM branches WHERE id = ?`, [result.insertId]);
  return rows[0];
}
