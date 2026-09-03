"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { quranQuote } from "@/lib/data";

/** "We Found Love" — ayat pembuka, section pertama setelah Love Story. */
export default function QuranQuote() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7edf0] via-cream to-cream px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center opacity-20">
        <Image
          src="/assets/branch-flowers.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="100vw"
          className="w-[120%] max-w-none rotate-180"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">{quranQuote.heading}</span>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            dir="rtl"
            lang="ar"
            className="mt-10 text-2xl leading-[2.2] text-maroon sm:text-3xl"
          >
            {quranQuote.arabic}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-8 font-body text-base italic leading-relaxed text-ink/75 sm:text-lg">
            {quranQuote.translation}
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-5 font-serif text-xs uppercase tracking-[0.25em] text-mustard">
            {quranQuote.source}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
