# Undangan Ade & Fahmi

Website undangan pernikahan — Next.js + TypeScript + Tailwind v4 + Framer Motion.
Satu halaman, scroll panjang, tanpa navbar.

## 1. Jalanin di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000/?to=Nama%20Tamu` — parameter `?to=` itu yang
bikin nama tamu muncul otomatis di gapura pembuka.

## 2. Yang perlu kamu isi

Buka `src/lib/data.ts` — semua teks yang gampang berubah dikumpulkan di
sana:
- Nama orang tua kedua mempelai (`couple.groom.parents`, `couple.bride.parents`)
- Alamat lengkap venue (`event.location.address`)
- Jam/tanggal akad & resepsi kalau ada perubahan

## 3. Musik latar (opsional)

Taruh file `song.mp3` di `public/music/`. Tombol musik di pojok kanan
bawah otomatis muncul begitu file itu ada — kalau belum ada, tombolnya
tersembunyi sendiri (tidak error).

## 4. RSVP & Ucapan — biar tersimpan permanen

Tanpa konfigurasi tambahan, RSVP & ucapan tetap bisa dikirim dan tampil,
TAPI datanya sementara (hilang saat server "tidur" — wajar untuk hosting
gratis Vercel). Supaya permanen:

1. Buat project gratis di supabase.com
2. Di SQL Editor, jalankan:
   ```sql
   create table wishes (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     attendance text not null,
     message text not null,
     created_at timestamptz default now()
   );
   ```
3. Copy `.env.example` jadi `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL`
   dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari Settings > API di Supabase.
4. Isi juga env yang sama di Vercel (Settings > Environment Variables)
   sebelum deploy.

## 5. Deploy ke Vercel

Cara termudah:
1. Push folder ini ke repo GitHub baru.
2. Buka vercel.com/new, import repo itu.
3. Vercel otomatis mendeteksi Next.js — tinggal klik Deploy.
4. Kalau pakai Supabase, isi environment variables-nya dulu sebelum
   klik Deploy. Isi juga `NEXT_PUBLIC_SITE_URL` dengan domain
   Vercel-mu (contoh: `https://ade-fahmi.vercel.app`) supaya preview
   link di WhatsApp menampilkan gambar & judul dengan benar.

Setelah live, link undangan ke tamu tinggal:
`https://domain-kamu.vercel.app/?to=Nama%20Tamu`

## 6. Struktur singkat

```
src/
  app/
    layout.tsx        # font, metadata
    page.tsx           # entry point
    api/wishes/        # endpoint RSVP + ucapan
  components/
    Cover.tsx           # gapura pembuka + nama tamu
    HomeClient.tsx       # merangkai semua section
    Countdown.tsx
    MusicToggle.tsx
    sections/           # tiap bagian cerita (SMA, kuliah, dst)
  lib/
    data.ts              # <- EDIT DI SINI untuk ganti teks/tanggal
    supabaseClient.ts
public/
  assets/                # semua ilustrasi (WebP, sudah dikompres)
  music/                 # taruh song.mp3 di sini kalau mau musik latar
```

## 7. Kalau mau ubah warna

Palet warna ada di `src/app/globals.css` (bagian `:root`) — tinggal
ganti nilai hex-nya, semua section otomatis ikut berubah.
