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
 * Cadangan saat URL belum diisi: tersimpan di memori proses.
 * TIDAK permanen — hilang tiap redeploy / server idle. Cukup untuk mencoba,
 * jangan dipakai saat undangan sudah disebar.
 */
const memory: Wish[] = [];

function normalise(raw: Record<string, unknown>): Wish {
  const guests = Number(raw.guests);
  return {
    id: String(raw.id ?? crypto.randomUUID()),
    name: String(raw.name ?? "").trim(),
    attendance: (["hadir", "tidak_hadir", "ragu"] as const).includes(
      raw.attendance as Wish["attendance"]
    )
      ? (raw.attendance as Wish["attendance"])
      : "hadir",
    guests: Number.isFinite(guests) && guests > 0 ? guests : null,
    address: raw.address ? String(raw.address) : null,
    message: String(raw.message ?? "").trim(),
    created_at: String(raw.created_at ?? new Date().toISOString()),
  };
}

export async function listWishes(limit = 50): Promise<Wish[]> {
  if (!ENDPOINT) return [...memory].reverse().slice(0, limit);

  const res = await fetch(ENDPOINT, { cache: "no-store" });
  if (!res.ok) throw new Error(`Sheets GET ${res.status}`);
  const data = (await res.json()) as { wishes?: Record<string, unknown>[] };
  return (data.wishes ?? []).map(normalise).slice(0, limit);
}

export async function addWish(input: Omit<Wish, "id" | "created_at">): Promise<Wish> {
  const wish: Wish = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };

  if (!ENDPOINT) {
    memory.push(wish);
    return wish;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wish),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sheets POST ${res.status}`);
  return wish;
}
