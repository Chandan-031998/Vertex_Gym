import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as equipmentService from '../services/equipmentService.js';

export const getEquipment = asyncHandler(async (_req, res) => ok(res, await equipmentService.getEquipment(), 'Equipment fetched'));
export const createEquipment = asyncHandler(async (req, res) => ok(res, await equipmentService.createEquipment(req.body), 'Equipment created', 201));
export const updateEquipment = asyncHandler(async (req, res) => ok(res, await equipmentService.updateEquipment(req.params.id, req.body), 'Equipment updated'));
export const deleteEquipment = asyncHandler(async (req, res) => ok(res, await equipmentService.deleteEquipment(req.params.id), 'Equipment deleted'));
export const getMaintenance = asyncHandler(async (_req, res) => ok(res, await equipmentService.getMaintenance(), 'Maintenance schedule fetched'));
export const createMaintenance = asyncHandler(async (req, res) => ok(res, await equipmentService.createMaintenance(req.body), 'Maintenance created', 201));
export const getDamagedEquipment = asyncHandler(async (_req, res) => ok(res, await equipmentService.getDamagedEquipment(), 'Damaged equipment fetched'));
