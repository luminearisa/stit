<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';
require_once __DIR__ . '/../lib/events-store.php';
require_once __DIR__ . '/../lib/feedback.php';
require_once __DIR__ . '/../lib/certificates.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'Method tidak diizinkan.'], 405);
}

$config = require __DIR__ . '/../config.php';

$action = isset($_POST['action']) && is_string($_POST['action']) ? $_POST['action'] : '';
$input = [];

if ($action === '') {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw ?: '', true);
    $input = is_array($decoded) ? $decoded : [];
    $action = isset($input['action']) && is_string($input['action']) ? $input['action'] : '';
}

if ($action === 'login') {
    $username = isset($input['username']) && is_string($input['username']) ? $input['username'] : '';
    $password = isset($input['password']) && is_string($input['password']) ? $input['password'] : '';

    if (!hash_equals((string) $config['admin_user'], $username)
        || !hash_equals((string) $config['admin_pass'], $password)) {
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

/* ---------- Event generator ---------- */

if ($action === 'flyer_upload') {
    if (!isset($_FILES['flyer']) || $_FILES['flyer']['error'] !== UPLOAD_ERR_OK) {
        json_response(['ok' => false, 'error' => 'Gagal mengupload flyer.'], 400);
    }

    $allowed = ['jpg', 'jpeg', 'png', 'webp'];
    $extension = strtolower(pathinfo((string) $_FILES['flyer']['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $allowed, true)) {
        json_response(['ok' => false, 'error' => 'Format flyer harus JPG, PNG, atau WebP.'], 400);
    }
    if ($_FILES['flyer']['size'] > 5 * 1024 * 1024) {
        json_response(['ok' => false, 'error' => 'Ukuran flyer maksimal 5 MB.'], 400);
    }

    $directory = __DIR__ . '/../assets/flyers';
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }

    $filename = 'flyer-' . date('YmdHis') . '-' . bin2hex(random_bytes(3)) . '.' . $extension;
    $destination = $directory . '/' . $filename;

    if (!move_uploaded_file((string) $_FILES['flyer']['tmp_name'], $destination)) {
        json_response(['ok' => false, 'error' => 'Gagal menyimpan file flyer.'], 500);
    }

    json_response(['ok' => true, 'url' => 'assets/flyers/' . $filename]);
}

if ($action === 'event_list') {
    json_response(['ok' => true, 'events' => get_stored_events()]);
}

if ($action === 'event_get') {
    $slug = isset($input['slug']) && is_string($input['slug']) ? $input['slug'] : '';
    $event = get_stored_event($slug);
    if (!$event) {
        json_response(['ok' => false, 'error' => 'Event tidak ditemukan.'], 404);
    }
    json_response(['ok' => true, 'event' => $event]);
}

if ($action === 'event_update') {
    $slug = isset($input['slug']) && is_string($input['slug']) ? $input['slug'] : '';
    $before = get_stored_event($slug);
    $updated = update_stored_event($slug, $input);
    if (!$updated) {
        json_response(['ok' => false, 'error' => 'Event tidak ditemukan.'], 404);
    }

    // Hapus flyer lama bila diganti dengan file baru hasil upload.
    $oldFlyer = (string) ($before['flyer'] ?? '');
    $newFlyer = (string) ($updated['flyer'] ?? '');
    if ($oldFlyer !== '' && $oldFlyer !== $newFlyer && str_starts_with($oldFlyer, 'assets/flyers/')) {
        $oldFile = __DIR__ . '/../' . $oldFlyer;
        if (is_file($oldFile)) {
            unlink($oldFile);
        }
    }
    json_response([
        'ok' => true,
        'event' => $updated,
        'message' => 'Event berhasil diperbarui.',
    ]);
}

if ($action === 'event_create') {
    $event = create_stored_event($input);
    json_response([
        'ok' => true,
        'event' => $event,
        'message' => 'Event berhasil dibuat dan akan tampil di halaman utama.',
    ]);
}

if ($action === 'event_delete') {
    $slug = isset($input['slug']) && is_string($input['slug']) ? $input['slug'] : '';
    $eventToDelete = get_stored_event($slug);
    if ($slug === '' || !$eventToDelete || !delete_stored_event($slug)) {
        json_response(['ok' => false, 'error' => 'Event tidak ditemukan.'], 404);
    }

    // Bersihkan flyer hasil upload milik event ini.
    $flyer = (string) ($eventToDelete['flyer'] ?? '');
    if (str_starts_with($flyer, 'assets/flyers/')) {
        $flyerFile = __DIR__ . '/../' . $flyer;
        if (is_file($flyerFile)) {
            unlink($flyerFile);
        }
    }

    // Bersihkan template sertifikat event ini.
    $template = get_certificate_config($slug);
    if ($template) {
        $templateFile = __DIR__ . '/../' . (string) ($template['image'] ?? '');
        if (is_file($templateFile)) {
            unlink($templateFile);
        }
        delete_certificate_config($slug);
    }

    json_response(['ok' => true, 'message' => 'Event beserta asetnya dihapus.']);
}

/* ---------- Template sertifikat per event ---------- */

if ($action === 'certificate_upload') {
    $slug = isset($_POST['slug']) && is_string($_POST['slug']) ? trim($_POST['slug']) : '';
    if ($slug === '') {
        json_response(['ok' => false, 'error' => 'Pilih event terlebih dahulu.'], 400);
    }
    if (!isset($_FILES['certificate']) || $_FILES['certificate']['error'] !== UPLOAD_ERR_OK) {
        json_response(['ok' => false, 'error' => 'Gagal mengupload template sertifikat.'], 400);
    }

    $allowed = ['jpg', 'jpeg', 'png', 'webp'];
    $extension = strtolower(pathinfo((string) $_FILES['certificate']['name'], PATHINFO_EXTENSION));
    if (!in_array($extension, $allowed, true)) {
        json_response(['ok' => false, 'error' => 'Format harus JPG, PNG, atau WebP.'], 400);
    }
    if ($_FILES['certificate']['size'] > 5 * 1024 * 1024) {
        json_response(['ok' => false, 'error' => 'Ukuran maksimal 5 MB.'], 400);
    }

    $directory = __DIR__ . '/../assets/certificates';
    if (!is_dir($directory)) {
        mkdir($directory, 0755, true);
    }
    $filename = preg_replace('/[^a-z0-9-]+/', '-', $slug) . '-' . bin2hex(random_bytes(3)) . '.' . $extension;
    if (!move_uploaded_file((string) $_FILES['certificate']['tmp_name'], $directory . '/' . $filename)) {
        json_response(['ok' => false, 'error' => 'Gagal menyimpan file.'], 500);
    }

    $previous = get_certificate_config($slug);
    if ($previous && !empty($previous['image'])) {
        $oldFile = __DIR__ . '/../' . $previous['image'];
        if (is_file($oldFile)) {
            unlink($oldFile);
        }
    }

    $config = save_certificate_config($slug, [
        'image' => 'assets/certificates/' . $filename,
        'name_box' => default_name_box(),
    ]);
    json_response(['ok' => true, 'config' => $config, 'message' => 'Template sertifikat berhasil di-upload.']);
}

if ($action === 'certificate_save') {
    $slug = isset($input['slug']) && is_string($input['slug']) ? trim($input['slug']) : '';
    $config = get_certificate_config($slug);
    if (!$config) {
        json_response(['ok' => false, 'error' => 'Template belum di-upload.'], 404);
    }
    $nameBox = default_name_box();
    if (isset($input['name_box']) && is_array($input['name_box'])) {
        $box = $input['name_box'];
        $nameBox['x'] = max(0, min(100, (float) ($box['x'] ?? $nameBox['x'])));
        $nameBox['y'] = max(0, min(100, (float) ($box['y'] ?? $nameBox['y'])));
        $nameBox['size'] = max(12, min(120, (float) ($box['size'] ?? $nameBox['size'])));
        $nameBox['maxWidth'] = max(20, min(100, (float) ($box['maxWidth'] ?? $nameBox['maxWidth'])));
        $color = (string) ($box['color'] ?? $nameBox['color']);
        $nameBox['color'] = preg_match('/^#[0-9a-f]{6}$/i', $color) ? $color : $nameBox['color'];
        $align = (string) ($box['align'] ?? $nameBox['align']);
        $nameBox['align'] = in_array($align, ['left', 'center', 'right'], true) ? $align : 'center';
    }
    $updated = save_certificate_config($slug, array_merge($config, ['name_box' => $nameBox]));
    json_response(['ok' => true, 'config' => $updated, 'message' => 'Posisi nama berhasil disimpan.']);
}

if ($action === 'certificate_list') {
    json_response(['ok' => true, 'configs' => all_certificate_configs()]);
}

if ($action === 'certificate_get') {
    $slug = isset($input['slug']) && is_string($input['slug']) ? $input['slug'] : '';
    json_response(['ok' => true, 'config' => get_certificate_config($slug)]);
}

if ($action === 'certificate_delete') {
    $slug = isset($input['slug']) && is_string($input['slug']) ? $input['slug'] : '';
    $config = get_certificate_config($slug);
    if (!$config) {
        json_response(['ok' => false, 'error' => 'Template tidak ditemukan.'], 404);
    }
    $file = __DIR__ . '/../' . $config['image'];
    if (is_file($file)) {
        unlink($file);
    }
    delete_certificate_config($slug);
    json_response(['ok' => true, 'message' => 'Template sertifikat dihapus.']);
}

/* ---------- Saran & masukan ---------- */

if ($action === 'feedback_list') {
    json_response(['ok' => true, 'items' => list_feedback()]);
}

if ($action === 'feedback_delete') {
    $id = isset($input['id']) && is_string($input['id']) ? $input['id'] : '';
    if ($id === '' || !delete_feedback($id)) {
        json_response(['ok' => false, 'error' => 'Saran tidak ditemukan.'], 404);
    }
    json_response(['ok' => true, 'message' => 'Saran dihapus.']);
}

if ($action === 'feedback_clear') {
    $deleted = clear_feedback();
    json_response(['ok' => true, 'deleted' => $deleted, 'message' => $deleted . ' saran dihapus.']);
}

json_response(['ok' => false, 'error' => 'Aksi tidak dikenali.'], 400);
