# STIT Al Wafi Bogor - Landing Page

Website landing page profesional dan modern untuk STIT Al Wafi Bogor, dibangun dengan Next.js dan Tailwind CSS.

## 🔧 Teknologi
- **Next.js 15** (App Router)
- **Tailwind CSS v4** (via @tailwindcss/postcss)
- **Ionicons** (CDN)
- **TypeScript**

## 🚀 Cara Menjalankan

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Build untuk Produksi**
   ```bash
   npm run build
   npm start
   ```

## 📂 Struktur Project
- `app/` - Halaman utama dan konfigurasi global.
  - `page.tsx` - Halaman landing page utama.
  - `globals.css` - Konfigurasi tema warna (Emas & Hitam).
  - `layout.tsx` - Konfigurasi font (Inter/Poppins) dan script Ionicons.
- `components/` - Komponen UI (Navbar, Hero, dll).

## 🎨 Kustomisasi
Warna tema didefinisikan di `app/globals.css`:
- `--color-gold`: `#D4AF37`
- `--color-black`: `#000000`
