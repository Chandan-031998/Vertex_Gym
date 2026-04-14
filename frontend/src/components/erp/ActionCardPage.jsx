import { useContext, useEffect, useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import { NotificationContext } from '../../context/NotificationContext';

export default function ActionCardPage({ title, description, fields, onSubmit, submitLabel = 'Submit' }) {
  const { notify } = useContext(NotificationContext);
  const [form, setForm] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue ?? '' }), {}));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue ?? '' }), {}));
  }, [fields]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await onSubmit(form);
      notify(`${title} completed`);
    } catch (error) {
      notify(error?.response?.data?.message || `Unable to complete ${title.toLowerCase()}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      <Card>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name} className={`space-y-2 text-sm text-slate-600 ${field.fullWidth ? 'md:col-span-2' : ''}`}>
              <span className="font-medium text-slate-700">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea className="min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" value={form[field.name]} onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))} />
              ) : field.type === 'select' ? (
                <Select value={form[field.name]} onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))}>
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </Select>
              ) : (
                <Input type={field.type || 'text'} value={form[field.name]} onChange={(event) => setForm((current) => ({ ...current, [field.name]: event.target.value }))} />
              )}
            </label>
          ))}
          <div className="md:col-span-2">
            <Button type="submit">{submitting ? 'Submitting...' : submitLabel}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
