import { pool } from '../config/db.js';
import * as notificationModel from '../models/notificationModel.js';

export const getNotifications = () => notificationModel.listNotifications();
export const createNotification = (data) => notificationModel.createNotification(data);

export async function getReminderLogs() {
  const [rows] = await pool.query(`SELECT * FROM reminder_logs ORDER BY id DESC`);
  return rows;
}

export async function syncReminderLogs() {
  const [expiryLogs] = await pool.query(
    `SELECT m.full_name as target_name, 'membership_expiry' as reminder_type, mm.end_date as due_date
     FROM member_memberships mm
     JOIN members m ON m.id = mm.member_id
     WHERE mm.end_date <= DATE_ADD(CURDATE(), INTERVAL 15 DAY)`
  );
  return expiryLogs;
}
