<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$id = isset($_POST['id']) && is_string($_POST['id']) ? trim($_POST['id']) : '';
$record = $id !== '' ? find_by_id($id) : null;
if (!$record) {
    json_response(['ok' => false, 'error' => 'Data pendaftaran tidak ditemukan.'], 404);
}

if (!isset($_FILES['proof']) || $_FILES['proof']['error'] !== UPLOAD_ERR_OK) {
    json_response(['ok' => false, 'error' => 'Pilih file bukti pembayaran terlebih dahulu.'], 400);
}

$file = $_FILES['proof'];
if ($file['size'] > 5 * 1024 * 1024) {
    json_response(['ok' => false, 'error' => 'Ukuran file maksimal 5 MB.'], 400);
}

$mime = function_exists('mime_content_type')
    ? (string) mime_content_type($file['tmp_name'])
    : (string) ($file['type'] ?? '');
$extensions = [
    'image/jpeg'       => 'jpg',
    'image/png'        => 'png',
    'image/webp'       => 'webp',
    'application/pdf'  => 'pdf',
];
if (!isset($extensions[$mime])) {
    json_response(['ok' => false, 'error' => 'Format file harus JPG, PNG, WebP, atau PDF.'], 400);
}

$dir = __DIR__ . '/../assets/payment-proofs';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$safeId = preg_replace('/[^a-zA-Z0-9-]/', '', $id) ?: 'proof';
$filename = $safeId . '-' . substr(bin2hex(random_bytes(4)), 0, 8) . '.' . $extensions[$mime];
if (!move_uploaded_file($file['tmp_name'], $dir . '/' . $filename)) {
    json_response(['ok' => false, 'error' => 'Gagal menyimpan file bukti pembayaran.'], 500);
}

$url = 'assets/payment-proofs/' . $filename;
$stmt = db()->prepare('UPDATE registrations SET payment_proof = ? WHERE id = ?');
$stmt->execute([$url, $id]);

json_response([
    'ok' => true,
    'url' => $url,
    'message' => 'Bukti pembayaran berhasil diunggah.',
]);
