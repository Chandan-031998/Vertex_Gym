import { pool } from '../config/db.js';

export async function listStaff() {
  const [rows] = await pool.query(`SELECT * FROM staff ORDER BY id DESC`);
  return rows;
}

export async function createStaff(data) {
  const [result] = await pool.query(
    `INSERT INTO staff (full_name, role, email, phone, salary, status, shift_name, branch_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.full_name,
      data.role || null,
      data.email || null,
      data.phone || null,
      data.salary || 0,
      data.status || 'active',
      data.shift_name || null,
      data.branch_id || null
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM staff WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function updateStaff(id, data) {
  await pool.query(
    `UPDATE staff
     SET full_name = ?, role = ?, email = ?, phone = ?, salary = ?, status = ?, shift_name = ?, branch_id = ?
     WHERE id = ?`,
    [
      data.full_name,
      data.role || null,
      data.email || null,
      data.phone || null,
      data.salary || 0,
      data.status || 'active',
      data.shift_name || null,
      data.branch_id || null,
      id
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM staff WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function deleteStaff(id) {
  await pool.query(`DELETE FROM staff WHERE id = ?`, [id]);
}
