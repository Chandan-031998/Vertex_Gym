import mysql from 'mysql2/promise';
import { env } from './env.js';

export const pool = mysql.createPool(env.db);

export async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    console.log('MySQL connected');
  } finally {
    connection.release();
  }
}
