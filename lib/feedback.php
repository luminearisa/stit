<?php
declare(strict_types=1);

require_once __DIR__ . '/../lib/registrations.php';

/** Semua field saran bersifat opsional; minimal salah satu harus diisi. */
function save_feedback(array $input): array
{
    ensure_schema();

    $clean = static function ($key, int $length) use ($input): string {
        $value = isset($input[$key]) && is_string($input[$key]) ? trim($input[$key]) : '';
        return mb_substr($value, 0, $length);
    };

    $name = $clean('name', 200);
    $email = $clean('email', 200);
    $message = $clean('message', 2000);

    if ($name === '' && $email === '' && $message === '') {
        throw new InvalidArgumentException('Isi salah satu kolom terlebih dahulu.');
    }
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('Alamat email tidak valid.');
    }

    $record = [
        'id' => uuid_v4(),
        'name' => $name !== '' ? $name : null,
        'email' => $email !== '' ? $email : null,
        'message' => $message !== '' ? $message : null,
        'event_slug' => $clean('event_slug', 80) !== '' ? $clean('event_slug', 80) : null,
        'created_at' => date('Y-m-d H:i:s'),
    ];

    $stmt = db()->prepare(
        'INSERT INTO feedback (id, name, email, message, event_slug, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $record['id'], $record['name'], $record['email'],
        $record['message'], $record['event_slug'], $record['created_at'],
    ]);

    return $record;
}

function list_feedback(): array
{
    ensure_schema();
    return db()->query('SELECT * FROM feedback ORDER BY created_at DESC, id DESC')->fetchAll();
}

function delete_feedback(string $id): bool
{
    ensure_schema();
    $stmt = db()->prepare('DELETE FROM feedback WHERE id = ?');
    $stmt->execute([$id]);
    return $stmt->rowCount() > 0;
}

function clear_feedback(): int
{
    ensure_schema();
    return db()->exec('DELETE FROM feedback');
}
