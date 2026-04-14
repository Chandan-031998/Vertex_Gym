import * as paymentModel from '../models/paymentModel.js';
import { generateInvoiceNumber } from '../utils/invoiceGenerator.js';
import { ensureRequired } from '../utils/serviceHelpers.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllPayments = (filters) => paymentModel.listPayments(filters);
export const addPayment = async (data) => {
  ensureRequired(data, ['member_id', 'amount', 'payment_date', 'payment_method']);
  return paymentModel.createPayment({ ...data, invoice_number: generateInvoiceNumber() });
};
export const getPayment = async (id) => {
  const payment = await paymentModel.getPaymentById(id);
  if (!payment) throw new ApiError(404, 'Payment not found');
  return payment;
};
export const getDuePayments = () => paymentModel.getDuePayments();
