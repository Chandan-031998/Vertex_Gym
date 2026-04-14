import { pool } from '../config/db.js';

export async function listDietPlans() {
  const [rows] = await pool.query(
    `SELECT dp.*, m.full_name as member_name, t.full_name as trainer_name
     FROM diet_plans dp
     LEFT JOIN members m ON m.id = dp.member_id
     LEFT JOIN trainers t ON t.id = dp.trainer_id
     ORDER BY dp.id DESC`
  );
  return rows;
}

export async function createDietPlan(data) {
  const [result] = await pool.query(
    `INSERT INTO diet_plans (member_id, trainer_id, goal, plan_text, plan_name, calories, protein_grams, carbs_grams, fat_grams, status, assigned_date, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.member_id,
      data.trainer_id || null,
      data.goal || null,
      data.plan_text || null,
      data.plan_name || 'Diet Plan',
      data.calories || 0,
      data.protein_grams || 0,
      data.carbs_grams || 0,
      data.fat_grams || 0,
      data.status || 'active',
      data.assigned_date || new Date(),
      data.notes || null
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM diet_plans WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function updateDietPlan(id, data) {
  await pool.query(
    `UPDATE diet_plans
     SET member_id = ?, trainer_id = ?, goal = ?, plan_text = ?, plan_name = ?, calories = ?, protein_grams = ?, carbs_grams = ?, fat_grams = ?, status = ?, notes = ?
     WHERE id = ?`,
    [
      data.member_id,
      data.trainer_id || null,
      data.goal || null,
      data.plan_text || null,
      data.plan_name || 'Diet Plan',
      data.calories || 0,
      data.protein_grams || 0,
      data.carbs_grams || 0,
      data.fat_grams || 0,
      data.status || 'active',
      data.notes || null,
      id
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM diet_plans WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function deleteDietPlan(id) {
  await pool.query(`DELETE FROM diet_plans WHERE id = ?`, [id]);
}
