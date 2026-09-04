import { NextResponse } from "next/server";
import { addWish, sheetsEnabled } from "@/lib/wishesStore";

/**
 * Tes koneksi RSVP -> Google Sheets, dipakai tombol di /admin.
 *
 * Sengaja menempuh jalur yang SAMA PERSIS dengan kiriman tamu sungguhan
 * (addWish -> Apps Script -> Spreadsheet). Tes yang cuma mengecek env var
 * atau mengetuk URL-nya akan lulus padahal barisnya tidak pernah masuk —
 * justru kegagalan itu yang perlu ketahuan.
 *
 * Konsekuensinya satu baris betulan ditulis ke sheet, jadi namanya dibuat
 * mencolok supaya jelas boleh dihapus.
 */
export const dynamic = "force-dynamic";

const PROBE_NAME = "[TES KONEKSI - boleh dihapus]";
const COOLDOWN_MS = 30_000;

/* Endpoint ini menulis baris dan tidak berpassword, jadi diberi jeda supaya
   tidak bisa dipakai membanjiri spreadsheet mempelai. Disimpan di memori
   proses: cukup untuk maksudnya, dan tidak menambah ketergantungan apa pun. */
let lastRun = 0;

export async function POST() {
  if (!sheetsEnabled) {
    return NextResponse.json({
      ok: false,
      title: "Belum tersambung",
      detail:
        "SHEETS_WEBAPP_URL belum diisi. Tambahkan di Vercel -> Settings -> Environment Variables (tanpa awalan NEXT_PUBLIC_), lalu redeploy.",
    });
  }

  const sisa = COOLDOWN_MS - (Date.now() - lastRun);
  if (sisa > 0) {
    return NextResponse.json({
      ok: false,
      title: "Tunggu sebentar",
      detail: `Tes bisa diulang dalam ${Math.ceil(sisa / 1000)} detik.`,
    });
  }
  lastRun = Date.now();

  try {
    await addWish({
      name: PROBE_NAME,
      attendance: "hadir",
      guests: 1,
      address: null,
      message: "Baris uji koneksi dari halaman admin. Aman dihapus.",
    });
    return NextResponse.json({
      ok: true,
      title: "Tersambung",
      detail: `Satu baris bernama "${PROBE_NAME}" masuk ke spreadsheet. Hapus baris itu, lalu undangan siap disebar.`,
    });
  } catch (e) {
    const pesan = e instanceof Error ? e.message : String(e);

    /* Terjemahkan error khas Apps Script jadi langkah yang bisa dikerjakan.
       Pesan aslinya ("Cannot read properties of null") tidak berarti apa-apa
       bagi yang tidak menulis skripnya. */
    let saran = "";
    if (/getSheetByName|appendRow|reading 'appendRow'/i.test(pesan)) {
      saran =
        "Tab di spreadsheet belum bernama RSVP. Klik dua kali nama tab di kiri bawah (biasanya \"Sheet1\"), ganti jadi RSVP — huruf besar semua, tanpa spasi.";
    } else if (/getSheetByName' of null|getActiveSpreadsheet/i.test(pesan)) {
      saran =
        "Apps Script-nya tidak menempel ke spreadsheet mana pun. Buat ulang lewat spreadsheet: Extensions -> Apps Script.";
    } else if (/Script function not found/i.test(pesan)) {
      saran =
        "Skrip tidak punya fungsi doPost, atau deployment masih versi lama. Deploy -> Manage deployments -> Edit -> Version: New version.";
    } else if (/Moved Temporarily|accounts\.google|Sign in/i.test(pesan)) {
      saran =
        "Deployment belum bisa diakses publik. Deploy -> Manage deployments -> Edit -> Who has access: Anyone.";
    }

    return NextResponse.json({
      ok: false,
      title: "Gagal menyimpan",
      detail: saran || "Penyebab tidak dikenali — lihat pesan asli di bawah.",
      raw: pesan,
    });
  }
}
