export type TitleLine = {
  text: string;
  tone?: 'default' | 'accent';
  highlight?: string;
};

export type Speaker = {
  name: string;
  role: string;
  organization?: string;
  bio: string;
  initials: string;
  topics: string[];
};

export type PriceTier = {
  id: string;
  label: string;
  price: number;
  unit: string;
  note: string;
  flyerLabel?: string;
  featured?: boolean;
};

export const event = {
  organizer: 'Pelita Ilmi × Paracivita',
  organizerShort: 'Pelita Ilmi',
  eyebrow: 'Pelatihan Online · Sistem Penjaminan Mutu Internal',
  titleKicker: 'Pelatihan',
  titleLines: [
    { text: 'STRATEGI MENYUSUN PERANGKAT SPMI', highlight: 'MENYUSUN' },
    { text: 'PERGURUAN TINGGI', tone: 'accent' },
  ] satisfies TitleLine[],
  /**
   *opsional: isi dengan path gambar flyer asli, mis. '/event/flyer-spmi.jpg'.
   *Jika diisi, halaman akan menampilkan gambar tersebut sebagai flyer.
   *Jika kosong, flyer dibuat otomatis dari data di bawah.
   */
  flyerImage: '/event/Flyer%201.jpeg',
  partners: ['zoom', 'Paracivita', 'Pelita Ilmi'],
  theme: {
    primary: '#0a2140',
    secondary: '#123a5c',
    accent: '#d9744f',
    gold: '#c5a059',
  },
  fullTitle:
    'Pelatihan Strategi Menyusun Perangkat SPMI (Sistem Penjaminan Mutu Internal) Perguruan Tinggi',
  subtitle:
    'Panduan praktis menyusun perangkat SPMI yang komprehensif, terintegrasi, dan siap audit — langsung dari praktisi penjaminan mutu.',
  description:
    'Pelatihan ini dirancang untuk membantu perguruan tinggi membangun dan menyempurnakan perangkat Sistem Penjaminan Mutu Internal (SPMI). Peserta akan memahami kerangka regulasi, struktur perangkat, hingga strategi implementasi dan auditing yang efektif.',
  date: 'Jumat, 20 November 2026',
  dateShort: '20 Nov 2026',
  time: '19.00 – 21.00 WIB',
  countdownTo: '2026-11-20T19:00:00+07:00',
  platform: 'Zoom Meeting',
  location: 'Online via Zoom',
  slug: 'spmi-pi',
} as const;

export const speakers: Speaker[] = [
  {
    name: 'Ir. Esty Poedjioetami, MT',
    role: 'Kepala Audit Internal',
    bio: 'Pengalaman lebih dari 20 tahun di bidang penjaminan mutu, termasuk 14 tahun sebagai Ketua Penjaminan Mutu Internal. Pembicara aktif dalam pendampingan akreditasi dan pengembangan SPMI perguruan tinggi.',
    initials: 'EP',
    topics: ['Kebijakan SPMI', 'Audit Mutu Internal', 'Dokumentasi SPMI'],
  },
];

export const priceTiers: PriceTier[] = [
  {
    id: 'single',
    label: 'Peserta Tunggal',
    price: 125000,
    unit: '/orang',
    note: 'Pendaftaran untuk 1 orang peserta',
    flyerLabel: '1 orang',
  },
  {
    id: 'group',
    label: 'Paket Berkelompok',
    price: 100000,
    unit: '/orang',
    note: 'Minimal 3 orang dalam satu pendaftaran',
    flyerLabel: '3 orang',
    featured: true,
  },
];

export const payment = {
  bank: 'BCA',
  accountNumber: '4452227871',
  accountHolder: 'Ridwan Budiyanto',
} as const;

export const facilities = [
  'Softcopy materi pelatihan',
  'E-Sertifikat setelah kegiatan',
  'Link recording sesi*',
] as const;

export const benefits = [
  {
    title: 'Perangkat SPMI yang Utuh',
    description:
      'Pahami hierarki dokumen SPMI mulai dari kebijakan, standar, prosedur, hingga instrumen dan formulir pendukung.',
    icon: 'layers',
  },
  {
    title: 'Siap Menghadapi Audit',
    description:
      'Pelajari praktik audit mutu internal dan cara menyiapkan bukti dokumentasi yang diverifikasi oleh auditor.',
    icon: 'shield',
  },
  {
    title: 'Efisiensi Waktu & Biaya',
    description:
      'Hemat waktu penyusunan dokumen dengan template dan strategi yang langsung bisa diterapkan di institusi Anda.',
    icon: 'clock',
  },
  {
    title: 'Pendampingan Praktisi',
    description:
      'Diskusi langsung dengan narasumber berpengalaman lebih dari 20 tahun di bidang penjaminan mutu perguruan tinggi.',
    icon: 'chat',
  },
] as const;

export const agenda = [
  {
    time: '19.00 – 19.15',
    title: 'Pembukaan & Pengenalan SPMI',
    description: 'Kerangka regulasi dan posisi strategis SPMI dalam tata kelola perguruan tinggi.',
  },
  {
    time: '19.15 – 19.50',
    title: 'Struktur Perangkat SPMI',
    description:
      'Kebijakan, standar, prosedur, instrumen, dan formulir — serta keterkaitan antar dokumen.',
  },
  {
    time: '19.50 – 20.25',
    title: 'Strategi Penyusunan & Implementasi',
    description: 'Langkah praktis menyusun perangkat, mengelola siklus PPEPP, dan menghindari kesalahan umum.',
  },
  {
    time: '20.25 – 20.50',
    title: 'Audit Mutu Internal & Persiapan Akreditasi',
    description: 'Teknik audit, temuan, dan penyusunan bukti pendukung yang kuat.',
  },
  {
    time: '20.50 – 21.00',
    title: 'Tanya Jawab & Penutup',
    description: 'Diskusi terbuka dan pembagian materi serta informasi tindak lanjut.',
  },
] as const;

export const faqs = [
  {
    question: 'Pelatihan ini diselenggarakan secara online atau offline?',
    answer:
      'Pelatihan diselenggarakan secara online melalui Zoom Meeting. Link rapat akan dikirimkan kepada peserta yang telah terdaftar dan melakukan pembayaran.',
  },
  {
    question: 'Bagaimana cara mendaftar dan melakukan pembayaran?',
    answer:
      'Isi formulir pendaftaran di halaman ini, lalu transfer biaya pelatihan ke rekening BCA 4452227871 a.n. Ridwan Budiyanto. Konfirmasi pembayaran dapat dikirimkan melalui WhatsApp panitia.',
  },
  {
    question: 'Apakah ada diskon untuk pendaftaran kelompok?',
    answer:
      'Ya. Untuk pendaftaran minimal 3 orang dalam satu kelompok, biaya menjadi Rp 100.000 per orang (diskon Rp 25.000 per peserta).',
  },
  {
    question: 'Apakah peserta akan mendapatkan sertifikat?',
    answer:
      'Ya. Setiap peserta yang mengikuti kegiatan akan mendapatkan e-sertifikat. Link recording sesi juga akan dibagikan kepada peserta.*',
  },
  {
    question: 'Siapa yang disarankan mengikuti pelatihan ini?',
    answer:
      'Pelatihan ini cocok untuk pimpinan, dosen, tenaga kependidikan, unit penjaminan mutu, serta siapa pun yang terlibat dalam penyusunan dan pengelolaan SPMI di perguruan tinggi.',
  },
] as const;

export const contact = {
  whatsapp: '0813 9166 0301',
  whatsappUrl: 'https://wa.me/6281391660301',
  instagram: '@pelita_ilmi',
  instagramUrl: 'https://instagram.com/pelita_ilmi',
  email: 'rasyidmulyadi20@gmail.com',
} as const;

export const navLinks = [
  { href: '#informasi', label: 'Informasi' },
  { href: '#biaya', label: 'Biaya' },
  { href: '#pemateri', label: 'Pemateri' },
  { href: '#manfaat', label: 'Manfaat' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#faq', label: 'FAQ' },
  { href: '/event/sertifikat', label: 'E-Sertifikat' },
] as const;

export const certificate = {
  signatoryName: 'Ridwan Budiyanto',
  signatoryRole: 'Panitia Pelatihan',
  eligibleStatuses: ['terkonfirmasi'],
} as const;

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}
