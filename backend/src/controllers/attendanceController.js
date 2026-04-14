import { asyncHandler } from '../utils/asyncHandler.js';
import * as attendanceService from '../services/attendanceService.js';
import { ok } from '../utils/responseHelper.js';

export const getAttendance = asyncHandler(async (req, res) => ok(res, await attendanceService.getAllAttendance(req.query), 'Attendance fetched'));
export const createAttendance = asyncHandler(async (req, res) => ok(res, await attendanceService.addAttendance(req.body), 'Attendance marked', 201));
export const checkOutAttendance = asyncHandler(async (req, res) => ok(res, await attendanceService.checkOutAttendance(req.params.id), 'Check-out successful'));
export const qrCheckIn = asyncHandler(async (req, res) => ok(res, await attendanceService.qrCheckIn(req.body.member_code), 'QR check-in successful'));
export const processQrAttendance = asyncHandler(async (req, res) => ok(res, await attendanceService.processQrAttendance(req.body.qr_payload), 'QR attendance processed'));
