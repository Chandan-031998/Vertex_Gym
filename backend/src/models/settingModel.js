import { pool } from '../config/db.js';

export async function getSettingsByKeys(keys = []) {
  if (!keys.length) return [];
  const placeholders = keys.map(() => '?').join(', ');
  const [rows] = await pool.query(
    `SELECT setting_key, setting_value FROM settings WHERE setting_key IN (${placeholders})`,
    keys
  );
  return rows;
}

export async function upsertSetting(key, value) {
  await pool.query(
    `INSERT INTO settings (setting_key, setting_value)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [key, JSON.stringify(value)]
  );
}
