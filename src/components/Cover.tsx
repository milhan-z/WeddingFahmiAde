"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { event } from "@/lib/data";

/**
 * Halaman pembuka — meniru frame penutup video: pelaminan yang memudar
 * ke putih, sofa emas, pasangan berbusana ungu modern.
 *
 * Layout dibagi tiga blok tegas: teks atas (shrink-0), panggung
 * (flex-1 + overflow-hidden), tombol bawah (shrink-0). `overflow-hidden`
 * itu yang penting — tanpa itu, sofa dan pasangan meluber ke atas di
 * layar pendek dan menutupi nama tamu.
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
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#faf4f6] to-[#f3e9ec]"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* pelaminan dipucatkan jadi lengkung putih lembut, di lapisan terbawah */}
      <div className="animate-fade-in pointer-events-none absolute inset-x-0 top-[6%] z-0 mx-auto w-[150%] max-w-none -translate-x-[16.5%] opacity-[0.15]">
        <Image
          src="/assets/stage-backdrop.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="150vw"
          priority
          className="w-full"
        />
      </div>

      {/* cahaya lembut di belakang judul */}
      <div className="pointer-events-none absolute left-1/2 top-[4%] z-0 h-[38%] w-[125%] -translate-x-1/2 rounded-[50%] bg-white/75 blur-3xl" />

      {/* dahan berbunga membingkai sudut atas — motif utama mockup */}
      <div className="animate-fade-in pointer-events-none absolute -left-[14%] -top-[3%] z-[5] w-[58%] max-w-[16rem] sm:w-[42%]">
        <Image
          src="/assets/branch-flowers.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="(min-width: 640px) 42vw, 58vw"
          className="w-full"
        />
      </div>
      <div className="animate-fade-in pointer-events-none absolute -right-[14%] -top-[3%] z-[5] w-[58%] max-w-[16rem] -scale-x-100 sm:w-[42%]">
        <Image
          src="/assets/branch-flowers.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="(min-width: 640px) 42vw, 58vw"
          className="w-full"
        />
      </div>

      {/* ── BLOK 1: teks ── */}
      <div className="relative z-20 shrink-0 px-6 pt-[4svh] text-center">
        <div
          className="animate-rise-in mx-auto w-full max-w-[15.5rem] sm:max-w-[17rem]"
          style={{ animationDelay: "0.15s" }}
        >
          <Image
            src="/assets/wedding-title.webp"
            alt="The Wedding of Ade & Fahmi"
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 272px, 248px"
            priority
            className="w-full"
          />
        </div>

        <div
          className="animate-rise-in -mt-1 flex flex-col items-center gap-1.5"
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
          className="animate-rise-in mt-5 flex flex-col items-center gap-1"
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

      {/* ── BLOK 2: panggung — dikurung supaya tidak pernah menimpa teks ── */}
      <div
        className="animate-rise-in relative z-10 min-h-0 w-full flex-1 overflow-hidden"
        style={{ animationDelay: "0.7s" }}
      >
        {/* Panggung disusun berdasarkan TINGGI, bukan lebar. Kalau ukurannya
            ditentukan lebar (mis. w-[62%]), di layar pendek lebar menang dan
            gambar meluber ke atas lalu terpotong kepalanya. Dengan h-full +
            w-auto, pasangan selalu utuh berapa pun tinggi panggungnya, dan
            sofa ikut menyesuaikan karena diukur relatif terhadapnya. */}
        <div className="absolute inset-0 flex items-end justify-center pb-[13%]">
          <div className="relative h-[92%] max-h-full">
            <Image
              src="/assets/sofa-gold.webp"
              alt=""
              width={1400}
              height={1400}
              sizes="(min-width: 640px) 360px, 90vw"
              className="absolute bottom-[-6%] left-1/2 w-[132%] max-w-none -translate-x-1/2"
            />
            <Image
              src="/assets/couple-modern.webp"
              alt="Ade & Fahmi"
              width={1000}
              height={1400}
              sizes="(min-width: 640px) 300px, 70vw"
              priority
              className="relative h-full w-auto object-contain drop-shadow-[0_14px_18px_rgba(92,31,46,0.18)]"
            />
          </div>
        </div>

        {/* rangkaian bunga menutup kaki panggung */}
        <div className="animate-fade-in pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-[135%] max-w-none -translate-x-[13%]">
          <Image
            src="/assets/floral-garland.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="135vw"
            className="w-full"
          />
        </div>
      </div>

      {/* ── BLOK 3: tombol ── */}
      <div className="relative z-20 shrink-0 px-6 pb-[4svh] pt-2 text-center">
        <button
          onClick={onOpen}
          style={{ animationDelay: "0.95s" }}
          className="animate-rise-in inline-flex items-center gap-2 rounded-full bg-maroon px-9 py-3.5 font-serif text-sm tracking-wide text-cream shadow-lg shadow-maroon/25 transition hover:bg-maroon-deep active:scale-[0.97]"
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
