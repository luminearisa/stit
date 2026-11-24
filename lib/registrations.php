<?php
declare(strict_types=1);

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/data.php';

/* Fallback bila ekstensi mbstring tidak tersedia di server. */
if (!function_exists('mb_strlen')) {
    function mb_strlen(string $value): int
    {
        return strlen($value);
    }
}
if (!function_exists('mb_substr')) {
    function mb_substr(string $value, int $start, ?int $length = null): string
    {
        return $length === null ? substr($value, $start) : substr($value, $start, $length);
    }
}

/** Bunuh error PHP ke output JSON (jangan sampai merusak response API). */
function json_response(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function uuid_v4(): string
{
    $bytes = random_bytes(16);
    $bytes[6] = chr((ord($bytes[6]) & 0x0f) | 0x40);
    $bytes[8] = chr((ord($bytes[8]) & 0x3f) | 0x80);
    $hex = bin2hex($bytes);
    return substr($hex, 0, 8) . '-' . substr($hex, 8, 4) . '-' . substr($hex, 12, 4)
        . '-' . substr($hex, 16, 4) . '-' . substr($hex, 20, 12);
}

function normalize_whatsapp(string $value): string
{
    return preg_replace('/\D+/', '', $value) ?? '';
}

/** Validasi berdasarkan $registration_fields di data.php. */
function validate_registration(array $input): array
{
    global $registration_fields;

    $values = [];
    foreach ($registration_fields as $field) {
        $key = $field['key'];
        $raw = isset($input[$key]) && is_string($input[$key]) ? $input[$key] : '';
        $value = trim($raw);

        if (!empty($field['required']) && $value === '') {
            return ['ok' => false, 'error' => $field['label'] . ' wajib diisi.'];
        }
        if (isset($field['min']) && mb_strlen($value) < $field['min']) {
            return ['ok' => false, 'error' => $field['label'] . ' terlalu pendek.'];
        }

        $values[$field['db']] = mb_substr($value, 0, $field['max'] ?? 500);
    }

    if (strlen(normalize_whatsapp($values['whatsapp'])) < 8) {
        return ['ok' => false, 'error' => 'Nomor WhatsApp tidak valid.'];
    }
    if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
        return ['ok' => false, 'error' => 'Alamat email aktif tidak valid.'];
    }
    if (!in_array($values['status'] ?? 'pending', ['pending', 'lunas', 'terkonfirmasi'], true)) {
        return ['ok' => false, 'error' => 'Status tidak valid.'];
    }

    return ['ok' => true, 'value' => $values];
}

function save_registration(array $values, string $source = 'event-page'): array
{
    ensure_schema();

    $id = uuid_v4();
    $values['whatsapp'] = normalize_whatsapp($values['whatsapp']);
    $values['status'] = 'pending';

    $columns = array_keys($values);
    $placeholders = array_map(static fn($c) => ':' . $c, $columns);

    $sql = sprintf(
        'INSERT INTO registrations (%s, id, created_at, source) VALUES (%s, :id, :created_at, :source)',
        implode(', ', $columns),
        implode(', ', $placeholders)
    );

    $stmt = db()->prepare($sql);
    $params = $values;
    $params['id'] = $id;
    $params['created_at'] = date('Y-m-d H:i:s');
    $params['source'] = $source !== '' ? $source : 'event-page';
    $stmt->execute($params);

    return find_by_id($id) ?? [
        'id' => $id,
        'name' => $values['name'],
        'whatsapp' => $values['whatsapp'],
        'status' => 'pending',
    ];
}

function find_by_id(string $id): ?array
{
    ensure_schema();
    $stmt = db()->prepare('SELECT * FROM registrations WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function list_registrations(): array
{
    ensure_schema();
    return db()->query('SELECT * FROM registrations ORDER BY created_at DESC, id DESC')->fetchAll();
}

/** Cari berdasarkan WhatsApp. Pendaftaran terbaru yang diprioritaskan. */
function find_by_whatsapp(string $whatsapp): ?array
{
    ensure_schema();
    $wa = normalize_whatsapp($whatsapp);
    if (strlen($wa) < 8) {
        return null;
    }

    $stmt = db()->prepare(
        'SELECT * FROM registrations WHERE whatsapp = ? ORDER BY created_at DESC, CASE status WHEN "terkonfirmasi" THEN 0 WHEN "lunas" THEN 1 ELSE 2 END LIMIT 1'
    );
    $stmt->execute([$wa]);
    $row = $stmt->fetch();
    return $row ?: null;
}

/** Cari pendaftar berdasarkan WhatsApp DAN event tertentu. */
function find_by_whatsapp_and_event(string $whatsapp, string $eventSlug): ?array
{
    ensure_schema();
    $wa = normalize_whatsapp($whatsapp);
    if ($wa === '' || $eventSlug === '') {
        return null;
    }

    $stmt = db()->prepare(
        'SELECT * FROM registrations WHERE whatsapp = ? AND source = ? ORDER BY created_at DESC LIMIT 1'
    );
    $stmt->execute([$wa, $eventSlug]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function update_status(string $id, string $status): ?array
{
    ensure_schema();
    if (!in_array($status, ['pending', 'lunas', 'terkonfirmasi'], true)) {
        return null;
    }
    $stmt = db()->prepare('UPDATE registrations SET status = ? WHERE id = ?');
    $stmt->execute([$status, $id]);
    return $stmt->rowCount() > 0 ? find_by_id($id) : null;
}

/** Hapus satu pendaftar. Mengembalikan true bila ada data yang terhapus. */
function delete_registration(string $id): bool
{
    ensure_schema();
    $stmt = db()->prepare('DELETE FROM registrations WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->rowCount() > 0;
}

/** Hapus seluruh data pendaftar (diganti saat event baru). */
function clear_registrations(): int
{
    ensure_schema();
    return db()->exec('DELETE FROM registrations');
}

/** Kolom CSV: field sistem + semua field formulir + status. */
function csv_columns(): array
{
    global $registration_fields;
    $columns = [
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'created_at', 'label' => 'Waktu'],
    ];
    foreach ($registration_fields as $field) {
        $columns[] = ['key' => $field['key'], 'label' => $field['label']];
    }
    $columns[] = ['key' => 'status', 'label' => 'Status'];
    return $columns;
}

/** Baris data diubah ke key frontend agar cocok dengan kolom CSV. */
function to_frontend_row(array $row): array
{
    global $registration_fields;
    $out = $row;
    foreach ($registration_fields as $field) {
        $out[$field['key']] = $row[$field['db']] ?? '';
    }
    return $out;
}
