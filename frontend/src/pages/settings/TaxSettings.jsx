import DashboardLayout from '../../components/layout/DashboardLayout';
import ActionCardPage from '../../components/erp/ActionCardPage';
import { updateTaxSettings } from '../../services/settingsService';

export default function TaxSettings() {
  return (
    <DashboardLayout>
      <ActionCardPage
        title="Tax Settings"
        description="Configure invoice prefix, tax name, and percentage for payment receipts."
        fields={[
          { name: 'tax_name', label: 'Tax Name', defaultValue: 'GST' },
          { name: 'tax_percentage', label: 'Tax Percentage', type: 'number', defaultValue: 18 },
          { name: 'invoice_prefix', label: 'Invoice Prefix', defaultValue: 'INV' }
        ]}
        onSubmit={updateTaxSettings}
        submitLabel="Save Tax Settings"
      />
    </DashboardLayout>
  );
}
