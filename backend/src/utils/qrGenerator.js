import crypto from 'crypto';
import { ApiError } from './ApiError.js';

const QR_PREFIX = 'VERTEX_GYM_QR';

export function generateQrToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function generateQrPayload(member) {
  return `${QR_PREFIX}:${member.member_code}:${member.qr_token}`;
}

export function parseQrPayload(payload) {
  if (!payload || typeof payload !== 'string') {
    throw new ApiError(400, 'QR payload is required');
  }
  const [prefix, member_code, qr_token] = payload.trim().split(':');
  if (prefix !== QR_PREFIX || !member_code || !qr_token) {
    throw new ApiError(400, 'Malformed QR payload');
  }
  return { member_code, qr_token };
}
