import { pool } from '../config/db.js';

export async function listEquipment() {
  const [rows] = await pool.query(`SELECT * FROM equipment ORDER BY id DESC`);
  return rows;
}

export async function createEquipment(data) {
  const [result] = await pool.query(
    `INSERT INTO equipment (equipment_name, brand, purchase_date, condition_status, serial_number, purchase_cost, last_service_date, next_service_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.equipment_name,
      data.brand || null,
      data.purchase_date || null,
      data.condition_status || 'good',
      data.serial_number || null,
      data.purchase_cost || 0,
      data.last_service_date || null,
      data.next_service_date || null
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM equipment WHERE id = ?`, [result.insertId]);
  return rows[0];
}

export async function updateEquipment(id, data) {
  await pool.query(
    `UPDATE equipment
     SET equipment_name = ?, brand = ?, purchase_date = ?, condition_status = ?, serial_number = ?, purchase_cost = ?, last_service_date = ?, next_service_date = ?
     WHERE id = ?`,
    [
      data.equipment_name,
      data.brand || null,
      data.purchase_date || null,
      data.condition_status || 'good',
      data.serial_number || null,
      data.purchase_cost || 0,
      data.last_service_date || null,
      data.next_service_date || null,
      id
    ]
  );
  const [rows] = await pool.query(`SELECT * FROM equipment WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function deleteEquipment(id) {
  await pool.query(`DELETE FROM equipment WHERE id = ?`, [id]);
}
