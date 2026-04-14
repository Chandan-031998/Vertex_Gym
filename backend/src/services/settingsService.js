import * as settingModel from '../models/settingModel.js';
import * as branchModel from '../models/branchModel.js';
import { mapSettings } from '../utils/serviceHelpers.js';

const DEFAULT_SETTINGS = {
  general: { gym_name: 'Vertex Gym', currency: 'INR', timezone: 'Asia/Kolkata' },
  tax: { tax_name: 'GST', tax_percentage: 18, invoice_prefix: 'INV' },
  profile: { full_name: 'System Admin', email: 'admin@gymerp.com', phone: '' },
  roles_permissions: {
    super_admin: ['all'],
    admin: ['dashboard', 'members', 'trainers', 'membership', 'attendance', 'payments', 'reports', 'settings'],
    receptionist: ['dashboard', 'members', 'attendance', 'payments', 'classes', 'notifications'],
    trainer: ['dashboard', 'members', 'trainers', 'workout', 'diet', 'classes'],
    member: ['dashboard']
  }
};

export async function getSettingsBundle() {
  const settingsRows = await settingModel.getSettingsByKeys(['general', 'tax', 'profile', 'roles_permissions']);
  const branchRows = await branchModel.listBranches();
  return {
    ...DEFAULT_SETTINGS,
    ...mapSettings(settingsRows),
    branches: branchRows
  };
}

export async function updateSetting(key, value) {
  await settingModel.upsertSetting(key, value);
  return value;
}

export async function createBranch(data) {
  return branchModel.createBranch(data);
}
