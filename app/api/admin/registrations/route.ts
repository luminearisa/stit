import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { readRegistrations, updateRegistrationStatus } from '@/lib/registrations';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const records = await readRegistrations();
  return NextResponse.json({ ok: true, records });
}

export async function PATCH(request: Request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  const status = body?.status;

  if (!['pending', 'lunas', 'terkonfirmasi'].includes(status)) {
    return NextResponse.json({ ok: false, error: 'Status tidak valid.' }, { status: 400 });
  }

  const updated = await updateRegistrationStatus(id, status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: 'Pendaftar tidak ditemukan.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, record: updated });
}
