<?php
declare(strict_types=1);

/**
 *Satu-satunya sumber data event. Samakan dengan data/event.ts pada versi Next.js.
 */

$event = [
    'organizer'       => 'Pelita Ilmi × Paracivita',
    'organizer_short' => 'Pelita Ilmi',
    'eyebrow'         => 'Pelatihan Online · Sistem Penjaminan Mutu Internal',
    'title_kicker'    => 'Pelatihan',
    'title_lines'     => [
        ['text' => 'STRATEGI MENYUSUN PERANGKAT SPMI', 'tone' => 'default', 'highlight' => 'MENYUSUN'],
        ['text' => 'PERGURUAN TINGGI', 'tone' => 'accent'],
    ],
    'full_title'      => 'Pelatihan Strategi Menyusun Perangkat SPMI (Sistem Penjaminan Mutu Internal) Perguruan Tinggi',
    'subtitle'        => 'Panduan praktis menyusun perangkat SPMI yang komprehensif, terintegrasi, dan siap audit — langsung dari praktisi penjaminan mutu.',
    'description'     => 'Pelatihan ini dirancang untuk membantu perguruan tinggi membangun dan menyempurnakan perangkat Sistem Penjaminan Mutu Internal (SPMI). Peserta akan memahami kerangka regulasi, struktur perangkat, hingga strategi implementasi dan auditing yang efektif.',
    'date'            => 'Jumat, 20 November 2026',
    'time'            => '19.00 – 21.00 WIB',
    'countdown_to'    => '2026-11-20T19:00:00+07:00',
    'platform'        => 'Zoom Meeting',
    'location'        => 'Online via Zoom',
    'flyer_image'     => 'assets/flyer.jpeg',
    'partners'        => ['zoom', 'Paracivita', 'Pelita Ilmi'],
    'theme'           => [
        'primary'   => '#0a2140',
        'secondary' => '#123a5c',
        'accent'    => '#d9744f',
        'gold'      => '#c5a059',
    ],
];

$speakers = [
    [
        'name'    => 'Ir. Esty Poedjioetami, MT',
        'role'    => 'Kepala Audit Internal',
        'bio'     => 'Pengalaman lebih dari 20 tahun di bidang penjaminan mutu, termasuk 14 tahun sebagai Ketua Penjaminan Mutu Internal. Pembicara aktif dalam pendampingan akreditasi dan pengembangan SPMI perguruan tinggi.',
        'initials'=> 'EP',
        'topics'  => ['Kebijakan SPMI', 'Audit Mutu Internal', 'Dokumentasi SPMI'],
    ],
];

$price_tiers = [
    [
        'id'          => 'single',
        'label'       => 'Peserta Tunggal',
        'price'       => 125000,
        'unit'        => '/orang',
        'note'        => 'Pendaftaran untuk 1 orang peserta',
        'flyer_label' => '1 orang',
        'featured'    => false,
    ],
    [
        'id'          => 'group',
        'label'       => 'Paket Berkelompok',
        'price'       => 100000,
        'unit'        => '/orang',
        'note'        => 'Minimal 3 orang dalam satu pendaftaran',
        'flyer_label' => '3 orang',
        'featured'    => true,
    ],
];

$payment = [
    'bank'          => 'BCA',
    'account_number'=> '4452227871',
    'account_holder'=> 'Ridwan Budiyanto',
];

$facilities = [
    'Softcopy materi pelatihan',
    'E-Sertifikat setelah kegiatan',
    'Link recording sesi*',
];

$benefits = [
    ['title' => 'Perangkat SPMI yang Utuh', 'description' => 'Pahami hierarki dokumen SPMI mulai dari kebijakan, standar, prosedur, hingga instrumen dan formulir pendukung.', 'icon' => 'layers'],
    ['title' => 'Siap Menghadapi Audit', 'description' => 'Pelajari praktik audit mutu internal dan cara menyiapkan bukti dokumentasi yang diverifikasi oleh auditor.', 'icon' => 'shield'],
    ['title' => 'Efisiensi Waktu & Biaya', 'description' => 'Hemat waktu penyusunan dokumen dengan template dan strategi yang langsung bisa diterapkan di institusi Anda.', 'icon' => 'clock'],
    ['title' => 'Pendampingan Praktisi', 'description' => 'Diskusi langsung dengan narasumber berpengalaman lebih dari 20 tahun di bidang penjaminan mutu perguruan tinggi.', 'icon' => 'chat'],
];

$agenda = [
    ['time' => '19.00 – 19.15', 'title' => 'Pembukaan & Pengenalan SPMI', 'description' => 'Kerangka regulasi dan posisi strategis SPMI dalam tata kelola perguruan tinggi.'],
    ['time' => '19.15 – 19.50', 'title' => 'Struktur Perangkat SPMI', 'description' => 'Kebijakan, standar, prosedur, instrumen, dan formulir — serta keterkaitan antar dokumen.'],
    ['time' => '19.50 – 20.25', 'title' => 'Strategi Penyusunan & Implementasi', 'description' => 'Langkah praktis menyusun perangkat, mengelola siklus PPEPP, dan menghindari kesalahan umum.'],
    ['time' => '20.25 – 20.50', 'title' => 'Audit Mutu Internal & Persiapan Akreditasi', 'description' => 'Teknik audit, temuan, dan penyusunan bukti pendukung yang kuat.'],
    ['time' => '20.50 – 21.00', 'title' => 'Tanya Jawab & Penutup', 'description' => 'Diskusi terbuka dan pembagian materi serta informasi tindak lanjut.'],
];

$faqs = [
    ['question' => 'Pelatihan ini diselenggarakan secara online atau offline?', 'answer' => 'Pelatihan diselenggarakan secara online melalui Zoom Meeting. Link rapat akan dikirimkan kepada peserta yang telah terdaftar dan melakukan pembayaran.'],
    ['question' => 'Bagaimana cara mendaftar dan melakukan pembayaran?', 'answer' => 'Isi formulir pendaftaran di halaman ini, lalu transfer biaya pelatihan ke rekening BCA 4452227871 a.n. Ridwan Budiyanto. Konfirmasi pembayaran dapat dikirimkan melalui WhatsApp panitia.'],
    ['question' => 'Apakah ada diskon untuk pendaftaran kelompok?', 'answer' => 'Ya. Untuk pendaftaran minimal 3 orang dalam satu kelompok, biaya menjadi Rp 100.000 per orang (diskon Rp 25.000 per peserta).'],
    ['question' => 'Apakah peserta akan mendapatkan sertifikat?', 'answer' => 'Ya. Setiap peserta yang mengikuti kegiatan akan mendapatkan e-sertifikat. Link recording sesi juga akan dibagikan kepada peserta.*'],
    ['question' => 'Siapa yang disarankan mengikuti pelatihan ini?', 'answer' => 'Pelatihan ini cocok untuk pimpinan, dosen, tenaga kependidikan, unit penjaminan mutu, serta siapa pun yang terlibat dalam penyusunan dan pengelolaan SPMI di perguruan tinggi.'],
];

$contact = [
    'whatsapp'       => '0813 9166 0301',
    'whatsapp_digits'=> '081391660301',
    'instagram'      => '@pelita_ilmi',
    'instagram_url'  => 'https://instagram.com/pelita_ilmi',
];

$nav_links = [
    ['href' => '#informasi', 'label' => 'Informasi'],
    ['href' => '#biaya', 'label' => 'Biaya'],
    ['href' => '#pemateri', 'label' => 'Pemateri'],
    ['href' => '#manfaat', 'label' => 'Manfaat'],
    ['href' => '#agenda', 'label' => 'Agenda'],
    ['href' => '#faq', 'label' => 'FAQ'],
    ['href' => 'sertifikat.php', 'label' => 'E-Sertifikat'],
];

$certificate = [
    'signatory_name'   => 'Ridwan Budiyanto',
    'signatory_role'   => 'Panitia Pelatihan',
    'eligible_statuses'=> ['terkonfirmasi'],
];

/**
 *Field formulir: satu-satunya sumber untuk form, validasi, kolom tabel, dan CSV.
 */
$registration_fields = [
    ['key' => 'name',          'db' => 'name',           'label' => 'Nama Lengkap (Pastikan Benar Beserta Gelar — Untuk Sertifikat)', 'placeholder' => 'Nama lengkap beserta gelar', 'type' => 'text', 'required' => true, 'full' => true, 'min' => 2, 'max' => 200],
    ['key' => 'whatsapp',      'db' => 'whatsapp',       'label' => 'No WhatsApp', 'placeholder' => '08xxxxxxxxxx', 'type' => 'tel', 'required' => true, 'max' => 30],
    ['key' => 'email',         'db' => 'email',          'label' => 'E-Mail Aktif (Pastikan Email Aktif, Valid, dan bisa menerima pesan)', 'placeholder' => 'nama@email.com', 'type' => 'email', 'required' => true, 'full' => true, 'max' => 200, 'hint' => 'Kesalahan ketik satu huruf bisa menyebabkan e-sertifikat dan link rekaman tidak dapat terkirim.'],
    ['key' => 'institution',   'db' => 'institution',    'label' => 'Instansi', 'placeholder' => 'Nama instansi / perguruan tinggi', 'type' => 'text', 'required' => true, 'max' => 200],
    ['key' => 'city',          'db' => 'city',           'label' => 'Asal Kota/Kabupaten', 'placeholder' => 'Mis. Bogor, Depok, Bandung', 'type' => 'text', 'required' => true, 'max' => 120],
    ['key' => 'infoSource',    'db' => 'info_source',    'label' => 'Mendapatkan Informasi Pelatihan Dari?', 'placeholder' => 'Mis. Instagram, WhatsApp, teman, dll.', 'type' => 'text', 'required' => true, 'full' => true, 'max' => 120, 'suggestions' => ['Instagram', 'WhatsApp', 'Teman / Kolega', 'Website / Media Sosial STIT Al Wafi', 'Grup Komunitas / Paguyuban', 'Lainnya']],
    ['key' => 'position',      'db' => 'position',       'label' => 'Jabatan', 'placeholder' => 'Mis. Dosen, Kepala Unit SPMI', 'type' => 'text', 'required' => true, 'max' => 120],
    ['key' => 'fieldOfStudy',  'db' => 'field_of_study', 'label' => 'Bidang Ilmu yang dikuasai', 'placeholder' => 'Mis. Pendidikan, Manajemen, Informatika', 'type' => 'text', 'required' => true, 'max' => 200],
    ['key' => 'otherTraining', 'db' => 'other_training', 'label' => 'Pelatihan Lain yang Dibutuhkan', 'placeholder' => "Tuliskan pelatihan lain yang Anda butuhkan (atau '-' jika tidak ada)", 'type' => 'textarea', 'required' => true, 'full' => true, 'max' => 1000],
];

$admin_columns = [
    ['key' => 'name',     'label' => 'Nama / Instansi', 'primary' => true, 'sub' => ['institution', 'position']],
    ['key' => 'whatsapp', 'label' => 'Kontak', 'sub' => ['email']],
    ['key' => 'city',     'label' => 'Asal', 'sub' => ['info_source']],
];

$status_labels = [
    'pending'      => 'Menunggu pembayaran',
    'lunas'        => 'Pembayaran diterima',
    'terkonfirmasi'=> 'Terkonfirmasi',
];

function rupiah(int $value): string
{
    return 'Rp ' . number_format($value, 0, ',', '.');
}
