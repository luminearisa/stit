<?php
declare(strict_types=1);

/**
 * Template sertifikat per event, tersimpan terpisah dari data event.
 * Format: data/certificates.json
 */

function certificates_json_path(): string
{
    return __DIR__ . '/../data/certificates.json';
}

function all_certificate_configs(): array
{
    $file = certificates_json_path();
    if (!is_file($file)) {
        return [];
    }
    $data = json_decode((string) file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

function get_certificate_config(string $slug): ?array
{
    $configs = all_certificate_configs();
    return $configs[$slug] ?? null;
}

function save_certificate_config(string $slug, array $config): array
{
    $configs = all_certificate_configs();
    $config['updated_at'] = date('Y-m-d H:i:s');
    $configs[$slug] = $config;

    file_put_contents(
        certificates_json_path(),
        json_encode($configs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );

    return $config;
}

function delete_certificate_config(string $slug): bool
{
    $configs = all_certificate_configs();
    if (!isset($configs[$slug])) {
        return false;
    }
    unset($configs[$slug]);
    file_put_contents(
        certificates_json_path(),
        json_encode($configs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );
    return true;
}

/** Posisi nama default (persen terhadap lebar/tinggi gambar). */
function default_name_box(): array
{
    return [
        'x' => 50,
        'y' => 45,
        'size' => 42,
        'color' => '#0b2545',
        'align' => 'center',
        'maxWidth' => 70,
    ];
}
