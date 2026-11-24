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
  <script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js" defer></script>
  <script src="assets/app.js" defer></script>
  <script src="assets/admin-events.js" defer></script>
  <script src="assets/admin-certificates.js" defer></script>
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

      <!-- ============ SARAN & MASUKAN ============ -->
      <section class="admin-feedback" id="feedback-panel" hidden>
        <div class="admin-feedback__head">
          <div>
            <p class="section-heading__eyebrow">Masukan Peserta</p>
            <h2 class="section-heading__title">Saran &amp; Masukan</h2>
            <p class="section-heading__desc">Data saran tersimpan terpisah dari pendaftaran dan dikirim dari halaman event.</p>
          </div>
          <div class="admin-toolbar__actions">
            <span id="feedback-count"></span>
            <button class="btn btn--outline" type="button" id="feedback-refresh">Refresh</button>
            <button class="btn btn--outline" type="button" id="feedback-export">Ekspor CSV</button>
            <button class="btn btn--danger" type="button" id="feedback-clear">Hapus Semua</button>
          </div>
        </div>
        <p class="form-error" id="feedback-admin-error" role="alert" hidden></p>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Saran / Masukan</th>
                <th>Event</th>
                <th>Waktu</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="feedback-tbody"></tbody>
          </table>
        </div>
      </section>

      <!-- ============ EVENT GENERATOR ============ -->
      <section class="admin-events" id="event-generator" hidden>
        <div class="admin-events__head">
          <p class="section-heading__eyebrow">Event Baru</p>
          <h2 class="section-heading__title">Generate Event dari Flyer</h2>
          <p class="section-heading__desc">Upload flyer, sistem akan membaca informasinya otomatis. Koreksi hasilnya lalu klik Generate — event langsung tampil di halaman utama.</p>
        </div>

        <ol class="gen-steps" id="gen-steps">
          <li class="gen-step gen-step--active" data-step="1"><span>1</span> Upload Flyer</li>
          <li class="gen-step" data-step="2"><span>2</span> Koreksi Data</li>
          <li class="gen-step" data-step="3"><span>3</span> Selesai</li>
        </ol>

        <form class="event-gen-form" id="event-gen-form">
          <label class="gen-dropzone" id="gen-dropzone" for="gen-flyer">
            <span class="gen-dropzone__icon"><?= icon('sparkles') ?></span>
            <strong>Klik untuk memilih flyer</strong>
            <span class="gen-dropzone__hint">atau tarik file ke area ini · JPG/PNG/WebP · maks. 5 MB</span>
            <span class="gen-dropzone__filename" id="gen-filename">Belum ada file dipilih</span>
            <input id="gen-flyer" name="flyer" type="file" accept="image/jpeg,image/png,image/webp" required>
          </label>
          <button class="btn btn--gold" type="submit" id="gen-read-btn">Baca Flyer &amp; Isi Otomatis</button>
        </form>

        <div class="gen-progress" id="gen-progress" hidden>
          <div class="gen-progress__head">
            <span class="gen-progress__spinner" aria-hidden="true"></span>
            <span id="gen-progress-text">Menyiapkan OCR...</span>
          </div>
          <div class="gen-progress__track"><span id="gen-progress-bar"></span></div>
        </div>

        <div class="event-gen-preview" id="gen-preview" hidden>
          <div class="event-gen-preview__frame">
            <img id="gen-preview-img" alt="Pratinjau flyer yang di-upload">
          </div>
          <div class="event-gen-preview__note">
            <strong>Pratinjau flyer</strong>
            <p>Periksa hasil bacaan di bawah, lalu koreksi field yang belum tepat sebelum generate.</p>
          </div>
        </div>

        <p class="form-error" id="gen-error" role="alert" hidden></p>
        <p class="admin-notice" id="gen-status" role="status" hidden></p>

        <form class="event-gen-form event-gen-form--fields" id="event-create-form" hidden>
          <div class="event-gen-group">
            <h4>Informasi Utama</h4>
            <div class="form-grid">
              <div class="form-field form-field--full">
                <label for="ev-title">Judul Event <span>*</span></label>
                <input id="ev-title" name="title" type="text" required placeholder="Mis. Workshop Pelatihan Audit Mutu Internal">
              </div>
              <div class="form-field">
                <label for="ev-date">Tanggal <span>*</span></label>
                <input id="ev-date" name="date" type="text" required placeholder="Mis. Senin, 07 Desember 2026">
              </div>
              <div class="form-field">
                <label for="ev-time">Waktu <span>*</span></label>
                <input id="ev-time" name="time" type="text" required placeholder="Mis. 08.00 – 16.30 WIB">
              </div>
              <div class="form-field form-field--full">
                <label for="ev-location">Lokasi / Platform</label>
                <input id="ev-location" name="location" type="text" placeholder="Mis. Kampus B Al Wafi, Depok">
              </div>
              <div class="form-field form-field--full">
                <label for="ev-summary">Ringkasan</label>
                <textarea id="ev-summary" name="summary" rows="3" placeholder="Ringkasan singkat event"></textarea>
              </div>
            </div>
          </div>

          <div class="event-gen-group">
            <h4>Pembayaran &amp; Kontak</h4>
            <div class="form-grid">
              <div class="form-field">
                <label for="ev-price">Biaya (Rp)</label>
                <input id="ev-price" name="price" type="number" min="0" step="1000" placeholder="Mis. 499000">
              </div>
              <div class="form-field">
                <label for="ev-price-label">Label Biaya</label>
                <input id="ev-price-label" name="price_label" type="text" placeholder="Mis. Early Bird">
              </div>
              <div class="form-field">
                <label for="ev-speaker">Narasumber</label>
                <input id="ev-speaker" name="speaker" type="text" placeholder="Nama pemateri">
              </div>
              <div class="form-field">
                <label for="ev-whatsapp">WhatsApp Panitia</label>
                <input id="ev-whatsapp" name="whatsapp" type="text" placeholder="Mis. 0895 2721 7662">
              </div>
            </div>
          </div>

          <div class="event-gen-group">
            <h4>Section yang Ditampilkan</h4>
            <p class="form-hint">Matikan section yang tidak ada informasinya pada flyer — section itu tidak akan muncul di halaman event ini saja.</p>
            <div class="gen-sections">
              <label><input type="checkbox" name="sec_speakers" checked> Pemateri</label>
              <label><input type="checkbox" name="sec_pricing" checked> Biaya</label>
              <label><input type="checkbox" name="sec_benefits" checked> Manfaat</label>
              <label><input type="checkbox" name="sec_agenda" checked> Agenda</label>
              <label><input type="checkbox" name="sec_feedback" checked> Saran &amp; Masukan</label>
            </div>
          </div>

          <input type="hidden" id="ev-flyer" name="flyer">
          <div class="event-gen-actions">
            <button class="btn btn--gold" type="submit" id="event-generate-btn">Generate Event</button>
            <button class="btn btn--outline" type="button" id="event-cancel-btn">Batal</button>
          </div>
        </form>

        <div class="admin-generated">
          <h3>Event yang sudah dibuat <span id="generated-count"></span></h3>
          <div id="generated-list"></div>
        </div>
      </section>

      <!-- ============ TEMPLATE SERTIFIKAT ============ -->
      <section class="admin-certificates" id="certificate-panel" hidden>
        <div class="admin-events__head">
          <p class="section-heading__eyebrow">Sertifikat per Event</p>
          <h2 class="section-heading__title">Template Sertifikat</h2>
          <p class="section-heading__desc">Upload desain sertifikat tiap event, lalu tentukan posisi nama peserta. Nama akan diisi otomatis dari data pendaftar yang terkonfirmasi.</p>
        </div>

        <div class="cert-admin-bar">
          <label for="cert-event-slug">Event</label>
          <select id="cert-event-slug">
            <?php foreach ($events as $item): ?>
              <option value="<?= e($item['slug']) ?>"><?= e($item['title']) ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <form class="cert-upload-form" id="cert-upload-form">
          <label class="gen-dropzone gen-dropzone--small" id="cert-dropzone" for="cert-file">
            <span class="gen-dropzone__icon"><?= icon('check') ?></span>
            <strong>Pilih gambar template sertifikat</strong>
            <span class="gen-dropzone__hint">JPG/PNG/WebP · maks. 5 MB</span>
            <span class="gen-dropzone__filename" id="cert-filename">Belum ada file dipilih</span>
            <input id="cert-file" type="file" accept="image/jpeg,image/png,image/webp" required>
          </label>
          <button class="btn btn--gold" type="submit" id="cert-upload-btn">Upload Template</button>
        </form>

        <p class="form-error" id="cert-admin-error" role="alert" hidden></p>
        <p class="admin-notice" id="cert-admin-status" role="status" hidden></p>

        <div class="cert-editor" id="cert-editor" hidden>
          <div class="cert-editor__preview">
            <img id="cert-preview-img" alt="Pratinjau template sertifikat">
            <small>Klik pada gambar untuk menentukan posisi nama peserta.</small>
          </div>
          <div class="cert-editor__fields">
            <h4>Posisi Nama Peserta</h4>
            <div class="form-grid">
              <div class="form-field">
                <label for="cert-box-x">X (%)</label>
                <input id="cert-box-x" type="number" min="0" max="100" step="1" value="50">
              </div>
              <div class="form-field">
                <label for="cert-box-y">Y (%)</label>
                <input id="cert-box-y" type="number" min="0" max="100" step="1" value="45">
              </div>
              <div class="form-field">
                <label for="cert-box-size">Ukuran Font</label>
                <input id="cert-box-size" type="number" min="12" max="120" step="1" value="42">
              </div>
              <div class="form-field">
                <label for="cert-box-color">Warna</label>
                <input id="cert-box-color" type="color" value="#0b2545">
              </div>
              <div class="form-field">
                <label for="cert-box-align">Perataan</label>
                <select id="cert-box-align">
                  <option value="left">Kiri</option>
                  <option value="center" selected>Tengah</option>
                  <option value="right">Kanan</option>
                </select>
              </div>
              <div class="form-field">
                <label for="cert-box-width">Lebar Maks (%)</label>
                <input id="cert-box-width" type="number" min="20" max="100" step="1" value="70">
              </div>
            </div>
            <div class="event-gen-actions">
              <button class="btn btn--gold" type="button" id="cert-save-btn">Simpan Posisi</button>
              <button class="btn btn--danger" type="button" id="cert-delete-btn">Hapus Template</button>
            </div>
          </div>
        </div>

        <div class="admin-generated">
          <h3>Status template per event</h3>
          <div id="cert-list"></div>
        </div>
      </section>
    </div>
  </main>
</div>
</body>
</html>
