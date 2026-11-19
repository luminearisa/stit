<?php
declare(strict_types=1);

/**
 *Konfigurasi aplikasi event.
 *Isi kredensial database sesuai server kamu, lalu upload file ini ke server.
 *Jangan commit file ini ke repository publik.
 */
return [
    'db' => [
        // 'mysql' untuk server produksi, 'sqlite' untuk uji lokal tanpa MySQL.
        'driver'      => 'mysql',
        'host'        => 'localhost',
        'name'        => 'nama_database',
        'user'        => 'username_database',
        'pass'        => 'password_database',
        'charset'     => 'utf8mb4',
        'sqlite_path' => __DIR__ . '/data.db',
    ],

    // Kredensial panel admin. Ganti di produksi.
    'admin_user' => 'admin',
    'admin_pass' => 'admin123',

    // Path dasar aplikasi di server (subfolder tempat file ini di-upload).
    'base_path' => '',
];
