import { NextResponse } from 'next/server';
import { saveRegistration, validateRegistration } from '@/lib/registrations';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const validated = validateRegistration(body);

    if (!validated.ok) {
      return NextResponse.json(
        { ok: false, error: validated.error },
        { status: 400 },
      );
    }

    const record = await saveRegistration(validated.value);

    return NextResponse.json({
      ok: true,
      id: record.id,
      message: 'Pendaftaran berhasil disimpan.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { ok: false, error: 'Terjadi kesalahan saat memproses pendaftaran.' },
      { status: 500 },
    );
  }
}
