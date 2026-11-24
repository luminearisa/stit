<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/feedback.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    json_response(['ok' => false, 'error' => 'Data saran tidak valid.'], 400);
}

try {
    $record = save_feedback($input);
    json_response([
        'ok' => true,
        'id' => $record['id'],
        'message' => 'Terima kasih! Saran Anda sudah kami terima.',
    ]);
} catch (InvalidArgumentException $e) {
    json_response(['ok' => false, 'error' => $e->getMessage()], 400);
} catch (Throwable $e) {
    error_log('Feedback error: ' . $e->getMessage());
    json_response(['ok' => false, 'error' => 'Gagal menyimpan saran.'], 500);
}
