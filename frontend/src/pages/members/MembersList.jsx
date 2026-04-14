import { useContext, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CrudPage from '../../components/erp/CrudPage';
import Badge from '../../components/common/Badge';
import { createMember, deleteMember, getMember, getMemberQr, getMembers, updateMember } from '../../services/memberService';
import { formatDate } from '../../utils/formatDate';
import MemberQrModal from '../../components/qr/MemberQrModal';
import { NotificationContext } from '../../context/NotificationContext';

const fields = [
  { name: 'member_code', label: 'Member Code' },
  { name: 'full_name', label: 'Full Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone' },
  { name: 'gender', label: 'Gender', type: 'select', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }] },
  { name: 'joining_date', label: 'Joining Date', type: 'date' },
  { name: 'status', label: 'Status', type: 'select', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }, { value: 'expired', label: 'Expired' }, { value: 'paused', label: 'Paused' }] },
  { name: 'current_weight', label: 'Current Weight', type: 'number' },
  { name: 'current_goal', label: 'Current Goal', fullWidth: true },
  { name: 'medical_notes', label: 'Medical Notes', type: 'textarea', fullWidth: true }
];

export default function MembersList() {
  const [qrMember, setQrMember] = useState(null);
  const [qrPayload, setQrPayload] = useState('');
  const { notify } = useContext(NotificationContext);

  const openQr = async (member) => {
    try {
      const response = await getMemberQr(member.id);
      setQrMember(member);
      setQrPayload(response.data.qr_payload);
    } catch (error) {
      notify(error?.response?.data?.message || 'Unable to load member QR', 'error');
    }
  };

  return (
    <DashboardLayout>
      <CrudPage
        title="Members"
        description="Full member lifecycle management with searchable records, profile-ready data, and status tracking."
        fields={fields}
        columns={[
          { key: 'member_code', label: 'Code' },
          { key: 'full_name', label: 'Name' },
          { key: 'phone', label: 'Phone' },
          { key: 'trainer_name', label: 'Assigned Trainer' },
          { key: 'status', label: 'Status', render: (row) => <Badge tone={row.status}>{row.status}</Badge> },
          { key: 'joining_date', label: 'Joined', render: (row) => formatDate(row.joining_date) }
        ]}
        listRequest={getMembers}
        createRequest={createMember}
        updateRequest={updateMember}
        deleteRequest={deleteMember}
        getDetailRequest={getMember}
        rowActions={(row) => (
          <button
            type="button"
            className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100"
            onClick={() => openQr(row)}
          >
            Show QR
          </button>
        )}
        filters={[
          { value: 'active', label: 'Active' },
          { value: 'expired', label: 'Expired' },
          { value: 'paused', label: 'Paused' }
        ]}
        stats={(rows) => ([
          { label: 'All Members', value: rows.length },
          { label: 'Active', value: rows.filter((row) => row.status === 'active').length },
          { label: 'Expired', value: rows.filter((row) => row.status === 'expired').length },
          { label: 'Paused', value: rows.filter((row) => row.status === 'paused').length }
        ])}
      />
      <MemberQrModal open={!!qrMember} onClose={() => setQrMember(null)} member={qrMember} qrPayload={qrPayload} />
    </DashboardLayout>
  );
}
