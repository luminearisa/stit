import { promises as fs } from 'node:fs';
import path from 'node:path';
import { registrationFields } from '@/data/registration';
import type { RegistrationStatus } from './status';

export type { RegistrationStatus } from './status';
export { statusLabels } from './status';

export type RegistrationInput = {
  name: string;
  whatsapp: string;
  email: string;
  institution: string;
  city: string;
  infoSource: string;
  position: string;
  otherTraining: string;
  fieldOfStudy: string;
};

export type RegistrationRecord = RegistrationInput & {
  id: string;
  createdAt: string;
  status: RegistrationStatus;
  source: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'registrations.json');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegistration(input: unknown): {
  ok: true;
  value: RegistrationInput;
} | { ok: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Data pendaftaran tidak valid.' };
  }
  const body = input as Record<string, unknown>;
  const values: Record<string, string> = {};

  for (const field of registrationFields) {
    const raw = typeof body[field.key] === 'string' ? (body[field.key] as string) : '';
    const value = raw.trim();

    if (field.required && !value) {
      return {
        ok: false,
        error: field.errorMessage ?? `${field.label} wajib diisi.`,
      };
    }
    if (field.minLength && value.length < field.minLength) {
      return {
        ok: false,
        error: field.errorMessage ?? `${field.label} terlalu pendek.`,
      };
    }

    values[field.key] = value.slice(0, field.maxLength ?? 500);
  }

  if (values.whatsapp.replace(/\D/g, '').length < 8) {
    return {
      ok: false,
      error:
        registrationFields.find((field) => field.key === 'whatsapp')?.errorMessage ??
        'Nomor WhatsApp tidak valid.',
    };
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    return {
      ok: false,
      error:
        registrationFields.find((field) => field.key === 'email')?.errorMessage ??
        'Alamat email aktif tidak valid.',
    };
  }

  return { ok: true, value: values as unknown as RegistrationInput };
}

export async function readRegistrations(): Promise<RegistrationRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeRegistrations(records: RegistrationRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf8');
}

export async function saveRegistration(
  input: RegistrationInput,
): Promise<RegistrationRecord> {
  const records = await readRegistrations();
  const record: RegistrationRecord = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    source: 'event-page',
  };
  records.push(record);
  await writeRegistrations(records);
  return record;
}

export async function updateRegistrationStatus(
  id: string,
  status: RegistrationStatus,
): Promise<RegistrationRecord | null> {
  const records = await readRegistrations();
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) return null;
  records[index] = { ...records[index], status };
  await writeRegistrations(records);
  return records[index];
}

export async function findRegistrationByWhatsapp(
  whatsapp: string,
): Promise<RegistrationRecord | null> {
  const wa = whatsapp.replace(/\D/g, '');
  if (wa.length < 8) return null;

  const records = await readRegistrations();
  const matches = records.filter(
    (record) => record.whatsapp.replace(/\D/g, '') === wa,
  );

  // Utamakan data yang sudah terkonfirmasi, jika ada.
  return (
    matches.find((record) => record.status === 'terkonfirmasi') ??
    matches[matches.length - 1] ??
    null
  );
}
