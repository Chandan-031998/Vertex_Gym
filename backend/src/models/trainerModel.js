import { pool } from '../config/db.js';
import { buildLikeFilter } from '../utils/serviceHelpers.js';

export async function listTrainers(filters = {}) {
  const where = [];
  const values = [];
  if (filters.search) {
    const search = buildLikeFilter(filters.search);
    where.push(`(full_name LIKE ? OR phone LIKE ? OR specialization LIKE ?)`);
    values.push(search, search, search);
  }
  if (filters.status) {
    where.push(`status = ?`);
    values.push(filters.status);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(`SELECT * FROM trainers ${clause} ORDER BY id DESC`, values);
  return rows;
}

export async function getTrainerById(id) {
  const [rows] = await pool.query(`SELECT * FROM trainers WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createTrainer(data) {
  const sql = `INSERT INTO trainers (full_name, email, phone, specialization, experience_years, salary, availability_notes, status)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    data.full_name,
    data.email || null,
    data.phone || null,
    data.specialization || null,
    data.experience_years || 0,
    data.salary || 0,
    data.availability_notes || null,
    data.status || 'active'
  ]);
  return getTrainerById(result.insertId);
}

export async function updateTrainer(id, data) {
  const sql = `UPDATE trainers SET full_name=?, email=?, phone=?, specialization=?, experience_years=?, salary=?, availability_notes=?, status=? WHERE id=?`;
  await pool.query(sql, [
    data.full_name,
    data.email || null,
    data.phone || null,
    data.specialization || null,
    data.experience_years || 0,
    data.salary || 0,
    data.availability_notes || null,
    data.status || 'active',
    id
  ]);
  return getTrainerById(id);
}

export async function deleteTrainer(id) {
  await pool.query(`DELETE FROM trainers WHERE id = ?`, [id]);
}

export async function getAssignedMembers(id) {
  const [rows] = await pool.query(
    `SELECT id, member_code, full_name, phone, status, joining_date
     FROM members
     WHERE assigned_trainer_id = ?
     ORDER BY full_name`,
    [id]
  );
  return rows;
}

export async function getTrainerSchedule(id) {
  const [rows] = await pool.query(
    `SELECT id, class_name, class_date, start_time, end_time, batch_name, room_name, status
     FROM classes
     WHERE trainer_id = ?
     ORDER BY class_date DESC, start_time DESC`,
    [id]
  );
  return rows;
}
