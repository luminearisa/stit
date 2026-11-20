<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/data.php';
require_once __DIR__ . '/lib/ui.php';

$theme = theme_style($event);
$groups = [
    'ongoing'  => ['label' => 'Sedang Berlangsung', 'note' => 'Event yang saat ini masih berjalan'],
    'upcoming' => ['label' => 'Akan Datang', 'note' => 'Jadwal event yang segera diselenggarakan'],
    'past'     => ['label' => 'Sudah Berlangsung', 'note' => 'Arsip event yang telah selesai'],
];

$counts = ['ongoing' => 0, 'upcoming' => 0, 'past' => 0];
foreach ($events as $item) {
    $counts[event_status($item)]++;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event &amp; Pelatihan — <?= e($event['organizer_short']) ?></title>
  <meta name="description" content="Daftar event dan pelatihan <?= e($event['organizer_short']) ?>: yang sedang berlangsung, akan datang, dan sudah berlangsung.">
  <link rel="stylesheet" href="assets/event.css">
  <script src="assets/app.js" defer></script>
</head>
<body>
<div class="event-page listing-page" style="<?= $theme ?>">
  <header class="site-header" id="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="index.php" aria-label="STIT Al Wafi Bogor">
        <span class="brand__mark brand__mark--icon" aria-hidden="true"><img src="assets/stit-icon.png" alt=""></span>
        <span class="brand__text">
          <strong class="brand__name">STIT AL WAFI</strong>
          <span class="brand__event">BOGOR</span>
        </span>
      </a>
      <nav class="site-header__desktop" aria-label="Navigasi utama">
        <ul class="nav" role="list">
          <li><a class="nav__link nav__link--active" href="index.php">Event</a></li>
          <li><a class="nav__link" href="sertifikat.php">E-Sertifikat</a></li>
          <li><a class="nav__link" href="#kontak">Kontak</a></li>
        </ul>
      </nav>
      <a class="btn btn--gold nav__cta" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer">Hubungi Panitia</a>
      <button type="button" class="site-header__toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Buka menu navigasi">
        <?= icon('chevron') ?>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <div class="container">
        <ul class="nav nav--mobile" role="list">
          <li><a class="nav__link" href="index.php">Event</a></li>
          <li><a class="nav__link" href="sertifikat.php">E-Sertifikat</a></li>
          <li><a class="nav__link" href="#kontak">Kontak</a></li>
        </ul>
      </div>
    </div>
  </header>

  <main>
    <section class="listing-hero">
      <div class="container">
        <p class="listing-hero__eyebrow"><span class="pulse-dot" aria-hidden="true"></span>AGENDA &amp; PELATIHAN</p>
        <h1 class="listing-hero__title">Temukan Event <span>&amp; Pelatihan</span></h1>
        <p class="listing-hero__desc">Jelajahi seluruh kegiatan <?= e($event['organizer_short']) ?> — dari yang sedang berlangsung, akan datang, hingga arsip event yang sudah selesai.</p>
        <div class="listing-stats">
          <div><strong><?= count($events) ?></strong><span>Total Event</span></div>
          <div><strong><?= $counts['upcoming'] ?></strong><span>Akan Datang</span></div>
          <div><strong><?= $counts['ongoing'] ?></strong><span>Berlangsung</span></div>
          <div><strong><?= $counts['past'] ?></strong><span>Selesai</span></div>
        </div>
      </div>
    </section>

    <section class="section listing-section" id="event-list">
      <div class="container">
        <div class="filter-tabs" id="filter-tabs" role="group" aria-label="Filter status event">
          <button class="filter-tab filter-tab--active" type="button" data-filter="all">Semua Event</button>
          <button class="filter-tab" type="button" data-filter="ongoing">Sedang Berlangsung</button>
          <button class="filter-tab" type="button" data-filter="upcoming">Akan Datang</button>
          <button class="filter-tab" type="button" data-filter="past">Sudah Berlangsung</button>
        </div>

        <?php foreach ($groups as $key => $group): ?>
          <?php $items = array_values(array_filter($events, static fn($item) => event_status($item) === $key)); ?>
          <section class="event-section" data-group="<?= $key ?>">
            <div class="event-section__head">
              <div>
                <h2><?= e($group['label']) ?></h2>
                <p><?= e($group['note']) ?></p>
              </div>
              <span class="event-section__count"><?= count($items) ?> event</span>
            </div>

            <?php if (count($items) === 0): ?>
              <div class="event-empty">Belum ada event pada kategori ini.</div>
            <?php else: ?>
              <div class="event-grid">
                <?php foreach ($items as $item): ?>
                  <a class="event-card" href="event.php?slug=<?= e($item['slug']) ?>">
                    <div class="event-card__thumb">
                      <img src="<?= e($item['flyer']) ?>" alt="Flyer <?= e($item['title']) ?>" loading="lazy">
                      <span class="event-card__badge event-card__badge--<?= event_status($item) ?>"><?= e(event_status_label(event_status($item))) ?></span>
                    </div>
                    <div class="event-card__body">
                      <span class="event-card__category"><?= e($item['category']) ?></span>
                      <h3><?= e($item['title']) ?></h3>
                      <p class="event-card__date"><?= icon('calendar') ?> <?= e(event_date_short($item)) ?> · <?= e($item['time']) ?></p>
                      <p class="event-card__summary"><?= e($item['summary']) ?></p>
                      <span class="event-card__cta">Lihat Detail Event <?= icon('arrow') ?></span>
                    </div>
                  </a>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </section>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="section section--muted" id="kontak">
      <div class="container contact-band">
        <div>
          <p class="section-heading__eyebrow">Butuh Informasi?</p>
          <h2 class="section-heading__title">Hubungi Panitia</h2>
          <p class="section-heading__desc">Tanya jadwal, cara pendaftaran, atau masalah sertifikat — kami siap membantu.</p>
        </div>
        <div class="contact-band__actions">
          <a class="btn btn--gold" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer"><?= icon('whatsapp') ?> <?= e($contact['whatsapp']) ?></a>
          <a class="btn btn--outline" href="sertifikat.php"><?= icon('check') ?> Cek E-Sertifikat</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <span class="brand__mark brand__mark--icon" aria-hidden="true"><img src="assets/stit-icon.png" alt=""></span>
        <div><strong>STIT AL WAFI</strong><p>BOGOR</p></div>
      </div>
      <p class="site-footer__copy"><?= e(site_credit()) ?></p>
      <div class="site-footer__links">
        <a href="sertifikat.php"><?= icon('check') ?> E-Sertifikat</a>
      </div>
    </div>
  </footer>

  <a class="floating-wa" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer" aria-label="Hubungi panitia via WhatsApp"><?= icon('whatsapp') ?></a>
</div>
</body>
</html>
