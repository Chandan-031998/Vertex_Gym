import { pool } from '../config/db.js';
import * as planModel from '../models/membershipPlanModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getAllPlans = () => planModel.listPlans();
export const getPlan = (id) => planModel.getPlanById(id);
export const addPlan = (data) => {
  ensureRequired(data, ['plan_name', 'duration_days', 'price']);
  return planModel.createPlan(data);
};
export const editPlan = (id, data) => planModel.updatePlan(id, data);
export const removePlan = (id) => planModel.deletePlan(id);

export async function getMemberships(filters = {}) {
  const where = [];
  const values = [];
  if (filters.status) {
    where.push(`mm.status = ?`);
    values.push(filters.status);
  }
  if (filters.memberId) {
    where.push(`mm.member_id = ?`);
    values.push(filters.memberId);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT mm.*, m.full_name as member_name, m.member_code, p.plan_name,
        DATEDIFF(mm.end_date, CURDATE()) as remaining_days
     FROM member_memberships mm
     JOIN members m ON m.id = mm.member_id
     JOIN membership_plans p ON p.id = mm.plan_id
     ${clause}
     ORDER BY mm.end_date ASC, mm.id DESC`,
    values
  );
  return rows;
}

export async function renewMembership(data) {
  ensureRequired(data, ['member_id', 'plan_id', 'start_date']);
  const [plans] = await pool.query(`SELECT * FROM membership_plans WHERE id = ? LIMIT 1`, [data.plan_id]);
  const plan = plans[0];
  if (!plan) throw new ApiError(404, 'Membership plan not found');
  const [result] = await pool.query(
    `INSERT INTO member_memberships
      (member_id, plan_id, start_date, end_date, amount, payment_status, status, notes, freeze_start_date, freeze_end_date, paused_days)
     VALUES (?, ?, ?, DATE_ADD(?, INTERVAL ? DAY), ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.member_id,
      data.plan_id,
      data.start_date,
      data.start_date,
      plan.duration_days,
      data.amount || plan.price,
      data.payment_status || 'paid',
      data.status || 'active',
      data.notes || null,
      data.freeze_start_date || null,
      data.freeze_end_date || null,
      data.paused_days || 0
    ]
  );
  const [rows] = await pool.query(
    `SELECT mm.*, m.full_name as member_name, p.plan_name, DATEDIFF(mm.end_date, CURDATE()) as remaining_days
     FROM member_memberships mm
     JOIN members m ON m.id = mm.member_id
     JOIN membership_plans p ON p.id = mm.plan_id
     WHERE mm.id = ?`,
    [result.insertId]
  );
  return rows[0];
}

export async function pauseMembership(id, data) {
  await pool.query(
    `UPDATE member_memberships
     SET status = 'paused', freeze_start_date = ?, freeze_end_date = ?, paused_days = ?, notes = ?
     WHERE id = ?`,
    [data.freeze_start_date || null, data.freeze_end_date || null, data.paused_days || 0, data.notes || null, id]
  );
  const [rows] = await pool.query(`SELECT * FROM member_memberships WHERE id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function getExpiryMembers() {
  const [rows] = await pool.query(
    `SELECT mm.id, mm.end_date, DATEDIFF(mm.end_date, CURDATE()) as remaining_days, mm.status,
        m.id as member_id, m.full_name as member_name, m.member_code, p.plan_name
     FROM member_memberships mm
     JOIN members m ON m.id = mm.member_id
     JOIN membership_plans p ON p.id = mm.plan_id
     WHERE mm.end_date <= DATE_ADD(CURDATE(), INTERVAL 15 DAY)
     ORDER BY mm.end_date ASC`
  );
  return rows;
}
