import * as attendanceModel from '../models/attendanceModel.js';
import { ApiError } from '../utils/ApiError.js';
import { ensureRequired } from '../utils/serviceHelpers.js';
import * as memberModel from '../models/memberModel.js';
import { parseQrPayload } from '../utils/qrGenerator.js';

export const getAllAttendance = (filters) => attendanceModel.listAttendance(filters);
export const addAttendance = async (data) => {
  ensureRequired(data, ['member_id']);
  const existing = await attendanceModel.findOpenAttendanceByMember(data.member_id);
  if (existing) throw new ApiError(400, 'Member is already checked in');
  return attendanceModel.markAttendance({
    member_id: data.member_id,
    check_in_time: data.check_in_time || new Date(),
    check_out_time: null,
    entry_type: data.entry_type || 'manual',
    notes: data.notes || null
  });
};

export const checkOutAttendance = async (id) => {
  const updated = await attendanceModel.checkOutAttendance(id, new Date());
  if (!updated) throw new ApiError(404, 'Attendance not found');
  return updated;
};

export const qrCheckIn = async (member_code) => {
  const member = await attendanceModel.findMemberByCode(member_code);
  if (!member) throw new ApiError(404, 'Member not found');
  return addAttendance({ member_id: member.id, entry_type: 'qr' });
};

export const processQrAttendance = async (qr_payload) => {
  const { member_code, qr_token } = parseQrPayload(qr_payload);
  const member = await memberModel.getMemberByCodeAndQrToken(member_code, qr_token);
  if (!member) throw new ApiError(404, 'QR code is invalid');
  if (member.status !== 'active') throw new ApiError(400, 'Member is not active');

  const membership = await attendanceModel.getActiveMembershipByMember(member.id);
  if (!membership) throw new ApiError(400, 'Membership is inactive or expired');

  const todayAttendance = await attendanceModel.findTodayAttendanceByMember(member.id);
  if (!todayAttendance) {
    const attendance = await attendanceModel.markAttendance({
      member_id: member.id,
      check_in_time: new Date(),
      entry_type: 'qr',
      notes: 'QR check-in'
    });
    return {
      action: 'check_in',
      member_name: member.full_name,
      member_code: member.member_code,
      attendance,
      timestamp: attendance.check_in_time
    };
  }

  if (!todayAttendance.check_out_time) {
    const attendance = await attendanceModel.checkOutAttendance(todayAttendance.id, new Date());
    return {
      action: 'check_out',
      member_name: member.full_name,
      member_code: member.member_code,
      attendance,
      timestamp: attendance.check_out_time
    };
  }

  throw new ApiError(400, 'Member has already completed attendance for today');
};
