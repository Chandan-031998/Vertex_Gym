import crypto from 'crypto';
import {
  findUserByEmail,
  findUserById,
  findUserByResetToken,
  setResetToken,
  updateUserPassword
} from '../models/userModel.js';
import { comparePassword } from '../utils/comparePassword.js';
import { generateToken } from '../utils/generateToken.js';
import { ApiError } from '../utils/ApiError.js';
import { hashPassword } from '../utils/hashPassword.js';

export async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) throw new ApiError(401, 'Invalid credentials');
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');
  const token = generateToken(user);
  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status
    }
  };
}

export async function me(userId) {
  const user = await findUserById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
}

export async function forgotPassword(email) {
  if (!email) throw new ApiError(400, 'Email is required');
  const user = await findUserByEmail(email);
  if (!user) {
    return { sent: true, reset_token: null };
  }
  const token = crypto.randomBytes(24).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
  await setResetToken(user.id, token, expiresAt);
  return {
    sent: true,
    reset_token: token,
    expires_at: expiresAt.toISOString()
  };
}

export async function resetPassword(token, password) {
  if (!token || !password) throw new ApiError(400, 'Token and password are required');
  const user = await findUserByResetToken(token);
  if (!user) throw new ApiError(404, 'Invalid reset token');
  if (new Date(user.reset_token_expires_at) < new Date()) {
    throw new ApiError(400, 'Reset token has expired');
  }
  const hashed = await hashPassword(password);
  await updateUserPassword(user.id, hashed);
  return { reset: true };
}
