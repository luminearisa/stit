'use client';

import { useState, type FormEvent } from 'react';
import { registrationConfirmation, registrationFields } from '@/data/registration';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function RegistrationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!confirmed) {
      setStatus('error');
      setErrorMessage('Harap konfirmasi bahwa nama dan alamat email sudah benar.');
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/registrations/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          Object.fromEntries(registrationFields.map((field) => [field.key, data.get(field.key)])),
        ),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Pendaftaran gagal. Silakan coba lagi.');
      }

      setRegistrationId(result.id ?? '');
      setStatus('success');
      form.reset();
      setConfirmed(false);
    } catch (error) {
      setStatus('error');
      setErrorMessage((error as Error).message);
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <div className="form-success__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h3>Pendaftaran Berhasil!</h3>
        <p>
          Data pendaftaran Anda telah tersimpan. Panitia akan menghubungi Anda
          melalui WhatsApp untuk konfirmasi pembayaran.
        </p>
        {registrationId && (
          <p className="form-success__id">ID Pendaftaran: <strong>{registrationId}</strong></p>
        )}
        <a className="btn btn--outline" href="/event/sertifikat">Cek &amp; Unduh E-Sertifikat</a>
        <button type="button" className="btn btn--outline" onClick={() => setStatus('idle')}>
          Daftarkan peserta lain
        </button>
      </div>
    );
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      {registrationFields
        .filter((field) => field.suggestions?.length)
        .map((field) => (
          <datalist key={field.key} id={`options-${field.key}`}>
            {field.suggestions!.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        ))}

      <div className="form-grid">
        {registrationFields.map((field) => {
          const id = `reg-${field.key}`;
          const common = {
            id,
            name: field.key,
            required: field.required,
            minLength: field.minLength,
            maxLength: field.maxLength,
            placeholder: field.placeholder,
            list: field.suggestions?.length ? `options-${field.key}` : undefined,
          };

          return (
            <div className={`form-field${field.full ? ' form-field--full' : ''}`} key={field.key}>
              <label htmlFor={id}>
                {field.label} {field.required && <span>*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea {...common} rows={3} />
              ) : (
                <input {...common} type={field.type} autoComplete={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'off'} />
              )}
              {field.hint && <small className="form-hint form-hint--warning">{field.hint}</small>}
            </div>
          );
        })}
      </div>

      <label className="form-consent">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
        />
        <span>
          {registrationConfirmation} <strong>Sudah</strong>
        </span>
      </label>

      {status === 'error' && (
        <p className="form-error" role="alert">{errorMessage}</p>
      )}

      <button className="btn btn--gold btn--block" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Mengirim pendaftaran...' : 'Kirim Pendaftaran'}
      </button>
    </form>
  );
}
