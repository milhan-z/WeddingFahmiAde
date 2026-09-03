"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * Love Story — video placeholder dibingkai seperti WARUNG, mengikuti frame
 * "Layout Web" di Figma: dahan berbunga di kiri atas, judul pudar sebagai
 * watermark, deretan semak, atap kayu (roof-texture), dan dua pilar bata
 * (brick-pattern) mengapit kotak video. Warung = tempat favorit mereka
 * (pecel lele), jadi bingkainya sekaligus penanda cerita.
 *
 * Kotak video masih placeholder; nanti tinggal ditukar <video> tanpa
 * mengubah bingkai.
 */
export default function LoveStory() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-[#f3ead9] px-5 pb-20 pt-14">
      {/* dahan berbunga di kiri atas */}
      <div className="pointer-events-none absolute -left-[12%] -top-[2%] z-30 w-[52%] max-w-[15rem] sm:w-[38%]">
        <Image
          src="/assets/branch-flowers.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="(min-width: 640px) 38vw, 52vw"
          className="w-full"
        />
      </div>

      {/* judul pudar sebagai watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-[4%] z-0 mx-auto flex justify-center opacity-[0.05]">
        <Image
          src="/assets/wedding-title.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="60vw"
          className="w-[60%] max-w-[16rem]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-sm">
        <Reveal className="text-center">
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Love Story</span>
          </p>
          <h2 className="mt-4 font-serif text-2xl leading-snug text-maroon sm:text-3xl">
            Our Journey
          </h2>
          <p className="mx-auto mt-2 max-w-xs font-body text-base italic leading-relaxed text-ink/70">
            Dari bangku SMA sampai hari ini — kami rangkum lewat video.
          </p>
        </Reveal>

        {/* ── BINGKAI WARUNG ── kotak video jadi dasar, pilar bata di kedua
            tepi, atap kayu duduk di atas pilar, semak di atas atap. Semua
            absolut relatif ke kotak video supaya rakitannya presisi. */}
        <Reveal delay={0.15} className="relative mt-32">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[17rem]">
            {/* kotak video (placeholder) */}
            <div className="absolute inset-0 overflow-hidden rounded-sm bg-[#241019]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 shadow-lg ring-4 ring-white/20">
                  <PlayIcon />
                </span>
                <span className="rounded-full bg-cream/15 px-3 py-1 font-serif text-[11px] tracking-wide text-cream/90 backdrop-blur-sm">
                  Video menyusul
                </span>
              </div>
            </div>

            {/* pilar bata kiri & kanan, menutup tepi kotak */}
            <div className="absolute inset-y-0 -left-[7%] z-10 w-[16%]">
              <Image
                src="/assets/brick-pattern.webp"
                alt=""
                fill
                sizes="50px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-y-0 -right-[7%] z-10 w-[16%]">
              <Image
                src="/assets/brick-pattern.webp"
                alt=""
                fill
                sizes="50px"
                className="object-cover"
              />
            </div>

            {/* atap kayu sebagai pita yang menudungi kotak — dipotong ke pita
                kayunya saja (asetnya banyak ruang transparan) */}
            <div className="absolute inset-x-0 -top-[46px] z-20 mx-auto h-[58px] w-[130%] max-w-none -translate-x-[11.5%] overflow-hidden">
              <Image
                src="/assets/roof-texture.webp"
                alt=""
                width={1553}
                height={746}
                sizes="(min-width: 640px) 480px, 110vw"
                className="h-full w-full object-cover object-[center_46%] drop-shadow-[0_5px_6px_rgba(46,42,37,0.25)]"
              />
            </div>

            {/* deretan semak duduk di atas atap */}
            <div className="pointer-events-none absolute inset-x-0 -top-[92px] z-30 flex items-end justify-center">
              <Image src="/assets/bush.webp" alt="" width={800} height={800} sizes="100px" className="-mr-5 h-14 w-auto drop-shadow" />
              <Image src="/assets/bush.webp" alt="" width={800} height={800} sizes="120px" className="z-10 h-[70px] w-auto -scale-x-100 drop-shadow" />
              <Image src="/assets/bush.webp" alt="" width={800} height={800} sizes="100px" className="-ml-5 h-14 w-auto drop-shadow" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#5c1f2e" />
    </svg>
  );
}
