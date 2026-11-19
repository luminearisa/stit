<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/data.php';
require_once __DIR__ . '/lib/ui.php';

function title_html(array $line): string
{
    $text = e($line['text']);
    if (!empty($line['highlight'])) {
        $highlight = e($line['highlight']);
        return str_replace($highlight, '<em>' . $highlight . '</em>', $text);
    }
    return $text;
}

$theme = theme_style($event);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($event['full_title']) ?> | <?= e($event['organizer_short']) ?></title>
  <meta name="description" content="<?= e($event['description']) ?>">
  <link rel="stylesheet" href="assets/event.css">
  <script src="assets/app.js" defer></script>
</head>
<body>
<div class="event-page" id="top" style="<?= $theme ?>">

  <!-- ============ HEADER ============ -->
  <header class="site-header" id="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="#top" aria-label="<?= e($event['organizer_short']) ?>">
        <span class="brand__mark" aria-hidden="true">PI</span>
        <span class="brand__text">
          <strong class="brand__name"><?= e($event['organizer_short']) ?></strong>
          <span class="brand__event">Elevating People</span>
        </span>
      </a>
      <nav class="site-header__desktop" aria-label="Navigasi utama">
        <ul class="nav" role="list">
          <?php foreach ($nav_links as $link): ?>
            <li><a class="nav__link" href="<?= e($link['href']) ?>"><?= e($link['label']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </nav>
      <a class="btn btn--gold nav__cta" href="sertifikat.php">E-Sertifikat</a>
      <button type="button" class="site-header__toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Buka menu navigasi">
        <?= icon('chevron') ?>
      </button>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <div class="container">
        <ul class="nav nav--mobile" role="list">
          <?php foreach ($nav_links as $link): ?>
            <li><a class="nav__link" href="<?= e($link['href']) ?>"><?= e($link['label']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </header>

  <main>
    <!-- ============ HERO ============ -->
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <div class="hero__glow hero__glow--one" aria-hidden="true"></div>
      <div class="hero__glow hero__glow--two" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div class="hero__content">
          <p class="hero__eyebrow"><span class="pulse-dot" aria-hidden="true"></span><?= e($event['eyebrow']) ?></p>
          <h1 class="hero__title" id="hero-title">
            <span class="hero__title-kicker"><?= e($event['title_kicker']) ?></span>
            <?php foreach ($event['title_lines'] as $line): ?>
              <span class="<?= $line['tone'] === 'accent' ? 'hero__title-accent' : 'hero__title-main' ?>"><?= title_html($line) ?></span>
            <?php endforeach; ?>
          </h1>
          <p class="hero__subtitle"><?= e($event['subtitle']) ?></p>

          <ul class="hero__meta" role="list">
            <li><?= icon('calendar') ?><span><small>Tanggal</small><?= e($event['date']) ?></span></li>
            <li><?= icon('clock') ?><span><small>Waktu</small><?= e($event['time']) ?></span></li>
            <li><?= icon('video') ?><span><small>Platform</small><?= e($event['platform']) ?></span></li>
          </ul>

          <div class="countdown" id="countdown" data-target="<?= e($event['countdown_to']) ?>"></div>

          <div class="hero__actions">
            <a class="btn btn--gold" href="#daftar">Daftar Sekarang</a>
            <a class="btn btn--outline" href="#biaya">Lihat Biaya</a>
          </div>

          <div class="hero__organizers">
            <span>Diselenggarakan oleh</span>
            <strong><?= e($event['organizer']) ?></strong>
          </div>
        </div>

        <div class="hero__media">
          <figure class="flyer flyer--image">
            <img class="flyer__image" src="<?= flyer_src($event) ?>" alt="Flyer <?= e($event['full_title']) ?>">
            <figcaption class="hero__flyer-caption">Flyer resmi · <?= e($event['organizer']) ?></figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ============ INFORMASI ============ -->
    <section class="section" id="informasi" aria-labelledby="informasi-title">
      <div class="container">
        <div class="section-heading">
          <p class="section-heading__eyebrow">Tentang Acara</p>
          <h2 class="section-heading__title" id="informasi-title">Informasi Pelatihan</h2>
          <p class="section-heading__desc"><?= e($event['description']) ?></p>
        </div>
        <div class="info-grid">
          <?php
          $info_items = [
              ['calendar', 'Tanggal', $event['date']],
              ['clock', 'Waktu', $event['time']],
              ['video', 'Format', 'Online · ' . $event['platform']],
              ['users', 'Penyelenggara', $event['organizer']],
          ];
          foreach ($info_items as [$ic, $label, $value]): ?>
            <article class="info-card">
              <span class="info-card__icon"><?= icon($ic) ?></span>
              <div>
                <span class="info-card__label"><?= e($label) ?></span>
                <strong class="info-card__value"><?= e($value) ?></strong>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="info-note">
          <?= icon('sparkles') ?>
          <p><strong>Siapa yang sebaiknya mengikuti?</strong> Pimpinan, dosen, tenaga kependidikan, unit penjaminan mutu, serta siapa pun yang terlibat dalam penyusunan dan pengelolaan SPMI di perguruan tinggi.</p>
        </div>
      </div>
    </section>

    <!-- ============ BIAYA ============ -->
    <section class="section section--muted" id="biaya" aria-labelledby="biaya-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Investasi Ilmu</p>
          <h2 class="section-heading__title" id="biaya-title">Biaya Pendaftaran</h2>
          <p class="section-heading__desc">Pilih paket yang sesuai. Pendaftaran kelompok lebih hemat per peserta.</p>
        </div>
        <div class="pricing-grid">
          <?php foreach ($price_tiers as $tier): ?>
            <article class="price-card<?= $tier['featured'] ? ' price-card--featured' : '' ?>">
              <?php if ($tier['featured']): ?><span class="price-card__badge">Paling Hemat</span><?php endif; ?>
              <h3 class="price-card__name"><?= e($tier['label']) ?></h3>
              <p class="price-card__price"><?= e(rupiah($tier['price'])) ?><small><?= e($tier['unit']) ?></small></p>
              <p class="price-card__note"><?= e($tier['note']) ?></p>
              <ul class="price-card__list" role="list">
                <?php foreach ($facilities as $facility): ?>
                  <li><?= icon('check') ?><?= e($facility) ?></li>
                <?php endforeach; ?>
              </ul>
              <a class="btn <?= $tier['featured'] ? 'btn--gold' : 'btn--outline' ?> btn--block" href="#daftar">Daftar Sekarang</a>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="payment-card">
          <div class="payment-card__icon"><?= icon('sparkles') ?></div>
          <div>
            <h3>Cara Pembayaran</h3>
            <p>Transfer ke rekening <strong><?= e($payment['bank']) ?></strong> <strong class="payment-card__number"><?= e($payment['account_number']) ?></strong> a.n. <strong><?= e($payment['account_holder']) ?></strong>. Konfirmasi pembayaran melalui WhatsApp panitia di <strong><?= e($contact['whatsapp']) ?></strong>.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ PEMATERI ============ -->
    <section class="section" id="pemateri" aria-labelledby="pemateri-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Narasumber</p>
          <h2 class="section-heading__title" id="pemateri-title">Pengisi Acara</h2>
          <p class="section-heading__desc">Belajar langsung dari praktisi yang mendampingi perguruan tinggi dalam penjaminan mutu.</p>
        </div>
        <div class="speaker-grid">
          <?php foreach ($speakers as $speaker): ?>
            <article class="speaker-card">
              <div class="speaker-card__portrait" aria-hidden="true"><span><?= e($speaker['initials']) ?></span></div>
              <div class="speaker-card__body">
                <p class="speaker-card__role"><?= e($speaker['role']) ?></p>
                <h3><?= e($speaker['name']) ?></h3>
                <p class="speaker-card__bio"><?= e($speaker['bio']) ?></p>
                <ul class="speaker-card__topics" role="list">
                  <?php foreach ($speaker['topics'] as $topic): ?><li><?= e($topic) ?></li><?php endforeach; ?>
                </ul>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ============ MANFAAT ============ -->
    <section class="section section--muted" id="manfaat" aria-labelledby="manfaat-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Dampak bagi Peserta</p>
          <h2 class="section-heading__title" id="manfaat-title">Kegunaan Mengikuti Pelatihan</h2>
          <p class="section-heading__desc">Bukan sekadar teori — peserta pulang dengan kerangka kerja yang bisa langsung diterapkan.</p>
        </div>
        <div class="benefit-grid">
          <?php foreach ($benefits as $index => $benefit): ?>
            <article class="benefit-card">
              <span class="benefit-card__index">0<?= $index + 1 ?></span>
              <span class="benefit-card__icon"><?= icon($benefit['icon']) ?></span>
              <h3><?= e($benefit['title']) ?></h3>
              <p><?= e($benefit['description']) ?></p>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="facility-strip">
          <span class="facility-strip__label">Fasilitas peserta:</span>
          <?php foreach ($facilities as $facility): ?>
            <span class="facility-strip__item"><?= icon('check') ?><?= e($facility) ?></span>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ============ AGENDA ============ -->
    <section class="section" id="agenda" aria-labelledby="agenda-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Rangkaian Acara</p>
          <h2 class="section-heading__title" id="agenda-title">Agenda Pelatihan</h2>
          <p class="section-heading__desc">Gambaran alur sesi selama kurang lebih dua jam.</p>
        </div>
        <ol class="timeline">
          <?php foreach ($agenda as $index => $item): ?>
            <li class="timeline__item">
              <span class="timeline__marker" aria-hidden="true"><?= $index + 1 ?></span>
              <span class="timeline__time"><?= e($item['time']) ?></span>
              <div class="timeline__content">
                <h3><?= e($item['title']) ?></h3>
                <p><?= e($item['description']) ?></p>
              </div>
            </li>
          <?php endforeach; ?>
        </ol>
      </div>
    </section>

    <!-- ============ FORM PENDAFTARAN ============ -->
    <section class="section section--register" id="daftar" aria-labelledby="daftar-title">
      <div class="container register-grid">
        <div class="register-aside">
          <p class="section-heading__eyebrow">Kuota Terbatas</p>
          <h2 class="section-heading__title" id="daftar-title">Daftar Sekarang</h2>
          <p class="register-aside__desc">Isi formulir berikut dengan data yang benar. Panitia akan menghubungi Anda melalui WhatsApp untuk konfirmasi pembayaran.</p>
          <div class="register-aside__steps">
            <?php foreach (['Isi formulir pendaftaran', 'Transfer ke rekening BCA', 'Konfirmasi via WhatsApp', 'Terima link Zoom & materi'] as $index => $step): ?>
              <div class="register-step"><span><?= $index + 1 ?></span><p><?= e($step) ?></p></div>
            <?php endforeach; ?>
          </div>
          <div class="register-aside__contact">
            <span class="register-aside__contact-label">Hubungi panitia</span>
            <a href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer"><?= icon('whatsapp') ?> <?= e($contact['whatsapp']) ?></a>
            <a href="<?= e($contact['instagram_url']) ?>" target="_blank" rel="noopener noreferrer"><?= icon('instagram') ?> <?= e($contact['instagram']) ?></a>
          </div>
        </div>

        <div class="register-form-card">
          <div class="register-form-card__head">
            <h3>Formulir Pendaftaran</h3>
            <p>Semua field bertanda * wajib diisi.</p>
          </div>
          <form class="registration-form" id="registration-form" novalidate>
            <?php foreach ($registration_fields as $field): ?>
              <?php
              $id = 'reg-' . $field['key'];
              $extra = '';
              if (!empty($field['suggestions'])) {
                  $extra .= ' list="options-' . e($field['key']) . '"';
              }
              if (isset($field['min'])) $extra .= ' minlength="' . (int)$field['min'] . '"';
              if (isset($field['max'])) $extra .= ' maxlength="' . (int)$field['max'] . '"';
              ?>
              <?php if (!empty($field['suggestions'])): ?>
                <datalist id="options-<?= e($field['key']) ?>">
                  <?php foreach ($field['suggestions'] as $suggestion): ?><option value="<?= e($suggestion) ?>"></option><?php endforeach; ?>
                </datalist>
              <?php endif; ?>
              <div class="form-field<?= !empty($field['full']) ? ' form-field--full' : '' ?>">
                <label for="<?= e($id) ?>"><?= e($field['label']) ?> <?= !empty($field['required']) ? '<span>*</span>' : '' ?></label>
                <?php if ($field['type'] === 'textarea'): ?>
                  <textarea id="<?= e($id) ?>" name="<?= e($field['key']) ?>" rows="3" placeholder="<?= e($field['placeholder']) ?>" <?= $extra ?>></textarea>
                <?php else: ?>
                  <input id="<?= e($id) ?>" name="<?= e($field['key']) ?>" type="<?= e($field['type']) ?>" placeholder="<?= e($field['placeholder']) ?>" <?= $extra ?>>
                <?php endif; ?>
                <?php if (!empty($field['hint'])): ?><small class="form-hint form-hint--warning"><?= e($field['hint']) ?></small><?php endif; ?>
              </div>
            <?php endforeach; ?>

            <label class="form-consent">
              <input type="checkbox" id="reg-confirm" required>
              <span>Pastikan kembali email yang diisikan valid dan aktif serta tidak ada salah tulis. Kesalahan data bisa berdampak tidak terkirimnya e-sertifikat. Saya sudah memeriksa kembali Nama dan Alamat email, dan keduanya sudah benar. <strong>Sudah</strong></span>
            </label>

            <p class="form-error" id="form-error" role="alert" hidden></p>
            <button class="btn btn--gold btn--block" type="submit" id="form-submit">Kirim Pendaftaran</button>
          </form>
          <div class="form-success" id="form-success" role="status" hidden>
            <div class="form-success__icon"><?= icon('check') ?></div>
            <h3>Pendaftaran Berhasil!</h3>
            <p>Data pendaftaran Anda telah tersimpan. Panitia akan menghubungi Anda melalui WhatsApp untuk konfirmasi pembayaran.</p>
            <p class="form-success__id" id="form-success-id"></p>
            <a class="btn btn--outline" href="sertifikat.php">Cek &amp; Unduh E-Sertifikat</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FAQ ============ -->
    <section class="section" id="faq" aria-labelledby="faq-title">
      <div class="container faq-grid">
        <div class="faq-intro">
          <p class="section-heading__eyebrow">Pertanyaan Umum</p>
          <h2 class="section-heading__title" id="faq-title">Hal yang Sering Ditanyakan</h2>
          <p class="section-heading__desc">Masih ragu? Hubungi panitia melalui WhatsApp dan kami akan dengan senang hati membantu.</p>
          <a class="btn btn--outline" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer"><?= icon('whatsapp') ?> Hubungi Panitia</a>
        </div>
        <div class="faq-list">
          <?php foreach ($faqs as $index => $faq): ?>
            <details class="faq-item" <?= $index === 0 ? 'open' : '' ?>>
              <summary class="faq-item__question"><span><?= e($faq['question']) ?></span><?= icon('chevron') ?></summary>
              <p class="faq-item__answer"><?= e($faq['answer']) ?></p>
            </details>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <span class="brand__mark" aria-hidden="true">PI</span>
        <div><strong><?= e($event['organizer_short']) ?></strong><p>Elevating People</p></div>
      </div>
      <p class="site-footer__copy">© 2026 <?= e($event['organizer']) ?>. Seluruh hak cipta dilindungi.</p>
      <div class="site-footer__links">
        <a href="sertifikat.php"><?= icon('check') ?> E-Sertifikat</a>
        <a href="<?= e($contact['instagram_url']) ?>" target="_blank" rel="noopener noreferrer"><?= icon('instagram') ?> <?= e($contact['instagram']) ?></a>
      </div>
    </div>
  </footer>

  <a class="floating-wa" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer" aria-label="Hubungi panitia via WhatsApp"><?= icon('whatsapp') ?></a>
</div>
</body>
</html>
