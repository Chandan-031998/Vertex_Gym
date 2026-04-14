import { pool } from '../config/db.js';

export async function listNotifications() {
  const [rows] = await pool.query(`SELECT * FROM notifications ORDER BY id DESC`);
  return rows;
}

export async function createNotification(data) {
  const [result] = await pool.query(
    `INSERT INTO notifications (title, message, target_role, target_member_id, reminder_type, status, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.message,
      data.target_role || null,
      data.target_member_id || null,
      data.reminder_type || 'general',
      data.status || 'sent',
      data.created_by || null
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM notifications WHERE id = ?`, [result.insertId]);
  return rows[0];
}
