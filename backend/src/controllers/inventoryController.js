import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/responseHelper.js';
import * as inventoryService from '../services/inventoryService.js';

export const getProducts = asyncHandler(async (_req, res) => ok(res, await inventoryService.getProducts(), 'Products fetched'));
export const createProduct = asyncHandler(async (req, res) => ok(res, await inventoryService.createProduct(req.body), 'Product created', 201));
export const updateProduct = asyncHandler(async (req, res) => ok(res, await inventoryService.updateProduct(req.params.id, req.body), 'Product updated'));
export const deleteProduct = asyncHandler(async (req, res) => ok(res, await inventoryService.deleteProduct(req.params.id), 'Product deleted'));
export const getSuppliers = asyncHandler(async (_req, res) => ok(res, await inventoryService.getSuppliers(), 'Suppliers fetched'));
export const createSupplier = asyncHandler(async (req, res) => ok(res, await inventoryService.createSupplier(req.body), 'Supplier created', 201));
export const updateSupplier = asyncHandler(async (req, res) => ok(res, await inventoryService.updateSupplier(req.params.id, req.body), 'Supplier updated'));
export const deleteSupplier = asyncHandler(async (req, res) => ok(res, await inventoryService.deleteSupplier(req.params.id), 'Supplier deleted'));
export const getStockMovements = asyncHandler(async (_req, res) => ok(res, await inventoryService.getStockMovements(), 'Stock movements fetched'));
export const createStockMovement = asyncHandler(async (req, res) => ok(res, await inventoryService.createStockMovement(req.body), 'Stock movement created', 201));
export const getSales = asyncHandler(async (_req, res) => ok(res, await inventoryService.getSales(), 'Sales fetched'));
export const createSale = asyncHandler(async (req, res) => ok(res, await inventoryService.createSale(req.body), 'Sale created', 201));
