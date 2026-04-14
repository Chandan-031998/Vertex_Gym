import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as userService from '../services/userService.js';

export const getUsers = asyncHandler(async (_req, res) => ok(res, await userService.getUsers(), 'Users fetched'));
