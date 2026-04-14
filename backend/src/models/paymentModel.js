import { pool } from '../config/db.js';
import { buildLikeFilter } from '../utils/serviceHelpers.js';

export async function listPayments(filters = {}) {
  const where = [];
  const values = [];
  if (filters.search) {
    const search = buildLikeFilter(filters.search);
    where.push(`(m.full_name LIKE ? OR p.invoice_number LIKE ? OR p.reference_no LIKE ?)`);
    values.push(search, search, search);
  }
  if (filters.status) {
    where.push(`p.status = ?`);
    values.push(filters.status);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT p.*, m.full_name as member_name
     FROM payments p
     JOIN members m ON m.id = p.member_id
     ${clause}
     ORDER BY p.id DESC`
    ,
    values
  );
  return rows;
}

export async function createPayment(data) {
  const [result] = await pool.query(
    `INSERT INTO payments (member_id, membership_id, amount, payment_date, payment_method, reference_no, notes, invoice_number, tax_amount, discount_amount, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.member_id,
      data.membership_id || null,
      data.amount,
      data.payment_date,
      data.payment_method,
      data.reference_no || null,
      data.notes || null,
      data.invoice_number,
      data.tax_amount || 0,
      data.discount_amount || 0,
      data.status || 'paid'
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM payments WHERE id=?`, [result.insertId]);
  return rows[0];
}

export async function getPaymentById(id) {
  const [rows] = await pool.query(
    `SELECT p.*, m.full_name as member_name, m.member_code, mm.start_date, mm.end_date
     FROM payments p
     JOIN members m ON m.id = p.member_id
     LEFT JOIN member_memberships mm ON mm.id = p.membership_id
     WHERE p.id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

export async function getDuePayments() {
  const [rows] = await pool.query(
    `SELECT mm.id as membership_id, mm.amount, mm.payment_status, mm.start_date, mm.end_date,
        m.id as member_id, m.full_name as member_name, p.plan_name
     FROM member_memberships mm
     JOIN members m ON m.id = mm.member_id
     JOIN membership_plans p ON p.id = mm.plan_id
     WHERE mm.payment_status IN ('partial', 'due')
     ORDER BY mm.end_date ASC`
  );
  return rows;
}
