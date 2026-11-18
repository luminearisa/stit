'use client';

import { useState, type FormEvent } from 'react';
import { certificate, event } from '@/data/event';
import type { RegistrationStatus } from '@/lib/status';

type FoundRecord = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  institution: string;
  city: string;
  position: string;
  createdAt: string;
  status: RegistrationStatus;
};

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (char) => {
    const map: Record<string, string> = {
      '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
    };
    return map[char];
  });
}

function certificateNumber(id: string): string {
  return `SPMI-PI/${new Date().getFullYear()}/${id.slice(0, 8).toUpperCase()}`;
}

function buildCertificateSvg(record: FoundRecord): string {
  const escapedName = escapeXml(record.name);
  const escapedInstitution = escapeXml(record.institution);
  const titleLines = event.titleLines.map((line) => escapeXml(line.text));
  const number = escapeXml(certificateNumber(record.id));
  const date = escapeXml(event.date);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fffdf9"/><stop offset="100%" stop-color="#f4ecdd"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a67c1e"/><stop offset="50%" stop-color="#d9b46c"/><stop offset="100%" stop-color="#a67c1e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="850" fill="url(#bg)"/>
  <rect x="26" y="26" width="1148" height="798" fill="none" stroke="#c5a059" stroke-width="3"/>
  <rect x="40" y="40" width="1120" height="770" fill="none" stroke="#c5a059" stroke-width="1" opacity="0.55"/>
  <rect x="520" y="70" width="160" height="5" fill="url(#gold)"/>
  <text x="600" y="145" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="54" letter-spacing="12" fill="#0b2545">SERTIFIKAT</text>
  <text x="600" y="185" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" letter-spacing="3" fill="#a67c1e">CERTIFICATE OF PARTICIPATION</text>
  <text x="600" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" fill="#64748b">Diberikan dengan hormat kepada</text>
  <text x="600" y="315" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="bold" fill="#0b2545">${escapedName}</text>
  <line x1="300" y1="335" x2="900" y2="335" stroke="#c5a059" stroke-width="1.5"/>
  <text x="600" y="385" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#475569">Atas partisipasinya dalam pelatihan</text>
  <text x="600" y="435" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="bold" fill="#123257">${titleLines[0] ?? ''}</text>
  <text x="600" y="475" text-anchor="middle" font-family="Georgia, serif" font-size="23" fill="#123257">${titleLines[1] ?? ''}</text>
  <text x="600" y="525" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" fill="#64748b">${escapedInstitution}</text>
  <rect x="350" y="556" width="500" height="68" rx="8" fill="#ffffff" stroke="#c5a059" stroke-width="1"/>
  <text x="600" y="586" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#64748b">Diselenggarakan pada</text>
  <text x="600" y="611" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0b2545">${date} · Zoom Meeting</text>
  <line x1="730" y1="700" x2="1070" y2="700" stroke="#0b2545" stroke-width="1.5"/>
  <text x="900" y="730" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0b2545">${escapeXml(certificate.signatoryName)}</text>
  <text x="900" y="755" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#64748b">${escapeXml(certificate.signatoryRole)}</text>
  <text x="130" y="750" text-anchor="start" font-family="Arial, sans-serif" font-size="13" fill="#64748b">No. ${number}</text>
  <text x="130" y="775" text-anchor="start" font-family="Arial, sans-serif" font-size="13" fill="#64748b">${escapeXml(event.organizer)}</text>
</svg>`;
}

export default function CertificateLookup() {
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [record, setRecord] = useState<FoundRecord | null>(null);

  const svg = record ? buildCertificateSvg(record) : '';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');
    setRecord(null);

    try {
      const response = await fetch('/api/certificate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (response.status === 403) setNotice(result.error);
        else throw new Error(result.error || 'Data pendaftar tidak ditemukan.');
        return;
      }

      setRecord(result.record);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function downloadSvg() {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `e-sertifikat-${record?.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function downloadPng() {
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 850;
      canvas.getContext('2d')?.drawImage(image, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const pngUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = pngUrl;
        anchor.download = `e-sertifikat-${record?.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
        anchor.click();
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
      URL.revokeObjectURL(url);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError('Gagal membuat gambar sertifikat.');
    };
    image.src = url;
  }

  return (
    <div className="certificate-wrap">
      <form className="check-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="cert-whatsapp">Nomor WhatsApp <span>*</span></label>
          <input
            id="cert-whatsapp"
            type="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Nomor yang dipakai saat mendaftar, mis. 081234567890"
          />
          <small className="form-hint">Sertifikat hanya tersedia untuk pendaftar yang sudah terkonfirmasi.</small>
        </div>
        <button className="btn btn--gold btn--block" type="submit" disabled={loading}>
          {loading ? 'Mencari data...' : 'Cek E-Sertifikat'}
        </button>
      </form>

      {error && <p className="form-error" role="alert">{error}</p>}
      {notice && <p className="certificate-notice" role="status">{notice}</p>}

      {record && (
        <div className="certificate-result">
          <div className="check-result__head">
            <h3>{record.name}</h3>
            <span className="status-badge status-badge--terkonfirmasi">Terkonfirmasi</span>
          </div>

          <dl className="check-result__grid">
            <div><dt>ID Pendaftaran</dt><dd>{record.id}</dd></div>
            <div><dt>Email</dt><dd>{record.email}</dd></div>
            <div><dt>Instansi</dt><dd>{record.institution}</dd></div>
            <div><dt>Asal Kota/Kabupaten</dt><dd>{record.city}</dd></div>
            <div><dt>Jabatan</dt><dd>{record.position}</dd></div>
            <div><dt>Waktu Daftar</dt><dd>{new Date(record.createdAt).toLocaleString('id-ID')}</dd></div>
          </dl>

          <div className="certificate-preview" dangerouslySetInnerHTML={{ __html: svg }} />
          <div className="certificate-actions">
            <button className="btn btn--gold" type="button" onClick={downloadPng}>Unduh PNG</button>
            <button className="btn btn--outline" type="button" onClick={downloadSvg}>Unduh SVG</button>
          </div>
        </div>
      )}
    </div>
  );
}
