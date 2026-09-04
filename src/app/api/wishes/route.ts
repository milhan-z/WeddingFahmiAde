import { NextRequest, NextResponse } from "next/server";
import { addWish, sheetsEnabled, type Wish } from "@/lib/wishesStore";

export type { Wish };

// Hanya menerima kiriman; tidak ada GET. Daftar ucapan tidak ditampilkan di
// undangan, dan tanpa GET tidak ada endpoint publik yang bisa membocorkan
// seluruh nama, alamat, dan ucapan tamu. Mempelai membacanya di Spreadsheet.
export const dynamic = "force-dynamic";

const ATTENDANCE = ["hadir", "tidak_hadir", "ragu"] as const;
const MAX_GUESTS = 20;
const MAX_LEN = { name: 80, address: 120, message: 600 };

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, MAX_LEN.name);
  const message = String(body.message ?? "").trim().slice(0, MAX_LEN.message);
  const address = String(body.address ?? "").trim().slice(0, MAX_LEN.address) || null;
  const attendance = String(body.attendance ?? "") as Wish["attendance"];

  if (!name || !message || !ATTENDANCE.includes(attendance)) {
    return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
  }

  // Jumlah kehadiran hanya bermakna kalau tamu menyatakan hadir/ragu, dan
  // dibatasi supaya angka iseng tidak merusak rekap mempelai.
  let guests: number | null = null;
  if (attendance !== "tidak_hadir") {
    const parsed = Number.parseInt(String(body.guests ?? ""), 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return NextResponse.json({ error: "Jumlah kehadiran tidak valid." }, { status: 400 });
    }
    guests = Math.min(parsed, MAX_GUESTS);
  }

  try {
    await addWish({ name, attendance, guests, address, message });
    return NextResponse.json({
      ok: true,
      ...(sheetsEnabled ? {} : { note: "Google Sheets belum dikonfigurasi — data tidak tersimpan." }),
    });
  } catch (e) {
    /* Jaring pengaman terakhir: kalau Spreadsheet menolak, kiriman tamu
       dicetak utuh ke log server. Undangan hanya hidup beberapa minggu dan
       tiap RSVP mewakili orang sungguhan yang sudah repot mengisi — kalau
       Sheets bermasalah di hari-H, datanya masih bisa diambil kembali dari
       Vercel -> Logs alih-alih hilang untuk selamanya. */
    console.error(
      "[RSVP GAGAL SIMPAN] pulihkan baris ini secara manual:",
      JSON.stringify({ name, attendance, guests, address, message, created_at: new Date().toISOString() }),
      "| penyebab:",
      e instanceof Error ? e.message : e
    );
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal menyimpan." },
      { status: 500 }
    );
  }
}
