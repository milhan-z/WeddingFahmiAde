/**
 * Penyimpanan RSVP & ucapan — memakai GOOGLE SHEETS, bukan Supabase.
 *
 * Alasan memilih ini untuk undangan pernikahan:
 * - Mempelai bisa langsung melihat & mengurutkan daftar tamu di Spreadsheet,
 *   tanpa perlu membuka dashboard database.
 * - Gratis, tanpa akun/layanan tambahan, tanpa risiko project "tertidur".
 * - Mudah diekspor ke Excel untuk keperluan cetak/absensi di hari-H.
 *
 * URL Apps Script disimpan sebagai env var TANPA prefix NEXT_PUBLIC, jadi
 * hanya dipakai di server. Browser tamu tidak pernah melihatnya, dan tidak
 * ada masalah CORS karena permintaan dijembatani route /api/wishes.
 *
 * Sengaja HANYA menulis, tidak membaca. Daftar ucapan tidak ditampilkan di
 * undangan, jadi tidak ada satu pun jalur yang bisa memuntahkan seluruh
 * nama, alamat, dan ucapan tamu ke publik. Mempelai membacanya langsung
 * di Spreadsheet.
 */
export type Wish = {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  guests: number | null;
  address: string | null;
  message: string;
  created_at: string;
};

const ENDPOINT = process.env.SHEETS_WEBAPP_URL?.trim();

/** Aktif hanya kalau URL Apps Script sudah diisi. */
export const sheetsEnabled = Boolean(ENDPOINT);

/**
 * Cadangan saat URL belum diisi: hanya dihitung, tidak disimpan.
 * TIDAK permanen. Cukup untuk mencoba tampilan, jangan dipakai saat
 * undangan sudah disebar.
 */
let memoryCount = 0;

/**
 * Cegah isian tamu diperlakukan sebagai RUMUS oleh Google Sheets.
 *
 * appendRow menulis nilai seolah-olah diketik, jadi ucapan yang diawali
 * "=", "+", "-", atau "@" akan dieksekusi — mulai dari yang tidak sengaja
 * ("-- semoga bahagia" jadi #ERROR!) sampai yang disengaja (=IMPORTXML untuk
 * menarik isi sheet ke luar). Awalan kutip satu membuat Sheets menyimpannya
 * sebagai teks; kutipnya sendiri tidak ikut tampil di sel.
 */
function asText(v: string | null): string | null {
  if (!v) return v;
  return /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
}

export async function addWish(input: Omit<Wish, "id" | "created_at">): Promise<Wish> {
  const wish: Wish = {
    ...input,
    name: asText(input.name) as string,
    address: asText(input.address),
    message: asText(input.message) as string,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  if (!ENDPOINT) {
    memoryCount += 1;
    return wish;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wish),
    cache: "no-store",
  });

  /* JANGAN percaya res.ok saja. Apps Script membalas 200 dengan halaman
     HTML berjudul "Salah" ketika skripnya sendiri melempar error — misalnya
     tab "RSVP" belum ada. Kalau hanya res.ok yang dicek, tamu melihat
     "Terkirim, terima kasih!" padahal tidak ada satu baris pun tersimpan.
     Untuk RSVP pernikahan, gagal diam-diam seperti itu adalah kegagalan
     yang paling mahal: barunya ketahuan saat rekap tamu dibutuhkan. */
  const text = await res.text();
  let payload: { ok?: boolean; error?: string } | null = null;
  try {
    payload = JSON.parse(text);
  } catch {
    /* biarkan null — ditangani di bawah */
  }

  if (!res.ok || !payload?.ok) {
    const detail =
      payload?.error ??
      text
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 300);
    throw new Error(`Sheets POST ${res.status}: ${detail || "balasan tidak dikenali"}`);
  }

  return wish;
}
