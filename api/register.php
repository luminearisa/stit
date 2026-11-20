<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    json_response(['ok' => false, 'error' => 'Data pendaftaran tidak valid.'], 400);
}

$validated = validate_registration($input);
if (!$validated['ok']) {
    json_response(['ok' => false, 'error' => $validated['error']], 400);
}

try {
    $eventSlug = isset($input['event_slug']) && is_string($input['event_slug'])
        ? substr(trim($input['event_slug']), 0, 80)
        : '';
    $record = save_registration($validated['value'], $eventSlug);
    json_response([
        'ok'      => true,
        'id'      => $record['id'],
        'message' => 'Pendaftaran berhasil disimpan.',
    ]);
} catch (Throwable $e) {
    error_log('Registration error: ' . $e->getMessage());
    json_response(['ok' => false, 'error' => 'Terjadi kesalahan saat memproses pendaftaran.'], 500);
}
