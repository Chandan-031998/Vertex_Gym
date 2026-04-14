import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportPage from '../../components/erp/ReportPage';
import { getInventoryReport } from '../../services/reportService';
import { formatCurrency } from '../../utils/formatCurrency';

export default function InventoryReports() {
  return (
    <DashboardLayout>
      <ReportPage
        title="Inventory Report"
        description="Inventory valuation, low stock visibility, and supplier-linked product performance."
        fetcher={getInventoryReport}
        columns={[
          { key: 'product_name', label: 'Product' },
          { key: 'supplier_name', label: 'Supplier' },
          { key: 'quantity', label: 'Qty' },
          { key: 'price', label: 'Price', render: (row) => formatCurrency(row.price) },
          { key: 'status', label: 'Status' }
        ]}
      />
    </DashboardLayout>
  );
}
