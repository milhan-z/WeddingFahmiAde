"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import { event } from "@/lib/data";

export default function SaveTheDate() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-[#f6e3e6] px-6 py-24">
      <div className="absolute inset-0 -z-10 opacity-[0.14]">
        <Image
          src="/assets/stage-backdrop.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Save the Date</span>
          </p>
          <p className="mt-6 font-script text-4xl text-maroon sm:text-5xl">
            {event.dateLabel}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <Countdown target={event.isoDateTime} />
        </Reveal>
      </div>
    </section>
  );
}
