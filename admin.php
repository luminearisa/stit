<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/data.php';
require_once __DIR__ . '/lib/registrations.php';
require_once __DIR__ . '/lib/ui.php';

$theme = theme_style($event);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Pendaftar — <?= e($event['organizer_short']) ?></title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="stylesheet" href="assets/event.css">
  <script src="assets/app.js" defer></script>
  <script>
    window.ADMIN_STATUS_LABELS = <?= json_encode($status_labels, JSON_UNESCAPED_UNICODE) ?>;
    window.ADMIN_CSV_COLUMNS = <?= json_encode(csv_columns(), JSON_UNESCAPED_UNICODE) ?>;
  </script>
</head>
<body>
<div class="event-page admin-page" style="<?= $theme ?>">
  <main class="admin-main">
    <div class="container">
      <a class="admin-back" href="/">← Kembali ke halaman event</a>
      <p class="section-heading__eyebrow">Panel Internal</p>
      <h1 class="section-heading__title">Data Pendaftar Pelatihan</h1>
      <p class="section-heading__desc">Kelola pendaftaran, cek status pembayaran, dan unduh data peserta.</p>

      <div id="admin-login-view" class="admin-login">
        <h3>Akses Admin</h3>
        <p>Masukkan username dan password untuk melihat data pendaftar.</p>
        <form id="admin-login-form" class="admin-login__form">
          <div class="form-field">
            <label for="admin-user">Username</label>
            <input id="admin-user" type="text" required autocomplete="username" placeholder="Username">
          </div>
          <div class="form-field">
            <label for="admin-pass">Password</label>
            <input id="admin-pass" type="password" required autocomplete="current-password" placeholder="Password">
          </div>
          <p class="form-error" id="admin-login-error" role="alert" hidden></p>
          <button class="btn btn--gold btn--block" type="submit">Masuk</button>
        </form>
      </div>

      <div id="admin-panel" class="admin-panel" hidden>
        <div class="admin-toolbar">
          <div id="admin-count"></div>
          <div class="admin-toolbar__actions">
            <input class="admin-search" id="admin-search" type="search" placeholder="Cari nama, email, WhatsApp, instansi..." aria-label="Cari pendaftar">
            <button class="btn btn--outline" type="button" id="admin-refresh">Refresh</button>
            <button class="btn btn--outline" type="button" id="admin-export">Ekspor CSV</button>
            <button class="btn btn--danger" type="button" id="admin-clear">Hapus Semua</button>
            <button class="btn btn--outline" type="button" id="admin-logout">Keluar</button>
          </div>
        </div>

        <p class="form-error" id="admin-error" role="alert" hidden></p>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <?php foreach ($admin_columns as $column): ?>
                  <th><?= e($column['label']) ?></th>
                <?php endforeach; ?>
                <th>Daftar</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="admin-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>
</body>
</html>
