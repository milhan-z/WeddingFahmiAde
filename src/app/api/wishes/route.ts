import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export type Wish = {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  /** Jumlah orang yang hadir. Null kalau tamu menyatakan tidak hadir. */
  guests: number | null;
  /** Alamat domisili — opsional, dipakai untuk kirim souvenir. */
  address: string | null;
  message: string;
  created_at: string;
};

// Fallback in-memory store. INI TIDAK PERMANEN — akan kosong lagi setiap
// kali server serverless "tidur"/redeploy. Cukup untuk demo/testing.
// Untuk penyimpanan permanen, sambungkan Supabase (lihat lib/supabaseClient.ts)
// dengan tabel:
//   create table wishes (
//     id uuid primary key default gen_random_uuid(),
//     name text not null,
//     attendance text not null,
//     guests int,
//     address text,
//     message text not null,
//     created_at timestamptz default now()
//   );
const memoryStore: Wish[] = [];

const ATTENDANCE = ["hadir", "tidak_hadir", "ragu"] as const;
const MAX_GUESTS = 20;

export async function GET() {
  if (supabase) {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) {
      return NextResponse.json({ wishes: [], error: error.message }, { status: 500 });
    }
    return NextResponse.json({ wishes: data as Wish[] });
  }
  return NextResponse.json({
    wishes: [...memoryStore].reverse().slice(0, 50),
    note: "Supabase belum dikonfigurasi — data sementara saja.",
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = String(body.name ?? "").trim();
  const attendance = String(body.attendance ?? "");
  const message = String(body.message ?? "").trim();
  const address = String(body.address ?? "").trim() || null;

  if (!name || !message || !ATTENDANCE.includes(attendance as Wish["attendance"])) {
    return NextResponse.json({ error: "Data tidak lengkap." }, { status: 400 });
  }

  // Jumlah kehadiran hanya bermakna kalau tamu menyatakan hadir/ragu.
  // Dibatasi supaya angka iseng tidak merusak rekap mempelai.
  let guests: number | null = null;
  if (attendance !== "tidak_hadir") {
    const parsed = Number.parseInt(String(body.guests ?? ""), 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return NextResponse.json(
        { error: "Jumlah kehadiran tidak valid." },
        { status: 400 }
      );
    }
    guests = Math.min(parsed, MAX_GUESTS);
  }

  if (supabase) {
    const { data, error } = await supabase
      .from("wishes")
      .insert([{ name, attendance, guests, address, message }])
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ wish: data as Wish });
  }

  const wish: Wish = {
    id: crypto.randomUUID(),
    name,
    attendance: attendance as Wish["attendance"],
    guests,
    address,
    message,
    created_at: new Date().toISOString(),
  };
  memoryStore.push(wish);
  return NextResponse.json({
    wish,
    note: "Supabase belum dikonfigurasi — data sementara saja.",
  });
}
