import { useContext, useEffect, useMemo, useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';
import ConfirmDialog from '../common/ConfirmDialog';
import Loader from '../common/Loader';
import Table from '../common/Table';
import FormDialog from './FormDialog';
import SearchBox from '../ui/SearchBox';
import Pagination from '../ui/Pagination';
import { NotificationContext } from '../../context/NotificationContext';

export default function CrudPage({
  title,
  description,
  fields,
  columns,
  listRequest,
  createRequest,
  updateRequest = null,
  deleteRequest = null,
  getDetailRequest = null,
  stats = null,
  rowActions = null,
  filters = null,
  emptyTitle,
  emptyDescription
}) {
  const { notify } = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const response = await listRequest({ search: query, status: activeFilter, page });
      setRows(Array.isArray(response.data) ? response.data : response.data.rows || response.data || []);
    } catch (error) {
      notify(error?.response?.data?.message || `Unable to load ${title.toLowerCase()}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [query, activeFilter, page]);

  const computedStats = useMemo(() => {
    if (!stats) return [];
    return stats(rows);
  }, [rows, stats]);

  const openCreate = () => {
    setSelected(null);
    setDialogOpen(true);
  };

  const openEdit = async (row) => {
    if (getDetailRequest) {
      const detail = await getDetailRequest(row.id);
      setSelected(detail.data);
    } else {
      setSelected(row);
    }
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selected || !deleteRequest) return;
    await deleteRequest(selected.id);
    notify(`${title.slice(0, -1)} deleted`);
    setConfirmOpen(false);
    setSelected(null);
    load();
  };

  const actionColumn = {
    key: '__actions',
    label: 'Actions',
    render: (row) => (
      <div className="flex flex-wrap gap-2">
        {updateRequest ? <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => openEdit(row)}>Edit</Button> : null}
        {rowActions ? rowActions(row) : null}
        {deleteRequest ? <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => { setSelected(row); setConfirmOpen(true); }}>Delete</Button> : null}
      </div>
    )
  };

  const tableColumns = [...columns, actionColumn].map((column) => ({
    ...column,
    render: column.render || ((row) => {
      if (column.badge) return <Badge tone={row[column.key]}>{row[column.key]}</Badge>;
      return row[column.key] ?? '-';
    })
  }));

  const save = async (form) => {
    setSubmitting(true);
    try {
      if (selected?.id && updateRequest) {
        await updateRequest(selected.id, form);
        notify(`${title.slice(0, -1)} updated`);
      } else {
        await createRequest(form);
        notify(`${title.slice(0, -1)} created`);
      }
      setDialogOpen(false);
      load();
    } catch (error) {
      notify(error?.response?.data?.message || 'Unable to save record', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <SearchBox value={query} onChange={setQuery} placeholder={`Search ${title.toLowerCase()}...`} />
          {filters ? (
            <select className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" value={activeFilter} onChange={(event) => setActiveFilter(event.target.value)}>
              <option value="">All Statuses</option>
              {filters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
            </select>
          ) : null}
          <Button onClick={openCreate}>Add New</Button>
        </div>
      </div>

      {computedStats.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {computedStats.map((item) => (
            <Card key={item.label} className="p-4">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {loading ? <Loader /> : <Table columns={tableColumns} rows={rows} emptyTitle={emptyTitle} emptyDescription={emptyDescription} />}
      <Pagination page={page} totalPages={1} onChange={setPage} />

      <FormDialog
        open={dialogOpen}
        title={`${selected?.id ? 'Edit' : 'Add'} ${title.slice(0, -1)}`}
        fields={fields}
        initialValues={selected || {}}
        onClose={() => setDialogOpen(false)}
        onSubmit={save}
        submitting={submitting}
      />

      <ConfirmDialog
        open={confirmOpen && !!deleteRequest}
        title={`Delete ${title.slice(0, -1)}`}
        message="This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        confirmLabel="Delete"
      />
    </div>
  );
}
