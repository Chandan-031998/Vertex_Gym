import { pool } from '../config/db.js';

export async function listPlans() {
  const [rows] = await pool.query(`SELECT * FROM membership_plans ORDER BY id DESC`);
  return rows;
}

export async function getPlanById(id) {
  const [rows] = await pool.query(`SELECT * FROM membership_plans WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createPlan(data) {
  const [result] = await pool.query(
    `INSERT INTO membership_plans (plan_name, duration_days, price, description, freeze_limit_days, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.plan_name, data.duration_days, data.price, data.description || null, data.freeze_limit_days || 0, data.status || 'active']
  );
  return getPlanById(result.insertId);
}

export async function updatePlan(id, data) {
  await pool.query(
    `UPDATE membership_plans SET plan_name=?, duration_days=?, price=?, description=?, freeze_limit_days=?, status=? WHERE id=?`,
    [data.plan_name, data.duration_days, data.price, data.description || null, data.freeze_limit_days || 0, data.status || 'active', id]
  );
  return getPlanById(id);
}

export async function deletePlan(id) {
  await pool.query(`DELETE FROM membership_plans WHERE id=?`, [id]);
}
