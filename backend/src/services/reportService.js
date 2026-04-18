import { pool } from '../config/db.js';

export async function getDashboardSummary() {
  const [
    [memberRows],
    [trainerRows],
    [revenueRows],
    [todayAttendanceRows],
    [recentPayments],
    [recentAttendance],
    [revenueSeries],
    [attendanceSeries],
    [expiringMemberships]
  ] = await Promise.all([
    pool.query(
      `SELECT
        COUNT(*) as totalMembers,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as activeMembers,
        SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expiredMembers
       FROM members`
    ),
    pool.query(`SELECT COUNT(*) as totalTrainers FROM trainers`),
    pool.query(`SELECT COALESCE(SUM(amount),0) as totalRevenue FROM payments`),
    pool.query(
      `SELECT COUNT(*) as todayAttendance
       FROM attendance
       WHERE check_in_time >= CURDATE()
         AND check_in_time < CURDATE() + INTERVAL 1 DAY`
    ),
    pool.query(
      `SELECT p.id, p.amount, p.payment_method, p.payment_date, p.invoice_number, m.full_name as member_name
       FROM payments p
       JOIN members m ON m.id = p.member_id
       ORDER BY p.id DESC
       LIMIT 5`
    ),
    pool.query(
      `SELECT a.id, a.check_in_time, a.check_out_time, a.entry_type, m.full_name as member_name, m.member_code
       FROM attendance a
       JOIN members m ON m.id = a.member_id
       ORDER BY a.id DESC
       LIMIT 5`
    ),
    pool.query(
      `SELECT DATE_FORMAT(payment_date, '%Y-%m') as month, ROUND(SUM(amount), 2) as total
       FROM payments
       WHERE payment_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
       GROUP BY DATE_FORMAT(payment_date, '%Y-%m')
       ORDER BY month`
    ),
    pool.query(
      `SELECT DATE(check_in_time) as day, COUNT(*) as total
       FROM attendance
       WHERE check_in_time >= CURDATE() - INTERVAL 6 DAY
         AND check_in_time < CURDATE() + INTERVAL 1 DAY
       GROUP BY DATE(check_in_time)
       ORDER BY day`
    ),
    pool.query(
      `SELECT mm.id, mm.end_date, DATEDIFF(mm.end_date, CURDATE()) as remaining_days, m.full_name as member_name, p.plan_name
       FROM member_memberships mm
       JOIN members m ON m.id = mm.member_id
       JOIN membership_plans p ON p.id = mm.plan_id
       WHERE mm.end_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 15 DAY)
       ORDER BY mm.end_date ASC
       LIMIT 5`
    )
  ]);

  const [members] = memberRows;
  const [trainers] = trainerRows;
  const [revenue] = revenueRows;
  const [todayAttendance] = todayAttendanceRows;

  return {
    ...members,
    ...trainers,
    ...revenue,
    ...todayAttendance,
    recentPayments,
    recentAttendance,
    revenueSeries,
    attendanceSeries,
    expiringMemberships
  };
}

async function getDateFilter(where = [], values = [], filters = {}) {
  if (filters.startDate) {
    where.push(`DATE_VALUE >= ?`);
    values.push(filters.startDate);
  }
  if (filters.endDate) {
    where.push(`DATE_VALUE <= ?`);
    values.push(filters.endDate);
  }
  return { where, values };
}

export async function getRevenueReport(filters = {}) {
  const where = [];
  const values = [];
  if (filters.startDate) {
    where.push(`payment_date >= ?`);
    values.push(filters.startDate);
  }
  if (filters.endDate) {
    where.push(`payment_date <= ?`);
    values.push(filters.endDate);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT p.id, p.amount, p.payment_date, p.payment_method, p.invoice_number, p.status, m.full_name as member_name
     FROM payments p
     JOIN members m ON m.id = p.member_id
     ${clause}
     ORDER BY p.payment_date DESC, p.id DESC`,
    values
  );
  const total = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  return {
    rows,
    summary: {
      totalRevenue: total,
      totalTransactions: rows.length
    }
  };
}

export async function getAttendanceReport(filters = {}) {
  const where = [];
  const values = [];
  if (filters.startDate) {
    where.push(`DATE(a.check_in_time) >= ?`);
    values.push(filters.startDate);
  }
  if (filters.endDate) {
    where.push(`DATE(a.check_in_time) <= ?`);
    values.push(filters.endDate);
  }
  if (filters.memberId) {
    where.push(`a.member_id = ?`);
    values.push(filters.memberId);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT a.id, a.check_in_time, a.check_out_time, a.entry_type, m.member_code, m.full_name as member_name
     FROM attendance a
     JOIN members m ON m.id = a.member_id
     ${clause}
     ORDER BY a.check_in_time DESC`,
    values
  );
  return {
    rows,
    summary: {
      totalEntries: rows.length,
      checkedOut: rows.filter((row) => row.check_out_time).length
    }
  };
}

export async function getMembershipReport(filters = {}) {
  const where = [];
  const values = [];
  if (filters.status) {
    where.push(`mm.status = ?`);
    values.push(filters.status);
  }
  const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const [rows] = await pool.query(
    `SELECT mm.id, mm.start_date, mm.end_date, mm.status, mm.payment_status, mm.amount,
        DATEDIFF(mm.end_date, CURDATE()) as remaining_days,
        m.full_name as member_name, p.plan_name
     FROM member_memberships mm
     JOIN members m ON m.id = mm.member_id
     JOIN membership_plans p ON p.id = mm.plan_id
     ${clause}
     ORDER BY mm.end_date ASC`,
    values
  );
  return {
    rows,
    summary: {
      active: rows.filter((row) => row.status === 'active').length,
      paused: rows.filter((row) => row.status === 'paused').length,
      expired: rows.filter((row) => row.status === 'expired').length
    }
  };
}

export async function getTrainerReport() {
  const [rows] = await pool.query(
    `SELECT t.id, t.full_name, t.specialization, t.experience_years, t.salary, t.status,
        COUNT(m.id) as assigned_members,
        COUNT(c.id) as scheduled_classes
     FROM trainers t
     LEFT JOIN members m ON m.assigned_trainer_id = t.id
     LEFT JOIN classes c ON c.trainer_id = t.id
     GROUP BY t.id
     ORDER BY t.full_name`
  );
  return {
    rows,
    summary: {
      totalTrainers: rows.length,
      activeTrainers: rows.filter((row) => row.status === 'active').length
    }
  };
}

export async function getInventoryReport() {
  const [rows] = await pool.query(
    `SELECT p.id, p.product_name, p.sku, p.quantity, p.low_stock_threshold, p.price, p.status,
        s.supplier_name
     FROM products p
     LEFT JOIN suppliers s ON s.id = p.supplier_id
     ORDER BY p.product_name`
  );
  return {
    rows,
    summary: {
      totalProducts: rows.length,
      lowStockItems: rows.filter((row) => Number(row.quantity) <= Number(row.low_stock_threshold || 0)).length,
      stockValue: rows.reduce((sum, row) => sum + Number(row.quantity || 0) * Number(row.price || 0), 0)
    }
  };
}
