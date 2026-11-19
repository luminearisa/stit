<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

/**
 *Koneksi PDO. Default MySQL/MariaDB; SQLite tersedia untuk uji lokal.
 */
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $config = require __DIR__ . '/config.php';
    $db = $config['db'];
    $driver = $db['driver'] ?? 'mysql';

    if ($driver === 'sqlite') {
        $pdo = new PDO('sqlite:' . $db['sqlite_path'], null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        $db['host'],
        $db['name'],
        $db['charset']
    );

    $pdo = new PDO($dsn, $db['user'], $db['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function db_driver(): string
{
    $config = require __DIR__ . '/config.php';
    return $config['db']['driver'] ?? 'mysql';
}

/**
 *Buat tabel bila belum ada. Otomatis dipanggil saat halaman/API diakses.
 */
function ensure_schema(): void
{
    $pdo = db();

    if (db_driver() === 'sqlite') {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS registrations (
                id TEXT NOT NULL PRIMARY KEY,
                name TEXT NOT NULL,
                whatsapp TEXT NOT NULL,
                email TEXT NOT NULL,
                institution TEXT NOT NULL,
                city TEXT NOT NULL,
                info_source TEXT NOT NULL,
                position TEXT NOT NULL,
                field_of_study TEXT NOT NULL,
                other_training TEXT NULL,
                status TEXT NOT NULL DEFAULT 'pending',
                created_at TEXT NOT NULL,
                source TEXT NOT NULL DEFAULT 'event-page'
            )
        ");
        $pdo->exec('CREATE INDEX IF NOT EXISTS idx_whatsapp ON registrations(whatsapp)');
        $pdo->exec('CREATE INDEX IF NOT EXISTS idx_status ON registrations(status)');
        return;
    }

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS registrations (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            whatsapp VARCHAR(30) NOT NULL,
            email VARCHAR(200) NOT NULL,
            institution VARCHAR(200) NOT NULL,
            city VARCHAR(120) NOT NULL,
            info_source VARCHAR(120) NOT NULL,
            position VARCHAR(120) NOT NULL,
            field_of_study VARCHAR(200) NOT NULL,
            other_training TEXT NULL,
            status ENUM('pending','lunas','terkonfirmasi') NOT NULL DEFAULT 'pending',
            created_at DATETIME NOT NULL,
            source VARCHAR(50) NOT NULL DEFAULT 'event-page',
            INDEX idx_whatsapp (whatsapp),
            INDEX idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
}
