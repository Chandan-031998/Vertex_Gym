import { asyncHandler } from '../utils/asyncHandler.js';
import * as reportService from '../services/reportService.js';
import { ok } from '../utils/responseHelper.js';

export const getDashboardSummary = asyncHandler(async (_req, res) => ok(res, await reportService.getDashboardSummary(), 'Dashboard summary fetched'));
export const getRevenueReport = asyncHandler(async (req, res) => ok(res, await reportService.getRevenueReport(req.query), 'Revenue report fetched'));
export const getAttendanceReport = asyncHandler(async (req, res) => ok(res, await reportService.getAttendanceReport(req.query), 'Attendance report fetched'));
export const getMembershipReport = asyncHandler(async (req, res) => ok(res, await reportService.getMembershipReport(req.query), 'Membership report fetched'));
export const getTrainerReport = asyncHandler(async (_req, res) => ok(res, await reportService.getTrainerReport(), 'Trainer report fetched'));
export const getInventoryReport = asyncHandler(async (_req, res) => ok(res, await reportService.getInventoryReport(), 'Inventory report fetched'));
