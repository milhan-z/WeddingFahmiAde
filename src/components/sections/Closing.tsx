"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { closing } from "@/lib/data";

export default function Closing() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-[#f6e3e6] px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center opacity-60">
        <Image
          src="/assets/floral-garland.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="100vw"
          className="w-[130%] max-w-none"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="font-body text-base leading-relaxed text-ink/80 sm:text-lg">
            {closing.text}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 font-script text-5xl text-maroon sm:text-6xl">
            {closing.signature}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
