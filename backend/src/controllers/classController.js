import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as classService from '../services/classService.js';

export const getClasses = asyncHandler(async (_req, res) => ok(res, await classService.getClasses(), 'Classes fetched'));
export const createClass = asyncHandler(async (req, res) => ok(res, await classService.createClass(req.body), 'Class created', 201));
export const updateClass = asyncHandler(async (req, res) => ok(res, await classService.updateClass(req.params.id, req.body), 'Class updated'));
export const deleteClass = asyncHandler(async (req, res) => ok(res, await classService.deleteClass(req.params.id), 'Class deleted'));
export const getBookings = asyncHandler(async (_req, res) => ok(res, await classService.getBookings(), 'Class bookings fetched'));
export const createBooking = asyncHandler(async (req, res) => ok(res, await classService.createBooking(req.body), 'Class booking created', 201));
