"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Umrah() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a2036] to-cream-deep px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">06</span>
          <h2 className="mt-1 font-serif text-2xl text-cream">
            Perjalanan Ibadah
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-cream/50">
            Menjemput restu langit
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-sm animate-drift">
            <Image
              src="/assets/plane-exterior.webp"
              alt="Pesawat menuju Tanah Suci"
              fill
              className="object-contain"
            />
          </div>
        </Reveal>

        <Reveal delay={0.25} className="mt-6">
          <Image
            src="/assets/plane-ade.webp"
            alt="Ade dalam perjalanan ke Tanah Suci"
            width={990}
            height={1400}
            className="mx-auto h-72 w-auto object-contain drop-shadow-xl sm:h-80"
          />
          <p className="mx-auto mt-6 max-w-sm font-body text-base italic leading-relaxed text-cream/85 sm:text-lg">
            Sebelum melangkah ke jenjang pernikahan, Ade menyempatkan diri
            merenung dan berdoa di Tanah Suci — memohon kelancaran dan
            keberkahan untuk babak baru kehidupannya.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
