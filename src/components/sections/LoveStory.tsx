"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * Love Story — PLACEHOLDER video.
 *
 * Ceritanya tidak lagi dijabarkan sebagai section web panjang; nanti diisi
 * pemutar video (potret 9:16, sesuai sumbernya). Sementara ini ditampilkan
 * sebagai poster bergaya scene — couple-modern di depan pelaminan yang
 * memudar, dengan tombol play — meniru penempatan aset di mockup. Begitu
 * videonya siap, isi bingkai tinggal ditukar tanpa menggeser layout.
 *
 * Komponen bab lama (SmaStory, CollegeStory, dst.) sengaja tidak dihapus
 * dari repo — masih tersimpan kalau versi web-nya dibutuhkan lagi.
 */
export default function LoveStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-[#f7edf0] to-cream px-6 pb-24 pt-16">
      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Love Story</span>
          </p>
          <h2 className="mt-5 font-serif text-2xl leading-snug text-maroon sm:text-3xl">
            Our Journey
          </h2>
          <p className="mx-auto mt-3 max-w-sm font-body text-base italic leading-relaxed text-ink/70">
            Dari bangku SMA sampai hari ini — kami rangkum lewat video.
          </p>
        </Reveal>

        {/* poster video 9:16 — couple-modern di depan pelaminan pucat */}
        <Reveal delay={0.15} className="mt-9">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[18rem] overflow-hidden rounded-3xl border border-mustard/25 bg-gradient-to-b from-[#fdfbf7] via-[#faf4f6] to-[#f3e9ec] shadow-lg shadow-maroon/10">
            {/* pelaminan pucat */}
            <Image
              src="/assets/stage-backdrop.webp"
              alt=""
              width={1400}
              height={1400}
              sizes="288px"
              className="pointer-events-none absolute inset-x-0 top-[8%] w-[150%] max-w-none -translate-x-[16%] opacity-[0.14]"
            />

            {/* pasangan */}
            <Image
              src="/assets/couple-modern.webp"
              alt="Fahmi & Ade"
              width={1000}
              height={1400}
              sizes="288px"
              className="absolute bottom-[10%] left-1/2 h-[74%] w-auto -translate-x-1/2 object-contain drop-shadow-[0_12px_16px_rgba(92,31,46,0.18)]"
            />

            {/* rangkaian bunga menutup kaki */}
            <Image
              src="/assets/floral-garland.webp"
              alt=""
              width={1400}
              height={1400}
              sizes="288px"
              className="pointer-events-none absolute inset-x-0 bottom-0 w-[135%] max-w-none -translate-x-[13%]"
            />

            {/* lapisan gelap + tombol play */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-maroon/5">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon/90 shadow-lg ring-4 ring-white/40 transition">
                <PlayIcon />
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 font-serif text-[11px] tracking-wide text-maroon backdrop-blur-sm">
                Video menyusul
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#fbf5ea" />
    </svg>
  );
}
