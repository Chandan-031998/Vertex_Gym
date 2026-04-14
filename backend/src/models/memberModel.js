import { pool } from '../config/db.js';
import { buildLikeFilter } from '../utils/serviceHelpers.js';

export async function listMembers(filters = {}) {
  const where = [];
  const values = [];
  if (filters.search) {
    where.push(`(m.member_code LIKE ? OR m.full_name LIKE ? OR m.phone LIKE ? OR m.email LIKE ?)`);
    const search = buildLikeFilter(filters.search);
    values.push(search, search, search, search);
  }
  if (filters.status) {
    where.push(`m.status = ?`);
    values.push(filters.status);
  }
  if (filters.trainerId) {
    where.push(`m.assigned_trainer_id = ?`);
    values.push(filters.trainerId);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT m.*, t.full_name as trainer_name
     FROM members m
     LEFT JOIN trainers t ON t.id = m.assigned_trainer_id
     ${clause}
     ORDER BY m.id DESC`,
    values
  );
  return rows;
}

export async function getMemberById(id) {
  const [rows] = await pool.query(
    `SELECT m.*, t.full_name as trainer_name
     FROM members m
     LEFT JOIN trainers t ON t.id = m.assigned_trainer_id
     WHERE m.id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

export async function createMember(data) {
  const sql = `INSERT INTO members
    (member_code, full_name, email, phone, gender, dob, address, emergency_contact_name, emergency_contact_phone, medical_notes, joining_date, status, assigned_trainer_id, current_weight, current_goal, qr_code, qr_token)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    data.member_code,
    data.full_name,
    data.email || null,
    data.phone || null,
    data.gender || null,
    data.dob || null,
    data.address || null,
    data.emergency_contact_name || null,
    data.emergency_contact_phone || null,
    data.medical_notes || null,
    data.joining_date,
    data.status || 'active',
    data.assigned_trainer_id || null,
    data.current_weight || null,
    data.current_goal || null,
    data.qr_code || data.member_code,
    data.qr_token
  ];
  const [result] = await pool.query(sql, values);
  return getMemberById(result.insertId);
}

export async function updateMember(id, data) {
  const sql = `UPDATE members SET full_name=?, email=?, phone=?, gender=?, dob=?, address=?, emergency_contact_name=?, emergency_contact_phone=?, medical_notes=?, status=?, assigned_trainer_id=?, current_weight=?, current_goal=? WHERE id=?`;
  const values = [
    data.full_name,
    data.email || null,
    data.phone || null,
    data.gender || null,
    data.dob || null,
    data.address || null,
    data.emergency_contact_name || null,
    data.emergency_contact_phone || null,
    data.medical_notes || null,
    data.status || 'active',
    data.assigned_trainer_id || null,
    data.current_weight || null,
    data.current_goal || null,
    id
  ];
  await pool.query(sql, values);
  return getMemberById(id);
}

export async function deleteMember(id) {
  await pool.query(`DELETE FROM members WHERE id = ?`, [id]);
}

export async function getMemberAttendanceHistory(id) {
  const [rows] = await pool.query(
    `SELECT id, check_in_time, check_out_time, entry_type, notes
     FROM attendance
     WHERE member_id = ?
     ORDER BY check_in_time DESC`,
    [id]
  );
  return rows;
}

export async function getMemberPaymentHistory(id) {
  const [rows] = await pool.query(
    `SELECT id, amount, payment_method, payment_date, invoice_number, status
     FROM payments
     WHERE member_id = ?
     ORDER BY payment_date DESC, id DESC`,
    [id]
  );
  return rows;
}

export async function getMemberMemberships(id) {
  const [rows] = await pool.query(
    `SELECT mm.*, p.plan_name, DATEDIFF(mm.end_date, CURDATE()) as remaining_days
     FROM member_memberships mm
     JOIN membership_plans p ON p.id = mm.plan_id
     WHERE mm.member_id = ?
     ORDER BY mm.id DESC`,
    [id]
  );
  return rows;
}

export async function getMemberWorkoutPlans(id) {
  const [rows] = await pool.query(
    `SELECT wp.*, t.full_name as trainer_name
     FROM workout_plans wp
     LEFT JOIN trainers t ON t.id = wp.trainer_id
     WHERE wp.member_id = ?
     ORDER BY wp.id DESC`,
    [id]
  );
  return rows;
}

export async function getMemberDietPlans(id) {
  const [rows] = await pool.query(
    `SELECT dp.*, t.full_name as trainer_name
     FROM diet_plans dp
     LEFT JOIN trainers t ON t.id = dp.trainer_id
     WHERE dp.member_id = ?
     ORDER BY dp.id DESC`,
    [id]
  );
  return rows;
}

export async function getMemberByCodeAndQrToken(member_code, qr_token) {
  const [rows] = await pool.query(
    `SELECT m.*, t.full_name as trainer_name
     FROM members m
     LEFT JOIN trainers t ON t.id = m.assigned_trainer_id
     WHERE m.member_code = ? AND m.qr_token = ?
     LIMIT 1`,
    [member_code, qr_token]
  );
  return rows[0] || null;
}
