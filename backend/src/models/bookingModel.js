import { pool } from '../config/db.js';

export async function listBookings() {
  const [rows] = await pool.query(
    `SELECT cb.*, c.class_name, c.class_date, m.full_name as member_name, m.member_code
     FROM class_bookings cb
     JOIN classes c ON c.id = cb.class_id
     JOIN members m ON m.id = cb.member_id
     ORDER BY cb.id DESC`
  );
  return rows;
}

export async function createBooking(data) {
  const [result] = await pool.query(
    `INSERT INTO class_bookings (class_id, member_id, booking_status) VALUES (?, ?, ?)`,
    [data.class_id, data.member_id, data.booking_status || 'booked']
  );
  const [rows] = await pool.query(`SELECT * FROM class_bookings WHERE id = ?`, [result.insertId]);
  return rows[0];
}
