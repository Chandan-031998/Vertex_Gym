import { useEffect, useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';
import Select from '../common/Select';

const defaultByType = {
  textarea: '',
  number: 0,
  select: '',
  date: '',
  datetime: '',
  time: '',
  checkbox: false
};

export default function FormDialog({ open, title, fields, initialValues = {}, onClose, onSubmit, submitting = false }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    const nextForm = fields.reduce((acc, field) => {
      acc[field.name] = initialValues[field.name] ?? field.defaultValue ?? defaultByType[field.type] ?? '';
      return acc;
    }, {});
    setForm(nextForm);
  }, [fields, initialValues, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
  };

  const renderField = (field) => {
    const commonProps = {
      value: form[field.name] ?? '',
      onChange: (event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))
    };

    if (field.type === 'textarea') {
      return <textarea className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" {...commonProps} />;
    }
    if (field.type === 'select') {
      return (
        <Select {...commonProps}>
          <option value="">Select {field.label}</option>
          {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </Select>
      );
    }
    return <Input type={field.type === 'datetime' ? 'datetime-local' : field.type || 'text'} {...commonProps} />;
  };

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={(
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{submitting ? 'Saving...' : 'Save changes'}</Button>
        </>
      )}
    >
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className={`space-y-2 text-sm text-slate-600 ${field.fullWidth ? 'md:col-span-2' : ''}`}>
            <span className="font-medium text-slate-700">{field.label}</span>
            {renderField(field)}
          </label>
        ))}
      </form>
    </Modal>
  );
}
