import { pool } from '../config/db.js';

export async function listWorkoutPlans() {
  const [rows] = await pool.query(
    `SELECT wp.*, m.full_name as member_name, t.full_name as trainer_name
     FROM workout_plans wp
     LEFT JOIN members m ON m.id = wp.member_id
     LEFT JOIN trainers t ON t.id = wp.trainer_id
     ORDER BY wp.id DESC`
  );
  return rows;
}

export async function createWorkoutPlan(data) {
  const [result] = await pool.query(
    `INSERT INTO workout_plans (member_id, trainer_id, goal, plan_text, plan_name, status, progress_percent, target_date, assigned_date, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.member_id,
      data.trainer_id || null,
      data.goal || null,
      data.plan_text || null,
      data.plan_name || 'Workout Plan',
      data.status || 'active',
      data.progress_percent || 0,
      data.target_date || null,
      data.assigned_date || new Date(),
      data.notes || null
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM workout_plans WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function updateWorkoutPlan(id, data) {
  await pool.query(
    `UPDATE workout_plans
     SET member_id = ?, trainer_id = ?, goal = ?, plan_text = ?, plan_name = ?, status = ?, progress_percent = ?, target_date = ?, notes = ?
     WHERE id = ?`,
    [
      data.member_id,
      data.trainer_id || null,
      data.goal || null,
      data.plan_text || null,
      data.plan_name || 'Workout Plan',
      data.status || 'active',
      data.progress_percent || 0,
      data.target_date || null,
      data.notes || null,
      id
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM workout_plans WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function deleteWorkoutPlan(id) {
  await pool.query(`DELETE FROM workout_plans WHERE id = ?`, [id]);
}

export async function listWorkoutProgress() {
  const [rows] = await pool.query(
    `SELECT id, member_id, plan_name, goal, progress_percent, target_date, status
     FROM workout_plans
     ORDER BY progress_percent DESC, id DESC`
  );
  return rows;
}
