import Button from './Button';
import Modal from './Modal';

export default function ConfirmDialog({ open, title = 'Confirm action', message, onCancel, onConfirm, confirmLabel = 'Confirm' }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={(
        <>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
        </>
      )}
    >
      <p className="text-sm text-slate-600">{message}</p>
    </Modal>
  );
}
