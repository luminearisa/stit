<?php
declare(strict_types=1);

/**
 * Retensi event: event yang sudah selesai lebih dari 10 hari dihapus otomatis
 * dari seluruh aplikasi (halaman event, index, dan semua panel admin).
 */

const EVENT_RETENTION_DAYS = 10;

require_once __DIR__ . '/events-store.php';
require_once __DIR__ . '/certificates.php';

/** Waktu selesai event (UNIX timestamp), dari field mana pun yang tersedia. */
function event_end_timestamp(array $event): ?int
{
    foreach (['end_at', 'start_at', 'countdown_to'] as $key) {
        $raw = (string) ($event[$key] ?? '');
        if ($raw === '') {
            continue;
        }
        $timestamp = strtotime($raw);
        if ($timestamp !== false) {
            return $timestamp;
        }
    }

    // Event lama mungkin hanya punya label tanggal + jam.
    $dateLabel = (string) ($event['date'] ?? '');
    if ($dateLabel !== '') {
        $iso = parse_event_datetime($dateLabel, (string) ($event['time'] ?? ''), true);
        $timestamp = strtotime($iso);
        if ($timestamp !== false) {
            return $timestamp;
        }
    }

    return null;
}

/**
 * Hanya event yang SUDAH BERLANGSUNG (selesai) yang bisa dihapus.
 * Event akan datang atau sedang berjalan tidak pernah terkena aturan ini.
 * Batasnya: 10 hari setelah waktu selesai.
 */
function event_is_expired(array $event, ?int $now = null): bool
{
    $end = event_end_timestamp($event);
    if ($end === null) {
        return false; // Tanggal tidak dikenal → jangan hapus.
    }
    $now ??= time();

    // Event belum selesai → aman, apapun tanggal mulai/countdown-nya.
    if ($now <= $end) {
        return false;
    }

    return $now > $end + EVENT_RETENTION_DAYS * 86400;
}

/** Daftar slug event yang sudah melewati batas retensi. */
function expired_event_slugs(array $events, ?int $now = null): array
{
    $slugs = [];
    foreach ($events as $event) {
        if (event_is_expired($event, $now)) {
            $slug = (string) ($event['slug'] ?? '');
            if ($slug !== '') {
                $slugs[$slug] = $slug;
            }
        }
    }
    return array_values($slugs);
}

/** Hapus baris pendaftar & saran milik event yang kedaluwarsa. */
function retention_delete_event_data(array $slugs): void
{
    if (!$slugs) {
        return;
    }
    // Database opsional; bila belum dikonfigurasi, lewati dengan aman.
    $configFile = __DIR__ . '/../config.php';
    if (!is_file($configFile)) {
        return;
    }
    require_once __DIR__ . '/../db.php';

    try {
        ensure_schema();
        $pdo = db();
        $placeholders = implode(',', array_fill(0, count($slugs), '?'));

        $stmt = $pdo->prepare("DELETE FROM registrations WHERE source IN ($placeholders)");
        $stmt->execute($slugs);

        $stmt = $pdo->prepare("DELETE FROM feedback WHERE event_slug IN ($placeholders)");
        $stmt->execute($slugs);
    } catch (Throwable $e) {
        error_log('Retensi event (DB) gagal: ' . $e->getMessage());
    }
}

/**
 * Bersihkan event kedaluwarsa beserta asetnya. Dipanggil sekali saat
 * daftar event dimuat, sehingga berlaku untuk semua halaman & panel admin.
 *
 * @return array slug yang dihapus pada pemanggilan ini
 */
function purge_expired_events(array $events, ?int $now = null): array
{
    $expired = expired_event_slugs($events, $now);
    if (!$expired) {
        return [];
    }

    // Hapus entri event hasil generate dari events.json.
    $stored = get_stored_events();
    $kept = array_values(array_filter(
        $stored,
        static fn($event) => !in_array((string) ($event['slug'] ?? ''), $expired, true)
    ));
    if (count($kept) !== count($stored)) {
        save_stored_events($kept);
    }

    foreach ($expired as $slug) {
        // Flyer hasil upload admin.
        $flyer = '';
        foreach ($stored as $event) {
            if (($event['slug'] ?? '') === $slug) {
                $flyer = (string) ($event['flyer'] ?? '');
                break;
            }
        }
        if (str_starts_with($flyer, 'assets/flyers/')) {
            $file = __DIR__ . '/../' . $flyer;
            if (is_file($file)) {
                unlink($file);
            }
        }

        // Template sertifikat + gambarnya.
        $template = get_certificate_config($slug);
        if ($template) {
            $file = __DIR__ . '/../' . (string) ($template['image'] ?? '');
            if (is_file($file)) {
                unlink($file);
            }
            delete_certificate_config($slug);
        }
    }

    retention_delete_event_data($expired);

    return $expired;
}
