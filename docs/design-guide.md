# Design & Copy Guide — hadiset.com

Acuan desain dan copy untuk seluruh situs (homepage, blog, showcase index, nav, footer).
Diputuskan bersama Hadi pada 2026-11-24. Halaman showcase individual (`/showcase/porto-1`, `/showcase/smg-wo`) adalah hasil slicing desain klien dan **tidak** ikut aturan ini.

## 1. Audiens & tujuan

- **Target utama: recruiter / perusahaan.** Setiap halaman harus memudahkan mereka menilai skill dan menghubungi Hadi.
- **CTA utama:** `Download CV`. CTA kedua: email (`work@hadiset.com`), lalu LinkedIn & GitHub.
- Status yang ditampilkan: badge **Open to work**, lokasi **Semarang, Indonesia · Open to remote**.
- **Jangan tampilkan nomor HP/WhatsApp** di teks situs. Pengecualian yang disetujui Hadi: PDF CV (`public/cv-hadi-setiawan.pdf`) memuat nomor HP.

## 2. Copy

- **Bahasa:** English untuk seluruh UI dan homepage.
- **Tone:** profesional & to the point. Kalimat pendek, berbasis hasil dan angka. Hindari kata sifat kosong ("passionate", "highly proficient", "rockstar").
  - Baik: "Cut hosting costs 15% across 10+ VPS."
  - Hindari: "I am a passionate developer who loves building amazing things."
- Pola bullet pencapaian: **kata kerja lampau + apa + angka/hasil**.
- **Angka pengalaman resmi:**
  - `6+ years` web development (Zuper ID, Feb 2019 – Oct 2025) — angka utama.
  - `11+ years in IT` (sejak 2014) — angka pendukung.
  - Jangan pakai "5+" atau "7+" lagi.
- **Fakta yang boleh dikutip** (sumber: CV):
  - 10+ DigitalOcean VPS (Ubuntu) dikelola; biaya hosting −15%.
  - Internal CRM Laravel (TALL) untuk 100,000+ order records; laporan dari jam → detik.
  - Core Web Vitals 90+; Meta Ads landing page view rate > 80%.
  - Automated WordPress deployment; monitoring, security & backup.
- **Nama:** "Hadi Setiawan" untuk identitas profesional. "Hafi" hanya sebagai nama pena/author blog yang sudah ada.
- **Judul/role:** "Full Stack Web Developer · Server Administrator".
- Label teknis ditulis sesuai nama resminya: Laravel, Livewire, Alpine.js, Node.js, Express, TypeScript, Prisma, Zod, Docker, NGINX, PostgreSQL, MySQL, Redis.

## 3. Gaya visual: Terminal / developer

### Palet — Catppuccin
Dark (default) = **Mocha**, light = **Latte**. Warna selalu dipakai lewat token semantik (`bg-ctp-base`, `text-ctp-mauve`, dst. di `src/styles/global.css`), bukan hex atau kelas warna Tailwind bawaan (`purple-600`, `gray-800`).

| Role | Token | Mocha | Latte |
|---|---|---|---|
| Background halaman | `base` | `#1e1e2e` | `#eff1f5` |
| Panel / window body | `mantle` | `#181825` | `#e6e9ef` |
| Title bar / code bg | `crust` | `#11111b` | `#dce0e8` |
| Border | `surface0` | `#313244` | `#ccd0da` |
| Border hover / divider kuat | `surface1` | `#45475a` | `#bcc0cc` |
| Teks utama | `text` | `#cdd6f4` | `#4c4f69` |
| Teks sekunder | `subtext` | `#a6adc8` | `#6c6f85` |
| Teks redup / komentar | `overlay` | `#7f849c` | `#8c8fa1` |
| **Aksen utama** (link, CTA, active) | `mauve` | `#cba6f7` | `#8839ef` |
| Prompt `$`, sukses, Open to work | `green` | `#a6e3a1` | `#40a02b` |
| Path / direktori `~/...` | `blue` | `#89b4fa` | `#1e66f5` |
| Angka / highlight / warning | `peach` | `#fab387` | `#fe640b` |
| Heading sekunder, focus ring | `lavender` | `#b4befe` | `#7287fd` |
| Tag / hashtag | `pink` | `#f5c2e7` | `#ea76cb` |
| Error, titik close window | `red` | `#f38ba8` | `#d20f39` |
| Titik minimize window | `yellow` | `#f9e2af` | `#df8e1d` |

Aturan: background tetap netral, warna hidup di teks/ikon. Background solid aksen hanya untuk satu elemen aktif (CTA utama, kategori terpilih).

### Mode
- **Default dark**; ada toggle ke light. Pilihan pengunjung disimpan di `localStorage.theme`.

### Tipografi
- **JetBrains Mono**: heading, nav, label, tombol, badge, metadata, angka, kode.
- **DM Sans**: paragraf, deskripsi, isi artikel (keterbacaan).
- Heading tidak pakai bold berlebihan: `font-bold` untuk h1, `font-semibold` untuk lainnya.

### Elemen gaya (semua dipakai)
1. **Prompt sebagai heading section** — komponen `Prompt.astro`: `$ ls ./skills`, `$ cat about.md`, `$ git log --oneline ./blog`. `$` berwarna green, perintah berwarna text, argumen/path berwarna blue.
2. **Window chrome** — komponen `TerminalWindow.astro`: kartu dengan title bar (titik red/yellow/green + judul seperti `hadi@hadiset: ~`). Dipakai untuk hero, kartu penting; jangan setiap elemen dibungkus window (maks. ±1 per section).
3. **Animasi mengetik** — hanya di hero (`whoami`). Kursor blok berkedip. Wajib mati saat `prefers-reduced-motion: reduce` (teks langsung tampil penuh).
4. **Scanline / CRT glow** — overlay scanline sangat halus (dark mode saja) + glow tipis pada teks aksen hero. **Dimatikan di halaman artikel** (`BaseLayout` prop `crt={false}`) karena menutupi teks dan gambar.

### Bentuk & spacing
- Radius kecil: `rounded-md` (window/kartu), `rounded` (badge/tombol). Tidak pakai pill bulat penuh atau shadow tebal.
- Border 1px `surface0`; hover → `surface1` / `mauve`.
- Lebar konten maks. `max-w-5xl`, artikel `max-w-3xl`.
- Mobile: gutter 16px (`px-4`), tanpa scroll horizontal.

## 4. Struktur homepage

1. **Hero** (window terminal): `whoami` (diketik) → nama, role, ringkasan 1–2 kalimat, badge Open to work + lokasi, CTA `Download CV` / email / LinkedIn / GitHub, foto.
2. **Highlights** (`$ cat highlights.log`): angka pencapaian dari bagian Copy di atas.
3. **Skills** (`$ ls ./skills`): kelompok Web, Server & DevOps, Database, CMS & Tools, Networking.
4. **Showcase** (`$ ls ./showcase`): data dari `src/data/showcase.ts`.
5. **Latest writing** (`$ git log -3 ./blog`): 3 artikel terbaru (non-draft).
6. **Contact** (`$ ./contact.sh`): ulang CTA.

Section Experience timeline & Education sengaja tidak ditampilkan di homepage (ada di CV).

## 5. Halaman artikel

- Kolom baca maks. ±48rem (≈70–75 karakter per baris), body DM Sans, heading mono dengan prefix `##` / `###`.
- **Table of contents** dari heading h2/h3 (`TableOfContents.astro`), muncul jika artikel punya ≥2 heading:
  - Desktop (`lg`+): sidebar kanan yang menempel saat scroll, bagian yang sedang dibaca disorot mauve.
  - Mobile: blok `$ cat toc` yang bisa dibuka-tutup, di bawah gambar utama.
- Penulis artikel: gunakan heading `##` untuk bagian utama dan `###` untuk sub-bagian agar TOC rapi; jangan lompat dari `##` ke `####`.
