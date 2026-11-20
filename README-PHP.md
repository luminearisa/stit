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