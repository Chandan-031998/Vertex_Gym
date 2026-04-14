import { pool } from '../config/db.js';

export async function listMaintenance() {
  const [rows] = await pool.query(
    `SELECT em.*, e.equipment_name
     FROM equipment_maintenance em
     JOIN equipment e ON e.id = em.equipment_id
     ORDER BY em.maintenance_date DESC`
  );
  return rows;
}

export async function createMaintenance(data) {
  const [result] = await pool.query(
    `INSERT INTO equipment_maintenance (equipment_id, maintenance_date, next_due_date, notes, maintenance_type, status, cost)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.equipment_id,
      data.maintenance_date,
      data.next_due_date || null,
      data.notes || null,
      data.maintenance_type || 'routine',
      data.status || 'scheduled',
      data.cost || 0
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM equipment_maintenance WHERE id = ?`, [result.insertId]);
  return rows[0];
}
