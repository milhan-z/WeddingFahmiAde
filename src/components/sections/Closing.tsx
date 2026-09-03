"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/lib/data";

export default function Closing() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/sunset-purple-sky.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-cream" />
      </div>

      <Reveal>
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-maroon/70">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-4 max-w-sm font-body text-base italic leading-relaxed text-ink/75">
          apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa
          restu kepada kami.
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-8">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem]">
          <Image
            src="/assets/couple-modern.webp"
            alt={`${couple.bride.shortName} & ${couple.groom.shortName}`}
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <Image
          src="/assets/wedding-title.webp"
          alt={`The Wedding of ${couple.bride.shortName} & ${couple.groom.shortName}`}
          width={1400}
          height={1400}
          className="mx-auto -mt-4 w-full max-w-xs object-contain"
        />
      </Reveal>

      <Reveal delay={0.5}>
        <div className="ornament-divider mx-auto mt-8 max-w-[10rem]">
          <span className="shrink-0 font-script text-2xl text-mustard">
            &hearts;
          </span>
        </div>
        <p className="mx-auto mt-6 max-w-sm font-body text-sm text-ink/60">
          Wassalamu&apos;alaikum warahmatullahi wabarakatuh.
        </p>
      </Reveal>
    </section>
  );
}
