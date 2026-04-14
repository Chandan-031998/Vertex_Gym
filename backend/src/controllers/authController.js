import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';
import { ok } from '../utils/responseHelper.js';

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  return ok(res, result, 'Login successful');
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.me(req.user.id);
  return ok(res, user, 'Profile fetched');
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  return ok(res, result, 'Password reset instructions generated');
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.body.token, req.body.password);
  return ok(res, result, 'Password reset successful');
});
