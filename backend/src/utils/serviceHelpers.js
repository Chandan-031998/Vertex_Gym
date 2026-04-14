import { ApiError } from './ApiError.js';

export function parsePagination(query = {}) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 10), 1), 100);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export function buildPaginationMeta(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.max(Math.ceil(total / limit), 1)
  };
}

export function ensureRequired(data, fields = []) {
  const missing = fields.filter((field) => data[field] === undefined || data[field] === null || data[field] === '');
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
}

export function buildLikeFilter(value) {
  return `%${String(value || '').trim()}%`;
}

export function normalizeDate(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : null;
}

export function mapSettings(rows = []) {
  return rows.reduce((acc, row) => {
    let value = row.setting_value;
    try {
      value = JSON.parse(row.setting_value);
    } catch {
      value = row.setting_value;
    }
    acc[row.setting_key] = value;
    return acc;
  }, {});
}

