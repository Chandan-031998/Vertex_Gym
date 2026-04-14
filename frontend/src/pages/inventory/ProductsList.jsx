import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../../services/inventoryService';

export default function ProductsList() {
  return (
    <DashboardLayout>
      <CrudPage
        title="Products"
        description="Product inventory, supplier linking, stock quantity, and selling price control."
        fields={[
          { name: 'product_name', label: 'Product Name' },
          { name: 'supplier_id', label: 'Supplier ID', type: 'number' },
          { name: 'sku', label: 'SKU' },
          { name: 'quantity', label: 'Quantity', type: 'number' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'low_stock_threshold', label: 'Low Stock Threshold', type: 'number' },
          { name: 'status', label: 'Status', type: 'select', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] }
        ]}
        columns={[
          { key: 'product_name', label: 'Product' },
          { key: 'supplier_name', label: 'Supplier' },
          { key: 'sku', label: 'SKU' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'price', label: 'Price' },
          { key: 'status', label: 'Status' }
        ]}
        listRequest={getProducts}
        createRequest={createProduct}
        updateRequest={updateProduct}
        deleteRequest={deleteProduct}
      />
    </DashboardLayout>
  );
}
