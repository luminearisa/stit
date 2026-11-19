<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$config = require __DIR__ . '/../config.php';

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    $input = [];
}
$action = isset($input['action']) && is_string($input['action']) ? $input['action'] : '';

if ($action === 'login') {
    $username = isset($input['username']) && is_string($input['username']) ? $input['username'] : '';
    $password = isset($input['password']) && is_string($input['password']) ? $input['password'] : '';

    $validUser = hash_equals((string) $config['admin_user'], $username);
    $validPass = hash_equals((string) $config['admin_pass'], $password);

    if (!$validUser || !$validPass) {
        json_response(['ok' => false, 'error' => 'Username atau password salah.'], 401);
    }

    session_regenerate_id(true);
    $_SESSION['admin_logged_in'] = true;
    json_response(['ok' => true, 'message' => 'Login berhasil.']);
}

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    json_response(['ok' => true, 'message' => 'Logout berhasil.']);
}

if (empty($_SESSION['admin_logged_in'])) {
    json_response(['ok' => false, 'error' => 'Unauthorized'], 401);
}

if ($action === 'list') {
    $rows = array_map('to_frontend_row', list_registrations());
    json_response(['ok' => true, 'records' => $rows]);
}

if ($action === 'status') {
    $id = isset($input['id']) && is_string($input['id']) ? $input['id'] : '';
    $status = isset($input['status']) && is_string($input['status']) ? $input['status'] : '';

    if (!in_array($status, ['pending', 'lunas', 'terkonfirmasi'], true)) {
        json_response(['ok' => false, 'error' => 'Status tidak valid.'], 400);
    }

    $updated = update_status($id, $status);
    if (!$updated) {
        json_response(['ok' => false, 'error' => 'Pendaftar tidak ditemukan.'], 404);
    }

    json_response(['ok' => true, 'record' => to_frontend_row($updated)]);
}

if ($action === 'delete') {
    $id = isset($input['id']) && is_string($input['id']) ? $input['id'] : '';
    if ($id === '' || !delete_registration($id)) {
        json_response(['ok' => false, 'error' => 'Pendaftar tidak ditemukan.'], 404);
    }
    json_response(['ok' => true, 'message' => 'Pendaftar dihapus.']);
}

if ($action === 'clear') {
    $deleted = clear_registrations();
    json_response([
        'ok' => true,
        'deleted' => $deleted,
        'message' => $deleted . ' data pendaftar dihapus.',
    ]);
}

json_response(['ok' => false, 'error' => 'Aksi tidak dikenali.'], 400);
