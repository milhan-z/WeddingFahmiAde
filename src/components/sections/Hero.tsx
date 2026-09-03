"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#dce9f2] via-cream to-cream px-6 text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/cloud-blue.webp"
          alt=""
          fill
          className="object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/40 to-cream" />
      </div>

      <div className="pointer-events-none absolute left-[6%] top-[18%] w-20 animate-drift opacity-90 sm:w-28">
        <Image src="/assets/seagull.webp" alt="" width={160} height={160} />
      </div>
      <div className="pointer-events-none absolute right-[10%] top-[30%] w-12 animate-drift opacity-70 [animation-delay:2s] sm:w-16">
        <Image src="/assets/seagull.webp" alt="" width={110} height={110} />
      </div>

      <Reveal>
        <p className="ornament-divider font-serif text-xs uppercase tracking-[0.4em] text-maroon/70">
          <span className="shrink-0">Undangan Pernikahan</span>
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-8 w-full max-w-md">
        <Image
          src="/assets/journey-title.webp"
          alt="The Journey of Ade & Fahmi"
          width={900}
          height={900}
          className="mx-auto w-full"
          priority
        />
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mx-auto mt-8 max-w-sm font-body text-base italic leading-relaxed text-ink/70 sm:text-lg">
          Sebuah kisah yang dimulai dari bangku sekolah, melewati jarak dan
          waktu, hingga akhirnya bermuara pada satu janji suci.
        </p>
      </Reveal>

      <Reveal delay={0.45} className="mt-10 flex flex-col items-center gap-2">
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
          Scroll
        </span>
        <span className="h-8 w-px animate-pulse bg-maroon/40" />
      </Reveal>
    </section>
  );
}
