import { asyncHandler } from '../utils/asyncHandler.js';
import * as paymentService from '../services/paymentService.js';
import { ok } from '../utils/responseHelper.js';

export const getPayments = asyncHandler(async (req, res) => ok(res, await paymentService.getAllPayments(req.query), 'Payments fetched'));
export const createPayment = asyncHandler(async (req, res) => ok(res, await paymentService.addPayment(req.body), 'Payment created', 201));
export const getPayment = asyncHandler(async (req, res) => ok(res, await paymentService.getPayment(req.params.id), 'Payment fetched'));
export const getDuePayments = asyncHandler(async (_req, res) => ok(res, await paymentService.getDuePayments(), 'Due payments fetched'));
