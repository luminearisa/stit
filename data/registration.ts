import type { RegistrationInput } from '@/lib/registrations';

export type RegistrationField = {
  key: keyof RegistrationInput;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  full?: boolean;
  hint?: string;
  suggestions?: string[];
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
};

/**
 * Satu-satunya sumber kebenaran untuk field formulir pendaftaran.
 * Dipakai oleh form, validasi server, tabel admin, dan ekspor CSV.
 */
export const registrationFields: RegistrationField[] = [
  {
    key: 'name',
    label: 'Nama Lengkap (Pastikan Benar Beserta Gelar — Untuk Sertifikat)',
    placeholder: 'Nama lengkap beserta gelar',
    type: 'text',
    required: true,
    full: true,
    minLength: 2,
    maxLength: 200,
    errorMessage: 'Nama lengkap beserta gelar wajib diisi.',
  },
  {
    key: 'whatsapp',
    label: 'No WhatsApp',
    placeholder: '08xxxxxxxxxx',
    type: 'tel',
    required: true,
    maxLength: 30,
    errorMessage: 'Nomor WhatsApp tidak valid.',
  },
  {
    key: 'email',
    label: 'E-Mail Aktif (Pastikan Email Aktif, Valid, dan bisa menerima pesan)',
    placeholder: 'nama@email.com',
    type: 'email',
    required: true,
    full: true,
    maxLength: 200,
    hint: 'Kesalahan ketik satu huruf bisa menyebabkan e-sertifikat dan link rekaman tidak dapat terkirim.',
    errorMessage: 'Alamat email aktif tidak valid.',
  },
  {
    key: 'institution',
    label: 'Instansi',
    placeholder: 'Nama instansi / perguruan tinggi',
    type: 'text',
    required: true,
    maxLength: 200,
  },
  {
    key: 'city',
    label: 'Asal Kota/Kabupaten',
    placeholder: 'Mis. Bogor, Depok, Bandung',
    type: 'text',
    required: true,
    maxLength: 120,
  },
  {
    key: 'infoSource',
    label: 'Mendapatkan Informasi Pelatihan Dari?',
    placeholder: 'Mis. Instagram, WhatsApp, teman, dll.',
    type: 'text',
    required: true,
    full: true,
    maxLength: 120,
    suggestions: [
      'Instagram',
      'WhatsApp',
      'Teman / Kolega',
      'Website / Media Sosial STIT Al Wafi',
      'Grup Komunitas / Paguyuban',
      'Lainnya',
    ],
  },
  {
    key: 'position',
    label: 'Jabatan',
    placeholder: 'Mis. Dosen, Kepala Unit SPMI',
    type: 'text',
    required: true,
    maxLength: 120,
  },
  {
    key: 'fieldOfStudy',
    label: 'Bidang Ilmu yang dikuasai',
    placeholder: 'Mis. Pendidikan, Manajemen, Informatika',
    type: 'text',
    required: true,
    maxLength: 200,
  },
  {
    key: 'otherTraining',
    label: 'Pelatihan Lain yang Dibutuhkan',
    placeholder: "Tuliskan pelatihan lain yang Anda butuhkan (atau '-' jika tidak ada)",
    type: 'textarea',
    required: true,
    full: true,
    maxLength: 1000,
  },
];

export const registrationConfirmation =
  'Pastikan kembali email yang diisikan valid dan aktif serta tidak ada salah tulis. Kesalahan data bisa berdampak tidak terkirimnya e-sertifikat. Saya sudah memeriksa kembali Nama dan Alamat email, dan keduanya sudah benar.';

export type AdminColumn = {
  key: keyof RegistrationInput;
  label: string;
  sub?: (keyof RegistrationInput)[];
  primary?: boolean;
};

/** Kolom data pada tabel admin (kolom Waktu & Status ditambahkan otomatis). */
export const adminColumns: AdminColumn[] = [
  { key: 'name', label: 'Nama / Instansi', primary: true, sub: ['institution', 'position'] },
  { key: 'whatsapp', label: 'Kontak', sub: ['email'] },
  { key: 'city', label: 'Asal', sub: ['infoSource'] },
];

export type CsvColumn = { key: string; label: string };

/** Kolom ekspor CSV: field sistem + semua field formulir + status. */
export const csvColumns: CsvColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'createdAt', label: 'Waktu' },
  ...registrationFields.map((field) => ({ key: field.key, label: field.label })),
  { key: 'status', label: 'Status' },
];

/** Field yang ikut dicari pada kolom pencarian admin. */
export const adminSearchKeys = registrationFields.map((field) => field.key);
