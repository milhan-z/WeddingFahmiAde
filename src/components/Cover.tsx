"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Halaman pembuka — meniru frame penutup video (02:47–02:51): pelaminan
 * yang memudar ke putih, sofa emas, pasangan berbusana ungu modern, dan
 * lockup judul "The Wedding of Ade & Fahmi".
 *
 * Nama tamu diisi lewat query link, contoh: /?to=Bapak%20Budi
 *
 * Animasi masuk memakai CSS (.animate-rise-in / .animate-fade-in), bukan
 * framer-motion. Alasannya: animasi JS menggantung di opacity 0 kalau
 * requestAnimationFrame ter-throttle (tab background, in-app browser
 * WhatsApp) — dan di layar pertama undangan, itu berarti halaman kosong.
 * framer-motion tetap dipakai untuk animasi keluar, yang baru jalan
 * setelah tamu menekan tombol.
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
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#faf4f6] to-[#f6eef1]"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* ── PELAMINAN: dipucatkan sampai jadi lengkung putih lembut ── */}
      <div className="animate-fade-in pointer-events-none absolute inset-x-0 bottom-[12%] mx-auto w-[145%] max-w-none -translate-x-[15.5%] opacity-[0.16]">
        <Image
          src="/assets/stage-backdrop.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="145vw"
          priority
          className="w-full"
        />
      </div>

      {/* cahaya lembut di belakang judul */}
      <div className="pointer-events-none absolute left-1/2 top-[6%] h-[42%] w-[120%] -translate-x-1/2 rounded-[50%] bg-white/70 blur-3xl" />

      {/* ── KONTEN ── */}
      <div className="relative z-10 flex h-full w-full flex-col items-center px-6 pb-7 pt-[4.5svh] text-center">
        {/* judul */}
        <div
          className="animate-rise-in w-full max-w-[16.5rem] sm:max-w-xs"
          style={{ animationDelay: "0.15s" }}
        >
          <Image
            src="/assets/wedding-title.webp"
            alt="The Wedding of Ade & Fahmi"
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 384px, 304px"
            priority
            className="w-full"
          />
        </div>

        {/* nama tamu */}
        <div
          className="animate-rise-in -mt-2 flex flex-col items-center gap-1"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="font-serif text-[10px] uppercase tracking-[0.32em] text-ink/45">
            Kepada Yth.
          </span>
          <span className="max-w-[16rem] font-serif text-lg leading-snug text-maroon sm:text-xl">
            {guestName || "Bapak / Ibu / Saudara/i"}
          </span>
        </div>

        {/* ── PASANGAN DI SOFA ── */}
        <div
          className="animate-rise-in relative mt-3 flex min-h-0 w-full max-w-md flex-1 items-end justify-center"
          style={{ animationDelay: "0.7s" }}
        >
          {/* sofa emas di belakang — sengaja lebih kecil dari pasangan
              supaya proporsinya mengikuti frame video */}
          <div className="absolute bottom-[10%] w-[66%] max-w-[17rem]">
            <Image
              src="/assets/sofa-gold.webp"
              alt=""
              width={1400}
              height={1400}
              sizes="(min-width: 640px) 272px, 66vw"
              className="w-full"
            />
          </div>

          <Image
            src="/assets/couple-modern.webp"
            alt="Ade & Fahmi"
            width={1000}
            height={1400}
            sizes="(min-width: 640px) 420px, 95vw"
            priority
            className="relative h-full w-auto max-w-[95%] object-contain drop-shadow-[0_16px_20px_rgba(92,31,46,0.2)]"
          />
        </div>

        {/* rangkaian bunga di kaki panggung */}
        <div
          className="animate-fade-in pointer-events-none absolute inset-x-0 bottom-[4.5rem] -z-10 mx-auto w-[130%] -translate-x-[11.5%] opacity-70"
          style={{ animationDelay: "0.8s" }}
        >
          <Image
            src="/assets/floral-garland.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="130vw"
            className="w-full"
          />
        </div>

        {/* tombol buka */}
        <button
          onClick={onOpen}
          style={{ animationDelay: "0.95s" }}
          className="animate-rise-in mt-4 flex shrink-0 items-center gap-2 rounded-full bg-maroon px-9 py-3.5 font-serif text-sm tracking-wide text-cream shadow-lg shadow-maroon/25 transition hover:bg-maroon-deep active:scale-[0.97]"
        >
          <EnvelopeIcon />
          Buka Undangan
        </button>
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
