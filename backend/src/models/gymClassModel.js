import { pool } from '../config/db.js';

export async function listClasses() {
  const [rows] = await pool.query(
    `SELECT c.*, t.full_name as trainer_name,
        COUNT(cb.id) as booked_count
     FROM classes c
     LEFT JOIN trainers t ON t.id = c.trainer_id
     LEFT JOIN class_bookings cb ON cb.class_id = c.id AND cb.booking_status = 'booked'
     GROUP BY c.id
     ORDER BY c.class_date DESC, c.start_time DESC`
  );
  return rows;
}

export async function getClassById(id) {
  const [rows] = await pool.query(`SELECT * FROM classes WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createClass(data) {
  const [result] = await pool.query(
    `INSERT INTO classes (class_name, trainer_id, class_date, start_time, end_time, capacity, status, description, batch_name, room_name)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.class_name,
      data.trainer_id || null,
      data.class_date || null,
      data.start_time || null,
      data.end_time || null,
      data.capacity || 20,
      data.status || 'scheduled',
      data.description || null,
      data.batch_name || null,
      data.room_name || null
    ]
  );
  return getClassById(result.insertId);
}

export async function updateClass(id, data) {
  await pool.query(
    `UPDATE classes
     SET class_name = ?, trainer_id = ?, class_date = ?, start_time = ?, end_time = ?, capacity = ?, status = ?, description = ?, batch_name = ?, room_name = ?
     WHERE id = ?`,
    [
      data.class_name,
      data.trainer_id || null,
      data.class_date || null,
      data.start_time || null,
      data.end_time || null,
      data.capacity || 20,
      data.status || 'scheduled',
      data.description || null,
      data.batch_name || null,
      data.room_name || null,
      id
    ]
  );
  return getClassById(id);
}

export async function deleteClass(id) {
  await pool.query(`DELETE FROM classes WHERE id = ?`, [id]);
}
