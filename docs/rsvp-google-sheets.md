# RSVP & Ucapan lewat Google Sheets

Undangan ini **tidak memakai Supabase**. Data RSVP dan ucapan tamu masuk
langsung ke Google Spreadsheet milik mempelai — gratis, tidak perlu akun
layanan tambahan, dan hasilnya bisa langsung diurutkan/dicetak untuk absensi
di hari-H.

Daftar ucapan **tidak ditampilkan di undangan**. Alurnya satu arah: undangan
hanya menulis, mempelai membaca di Spreadsheet. Karena itu tidak ada endpoint
`GET` sama sekali — tidak ada satu pun jalur publik yang bisa memuntahkan
seluruh nama, alamat, dan ucapan tamu.

Selama env var belum diisi, kiriman tamu **tidak tersimpan**. Jangan sebar
link ke tamu sebelum langkah di bawah selesai dan uji coba berhasil.

---

## 1. Buat spreadsheet

Buat Google Spreadsheet baru. Tab-nya tidak perlu diapa-apakan — skrip di
bawah akan menamai tab `RSVP` beserta headernya sendiri saat kiriman pertama
masuk.

> Nama **tab** (di kiri bawah), bukan nama berkas. Keduanya beda, dan
> `getSheetByName` peka huruf besar/kecil: berkas boleh bernama apa saja,
> tapi tabnya harus persis `RSVP`.

## 2. Tempel Apps Script

Di spreadsheet: **Extensions → Apps Script**, hapus isinya, tempel kode ini,
lalu Save.

```javascript
const SHEET_NAME = 'RSVP';
const HEADER = ['id', 'name', 'attendance', 'guests', 'address', 'message', 'created_at'];

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Membuat tab + header kalau belum ada.
 * Ini penting: kalau sheet-nya tidak ketemu, Apps Script melempar error dan
 * membalas halaman HTML dengan status 200 -- terlihat "berhasil" dari luar,
 * padahal tidak ada yang tersimpan.
 */
function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    // Tab bawaan Google bernama "Sheet1" / "Lembar1", bukan "RSVP" -- ini
    // penyebab paling sering skrip gagal. Kalau spreadsheet cuma punya satu
    // tab, pakai tab itu dan ganti namanya; jangan bikin tab kedua yang
    // membingungkan (dan bikin header yang sudah diisi jadi terlihat hilang).
    const all = ss.getSheets();
    sh = all.length === 1 ? all[0].setName(SHEET_NAME) : ss.insertSheet(SHEET_NAME);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADER);
    sh.setFrozenRows(1);
  }
  return sh;
}

// Dipanggil saat tamu menekan Submit.
function doPost(e) {
  try {
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
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Sengaja tidak ada doGet: undangan tidak pernah membaca data tamu.
```

## 3. Deploy sebagai Web App

**Deploy → New deployment → Type: Web app**

- *Execute as*: **Me**
- *Who has access*: **Anyone**

> "Anyone" wajib, karena yang memanggil adalah server undangan, bukan akun
> Google tamu. URL-nya tidak pernah dikirim ke browser tamu — hanya dipakai
> di sisi server lewat `/api/wishes` — jadi tetap tidak terekspos.

Salin **Web app URL** (bentuknya `https://script.google.com/macros/s/AKfy.../exec`).

> Tiap kali kode Apps Script diubah, **Deploy → Manage deployments → Edit →
> Version: New version**. Tanpa itu, yang berjalan masih versi lama.

## 4. Pasang di Vercel

Vercel → Project → **Settings → Environment Variables**:

```
SHEETS_WEBAPP_URL = https://script.google.com/macros/s/AKfy.../exec
```

Perhatikan: **tanpa** prefix `NEXT_PUBLIC_`. Itu disengaja supaya URL-nya
hanya hidup di server.

Redeploy, lalu kirim satu RSVP percobaan dan pastikan barisnya muncul di
spreadsheet.

## 5. Uji cepat dari terminal

```bash
curl -s -X POST "$SHEETS_WEBAPP_URL" -H "Content-Type: application/json" -d '{"id":"tes","name":"Tes","attendance":"hadir","guests":1,"address":"","message":"tes","created_at":"2026-09-04T00:00:00Z"}'
```

Balasan yang benar hanya `{"ok":true}`. Kalau yang keluar HTML, skripnya
error — teks judulnya biasanya "Salah" dan pesan aslinya ada di dalam
halaman itu.

---

## Kenapa balasan divalidasi ketat

Apps Script membalas **status 200 dengan halaman HTML** ketika skripnya
melempar error. Kalau kode hanya memeriksa `res.ok`, tamu akan melihat
"Terkirim, terima kasih!" padahal tidak ada satu baris pun tersimpan — dan
itu baru ketahuan saat rekap tamu dibutuhkan. Karena itu `addWish` di
`src/lib/wishesStore.ts` mewajibkan balasan berupa JSON dengan `ok: true`,
dan menaikkan error berisi cuplikan pesan aslinya kalau bukan.

## Kalau nanti mau ganti lagi

Semua logika penyimpanan terkumpul di `src/lib/wishesStore.ts` — satu fungsi
(`addWish`). Mau pindah ke Notion, Airtable, atau database lain, cukup ganti
isi fungsi itu; komponen undangan tidak perlu disentuh.
