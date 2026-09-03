"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/lib/data";

/**
 * Bride & Groom — urutan mengikuti referensi: Fahmi lebih dulu, lalu Ade.
 */
export default function BrideGroom() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-[#f7edf0] px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-25">
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
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Bride &amp; Groom</span>
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <Image
            src="/assets/couple-javanese.webp"
            alt={`${couple.groom.shortName} & ${couple.bride.shortName}`}
            width={990}
            height={1400}
            sizes="(min-width: 640px) 300px, 62vw"
            className="mx-auto h-64 w-auto object-contain drop-shadow-xl sm:h-72"
          />
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <Person
            name={couple.groom.name}
            order={couple.groom.order}
            parents={couple.groom.parents}
          />
        </Reveal>

        <Reveal delay={0.28}>
          <span className="my-7 block font-script text-4xl text-mustard">
            &amp;
          </span>
        </Reveal>

        <Reveal delay={0.34}>
          <Person
            name={couple.bride.name}
            order={couple.bride.order}
            parents={couple.bride.parents}
          />
        </Reveal>
      </div>
    </section>
  );
}

function Person({
  name,
  order,
  parents,
}: {
  name: string;
  order: string;
  parents: string;
}) {
  return (
    <div>
      <h3 className="font-script text-4xl leading-tight text-maroon sm:text-5xl">
        {name}
      </h3>
      <p className="mt-3 font-body text-sm text-ink/60">{order}</p>
      <p className="font-body text-base text-ink/80">{parents}</p>
    </div>
  );
}
