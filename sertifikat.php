<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/data.php';
require_once __DIR__ . '/lib/ui.php';

$theme = theme_style($event);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Sertifikat — <?= e($event['full_title']) ?></title>
  <meta name="description" content="Cek status pendaftaran dan unduh e-sertifikat pelatihan Anda.">
  <link rel="stylesheet" href="assets/event.css">
  <script src="assets/app.js" defer></script>
  <script>
    window.EVENT_DATA = <?= json_encode([
        'title_lines' => $event['title_lines'],
        'date' => $event['date'],
        'organizer' => $event['organizer'],
        'venue' => $event['location'],
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
    window.EVENT_CERTIFICATE = <?= json_encode($certificate, JSON_UNESCAPED_UNICODE) ?>;
  </script>
</head>
<body>
<div class="event-page" style="<?= $theme ?>">
  <header class="site-header">
    <div class="container site-header__inner">
      <a class="site-header__back" href="/"><?= icon('back') ?> Kembali ke halaman event</a>
      <span class="site-header__back-title">E-Sertifikat</span>
    </div>
  </header>

  <main class="check-main">
    <div class="container check-container">
      <div class="section-heading section-heading--center">
        <p class="section-heading__eyebrow">E-Sertifikat</p>
        <h1 class="section-heading__title">Cek &amp; Unduh E-Sertifikat</h1>
        <p class="section-heading__desc">Cukup masukkan nomor WhatsApp yang dipakai saat mendaftar. E-sertifikat hanya dapat diakses oleh pendaftar yang statusnya sudah terkonfirmasi.</p>
      </div>

      <div class="certificate-wrap">
        <form class="check-form" id="certificate-form" novalidate>
          <div class="form-field">
            <label for="cert-whatsapp">Nomor WhatsApp <span>*</span></label>
            <input id="cert-whatsapp" name="whatsapp" type="tel" required placeholder="Nomor yang dipakai saat mendaftar, mis. 081234567890">
            <small class="form-hint">Sertifikat hanya tersedia untuk pendaftar yang sudah terkonfirmasi.</small>
          </div>
          <button class="btn btn--gold btn--block" type="submit" id="cert-submit">Cek E-Sertifikat</button>
        </form>

        <p class="form-error" id="cert-error" role="alert" hidden></p>
        <p class="certificate-notice" id="cert-notice" role="status" hidden></p>

        <div class="certificate-result" id="cert-result" hidden>
          <div class="check-result__head">
            <h3 id="cert-name"></h3>
            <span class="status-badge status-badge--terkonfirmasi" id="cert-badge">Terkonfirmasi</span>
          </div>
          <dl class="check-result__grid" id="cert-grid"></dl>
          <div class="certificate-preview" id="cert-preview"></div>
          <div class="certificate-actions">
            <button class="btn btn--gold" type="button" id="download-png"><?= icon('download') ?> Unduh PNG</button>
            <button class="btn btn--outline" type="button" id="download-svg"><?= icon('download') ?> Unduh SVG</button>
          </div>
        </div>
      </div>

      <p class="check-contact">Butuh bantuan? Hubungi panitia di
        <a href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer"><?= e($contact['whatsapp']) ?></a>
      </p>
    </div>
  </main>
</div>
</body>
</html>
