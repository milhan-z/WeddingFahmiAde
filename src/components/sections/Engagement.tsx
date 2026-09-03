"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/lib/data";

export default function Engagement() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-deep to-cream px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">07</span>
          <h2 className="mt-1 font-serif text-2xl text-maroon">Lamaran</h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
            Ikatan yang direstui
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-10">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <Image
              src="/assets/engagement-frame.webp"
              alt=""
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center p-14">
              <Image
                src="/assets/engagement-couple.webp"
                alt={`Lamaran ${couple.bride.shortName} & ${couple.groom.shortName}`}
                width={500}
                height={600}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-sm font-body text-base italic leading-relaxed text-ink/75 sm:text-lg">
            Sebuah lamaran sederhana, penuh haru dan doa — pertanda restu
            telah diberikan, dan langkah menuju pernikahan pun dimulai.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
