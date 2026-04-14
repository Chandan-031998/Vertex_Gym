import { pool } from '../config/db.js';

export async function listAttendance(filters = {}) {
  const where = [];
  const values = [];
  if (filters.memberId) {
    where.push(`a.member_id = ?`);
    values.push(filters.memberId);
  }
  if (filters.startDate) {
    where.push(`DATE(a.check_in_time) >= ?`);
    values.push(filters.startDate);
  }
  if (filters.endDate) {
    where.push(`DATE(a.check_in_time) <= ?`);
    values.push(filters.endDate);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT a.*, m.full_name as member_name, m.member_code
     FROM attendance a
     JOIN members m ON m.id = a.member_id
     ${clause}
     ORDER BY a.id DESC`
    ,
    values
  );
  return rows;
}

export async function markAttendance(data) {
  const [result] = await pool.query(
    `INSERT INTO attendance (member_id, check_in_time, check_out_time, entry_type, notes)
     VALUES (?, ?, ?, ?, ?)`,
    [data.member_id, data.check_in_time, data.check_out_time || null, data.entry_type || 'manual', data.notes || null]
  );
  const [rows] = await pool.query(`SELECT * FROM attendance WHERE id=?`, [result.insertId]);
  return rows[0];
}

export async function checkOutAttendance(id, checkOutTime) {
  await pool.query(`UPDATE attendance SET check_out_time = ? WHERE id = ?`, [checkOutTime, id]);
  const [rows] = await pool.query(`SELECT * FROM attendance WHERE id=?`, [id]);
  return rows[0] || null;
}

export async function findOpenAttendanceByMember(memberId) {
  const [rows] = await pool.query(
    `SELECT * FROM attendance WHERE member_id = ? AND check_out_time IS NULL ORDER BY id DESC LIMIT 1`,
    [memberId]
  );
  return rows[0] || null;
}

export async function findMemberByCode(memberCode) {
  const [rows] = await pool.query(`SELECT id, member_code, full_name FROM members WHERE member_code = ? LIMIT 1`, [memberCode]);
  return rows[0] || null;
}

export async function findTodayAttendanceByMember(memberId) {
  const [rows] = await pool.query(
    `SELECT a.*, m.full_name as member_name, m.member_code
     FROM attendance a
     JOIN members m ON m.id = a.member_id
     WHERE a.member_id = ? AND DATE(a.check_in_time) = CURDATE()
     ORDER BY a.id DESC
     LIMIT 1`,
    [memberId]
  );
  return rows[0] || null;
}

export async function getActiveMembershipByMember(memberId) {
  const [rows] = await pool.query(
    `SELECT mm.*, p.plan_name
     FROM member_memberships mm
     JOIN membership_plans p ON p.id = mm.plan_id
     WHERE mm.member_id = ?
       AND mm.status = 'active'
       AND mm.start_date <= CURDATE()
       AND mm.end_date >= CURDATE()
     ORDER BY mm.end_date DESC
     LIMIT 1`,
    [memberId]
  );
  return rows[0] || null;
}
