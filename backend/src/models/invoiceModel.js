import { pool } from '../config/db.js';

export async function listInvoices() {
  const [rows] = await pool.query(
    `SELECT id, invoice_number, amount, payment_date, payment_method, status
     FROM payments
     ORDER BY id DESC`
  );
  return rows;
}
