<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';
require_once __DIR__ . '/../lib/certificates.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
$whatsapp = isset($input['whatsapp']) && is_string($input['whatsapp']) ? $input['whatsapp'] : '';
$eventSlug = isset($input['event_slug']) && is_string($input['event_slug']) ? trim($input['event_slug']) : '';

$record = $eventSlug !== ''
    ? find_by_whatsapp_and_event($whatsapp, $eventSlug)
    : find_by_whatsapp($whatsapp);
if (!$record) {
    // Beri petunjuk bila nomornya ternyata terdaftar di event lain.
    if ($eventSlug !== '') {
        $other = find_by_whatsapp($whatsapp);
        if ($other) {
            $otherEvent = get_event((string) ($other['source'] ?? ''));
            $label = $otherEvent['title'] ?? (string) ($other['source'] ?? 'event lain');
            json_response([
                'ok' => false,
                'error' => 'Nomor WhatsApp ini terdaftar pada event "' . $label
                    . '". Silakan pilih event tersebut pada kolom Event.',
            ], 404);
        }
    }
    json_response(['ok' => false, 'error' => 'Nomor WhatsApp tidak ditemukan dalam data pendaftaran.'], 404);
}

// Data event mengikuti slug yang tersimpan saat pendaftaran.
$detail = get_event((string) ($record['source'] ?? '')) ?? $event;
$cert = $detail['certificate'] ?? $certificate;
$contactInfo = $detail['contact'] ?? $contact;

if (!in_array($record['status'], $cert['eligible_statuses'], true)) {
    json_response([
        'ok' => false,
        'error' => 'Sertifikat belum tersedia. Status pendaftaran Anda: '
            . ($status_labels[$record['status']] ?? $record['status'])
            . '. Silakan hubungi panitia di ' . $contactInfo['whatsapp'] . ' untuk konfirmasi.',
    ], 403);
}

json_response([
    'ok' => true,
    'record' => to_frontend_row($record),
    'event' => [
        'title_lines' => $detail['title_lines'] ?? $event['title_lines'],
        'date'        => $detail['date'] ?? $event['date'],
        'organizer'   => $detail['organizer'] ?? $event['organizer'],
        'venue'       => $detail['location'] ?? $event['location'],
    ],
    'certificate' => $cert,
    'template' => get_certificate_config((string) ($record['source'] ?? '')),
]);
