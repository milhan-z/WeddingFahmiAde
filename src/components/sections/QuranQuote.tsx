"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { quranQuote } from "@/lib/data";

export default function QuranQuote() {
  return (
    <section className="relative bg-maroon px-6 py-24 text-cream">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <div className="relative mx-auto h-16 w-40">
            <Image
              src="/assets/floral-garland.webp"
              alt=""
              fill
              className="object-contain opacity-90"
            />
          </div>
          <p className="ornament-divider mt-2 font-serif text-xs uppercase tracking-[0.35em] text-mustard">
            <span className="shrink-0">Firman Allah</span>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p
            dir="rtl"
            className="mt-8 font-serif text-2xl leading-loose text-cream/95 sm:text-3xl"
          >
            {quranQuote.arabic}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-8 font-body text-base italic leading-relaxed text-cream/80 sm:text-lg">
            {quranQuote.translation}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-5 font-serif text-sm tracking-wide text-mustard">
            {quranQuote.source}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
