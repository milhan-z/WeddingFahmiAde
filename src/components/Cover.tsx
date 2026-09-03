"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { event } from "@/lib/data";

/**
 * Halaman pembuka — penempatan aset mengikuti mockup yang diberikan:
 * pelaminan (stage-backdrop) tampil PENUH sebagai latar, pasangan modern
 * berdiri besar di tengah, dan rangkaian bunga menutup kaki. Tidak ada
 * dahan sudut atau sofa — cukup panggung + pasangan.
 *
 * Layout tiga lapis: teks atas (shrink-0), panggung (flex-1 +
 * overflow-hidden), tombol dilayangkan di bagian bawah panggung.
 * `overflow-hidden` penting supaya panggung tidak meluber menimpa teks
 * di layar pendek.
 *
 * Animasi masuk memakai CSS, bukan framer-motion: animasi JS menggantung
 * di opacity 0 kalau requestAnimationFrame ter-throttle (tab background,
 * in-app browser WhatsApp) — di layar pertama undangan itu berarti tamu
 * melihat halaman kosong. framer-motion hanya dipakai untuk animasi
 * keluar, yang jalan setelah tamu menekan tombol.
 */
export default function Cover({
  guestName,
  onOpen,
}: {
  guestName: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#fbf6f4] to-[#f3e9ec]"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* cahaya lembut di belakang judul */}
      <div className="pointer-events-none absolute left-1/2 top-[3%] z-0 h-[34%] w-[125%] -translate-x-1/2 rounded-[50%] bg-white/80 blur-3xl" />

      {/* ── BLOK 1: teks ── */}
      <div className="relative z-20 shrink-0 px-6 pt-[4svh] text-center">
        <div
          className="animate-rise-in mx-auto w-full max-w-[17rem] sm:max-w-[19rem]"
          style={{ animationDelay: "0.15s" }}
        >
          <Image
            src="/assets/wedding-title.webp"
            alt="The Wedding of Ade & Fahmi"
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 304px, 272px"
            priority
            className="w-full"
          />
        </div>

        <div
          className="animate-rise-in mt-2 flex flex-col items-center gap-1.5"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="font-serif text-sm tracking-[0.15em] text-maroon/85">
            {event.dateLabel}
          </span>
          <span className="ornament-divider w-52 font-serif text-[9px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Wedding Invitation</span>
          </span>
        </div>

        <div
          className="animate-rise-in mt-4 flex flex-col items-center gap-1"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="font-serif text-[10px] uppercase tracking-[0.32em] text-ink/45">
            Kepada Yth.
          </span>
          <span className="max-w-[16rem] font-serif text-lg leading-snug text-maroon sm:text-xl">
            {guestName || "Tamu Undangan"}
          </span>
        </div>
      </div>

      {/* ── BLOK 2: panggung penuh + pasangan ── */}
      <div className="relative z-10 min-h-0 w-full flex-1 overflow-hidden">
        {/* pelaminan tampil penuh sebagai latar */}
        <div className="animate-fade-in pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[122%] max-w-none -translate-x-[9%]">
          <Image
            src="/assets/stage-backdrop.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="122vw"
            priority
            className="w-full opacity-90"
          />
        </div>

        {/* fade putih di atas panggung supaya menyatu dengan area teks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[32%] bg-gradient-to-b from-[#fbf6f4] to-transparent" />

        {/* pasangan, besar dan berdiri di tengah panggung */}
        <div className="animate-rise-in absolute inset-0 z-[2] flex items-end justify-center pb-[11%]" style={{ animationDelay: "0.7s" }}>
          <Image
            src="/assets/couple-modern.webp"
            alt="Ade & Fahmi"
            width={1000}
            height={1400}
            sizes="(min-width: 640px) 340px, 80vw"
            priority
            className="h-[88%] max-h-full w-auto object-contain drop-shadow-[0_14px_18px_rgba(92,31,46,0.2)]"
          />
        </div>

        {/* rangkaian bunga menutup kaki panggung */}
        <div className="animate-fade-in pointer-events-none absolute inset-x-0 bottom-0 z-[3] mx-auto w-[135%] max-w-none -translate-x-[13%]">
          <Image
            src="/assets/floral-garland.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="135vw"
            className="w-full"
          />
        </div>

        {/* tombol dilayangkan di bagian bawah panggung */}
        <div className="absolute inset-x-0 bottom-[6%] z-[4] flex justify-center px-6">
          <button
            onClick={onOpen}
            style={{ animationDelay: "0.95s" }}
            className="animate-rise-in inline-flex items-center gap-2 rounded-full bg-maroon px-9 py-3.5 font-serif text-sm tracking-wide text-cream shadow-lg shadow-maroon/30 transition hover:bg-maroon-deep active:scale-[0.97]"
          >
            <EnvelopeIcon />
            Buka Undangan
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m4 6.5 8 6.5 8-6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
