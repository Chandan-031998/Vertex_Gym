import { pool } from '../config/db.js';

export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.password, u.role, u.phone, u.status
     FROM users u WHERE u.email = ? LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

export async function findUserById(id) {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, role, phone, status, created_at FROM users WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

export async function setResetToken(userId, token, expiresAt) {
  await pool.query(
    `UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE id = ?`,
    [token, expiresAt, userId]
  );
}

export async function findUserByResetToken(token) {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, role, phone, status, reset_token_expires_at
     FROM users
     WHERE reset_token = ?
     LIMIT 1`,
    [token]
  );
  return rows[0] || null;
}

export async function updateUserPassword(userId, password) {
  await pool.query(
    `UPDATE users
     SET password = ?, reset_token = NULL, reset_token_expires_at = NULL
     WHERE id = ?`,
    [password, userId]
  );
}

export async function updateUserProfile(userId, data) {
  await pool.query(
    `UPDATE users SET full_name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [data.full_name, data.email, data.phone || null, userId]
  );
  return findUserById(userId);
}
