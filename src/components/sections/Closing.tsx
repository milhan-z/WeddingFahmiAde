"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { closing } from "@/lib/data";

/**
 * Penutup + footer besar. Meniru bagian bawah mockup: dahan berbunga
 * membingkai sudut atas, pasangan busana adat Jawa berdiri di tengah,
 * dan rangkaian bunga menutup kaki halaman.
 */
export default function Closing() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-cream via-[#f7edf0] to-[#f3e0e5] px-6 pt-16">
      {/* dahan berbunga di sudut atas */}
      <div className="pointer-events-none absolute -left-[14%] -top-[2%] z-[2] w-[56%] max-w-[15rem] sm:w-[40%]">
        <Image
          src="/assets/branch-flowers.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="(min-width: 640px) 40vw, 56vw"
          className="w-full"
        />
      </div>
      <div className="pointer-events-none absolute -right-[14%] -top-[2%] z-[2] w-[56%] max-w-[15rem] -scale-x-100 sm:w-[40%]">
        <Image
          src="/assets/branch-flowers.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="(min-width: 640px) 40vw, 56vw"
          className="w-full"
        />
      </div>

      {/* teks penutup */}
      <div className="relative z-10 mx-auto max-w-md pt-6 text-center">
        <Reveal>
          <p className="font-body text-base leading-relaxed text-ink/80 sm:text-lg">
            {closing.text}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 font-script text-5xl text-maroon sm:text-6xl">
            {closing.signature}
          </p>
        </Reveal>
      </div>

      {/* pasangan busana adat, berdiri menapak dasar halaman */}
      <div className="relative z-10 mt-auto flex min-h-0 flex-1 items-end justify-center">
        <Image
          src="/assets/couple-javanese.webp"
          alt="Fahmi & Ade"
          width={990}
          height={1400}
          sizes="(min-width: 640px) 300px, 62vw"
          className="h-auto max-h-[62svh] w-auto max-w-[62%] object-contain drop-shadow-[0_14px_18px_rgba(92,31,46,0.2)]"
        />
      </div>

      {/* rangkaian bunga menutup kaki halaman */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] mx-auto w-[135%] max-w-none -translate-x-[13%] self-center">
        <Image
          src="/assets/floral-garland.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="135vw"
          className="w-full"
        />
      </div>

      <p className="relative z-10 pb-6 pt-4 text-center font-serif text-xs tracking-widest text-ink/40">
        Made with love — {closing.signature}, 2026
      </p>
    </section>
  );
}
