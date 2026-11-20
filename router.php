<?php
declare(strict_types=1);

/**
 * Router untuk PHP built-in server saat uji lokal.
 * Pemakaian: php -S 127.0.0.1:8099 router.php
 * Di hosting produksi gunakan .htaccess (mod_rewrite), file ini tidak dipakai.
 */

$path = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '', '/');

// Blokir file sensitif & folder internal.
if (preg_match('#^(config|db|router)(\.php)?$#i', $path) || strpos($path, 'lib/') === 0) {
    http_response_code(403);
    exit;
}

if ($path === '') {
    $path = 'index.php';
} elseif (strpos($path, '.') === false) {
    $candidate = __DIR__ . '/' . $path . '.php';
    if (is_file($candidate)) {
        $path = $path . '.php';
    }
}

$file = __DIR__ . '/' . $path;

if (!is_file($file)) {
    http_response_code(404);
    echo 'Halaman tidak ditemukan.';
    exit;
}

if (strtolower(pathinfo($file, PATHINFO_EXTENSION)) === 'php') {
    require $file;
    exit;
}

// Biarkan server menangani file statis (css, js, gambar).
return false;
