<?php
declare(strict_types=1);

function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Kredit footer standar untuk semua halaman/event. */
function site_credit(): string
{
    return '© ' . date('Y') . ' STIT AL WAFI BOGOR. Seluruh hak cipta dilindungi.';
}

/** Ikon SVG inline. */
function icon(string $name): string
{
    $paths = [
        'calendar'  => '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
        'clock'     => '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        'video'     => '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 11 6-4v10l-6-4"/>',
        'users'     => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
        'layers'    => '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
        'shield'    => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
        'chat'      => '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        'check'     => '<path d="m5 13 4 4L19 7"/>',
        'arrow'     => '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
        'whatsapp'  => '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M16.5 11.5c-.2-.5-1-.2-1.4-.1l-.7.4a6 6 0 0 1-2.7-2.7l.4-.7c.2-.4.4-.9-.1-1.1L11 6c-.4-.2-1-.1-1.4.6a11 11 0 0 0 1.8 6.6 11 11 0 0 0 6.6 1.8c.7-.4.8-1 .6-1.4Z"/>',
        'instagram' => '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M18 6h.01"/>',
        'mail'      => '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
        'sparkles'  => '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 16v4M17 18h4"/>',
        'map-pin'   => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
        'chevron'   => '<path d="m6 9 6 6 6-6"/>',
        'back'      => '<path d="m15 18-6-6 6-6"/>',
        'download'  => '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    ];

    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" '
        . 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        . ($paths[$name] ?? $paths['check']) . '</svg>';
}

/** Style inline untuk tema warna event. */
function theme_style(array $event): string
{
    $t = $event['theme'];
    return sprintf(
        '--brand-primary:%s;--brand-secondary:%s;--brand-accent:%s;--brand-gold:%s;',
        e($t['primary']), e($t['secondary']), e($t['accent']), e($t['gold'])
    );
}

function flyer_src(array $event): string
{
    return e($event['flyer_image']);
}
