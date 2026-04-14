import { pool } from '../config/db.js';
import * as staffModel from '../models/staffModel.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getStaff = () => staffModel.listStaff();
export const createStaff = (data) => {
  ensureRequired(data, ['full_name']);
  return staffModel.createStaff(data);
};
export const updateStaff = (id, data) => staffModel.updateStaff(id, data);
export const deleteStaff = (id) => staffModel.deleteStaff(id);

export async function getStaffAttendance() {
  const [rows] = await pool.query(
    `SELECT sa.*, s.full_name
     FROM staff_attendance sa
     JOIN staff s ON s.id = sa.staff_id
     ORDER BY sa.id DESC`
  );
  return rows;
}

export async function createStaffAttendance(data) {
  const [result] = await pool.query(
    `INSERT INTO staff_attendance (staff_id, attendance_date, check_in_time, check_out_time, status)
     VALUES (?, ?, ?, ?, ?)`,
    [data.staff_id, data.attendance_date, data.check_in_time || null, data.check_out_time || null, data.status || 'present']
  );
  const [rows] = await pool.query(`SELECT * FROM staff_attendance WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function getShifts() {
  const [rows] = await pool.query(`SELECT * FROM shifts ORDER BY id DESC`);
  return rows;
}

export async function createShift(data) {
  const [result] = await pool.query(
    `INSERT INTO shifts (shift_name, start_time, end_time, notes) VALUES (?, ?, ?, ?)`,
    [data.shift_name, data.start_time || null, data.end_time || null, data.notes || null]
  );
  const [rows] = await pool.query(`SELECT * FROM shifts WHERE id = ?`, [result.insertId]);
  return rows[0];
}
