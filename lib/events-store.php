<?php
declare(strict_types=1);

/**
 * Penyimpanan event buatan admin (hasil generate dari flyer).
 * File JSON sengaja dipisah dari lib/data.php agar bisa ditulis saat runtime.
 */

function events_json_path(): string
{
    return __DIR__ . '/../data/events.json';
}

function get_stored_events(): array
{
    $file = events_json_path();
    if (!is_file($file)) {
        return [];
    }
    $data = json_decode((string) file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

function save_stored_events(array $events): void
{
    file_put_contents(
        events_json_path(),
        json_encode($events, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );
}

function slugify_event(string $text): string
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
    return trim($text, '-') ?: 'event-' . substr(md5((string) time()), 0, 6);
}

function unique_event_slug(string $slug, array $events): string
{
    $base = slugify_event($slug);
    $slug = $base;
    $i = 2;
    while (in_array($slug, array_column($events, 'slug'), true)) {
        $slug = $base . '-' . $i++;
    }
    return $slug;
}

/** Ubah tanggal bahasa Indonesia + jam menjadi ISO datetime untuk status & countdown. */
function parse_event_datetime(string $dateText, string $timeText, bool $end = false): string
{
    $months = [
        'januari' => 1, 'februari' => 2, 'maret' => 3, 'april' => 4,
        'mei' => 5, 'juni' => 6, 'juli' => 7, 'agustus' => 8,
        'september' => 9, 'oktober' => 10, 'november' => 11, 'desember' => 12,
    ];

    if (!preg_match('/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/', $dateText, $match)) {
        return date('Y-m-d') . 'T' . ($end ? '16:00' : '08:00') . ':00+07:00';
    }

    $monthWord = strtolower($match[2]);
    $month = 1;
    foreach ($months as $name => $number) {
        if (strpos($name, substr($monthWord, 0, 3)) === 0) {
            $month = $number;
            break;
        }
    }

    preg_match_all('/(\d{1,2})[.:](\d{2})/', $timeText, $times);
    $hour = isset($times[1][0]) ? (int) $times[1][0] : ($end ? 16 : 8);
    $minute = isset($times[2][0]) ? (int) $times[2][0] : 0;
    if ($end && isset($times[1][1])) {
        $hour = (int) $times[1][1];
        $minute = (int) $times[2][1];
    }

    return sprintf(
        '%04d-%02d-%02dT%02d:%02d:00+07:00',
        (int) $match[3], $month, (int) $match[1], $hour, $minute
    );
}

/** Lengkapi event hasil OCR dengan field standar yang dipakai index.php & event.php. */
function normalize_event(array $input, ?string $forceSlug = null): array
{
    $title = trim((string) ($input['title'] ?? 'Event Baru'));
    $slug = $forceSlug ?? unique_event_slug(
        (string) ($input['slug'] ?? $title),
        array_merge(get_stored_events(), event_defaults_for_slug_check())
    );

    $titleLine = strtoupper($title);
    $parts = preg_split('/\s+/', $titleLine) ?: [$titleLine];
    $half = (int) ceil(count($parts) / 2);
    $lines = count($parts) > 4
        ? [implode(' ', array_slice($parts, 0, $half)), implode(' ', array_slice($parts, $half))]
        : [$titleLine];

    $flyer = (string) ($input['flyer'] ?? 'assets/flyer.jpeg');
    $dateLabel = (string) ($input['date'] ?? '-');
    $timeLabel = (string) ($input['time'] ?? '-');
    $startAt = parse_event_datetime($dateLabel, $timeLabel, false);
    $endAt = parse_event_datetime($dateLabel, $timeLabel, true);

    // Hingga 3 narasumber opsional.
    $speakerNames = [];
    if (isset($input['speakers']) && is_array($input['speakers'])) {
        foreach ($input['speakers'] as $value) {
            $name = is_array($value) ? trim((string) ($value['name'] ?? '')) : trim((string) $value);
            if ($name !== '') {
                $speakerNames[] = $name;
            }
        }
    }
    if (!$speakerNames && trim((string) ($input['speaker'] ?? '')) !== '') {
        $speakerNames[] = trim((string) $input['speaker']);
    }

    $speakers = [];
    foreach (array_slice($speakerNames, 0, 3) as $speakerName) {
        $clean = preg_replace('/[^A-Za-z ]/', '', $speakerName) ?: '';
        $parts = preg_split('/\s+/', trim($clean)) ?: [];
        $initials = strtoupper(
            substr($parts[0] ?? 'N', 0, 1) . substr($parts[1] ?? '', 0, 1)
        );
        $speakers[] = [
            'name' => $speakerName,
            'role' => (string) ($input['speaker_role'] ?? 'Narasumber'),
            'bio' => 'Narasumber kegiatan ' . $title . '.',
            'initials' => $initials ?: 'PN',
            'topics' => [],
        ];
    }

    $priceTiers = $input['price_tiers'] ?? [[
        'id' => 'reguler', 'label' => 'Pendaftaran', 'price' => 0,
        'unit' => '/orang', 'note' => 'Hubungi panitia untuk informasi biaya',
        'flyer_label' => 'Pendaftaran', 'featured' => true,
        'featured_label' => 'Daftar',
    ]];
    $price = (int) ($input['price'] ?? 0);
    if ($price > 0) {
        $priceTiers = [[
            'id' => 'reguler',
            'label' => (string) ($input['price_label'] ?? 'Pendaftaran'),
            'price' => $price,
            'unit' => '/orang',
            'note' => 'Informasi biaya dari flyer kegiatan',
            'flyer_label' => (string) ($input['price_label'] ?? 'Pendaftaran'),
            'featured' => true,
            'featured_label' => (string) ($input['price_label'] ?? 'Daftar'),
        ]];
    }

    $contactData = $input['contact'] ?? [
        'whatsapp' => '0895 2721 7662', 'whatsapp_digits' => '6289527217662',
        'instagram' => '@stitalwafiofficial', 'instagram_url' => 'https://instagram.com/stitalwafiofficial',
    ];
    if (trim((string) ($input['whatsapp'] ?? '')) !== '') {
        $wa = trim((string) $input['whatsapp']);
        $contactData['whatsapp'] = $wa;
        $digits = preg_replace('/\D+/', '', $wa) ?? '';
        $contactData['whatsapp_digits'] = str_starts_with($digits, '0')
            ? '62' . substr($digits, 1) : $digits;
    }

    return [
        'slug'            => $slug,
        'title'           => $title,
        'short_title'     => (string) ($input['short_title'] ?? $title),
        'summary'         => (string) ($input['summary'] ?? 'Informasi lengkap event dapat dilihat pada halaman ini.'),
        'category'        => (string) ($input['category'] ?? 'Event · STIT Al Wafi'),
        'date'            => (string) ($input['date'] ?? '-'),
        'time'            => (string) ($input['time'] ?? '-'),
        'start_at'        => $startAt,
        'end_at'          => $endAt,
        'flyer'           => $flyer,
        'flyer_image'     => $flyer,
        'theme'           => $input['theme'] ?? [
            'primary' => '#0a2140', 'secondary' => '#123a5c',
            'accent' => '#d9744f', 'gold' => '#c5a059',
        ],
        'status'          => null,
        'organizer'       => (string) ($input['organizer'] ?? 'STIT Al Wafi Bogor'),
        'organizer_short' => 'STIT AL WAFI',
        'eyebrow'         => (string) ($input['eyebrow'] ?? 'AGENDA & PELATIHAN'),
        'countdown_to'    => $startAt,
        'full_title'      => (string) ($input['full_title'] ?? $title),
        'title_kicker'    => (string) ($input['title_kicker'] ?? 'Event'),
        'title_lines'     => $input['title_lines'] ?? array_map(
            static fn($line) => ['text' => $line],
            $lines
        ),
        'subtitle'        => (string) ($input['subtitle'] ?? 'Informasi event, pendaftaran, dan sertifikat.'),
        'description'     => (string) ($input['description'] ?? $title . ' diselenggarakan oleh STIT Al Wafi Bogor.'),
        'platform'        => (string) ($input['platform'] ?? 'Offline'),
        'location'        => (string) ($input['location'] ?? 'STIT Al Wafi Bogor'),
        'partners'        => $input['partners'] ?? ['STIT Al Wafi Bogor'],
        'speakers'        => $speakers,
        'price_tiers'     => $priceTiers,
        'facilities'      => $input['facilities'] ?? ['Materi', 'Sertifikat'],
        'benefits'        => $input['benefits'] ?? [[
            'title' => 'Informasi Lengkap', 'description' => 'Detail kegiatan tersedia pada halaman event ini.', 'icon' => 'sparkles',
        ]],
        'agenda'          => $input['agenda'] ?? [[
            'time' => '-', 'title' => 'Rangkaian Acara', 'description' => 'Agenda akan diumumkan lebih lanjut.',
        ]],
        'faqs'            => $input['faqs'] ?? [[
            'question' => 'Bagaimana cara mendaftar?',
            'answer' => 'Isi formulir pada halaman event ini, lalu hubungi panitia untuk konfirmasi.',
        ]],
        'contact'         => $contactData,
        'payment'         => $input['payment'] ?? [
            'bank' => 'BSI',
            'account_number' => '8888441116',
            'account_holder' => 'STIT AL Wafi',
        ],
        'certificate'     => $input['certificate'] ?? [
            'prefix' => strtoupper(substr($slug, 0, 4)),
            'signatory_name' => 'Panitia', 'signatory_role' => 'STIT Al Wafi Bogor',
            'eligible_statuses' => ['terkonfirmasi'],
        ],
        'audience'        => (string) ($input['audience'] ?? 'Pimpinan, dosen, tenaga kependidikan, dan peserta yang terkait dengan kegiatan ini.'),
        'pricing_note'    => (string) ($input['pricing_note'] ?? 'Pilih paket yang tersedia dan hubungi panitia untuk konfirmasi.'),
        'register_label'  => (string) ($input['register_label'] ?? 'Pendaftaran Dibuka'),
        'info_title'      => (string) ($input['info_title'] ?? 'Informasi Event'),
        'benefits_title'  => (string) ($input['benefits_title'] ?? 'Manfaat Mengikuti Event'),
        'agenda_title'    => (string) ($input['agenda_title'] ?? 'Agenda Event'),
        'agenda_note'     => (string) ($input['agenda_note'] ?? 'Rangkaian acara kegiatan.'),
        'sections'        => [
            'speakers' => (bool) ($input['sections']['speakers'] ?? true),
            'pricing'  => (bool) ($input['sections']['pricing'] ?? true),
            'benefits' => (bool) ($input['sections']['benefits'] ?? true),
            'agenda'   => (bool) ($input['sections']['agenda'] ?? true),
            'feedback' => (bool) ($input['sections']['feedback'] ?? true),
        ],
        'created_at'      => (string) ($input['created_at'] ?? date('Y-m-d H:i:s')),
    ];
}

function event_defaults_for_slug_check(): array
{
    return [];
}

function create_stored_event(array $input): array
{
    $events = get_stored_events();
    $event = normalize_event($input);
    $events[] = $event;
    save_stored_events($events);
    return $event;
}

function get_stored_event(string $slug): ?array
{
    foreach (get_stored_events() as $event) {
        if (($event['slug'] ?? '') === $slug) {
            return $event;
        }
    }
    return null;
}

function update_stored_event(string $slug, array $input): ?array
{
    $events = get_stored_events();
    foreach ($events as $index => $current) {
        if (($current['slug'] ?? '') !== $slug) {
            continue;
        }

        $merged = array_merge($current, $input);
        $merged['slug'] = $slug;
        $merged['created_at'] = $current['created_at'] ?? date('Y-m-d H:i:s');
        $updated = normalize_event($merged, $slug);

        $events[$index] = $updated;
        save_stored_events($events);
        return $updated;
    }
    return null;
}

function delete_stored_event(string $slug): bool
{
    $events = get_stored_events();
    $kept = array_values(array_filter($events, static fn($e) => ($e['slug'] ?? '') !== $slug));
    if (count($kept) === count($events)) {
        return false;
    }
    save_stored_events($kept);
    return true;
}
