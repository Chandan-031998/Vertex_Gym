import { asyncHandler } from '../utils/asyncHandler.js';
import * as memberService from '../services/memberService.js';
import { ok } from '../utils/responseHelper.js';

export const getMembers = asyncHandler(async (req, res) => ok(res, await memberService.getAllMembers(req.query), 'Members fetched'));
export const getMember = asyncHandler(async (req, res) => ok(res, await memberService.getMember(req.params.id), 'Member fetched'));
export const createMember = asyncHandler(async (req, res) => ok(res, await memberService.addMember(req.body), 'Member created', 201));
export const updateMember = asyncHandler(async (req, res) => ok(res, await memberService.editMember(req.params.id, req.body), 'Member updated'));
export const deleteMember = asyncHandler(async (req, res) => {
  await memberService.removeMember(req.params.id);
  return ok(res, {}, 'Member deleted');
});
export const getMemberQr = asyncHandler(async (req, res) => ok(res, await memberService.getMemberQr(req.params.id), 'Member QR fetched'));
