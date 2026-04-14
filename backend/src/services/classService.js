import * as gymClassModel from '../models/gymClassModel.js';
import * as bookingModel from '../models/bookingModel.js';
import { ensureRequired } from '../utils/serviceHelpers.js';

export const getClasses = () => gymClassModel.listClasses();
export const createClass = (data) => {
  ensureRequired(data, ['class_name']);
  return gymClassModel.createClass(data);
};
export const updateClass = (id, data) => gymClassModel.updateClass(id, data);
export const deleteClass = (id) => gymClassModel.deleteClass(id);
export const getBookings = () => bookingModel.listBookings();
export const createBooking = (data) => {
  ensureRequired(data, ['class_id', 'member_id']);
  return bookingModel.createBooking(data);
};
