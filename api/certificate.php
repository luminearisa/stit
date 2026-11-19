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

if (!in_array($record['status'], $certificate['eligible_statuses'], true)) {
    json_response([
        'ok' => false,
        'error' => 'Sertifikat belum tersedia. Status pendaftaran Anda: '
            . ($status_labels[$record['status']] ?? $record['status'])
            . '. Silakan hubungi panitia di 0813 9166 0301 untuk konfirmasi.',
    ], 403);
}

json_response(['ok' => true, 'record' => to_frontend_row($record)]);
