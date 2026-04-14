import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as settingsService from '../services/settingsService.js';

export const getSettingsBundle = asyncHandler(async (_req, res) => ok(res, await settingsService.getSettingsBundle(), 'Settings fetched'));
export const updateGeneralSettings = asyncHandler(async (req, res) => ok(res, await settingsService.updateSetting('general', req.body), 'General settings saved'));
export const updateTaxSettings = asyncHandler(async (req, res) => ok(res, await settingsService.updateSetting('tax', req.body), 'Tax settings saved'));
export const updateProfileSettings = asyncHandler(async (req, res) => ok(res, await settingsService.updateSetting('profile', req.body), 'Profile settings saved'));
export const updateRolesPermissions = asyncHandler(async (req, res) => ok(res, await settingsService.updateSetting('roles_permissions', req.body), 'Roles and permissions saved'));
export const createBranch = asyncHandler(async (req, res) => ok(res, await settingsService.createBranch(req.body), 'Branch created', 201));
