<?php
declare(strict_types=1);

require_once __DIR__ . '/events-store.php';

/**
 *Satu-satunya sumber data event. Samakan dengan data/event.ts pada versi Next.js.
 */

$event = [
    'organizer'       => 'Pelita Ilmi × Paracivita',
    'organizer_short' => 'STIT AL WAFI',
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
        'featured_label' => 'Paling Hemat',
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
    ['href' => '#saran', 'label' => 'Saran'],
    ['href' => 'sertifikat', 'label' => 'E-Sertifikat'],
];

$certificate = [
    'prefix'           => 'SPMI-PI',
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
    ['key' => 'email',         'db' => 'email',          'label' => 'E-Mail Aktif (Pastikan Email Aktif, Valid, dan bisa menerima pesan)', 'placeholder' => 'nama@email.com', 'type' => 'email', 'required' => true, 'full' => true, 'max' => 200, 'hint' => 'Kesalahan ketik satu huruf bisa menyebabkan e-sertifikat tidak dapat terkirim.'],
    ['key' => 'institution',   'db' => 'institution',    'label' => 'Instansi', 'placeholder' => 'Nama instansi / perguruan tinggi', 'type' => 'text', 'required' => true, 'max' => 200],
    ['key' => 'city',          'db' => 'city',           'label' => 'Asal Kota/Kabupaten', 'placeholder' => 'Mis. Bogor, Depok, Bandung', 'type' => 'text', 'required' => true, 'max' => 120],
    ['key' => 'infoSource',    'db' => 'info_source',    'label' => 'Mendapatkan Informasi Event Dari?', 'placeholder' => 'Mis. Instagram, WhatsApp, teman, dll.', 'type' => 'text', 'required' => true, 'full' => true, 'max' => 120, 'suggestions' => ['Instagram', 'WhatsApp', 'Teman / Kolega', 'Website / Media Sosial STIT Al Wafi', 'Grup Komunitas / Paguyuban', 'Lainnya']],
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

/**
 * Daftar semua event. halaman index.php menampilkan kartu-kartu dari sini,
 * lalu event.php?slug=... menampilkan halaman lengkap event yang dipilih.
 *
 * Untuk menambah event baru, copy entri di bawah lalu ubah slug, judul,
 * tanggal, flyer, dan (bila perlu) data detail di variabel terkait.
 */
$events = [
    [
        'slug'        => 'spmi-pi',
        'title'       => 'Pelatihan Strategi Menyusun Perangkat SPMI',
        'short_title' => 'Strategi Menyusun Perangkat SPMI',
        'summary'     => 'Panduan praktis menyusun perangkat SPMI yang komprehensif, terintegrasi, dan siap audit — langsung dari praktisi penjaminan mutu.',
        'category'    => 'Pelatihan · Online',
        'date'        => $event['date'],
        'time'        => $event['time'],
        'start_at'    => '2026-11-20T19:00:00+07:00',
        'end_at'      => '2026-11-20T21:00:00+07:00',
        'flyer'       => $event['flyer_image'],
        'theme'       => $event['theme'],
        'status'      => null,
        'full_title'  => $event['full_title'],
        'title_kicker' => $event['title_kicker'],
        'title_lines' => $event['title_lines'],
        'subtitle'    => $event['subtitle'],
        'description' => $event['description'],
        'platform'    => $event['platform'],
        'location'    => $event['location'],
        'partners'    => $event['partners'],
        'speakers'    => $speakers,
        'price_tiers' => $price_tiers,
        'facilities'  => $facilities,
        'benefits'    => $benefits,
        'agenda'      => $agenda,
        'faqs'         => $faqs,
        'contact'      => $contact,
        'payment'      => $payment,
        'certificate'  => $certificate,
        'audience'     => 'Pimpinan, dosen, tenaga kependidikan, unit penjaminan mutu, serta siapa pun yang terlibat dalam penyusunan dan pengelolaan SPMI di perguruan tinggi.',
        'pricing_note' => 'Pilih paket yang sesuai. Pendaftaran kelompok lebih hemat per peserta.',
        'register_label' => 'Kuota Terbatas',
        'info_title'   => 'Informasi Pelatihan',
        'benefits_title' => 'Kegunaan Mengikuti Pelatihan',
        'agenda_title' => 'Agenda Pelatihan',
        'agenda_note'  => 'Gambaran alur sesi selama kurang lebih dua jam.',
    ],
    [
        'slug'        => 'ami-workshop',
        'title'       => 'Workshop Pelatihan Audit Mutu Internal (AMI)',
        'short_title' => 'Pelatihan Audit Mutu Internal (AMI)',
        'summary'     => 'Workshop praktis Audit Mutu Internal bersama UIN Sunan Gunung Djati Bandung. Peserta mendapatkan Sertifikat Auditor AMI.',
        'category'    => 'Workshop · Offline',
        'date'        => 'Senin, 07 Desember 2026',
        'time'        => '08.00 – 16.30 WIB',
        'start_at'    => '2026-12-07T08:00:00+07:00',
        'end_at'      => '2026-12-07T16:30:00+07:00',
        'flyer'       => 'assets/flyer-ami.jpeg',
        'theme'       => [
            'primary'   => '#0b2f6b',
            'secondary' => '#1e4b8f',
            'accent'    => '#f5a623',
            'gold'      => '#f5a623',
        ],
        'status'          => null,
        'organizer'       => 'STIT Al Wafi Bogor × UIN Sunan Gunung Djati Bandung',
        'organizer_short' => 'STIT AL WAFI',
        'eyebrow'         => 'Workshop Offline · Audit Mutu Internal',
        'countdown_to'    => '2026-12-07T08:00:00+07:00',
        'flyer_image'     => 'assets/flyer-ami.jpeg',
        'full_title'  => 'Workshop Pelatihan Audit Mutu Internal (AMI)',
        'title_kicker' => 'Workshop',
        'title_lines' => [
            ['text' => 'PELATIHAN AUDIT MUTU INTERNAL'],
            ['text' => 'WORKSHOP AMI', 'tone' => 'accent'],
        ],
        'subtitle'    => 'Pelatihan dan praktik Audit Mutu Internal (AMI) untuk mendukung penjaminan mutu perguruan tinggi.',
        'description' => 'Workshop Audit Mutu Internal (AMI) diselenggarakan oleh STIT Al Wafi Bogor bekerja sama dengan UIN Sunan Gunung Djati Bandung. Peserta akan mempelajari konsep, teknik, dan praktik audit mutu internal serta mendapatkan Sertifikat Auditor AMI.',
        'platform'    => 'Offline',
        'location'    => 'Kampus B Al Wafi IBS, Pengasinan, Depok',
        'partners'    => ['STIT Al Wafi Bogor', 'UIN Sunan Gunung Djati Bandung'],
        'speakers'    => [
            [
                'name'     => 'Dr. Elis Ratna Wulan, S.Si, M.T., AMLE, CIIQA, CIT',
                'role'     => 'Kepala Pusat Akreditasi Internasional',
                'bio'      => 'Kepala Pusat Akreditasi Internasional UIN Sunan Gunung Djati Bandung. Berpengalaman dalam akreditasi, audit mutu, dan pengembangan sistem penjaminan mutu perguruan tinggi.',
                'initials' => 'ER',
                'topics'   => ['Audit Mutu Internal', 'Akreditasi', 'Penjaminan Mutu'],
            ],
        ],
        'price_tiers' => [
            [
                'id'          => 'normal',
                'label'       => 'Harga Normal',
                'price'       => 750000,
                'unit'        => '/orang',
                'note'        => 'Pendaftaran reguler',
                'flyer_label' => 'Harga Normal',
                'featured'    => false,
            ],
            [
                'id'          => 'early',
                'label'       => 'Early Bird',
                'price'       => 499000,
                'unit'        => '/orang',
                'note'        => 'Hanya untuk 35 pendaftar pertama',
                'flyer_label' => 'Early Bird',
                'featured'    => true,
                'featured_label' => 'Early Bird',
            ],
        ],
        'facilities'  => ['Materi', 'Praktik', 'Seminar Kit', 'Snack', 'Coffee Break', 'Makan Siang'],
        'benefits'    => [
            ['title' => 'Materi & Praktik Langsung', 'description' => 'Pelatihan dan sesi praktik Audit Mutu Internal yang bisa langsung diterapkan di institusi.', 'icon' => 'layers'],
            ['title' => 'Sertifikat Auditor AMI', 'description' => 'Benefit utama peserta: sertifikat auditor AMI sebagai bukti kompetensi mengikuti pelatihan.', 'icon' => 'shield'],
            ['title' => 'Seminar Kit & Konsumsi', 'description' => 'Peserta mendapatkan seminar kit, snack, coffee break, dan makan siang selama kegiatan.', 'icon' => 'check'],
            ['title' => 'Narasumber Berpengalaman', 'description' => 'Belajar langsung dari Kepala Pusat Akreditasi Internasional UIN Sunan Gunung Djati Bandung.', 'icon' => 'chat'],
        ],
        'agenda'      => [
            ['time' => '08.00 – 08.30', 'title' => 'Registrasi & Pembukaan', 'description' => 'Penyambutan peserta dan pengantar kegiatan workshop.'],
            ['time' => '08.30 – 10.30', 'title' => 'Konsep Audit Mutu Internal', 'description' => 'Landasan regulasi, prinsip, dan tahapan AMI dalam sistem penjaminan mutu perguruan tinggi.'],
            ['time' => '10.30 – 12.00', 'title' => 'Persiapan & Instrumen Audit', 'description' => 'Menyusun program audit, instrumen, dan bukti pendukung.'],
            ['time' => '13.00 – 15.00', 'title' => 'Praktik Audit Mutu Internal', 'description' => 'Simulasi audit, temuan, dan penyusunan laporan hasil audit.'],
            ['time' => '15.00 – 16.30', 'title' => 'Tanya Jawab & Penutup', 'description' => 'Diskusi dan pembagian Sertifikat Auditor AMI.'],
        ],
        'faqs'        => [
            ['question' => 'Apakah workshop ini diselenggarakan offline?', 'answer' => 'Ya. Workshop dilaksanakan langsung di Kampus B Al Wafi IBS, Jalan Pengasinan, Depok.'],
            ['question' => 'Apa saja yang didapat peserta?', 'answer' => 'Peserta mendapatkan materi, praktik, seminar kit, snack, coffee break, makan siang, dan Sertifikat Auditor AMI.'],
            ['question' => 'Berapa biaya pendaftarannya?', 'answer' => 'Harga normal Rp 750.000. Tersedia harga Early Bird Rp 499.000 khusus 35 pendaftar pertama.'],
            ['question' => 'Siapa narasumber workshop ini?', 'answer' => 'Dr. Elis Ratna Wulan, S.Si, M.T., AMLE, CIIQA, CIT — Kepala Pusat Akreditasi Internasional UIN Sunan Gunung Djati Bandung.'],
            ['question' => 'Bagaimana cara mendaftar?', 'answer' => 'Isi formulir pendaftaran pada halaman event ini, lalu hubungi panitia di 0895 2721 7662 (Ustadz Said) untuk konfirmasi.'],
        ],
        'contact'     => [
            'whatsapp'       => '0895 2721 7662',
            'whatsapp_digits'=> '6289527217662',
            'instagram'      => '@stitalwafiofficial',
            'instagram_url'  => 'https://instagram.com/stitalwafiofficial',
        ],
        'payment'     => [
            'bank'           => 'BSI',
            'account_number' => '8888441116',
            'account_holder' => 'BSI STIT AL Wafi',
        ],
        'certificate' => [
            'prefix'           => 'AMI',
            'signatory_name'   => 'Ustadz Said',
            'signatory_role'   => 'Panitia Workshop AMI',
            'eligible_statuses'=> ['terkonfirmasi'],
        ],
        'audience'     => 'Pimpinan, dosen, tenaga kependidikan, auditor, dan seluruh sivitas perguruan tinggi yang terlibat dalam penjaminan mutu.',
        'pricing_note' => 'Nikmati harga Early Bird Rp 499.000 khusus 35 pendaftar pertama.',
        'register_label' => 'Early Bird Terbatas',
        'info_title'   => 'Informasi Workshop',
        'benefits_title' => 'Manfaat Mengikuti Workshop',
        'agenda_title' => 'Agenda Workshop',
        'agenda_note'  => 'Rangkaian sesi workshop dari pagi hingga sore hari.',
    ],
];

// Event yang dibuat admin lewat panel (hasil generate flyer) ikut tampil.
$events = array_merge($events, get_stored_events());

function get_event(string $slug): ?array
{
    global $events;
    foreach ($events as $item) {
        if ($item['slug'] === $slug) {
            return $item;
        }
    }
    return null;
}

/** Status event: upcoming | ongoing | past. */
function event_status(array $item): string
{
    if (!empty($item['status']) && in_array($item['status'], ['upcoming', 'ongoing', 'past'], true)) {
        return $item['status'];
    }

    $now = time();
    $start = strtotime((string) ($item['start_at'] ?? '')) ?: PHP_INT_MAX;
    $endRaw = strtotime((string) ($item['end_at'] ?? ''));
    $end = $endRaw ?: $start;

    if ($now < $start) return 'upcoming';
    if ($now > $end) return 'past';
    return 'ongoing';
}

function event_status_label(string $status): string
{
    return [
        'upcoming' => 'Akan Datang',
        'ongoing'  => 'Sedang Berlangsung',
        'past'     => 'Sudah Berlangsung',
    ][$status] ?? $status;
}

function event_date_short(array $item): string
{
    $timestamp = strtotime((string) ($item['start_at'] ?? ''));
    return $timestamp ? date('d M Y', $timestamp) : $item['date'];
}
