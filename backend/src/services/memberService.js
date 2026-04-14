import * as memberModel from '../models/memberModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ensureRequired } from '../utils/serviceHelpers.js';
import { generateQrPayload, generateQrToken } from '../utils/qrGenerator.js';

export const getAllMembers = (filters) => memberModel.listMembers(filters);
export const getMember = async (id) => {
  const member = await memberModel.getMemberById(id);
  if (!member) throw new ApiError(404, 'Member not found');
  const [attendanceHistory, paymentHistory, memberships, workoutPlans, dietPlans] = await Promise.all([
    memberModel.getMemberAttendanceHistory(id),
    memberModel.getMemberPaymentHistory(id),
    memberModel.getMemberMemberships(id),
    memberModel.getMemberWorkoutPlans(id),
    memberModel.getMemberDietPlans(id)
  ]);
  return {
    ...member,
    attendanceHistory,
    paymentHistory,
    memberships,
    workoutPlans,
    dietPlans
  };
};
export const addMember = (data) => {
  ensureRequired(data, ['member_code', 'full_name', 'joining_date']);
  return memberModel.createMember({ ...data, qr_token: generateQrToken() });
};
export const editMember = async (id, data) => {
  ensureRequired(data, ['full_name']);
  const existing = await memberModel.getMemberById(id);
  if (!existing) throw new ApiError(404, 'Member not found');
  return memberModel.updateMember(id, { ...existing, ...data });
};
export const removeMember = (id) => memberModel.deleteMember(id);

export const getMemberQr = async (id) => {
  const member = await memberModel.getMemberById(id);
  if (!member) throw new ApiError(404, 'Member not found');
  return {
    member_id: member.id,
    member_code: member.member_code,
    full_name: member.full_name,
    status: member.status,
    qr_payload: generateQrPayload(member)
  };
};
