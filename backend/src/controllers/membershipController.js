import { asyncHandler } from '../utils/asyncHandler.js';
import * as membershipService from '../services/membershipService.js';
import { ok } from '../utils/responseHelper.js';

export const getPlans = asyncHandler(async (_req, res) => ok(res, await membershipService.getAllPlans(), 'Plans fetched'));
export const getPlan = asyncHandler(async (req, res) => ok(res, await membershipService.getPlan(req.params.id), 'Plan fetched'));
export const createPlan = asyncHandler(async (req, res) => ok(res, await membershipService.addPlan(req.body), 'Plan created', 201));
export const updatePlan = asyncHandler(async (req, res) => ok(res, await membershipService.editPlan(req.params.id, req.body), 'Plan updated'));
export const deletePlan = asyncHandler(async (req, res) => { await membershipService.removePlan(req.params.id); return ok(res, {}, 'Plan deleted'); });
export const getMemberships = asyncHandler(async (req, res) => ok(res, await membershipService.getMemberships(req.query), 'Memberships fetched'));
export const renewMembership = asyncHandler(async (req, res) => ok(res, await membershipService.renewMembership(req.body), 'Membership renewed', 201));
export const pauseMembership = asyncHandler(async (req, res) => ok(res, await membershipService.pauseMembership(req.params.id, req.body), 'Membership paused'));
export const getExpiryMembers = asyncHandler(async (_req, res) => ok(res, await membershipService.getExpiryMembers(), 'Expiry members fetched'));
