import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as notificationService from '../services/notificationService.js';

export const getNotifications = asyncHandler(async (_req, res) => ok(res, await notificationService.getNotifications(), 'Notifications fetched'));
export const createNotification = asyncHandler(async (req, res) => ok(res, await notificationService.createNotification(req.body), 'Notification sent', 201));
export const getReminderLogs = asyncHandler(async (_req, res) => ok(res, await notificationService.getReminderLogs(), 'Reminder logs fetched'));
export const syncReminderLogs = asyncHandler(async (_req, res) => ok(res, await notificationService.syncReminderLogs(), 'Reminder preview fetched'));
