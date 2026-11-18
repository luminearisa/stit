import { NextResponse } from 'next/server';
import { findRegistrationByWhatsapp } from '@/lib/registrations';
import { statusLabels } from '@/lib/status';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const whatsapp = typeof body?.whatsapp === 'string' ? body.whatsapp : '';

  const record = await findRegistrationByWhatsapp(whatsapp);
  if (!record) {
    return NextResponse.json(
      { ok: false, error: 'Nomor WhatsApp tidak ditemukan dalam data pendaftaran.' },
      { status: 404 },
    );
  }

  if (record.status !== 'terkonfirmasi') {
    return NextResponse.json(
      {
        ok: false,
        error: `Sertifikat belum tersedia. Status pendaftaran Anda: ${statusLabels[record.status]}. Silakan hubungi panitia di 0813 9166 0301 untuk konfirmasi.`,
      },
      { status: 403 },
    );
  }

  return NextResponse.json({ ok: true, record });
}
