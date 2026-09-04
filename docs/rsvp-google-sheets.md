# RSVP & Ucapan lewat Google Sheets

Undangan ini **tidak memakai Supabase**. Data RSVP dan ucapan tamu masuk
langsung ke Google Spreadsheet milik mempelai — gratis, tidak perlu akun
layanan tambahan, dan hasilnya bisa langsung diurutkan/dicetak untuk absensi
di hari-H.

Selama env var belum diisi, undangan tetap jalan tapi data **hanya tersimpan
sementara** (hilang saat redeploy). Jangan sebar link ke tamu sebelum langkah
di bawah selesai.

---

## 1. Buat spreadsheet

Buat Google Spreadsheet baru. Ganti nama sheet pertama menjadi **`RSVP`**,
lalu isi baris pertama (header) persis seperti ini:

| A  | B    | C          | D      | E       | F       | G          |
|----|------|------------|--------|---------|---------|------------|
| id | name | attendance | guests | address | message | created_at |

## 2. Tempel Apps Script

Di spreadsheet: **Extensions → Apps Script**, hapus isinya, tempel kode ini,
lalu Save.

```javascript
const SHEET_NAME = 'RSVP';

function sheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Dibaca undangan untuk menampilkan "Best Wishes"
function doGet() {
  const rows = sheet_().getDataRange().getValues();
  const head = rows.shift();
  const wishes = rows
    .filter(function (r) { return r[1]; })          // buang baris kosong
    .map(function (r) {
      const o = {};
      head.forEach(function (h, i) { o[h] = r[i]; });
      return o;
    })
    .reverse();                                      // terbaru di atas
  return json_({ wishes: wishes });
}

// Dipanggil saat tamu menekan Submit
function doPost(e) {
  const b = JSON.parse(e.postData.contents);
  sheet_().appendRow([
    b.id,
    b.name,
    b.attendance,
    b.guests === null || b.guests === undefined ? '' : b.guests,
    b.address || '',
    b.message,
    b.created_at
  ]);
  return json_({ ok: true });
}
```

## 3. Deploy sebagai Web App

**Deploy → New deployment → Type: Web app**

- *Execute as*: **Me**
- *Who has access*: **Anyone**

> "Anyone" wajib, karena yang memanggil adalah server undangan, bukan akun
> Google tamu. URL-nya tidak pernah dikirim ke browser tamu — hanya dipakai
> di sisi server lewat `/api/wishes` — jadi tetap tidak terekspos.

Salin **Web app URL** (bentuknya `https://script.google.com/macros/s/AKfy.../exec`).

## 4. Pasang di Vercel

Vercel → Project → **Settings → Environment Variables**:

```
SHEETS_WEBAPP_URL = https://script.google.com/macros/s/AKfy.../exec
```

Perhatikan: **tanpa** prefix `NEXT_PUBLIC_`. Itu disengaja supaya URL-nya
hanya hidup di server.

Redeploy, lalu coba kirim satu RSVP percobaan dan pastikan barisnya muncul di
spreadsheet.

---

## Kalau nanti mau ganti lagi

Semua logika penyimpanan terkumpul di `src/lib/wishesStore.ts` — hanya dua
fungsi (`listWishes`, `addWish`). Mau pindah ke Notion, Airtable, atau
database lain, cukup ganti isi dua fungsi itu; komponen undangan tidak perlu
disentuh.
