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
| Teks sekunder | `subtext` | `#a6adc8` | `#555869` |
| Teks redup / komentar | `overlay` | `#9399b2` | `#5f6275` |
| **Aksen utama** (link, CTA, active) | `mauve` | `#cba6f7` | `#7113ec` |
| Prompt `$`, sukses, Open to work | `green` | `#a6e3a1` | `#29661b` |
| Path / direktori `~/...` | `blue` | `#89b4fa` | `#094cd2` |
| Angka / highlight / warning | `peach` | `#fab387` | `#9b3901` |
| Heading sekunder, focus ring | `lavender` | `#b4befe` | `#1538fc` |
| Tag / hashtag | `pink` | `#f5c2e7` | `#a1197d` |
| Error, titik close window | `red` | `#f38ba8` | `#b30d31` |
| Titik minimize window | `yellow` | `#f9e2af` | `#7c4f10` |

Aturan: background tetap netral, warna hidup di teks/ikon. Background solid aksen hanya untuk satu elemen aktif (CTA utama, kategori terpilih).

**Aksesibilitas (WCAG AA):** semua warna teks harus ≥4.5:1 terhadap background tempat ia dipakai (sampai `surface0`). Karena itu nilai di tabel **bukan Catppuccin murni**:
- Mocha `overlay` memakai overlay2 (`#9399b2`), karena overlay1 hanya 4.4:1 di `base`.
- Semua warna teks/aksen Latte digelapkan (hue sama) karena Latte asli hanya 2–3:1.
Kalau menambah atau mengubah warna, hitung ulang kontrasnya dulu.

**Link:** link di dalam kalimat/paragraf wajib ber-underline (`underline decoration-ctp-mauve/50 underline-offset-2`), karena warna saja tidak cukup membedakannya dari teks sekitar. Link yang berdiri sendiri (nav, tombol, daftar link, kartu) boleh tanpa underline.

### Mode
- **Default dark**; ada toggle ke light. Pilihan pengunjung disimpan di `localStorage.theme`.

### Tipografi
- **JetBrains Mono**: heading, nav, label, tombol, badge, metadata, angka, kode.
- **DM Sans**: paragraf, deskripsi, isi artikel (keterbacaan).
- Heading tidak pakai bold berlebihan: `font-bold` untuk h1, `font-semibold` untuk lainnya.

### Elemen gaya (semua dipakai)
1. **Prompt sebagai heading section** — komponen `Prompt.astro`: `$ ls ./skills`, `$ cat about.md`, `$ git log --oneline ./blog`. `$` berwarna green, perintah berwarna text, argumen/path berwarna blue.
2. **Window chrome** — komponen `TerminalWindow.astro`: kartu dengan title bar (titik red/yellow/green + judul seperti `hadi@hadiset: ~`). Dipakai untuk hero, kartu penting; jangan setiap elemen dibungkus window (maks. ±1 per section).
3. **Animasi mengetik** — di hero: `whoami` diketik, lalu output tercetak baris per baris. Teknik wajib (agar PSI mobile tetap 100):
   - **Konten asli selalu ter-render penuh sejak frame pertama**; animasi dibuat oleh elemen penutup dekoratif (`aria-hidden`, warna `mantle`) di atasnya. Jangan pernah menyembunyikan konten dengan `opacity: 0`/`display: none` lalu menampilkannya — itu menunda LCP.
   - **Hanya `transform`/`opacity`** (compositor), dengan `steps()` untuk efek terminal; `will-change: transform` hanya pada elemen penutup.
   - **Tanpa JavaScript.** Kode ada di `.hero-type-cover` / `.hero-print-cover` di `global.css`.
   - `prefers-reduced-motion: reduce` → tanpa animasi, konten langsung tampil.
4. **Scanline / CRT glow** — overlay scanline sangat halus (dark mode saja) + glow tipis pada teks aksen hero. **Dimatikan di halaman artikel** (`BaseLayout` prop `crt={false}`) karena menutupi teks dan gambar.

### Bentuk & spacing
- Radius kecil: `rounded-md` (window/kartu), `rounded` (badge/tombol) di konten. Tidak pakai shadow tebal.
- **Pengecualian: navbar = pill bulat penuh ala Waybar** (rice Hyprland Hadi), seperti desktop sungguhan: "bar sistem" membulat di atas, jendela terminal bersudut kecil di bawah. Jangan pakai pill di elemen konten.

### Navbar (floating pill)
- `fixed`, mengambang 12px dari atas, tepi sejajar dengan konten (`max-w-5xl` + gutter yang sama). `<main>` diberi `pt-14` agar konten tidak tertutup.
- Tiga grup pill terpisah (gap 6px, seperti modul Waybar): brand · link · toggle tema. Di mobile brand disembunyikan; tidak ada menu hamburger.
- Pill: tinggi 44px (target sentuh), `rounded-full`, border 1px `surface0`, background **`base` 88%** + `backdrop-blur-md`. 88% adalah minimum agar semua warna teks tetap AA walau di belakangnya gambar putih/hitam — jangan diturunkan. Jangan pakai `overlay` untuk teks di navbar (gagal AA di atas glass).
- Warna aksen per link: `~/` blue, `~/blog` pink, `~/showcase` peach. Aktif: background `mauve` solid, teks `crust`, sedikit lebih lebar. Hover hanya mengubah background ke `surface0`, transisi 0.2s.
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
