'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { adminColumns, adminSearchKeys, csvColumns } from '@/data/registration';
import type { RegistrationRecord } from '@/lib/registrations';
import { statusLabels, statusOptions, type RegistrationStatus } from '@/lib/status';

const TOKEN_KEY = 'spmi_admin_token';

type RecordRow = RegistrationRecord;

export default function AdminDashboard() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [token, setToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (activeToken: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/registrations/', {
        method: 'POST',
        headers: { 'x-admin-token': activeToken },
        cache: 'no-store',
      });
      if (response.status === 401) {
        setAuthed(false);
        return;
      }
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'Gagal memuat data.');
      setRecords(result.records);
      setAuthed(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(TOKEN_KEY) || '';
    setToken(saved);
    if (saved) void load(saved);
    else setAuthed(false);
  }, [load]);

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoginError('');
    if (!token.trim()) {
      setLoginError('Token tidak boleh kosong.');
      return;
    }
    window.sessionStorage.setItem(TOKEN_KEY, token.trim());
    void load(token.trim());
  }

  function handleLogout() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setRecords([]);
    setToken('');
  }

  async function changeStatus(id: string, status: RegistrationStatus) {
    setRecords((current) =>
      current.map((row) => (row.id === id ? { ...row, status } : row)),
    );
    try {
      const response = await fetch('/api/admin/registrations/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'Gagal mengubah status.');
    } catch (err) {
      setError((err as Error).message);
      void load(token);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter((row) =>
      [...adminSearchKeys, 'id'].some((key) =>
        String((row as unknown as Record<string, string>)[key] ?? '')
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [records, query]);

  function exportCsv() {
    const header = csvColumns.map((column) => column.label);
    const rows = filtered.map((row) =>
      csvColumns.map((column) =>
        column.key === 'status'
          ? statusLabels[row.status]
          : String((row as unknown as Record<string, string>)[column.key] ?? ''),
      ),
    );
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => escape(String(cell))).join(','))
      .join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pendaftar-spmi-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (authed === null) {
    return <p className="admin-message">Memeriksa akses...</p>;
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <h3>Akses Admin</h3>
        <p>Masukkan token admin untuk melihat data pendaftar.</p>
        <form onSubmit={handleLogin} className="admin-login__form">
          <div className="form-field">
            <label htmlFor="admin-token">Token Admin</label>
            <input
              id="admin-token"
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Masukkan token"
              required
            />
          </div>
          {loginError && <p className="form-error" role="alert">{loginError}</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="btn btn--gold btn--block" type="submit">Masuk</button>
        </form>
        <p className="admin-login__hint">Token default: <code>pelita-admin-2026</code> — ganti lewat variabel <code>ADMIN_TOKEN</code>.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <div>
          <strong>{records.length} pendaftar</strong>
          {query && <span> · {filtered.length} hasil pencarian</span>}
        </div>
        <div className="admin-toolbar__actions">
          <input
            className="admin-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama, email, WhatsApp, instansi..."
            aria-label="Cari pendaftar"
          />
          <button className="btn btn--outline" type="button" onClick={() => void load(token)} disabled={loading}>
            {loading ? 'Muat...' : 'Refresh'}
          </button>
          <button className="btn btn--outline" type="button" onClick={exportCsv}>Ekspor CSV</button>
          <button className="btn btn--outline" type="button" onClick={handleLogout}>Keluar</button>
        </div>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              {adminColumns.map((column) => <th key={column.key}>{column.label}</th>)}
              <th>Daftar</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id}>
                {adminColumns.map((column) => {
                  const values = row as unknown as Record<string, string>;
                  return (
                    <td key={column.key}>
                      {column.primary
                        ? <strong>{values[column.key]}</strong>
                        : <span>{values[column.key]}</span>}
                      {column.key === 'name' && <small className="admin-id">ID: {row.id}</small>}
                      {column.sub?.map((subKey) => (
                        <small key={subKey}>{values[subKey]}</small>
                      ))}
                    </td>
                  );
                })}
                <td>
                  <small>{new Date(row.createdAt).toLocaleString('id-ID')}</small>
                </td>
                <td>
                  <select
                    className={`status-select status-select--${row.status}`}
                    value={row.status}
                    onChange={(event) => void changeStatus(row.id, event.target.value as RegistrationStatus)}
                    aria-label={`Ubah status ${row.name}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{statusLabels[status]}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={adminColumns.length + 2} className="admin-empty">
                  Belum ada pendaftar yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
