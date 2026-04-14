import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as staffService from '../services/staffService.js';

export const getStaff = asyncHandler(async (_req, res) => ok(res, await staffService.getStaff(), 'Staff fetched'));
export const createStaff = asyncHandler(async (req, res) => ok(res, await staffService.createStaff(req.body), 'Staff created', 201));
export const updateStaff = asyncHandler(async (req, res) => ok(res, await staffService.updateStaff(req.params.id, req.body), 'Staff updated'));
export const deleteStaff = asyncHandler(async (req, res) => ok(res, await staffService.deleteStaff(req.params.id), 'Staff deleted'));
export const getStaffAttendance = asyncHandler(async (_req, res) => ok(res, await staffService.getStaffAttendance(), 'Staff attendance fetched'));
export const createStaffAttendance = asyncHandler(async (req, res) => ok(res, await staffService.createStaffAttendance(req.body), 'Staff attendance created', 201));
export const getShifts = asyncHandler(async (_req, res) => ok(res, await staffService.getShifts(), 'Shifts fetched'));
export const createShift = asyncHandler(async (req, res) => ok(res, await staffService.createShift(req.body), 'Shift created', 201));
