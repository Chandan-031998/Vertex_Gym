import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/common/Loader';
import DetailView from '../../components/erp/DetailView';
import { getMember, getMemberQr } from '../../services/memberService';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';
import MemberQrCard from '../../components/qr/MemberQrCard';

export default function MemberProfile() {
  const { id = '1' } = useParams();
  const [member, setMember] = useState(null);
  const [qrPayload, setQrPayload] = useState('');

  useEffect(() => {
    getMember(id).then((response) => setMember(response.data));
    getMemberQr(id).then((response) => setQrPayload(response.data.qr_payload));
  }, [id]);

  if (!member) return <DashboardLayout><Loader label="Loading member profile" /></DashboardLayout>;

  return (
    <DashboardLayout>
      <DetailView
        title={member.full_name}
        description={`Member code ${member.member_code}`}
        summary={[
          { label: 'Status', value: member.status },
          { label: 'Trainer', value: member.trainer_name || '-' },
          { label: 'Phone', value: member.phone || '-' },
          { label: 'Joined', value: formatDate(member.joining_date) }
        ]}
        sections={[
          { title: 'QR Access Card', content: <MemberQrCard member={member} qrPayload={qrPayload} /> },
          { title: 'Attendance History', columns: [{ key: 'check_in_time', label: 'Check In', render: (row) => formatDate(row.check_in_time) }, { key: 'check_out_time', label: 'Check Out', render: (row) => formatDate(row.check_out_time) }, { key: 'entry_type', label: 'Entry Type' }], rows: member.attendanceHistory || [] },
          { title: 'Payment History', columns: [{ key: 'amount', label: 'Amount', render: (row) => formatCurrency(row.amount) }, { key: 'payment_method', label: 'Method' }, { key: 'payment_date', label: 'Date', render: (row) => formatDate(row.payment_date) }, { key: 'invoice_number', label: 'Invoice' }], rows: member.paymentHistory || [] },
          { title: 'Workout Plans', columns: [{ key: 'plan_name', label: 'Plan' }, { key: 'goal', label: 'Goal' }, { key: 'progress_percent', label: 'Progress %' }], rows: member.workoutPlans || [] },
          { title: 'Diet Plans', columns: [{ key: 'plan_name', label: 'Plan' }, { key: 'goal', label: 'Goal' }, { key: 'calories', label: 'Calories' }], rows: member.dietPlans || [] }
        ]}
      />
    </DashboardLayout>
  );
}
