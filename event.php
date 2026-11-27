<?php
declare(strict_types=1);

require_once __DIR__ . '/lib/data.php';
require_once __DIR__ . '/lib/ui.php';

// Ambil event berdasarkan slug dari URL.
$slug = isset($_GET['slug']) && is_string($_GET['slug']) ? $_GET['slug'] : '';
$detail = get_event($slug);
if (!$detail) {
    header('Location: /');
    exit;
}
$event = array_merge($event, $detail);

// Data detail mengikuti event yang dipilih (fallback ke data default).
$speakers    = $detail['speakers'] ?? $speakers;
$price_tiers = $detail['price_tiers'] ?? $price_tiers;
$facilities  = $detail['facilities'] ?? $facilities;
$benefits    = $detail['benefits'] ?? $benefits;
$agenda      = $detail['agenda'] ?? $agenda;
$faqs        = $detail['faqs'] ?? $faqs;
$contact     = $detail['contact'] ?? $contact;
$certificate = $detail['certificate'] ?? $certificate;
$payment     = $detail['payment'] ?? $payment;

// Section yang disembunyikan untuk event ini (dari hasil generate flyer).
$sectionFlags = array_merge([
    'speakers' => true, 'pricing' => true, 'benefits' => true,
    'agenda' => true, 'feedback' => true,
], $event['sections'] ?? []);
// Kompatibilitas dengan event lama yang masih memakai kunci 'faq'.
$sectionFlags['feedback'] = $event['sections']['feedback']
    ?? $event['sections']['faq']
    ?? $sectionFlags['feedback'];

$navMap = [
    '#biaya' => 'pricing', '#pemateri' => 'speakers', '#manfaat' => 'benefits',
    '#agenda' => 'agenda', '#saran' => 'feedback',
];
$nav_links = array_values(array_filter(
    $nav_links,
    static fn($link) => !isset($navMap[$link['href']]) || !empty($sectionFlags[$navMap[$link['href']]])
));
$nav_links = array_merge([['href' => '/', 'label' => 'Semua Event']], $nav_links);

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
      <a class="brand" href="/" aria-label="STIT Al Wafi Bogor">
        <span class="brand__mark brand__mark--icon" aria-hidden="true"><img src="assets/stit-icon.png" alt=""></span>
        <span class="brand__text">
          <strong class="brand__name">STIT AL WAFI</strong>
          <span class="brand__event">BOGOR</span>
        </span>
      </a>
      <nav class="site-header__desktop" aria-label="Navigasi utama">
        <ul class="nav" role="list">
          <?php foreach ($nav_links as $link): ?>
            <li><a class="nav__link" href="<?= e($link['href']) ?>"><?= e($link['label']) ?></a></li>
          <?php endforeach; ?>
        </ul>
      </nav>
      <a class="btn btn--gold nav__cta" href="sertifikat?event=<?= e($event['slug']) ?>">E-Sertifikat</a>
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
              <span class="<?= ($line['tone'] ?? 'default') === 'accent' ? 'hero__title-accent' : 'hero__title-main' ?>"><?= title_html($line) ?></span>
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
          <h2 class="section-heading__title" id="informasi-title"><?= e($event['info_title']) ?></h2>
          <p class="section-heading__desc"><?= e($event['description']) ?></p>
        </div>
        <div class="info-grid">
          <?php
          $info_items = [
              ['calendar', 'Tanggal', $event['date']],
              ['clock', 'Waktu', $event['time']],
              ['video', 'Format', $event['platform']],
              ['map-pin', 'Lokasi', $event['location']],
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
          <p><strong>Siapa yang sebaiknya mengikuti?</strong> <?= e($event['audience']) ?></p>
        </div>
      </div>
    </section>

    <!-- ============ BIAYA ============ -->
    <?php if (!empty($sectionFlags['pricing'])): ?>
    <section class="section section--muted" id="biaya" aria-labelledby="biaya-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Investasi Ilmu</p>
          <h2 class="section-heading__title" id="biaya-title">Biaya Pendaftaran</h2>
          <p class="section-heading__desc"><?= e($event['pricing_note']) ?></p>
        </div>
        <div class="pricing-grid">
          <?php foreach ($price_tiers as $tier): ?>
            <article class="price-card<?= $tier['featured'] ? ' price-card--featured' : '' ?>">
              <?php if ($tier['featured']): ?><span class="price-card__badge"><?= e($tier['featured_label'] ?? 'Paling Hemat') ?></span><?php endif; ?>
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
        <?php
        $paymentIsBsi = strtoupper((string) ($payment['bank'] ?? '')) === 'BSI';
        ob_start();
        if ($paymentIsBsi):
        ?>
          <h3>Cara pembayaran melalui Bank Syariah Indonesia (BSI)</h3>
          <ul class="payment-card__lines">
            <li>Transfer ke rekening <strong>BSI <?= e($payment['account_number']) ?></strong> a.n. <strong><?= e($payment['account_holder']) ?></strong></li>
            <li>Transfer melalui ATM kode bank BSI <strong>(451)<?= e($payment['account_number']) ?></strong></li>
          </ul>
          <p>Konfirmasi pembayaran melalui WhatsApp panitia di <strong><?= e($contact['whatsapp']) ?></strong>.</p>
        <?php else: ?>
          <h3>Cara Pembayaran</h3>
          <p>Transfer ke rekening <strong><?= e($payment['bank']) ?></strong> <strong class="payment-card__number"><?= e($payment['account_number']) ?></strong> a.n. <strong><?= e($payment['account_holder']) ?></strong>. Konfirmasi pembayaran melalui WhatsApp panitia di <strong><?= e($contact['whatsapp']) ?></strong>.</p>
        <?php endif; ?>
        <?php $paymentDetails = ob_get_clean(); ?>

        <div class="payment-card">
          <?php if ($paymentIsBsi): ?>
            <img class="payment-card__logo" src="assets/logo-bsi.png" alt="Logo Bank Syariah Indonesia">
          <?php else: ?>
            <div class="payment-card__icon"><?= icon('sparkles') ?></div>
          <?php endif; ?>
          <div><?= $paymentDetails ?></div>
        </div>
      </div>
    </section>
    <?php endif; ?>

    <!-- ============ PEMATERI ============ -->
    <?php if (!empty($sectionFlags['speakers']) && !empty($speakers)): ?>
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
    <?php endif; ?>

    <!-- ============ MANFAAT ============ -->
    <?php if (!empty($sectionFlags['benefits'])): ?>
    <section class="section section--muted" id="manfaat" aria-labelledby="manfaat-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Dampak bagi Peserta</p>
          <h2 class="section-heading__title" id="manfaat-title"><?= e($event['benefits_title']) ?></h2>
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
    <?php endif; ?>

    <!-- ============ AGENDA ============ -->
    <?php if (!empty($sectionFlags['agenda'])): ?>
    <section class="section" id="agenda" aria-labelledby="agenda-title">
      <div class="container">
        <div class="section-heading section-heading--center">
          <p class="section-heading__eyebrow">Rangkaian Acara</p>
          <h2 class="section-heading__title" id="agenda-title"><?= e($event['agenda_title']) ?></h2>
          <p class="section-heading__desc"><?= e($event['agenda_note']) ?></p>
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
    <?php endif; ?>

    <!-- ============ FORM PENDAFTARAN ============ -->
    <section class="section section--register" id="daftar" aria-labelledby="daftar-title">
      <div class="container register-grid">
        <div class="register-aside">
          <p class="section-heading__eyebrow"><?= e($event['register_label']) ?></p>
          <h2 class="section-heading__title" id="daftar-title">Daftar Sekarang</h2>
          <p class="register-aside__desc">Isi formulir berikut dengan data yang benar. Panitia akan menghubungi Anda melalui WhatsApp untuk konfirmasi pembayaran.</p>
          <div class="register-aside__steps">
            <?php foreach (['Isi formulir pendaftaran', 'Transfer ke rekening ' . $payment['bank'], 'Konfirmasi via WhatsApp'] as $index => $step): ?>
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
            <input type="hidden" name="event_slug" value="<?= e($event['slug']) ?>">
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
            <button class="btn btn--outline js-open-payment" type="button">Konfirmasi Pembayaran</button>
          </div>

          <div class="wa-group-modal" id="wa-group-modal" role="dialog" aria-modal="true" aria-labelledby="wa-group-title" hidden>
            <div class="wa-group-modal__backdrop" data-wa-close></div>
            <div class="wa-group-modal__card" role="document">
              <button class="wa-group-modal__close" type="button" data-wa-close aria-label="Tutup">&times;</button>
              <div class="wa-group-modal__icon"><?= icon('whatsapp') ?></div>
              <h3 id="wa-group-title">Gabung Grup WhatsApp</h3>
              <p>Pendaftaran Anda berhasil. Silakan gabung grup WhatsApp panitia untuk informasi dan koordinasi lebih lanjut.</p>
              <a class="btn btn--gold btn--block" href="<?= e($wa_group_link) ?>" target="_blank" rel="noopener noreferrer">Join Grup WhatsApp</a>
              <button class="btn btn--outline btn--block js-open-payment" type="button">Konfirmasi Pembayaran</button>
            </div>
          </div>

          <div class="payment-proof-modal" id="payment-proof-modal" role="dialog" aria-modal="true" aria-labelledby="proof-title" hidden>
            <div class="payment-proof-modal__backdrop" data-proof-close></div>
            <div class="payment-proof-modal__card" role="document">
              <button class="payment-proof-modal__close" type="button" data-proof-close aria-label="Tutup">&times;</button>
              <h3 id="proof-title">Konfirmasi Pembayaran</h3>
              <div class="payment-proof-modal__info"><?= $paymentDetails ?></div>
              <form id="payment-proof-form" novalidate>
                <input type="hidden" id="proof-reg-id" name="id">
                <label class="form-field">
                  <span>Bukti Pembayaran <em>(JPG/PNG/WebP/PDF, maks. 5 MB)</em></span>
                  <input type="file" id="proof-file" name="proof" accept="image/jpeg,image/png,image/webp,application/pdf" required>
                </label>
                <p class="form-error" id="proof-error" role="alert" hidden></p>
                <p class="form-success-note" id="proof-success" role="status" hidden>Bukti pembayaran berhasil dikirim. Admin akan melihatnya pada dashboard.</p>
                <button class="btn btn--gold btn--block" type="submit" id="proof-submit">Upload Bukti Pembayaran</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SARAN & MASUKAN ============ -->
    <?php if (!empty($sectionFlags['feedback'])): ?>
    <section class="section" id="saran" aria-labelledby="saran-title">
      <div class="container faq-grid">
        <div class="faq-intro">
          <p class="section-heading__eyebrow">Komitmen Kami</p>
          <h2 class="section-heading__title" id="saran-title">Saran &amp; Masukan</h2>
          <p class="section-heading__desc">Bantu kami meningkatkan kualitas kegiatan. Tuliskan saran, masukan, atau kendala yang Anda temui — seluruh kolom bersifat opsional.</p>
          <a class="btn btn--outline" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer"><?= icon('whatsapp') ?> Hubungi Panitia</a>
        </div>
        <div class="feedback-card">
          <form class="feedback-form" id="feedback-form" novalidate>
            <div class="form-grid">
              <div class="form-field">
                <label for="fb-name">Nama (opsional)</label>
                <input id="fb-name" name="name" type="text" placeholder="Nama Anda">
              </div>
              <div class="form-field">
                <label for="fb-email">Email (opsional)</label>
                <input id="fb-email" name="email" type="email" placeholder="nama@email.com">
              </div>
              <div class="form-field form-field--full">
                <label for="fb-message">Saran / Masukan (opsional)</label>
                <textarea id="fb-message" name="message" rows="4" placeholder="Tuliskan saran, masukan, atau kendala yang Anda temui..."></textarea>
              </div>
            </div>
            <input type="hidden" name="event_slug" value="<?= e($event['slug']) ?>">
            <p class="form-error" id="feedback-error" role="alert" hidden></p>
            <p class="admin-notice admin-notice--ok" id="feedback-success" role="status" hidden></p>
            <button class="btn btn--gold" type="submit" id="feedback-submit">Kirim Saran</button>
          </form>
        </div>
      </div>
    </section>
    <?php endif; ?>
  </main>

  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <span class="brand__mark brand__mark--icon" aria-hidden="true"><img src="assets/stit-icon.png" alt=""></span>
        <div><strong>STIT AL WAFI</strong><p>BOGOR</p></div>
      </div>
      <p class="site-footer__copy"><?= e(site_credit()) ?></p>
      <div class="site-footer__links">
        <a href="sertifikat?event=<?= e($event['slug']) ?>"><?= icon('check') ?> E-Sertifikat</a>
      </div>
    </div>
  </footer>

  <a class="floating-wa" href="https://wa.me/<?= e($contact['whatsapp_digits']) ?>" target="_blank" rel="noopener noreferrer" aria-label="Hubungi panitia via WhatsApp"><?= icon('whatsapp') ?></a>
</div>
</body>
</html>
