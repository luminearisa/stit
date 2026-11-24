# Versi PHP — Halaman Event STIT Al Wafi

Versi ini **tidak membutuhkan Node.js**. Upload file-file di root ini ke server PHP 8.1+ dengan MySQL/MariaDB.

> Halaman website lain (Beranda, Profil, Akreditasi, dll.) masih berada di projek Next.js dan belum di-migrasikan ke PHP.

## Struktur

```
index.php              Halaman daftar event (kartu: berlangsung, akan datang, selesai)
event.php              Halaman lengkap satu event (event.php?slug=spmi-pi)
admin.php              Panel admin (login user/pass, tabel, CSV)
sertifikat.php         Cek & unduh e-sertifikat
cek.php                Redirect lama → sertifikat.php
config.php             Kredensial database & admin (jangan di-commit)
config.example.php     Template config.php
db.php                 Koneksi PDO + pembuatan tabel otomatis
lib/
├── data.php           Daftar event, data event & field pendaftaran
├── registrations.php  Validasi, simpan, cari, update status, CSV
└── ui.php             Helper escape, ikon, tema warna
api/
├── register.php       POST pendaftaran
├── certificate.php    POST cek sertifikat (hanya terkonfirmasi)
└── admin.php          POST login, list, status, hapus (butuh session)
assets/
├── event.css          Styling
├── app.js             Semua interaksi browser
└── flyer.jpeg         Flyer event
```

## Instalasi

1. **Upload** semua file/folder di atas ke **root** web server (tempat `index.php` diakses sebagai `https://domain.com/`).

2. **Buat config.php**
   ```bash
   cp config.example.php config.php
   ```
   Lalu edit `config.php`:
   ```php
   'db' => [
       'host' => 'localhost',
       'name' => 'nama_database',
       'user' => 'username_database',
       'pass' => 'password_database',
   ],
   'admin_user' => 'admin',
   'admin_pass' => 'ganti-password-rahasia',
   ```
   `config.php` sudah di-ignore Git — kredensial tidak akan ikut ter-commit.

3. **Buat database kosong** di cPanel/phpMyAdmin, lalu sesuaikan nama & kredensialnya di `config.php`.
   Tabel `registrations` dibuat **otomatis** saat halaman/API pertama diakses.

4. Buka:
   - Daftar event: `https://domain.com/`
   - Detail event: `https://domain.com/event.php?slug=spmi-pi`
   - Admin: `https://domain.com/admin.php`
   - Sertifikat: `https://domain.com/sertifikat.php`

## Alur data

```
Peserta isi form
  → POST api/register.php
  → validasi dari lib/data.php
  → INSERT ke tabel registrations (status awal: pending)
  → Admin buka admin.php, ubah status jadi terkonfirmasi
  → Peserta buka sertifikat.php, input WhatsApp
  → POST api/certificate.php (hanya status terkonfirmasi yang lolos)
  → Sertifikat SVG tampil → unduh PNG / SVG
```

## Catatan

- Field form, pesan validasi, kolom tabel, dan kolom CSV **semuanya berasal dari `$registration_fields`** di `lib/data.php`.
- Login admin memakai **username + password** dari `config.php`; sesi disimpan server memakai cookie PHP. Password bawaan: `admin` / `admin123` — **ganti di produksi**.
- Panel admin menyediakan **Hapus** per pendaftar dan **Hapus Semua** untuk mereset data saat event berikutnya. Keduanya meminta konfirmasi sebelum menghapus.
- Sertifikat masih memakai desain bawaan; rencana berikutnya memakai **template PNG/JPG milik pemilik** dengan nama peserta yang diisi otomatis.

- Halaman utama (`index.php`) menampilkan kartu event berdasarkan status: Akan Datang, Sedang Berlangsung, dan Sudah Berlangsung. Klik kartu membuka `event.php?slug=...`.
- Untuk menambah event, tambahkan entri pada `$events` di `lib/data.php` beserta flyer dan data detailnya.
- Pendaftaran menyimpan `event_slug` pada kolom `source` di database.
- Kredit footer standar: gunakan `<?= e(site_credit()) ?>` pada halaman baru. Outputnya: `© 2026 STIT AL WAFI BOGOR. Seluruh hak cipta dilindungi.`

- Event baru ditambahkan sebagai entri `$events` di `lib/data.php` lengkap dengan data detail (speakers, price_tiers, facilities, benefits, agenda, faqs, contact, certificate). Contoh: `ami-workshop`.
- Sertifikat mengikuti event tempat peserta mendaftar (slug disimpan di kolom `source`).

## URL bersih (tanpa .php)

- Di hosting aktifkan `mod_rewrite` dan upload `.htaccess` yang sudah disediakan. Semua tautan memakai URL bersih: `/`, `/event?slug=...`, `/sertifikat`, `/admin`, `/api/register`.
- Akses langsung ke `config.php`, `db.php`, `router.php`, dan folder `lib/` diblokir.
- Untuk uji lokal: `php -S 127.0.0.1:8099 router.php`

## Generate event dari flyer (panel admin)

- Buka /admin, login, lalu section "Generate Event dari Flyer".
- Upload flyer → klik "Baca Flyer & Isi Otomatis" → OCR browser (Tesseract.js) mengisi field.
- Koreksi field (terutama judul bila huruf flyer distilisasi) → klik "Generate Event".
- Event tersimpan di data/events.json (di-ignore git) dan langsung tampil di index + halaman /event?slug=... .
- OCR tidak selalu sempurna; selalu periksa hasil sebelum generate.
- Event yang sudah dibuat bisa diedit lewat tombol Edit pada daftar (mengubah judul, tanggal, harga, flyer, dll) tanpa mengubah slug/URL-nya.

- Rekening default untuk event baru adalah BSI 8888441116 a.n. BSI STIT AL Wafi. Event lama (SPMI) tetap memakai BCA 4452227871.

- Setiap event bisa menyembunyikan section tertentu (Pemateri, Biaya, Manfaat, Agenda, Saran & Masukan) lewat checkbox saat generate/edit. Hanya event tersebut yang terdampak, layout tetap sama.

## Saran & Masukan

- Section FAQ pada halaman event diganti form Saran & Masukan (semua field opsional, minimal satu diisi).
- Data tersimpan di tabel `feedback`, terpisah dari `registrations`.
- Panel admin menampilkan tabel saran setelah tabel pendaftar: refresh, ekspor CSV, hapus per item, hapus semua.

- Narasumber pada generator bisa diisi hingga 3 orang (opsional). Jika kosong, section Pemateri tidak ditampilkan.

- Generate massal: tombol Buat Sertifikat Semua membuat PNG untuk seluruh pendaftar Terkonfirmasi pada event terpilih, bisa diunduh per orang atau sekaligus sebagai ZIP.

- Tabel Pendaftar dan Saran & Masukan di panel admin memiliki filter Event (Semua Event + daftar event), termasuk pada ekspor CSV.
