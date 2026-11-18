import type { Metadata } from 'next';
import '../event.css';
import HideGlobalChrome from '@/components/HideGlobalChrome';
import AdminDashboard from '@/components/event/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Pendaftar — Pelatihan SPMI',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="event-page admin-page">
      <HideGlobalChrome />
      <main className="admin-main">
        <div className="container">
          <a className="admin-back" href="/event/">← Kembali ke halaman event</a>
          <p className="section-heading__eyebrow">Panel Internal</p>
          <h1 className="section-heading__title">Data Pendaftar Pelatihan</h1>
          <p className="section-heading__desc">
            Kelola pendaftaran, cek status pembayaran, dan unduh data peserta.
          </p>
          <AdminDashboard />
        </div>
      </main>
    </div>
  );
}
