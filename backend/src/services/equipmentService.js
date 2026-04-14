import * as equipmentModel from '../models/equipmentModel.js';
import * as maintenanceModel from '../models/maintenanceModel.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getEquipment = () => equipmentModel.listEquipment();
export const createEquipment = (data) => {
  ensureRequired(data, ['equipment_name']);
  return equipmentModel.createEquipment(data);
};
export const updateEquipment = (id, data) => equipmentModel.updateEquipment(id, data);
export const deleteEquipment = (id) => equipmentModel.deleteEquipment(id);
export const getMaintenance = () => maintenanceModel.listMaintenance();
export const createMaintenance = (data) => maintenanceModel.createMaintenance(data);
export async function getDamagedEquipment() {
  return (await equipmentModel.listEquipment()).filter((item) => item.condition_status === 'damaged');
}
