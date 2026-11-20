<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
$whatsapp = isset($input['whatsapp']) && is_string($input['whatsapp']) ? $input['whatsapp'] : '';

$record = find_by_whatsapp($whatsapp);
if (!$record) {
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
]);
