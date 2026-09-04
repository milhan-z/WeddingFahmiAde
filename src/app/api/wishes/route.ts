import { NextRequest, NextResponse } from "next/server";
import { addWish, listWishes, sheetsEnabled, type Wish } from "@/lib/wishesStore";

export type { Wish };

// Selalu ambil data terbaru — daftar ucapan berubah tiap ada tamu mengisi.
export const dynamic = "force-dynamic";

const ATTENDANCE = ["hadir", "tidak_hadir", "ragu"] as const;
const MAX_GUESTS = 20;
const MAX_LEN = { name: 80, address: 120, message: 600 };

export async function GET() {
  try {
    const wishes = await listWishes(50);
    return NextResponse.json({
      wishes,
      ...(sheetsEnabled ? {} : { note: "Google Sheets belum dikonfigurasi — data sementara saja." }),
    });
  } catch (e) {
    return NextResponse.json(
      { wishes: [], error: e instanceof Error ? e.message : "Gagal memuat ucapan." },
      { status: 500 }
    );
  }
}

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
    const wish = await addWish({ name, attendance, guests, address, message });
    return NextResponse.json({
      wish,
      ...(sheetsEnabled ? {} : { note: "Google Sheets belum dikonfigurasi — data sementara saja." }),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Gagal menyimpan." },
      { status: 500 }
    );
  }
}
