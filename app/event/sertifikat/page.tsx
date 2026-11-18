import type { Metadata } from 'next';
import '../event.css';
import HideGlobalChrome from '@/components/HideGlobalChrome';
import CertificateLookup from '@/components/event/CertificateLookup';
import { contact, event } from '@/data/event';

export const metadata: Metadata = {
  title: `E-Sertifikat — ${event.fullTitle}`,
  description: 'Cek status pendaftaran dan unduh e-sertifikat pelatihan Anda.',
};

export default function CertificatePage() {
  return (
    <div className="event-page">
      <HideGlobalChrome />

      <header className="site-header">
        <div className="container site-header__inner">
          <a className="site-header__back" href="/event/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali ke halaman event
          </a>
          <span className="site-header__back-title">E-Sertifikat</span>
        </div>
      </header>

      <main className="check-main">
        <div className="container check-container">
          <div className="section-heading section-heading--center">
            <p className="section-heading__eyebrow">E-Sertifikat</p>
            <h1 className="section-heading__title" id="sertifikat-title">Cek &amp; Unduh E-Sertifikat</h1>
            <p className="section-heading__desc">
              Cukup masukkan nomor WhatsApp yang dipakai saat mendaftar. E-sertifikat
              hanya dapat diakses oleh pendaftar yang statusnya sudah terkonfirmasi.
            </p>
          </div>
          <CertificateLookup />
          <p className="check-contact">
            Butuh bantuan? Hubungi panitia di{' '}
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">{contact.whatsapp}</a>
          </p>
        </div>
      </main>
    </div>
  );
}
