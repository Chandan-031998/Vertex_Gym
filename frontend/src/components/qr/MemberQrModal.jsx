import Modal from '../common/Modal';
import MemberQrCard from './MemberQrCard';

export default function MemberQrModal({ open, onClose, member, qrPayload }) {
  return (
    <Modal open={open} onClose={onClose} title={member ? `${member.full_name} QR Card` : 'Member QR'}>
      {member ? <MemberQrCard member={member} qrPayload={qrPayload} /> : null}
    </Modal>
  );
}
