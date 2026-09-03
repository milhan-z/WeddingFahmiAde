"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function CollegeStory() {
  return (
    <section className="relative bg-gradient-to-b from-cream to-cream-deep px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">02</span>
          <h2 className="mt-1 font-serif text-2xl text-maroon">
            Kuliah &amp; Jarak
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
            Beda Kota, Tetap Terhubung
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-sm font-body text-base italic leading-relaxed text-ink/75 sm:text-lg">
            Lulus SMA, jalan mereka sempat berpisah kota — namun jarak tak
            pernah benar-benar memisahkan.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8">
          <Reveal direction="left" delay={0.2}>
            <div className="flex flex-col items-center">
              <Image
                src="/assets/ibnkhaldun-building.webp"
                alt="Universitas Ibn Khaldun Bogor"
                width={1400}
                height={1400}
                className="w-full rounded-lg object-contain"
              />
              <Image
                src="/assets/ade-graduation.webp"
                alt="Ade wisuda"
                width={1400}
                height={1400}
                className="-mt-8 h-32 w-auto object-contain drop-shadow-lg sm:h-40"
              />
              <span className="mt-1 font-script text-2xl text-maroon">
                Ade
              </span>
              <span className="font-serif text-[11px] leading-tight text-ink/60">
                Universitas Ibn Khaldun
                <br />
                Bogor
              </span>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.3}>
            <div className="flex flex-col items-center">
              <Image
                src="/assets/indraprasta-building.webp"
                alt="Universitas Indraprasta"
                width={1400}
                height={1400}
                className="w-full rounded-lg object-contain"
              />
              <Image
                src="/assets/fahmi-graduation.webp"
                alt="Fahmi wisuda"
                width={1400}
                height={1400}
                className="-mt-8 h-32 w-auto object-contain drop-shadow-lg sm:h-40"
              />
              <span className="mt-1 font-script text-2xl text-maroon">
                Fahmi
              </span>
              <span className="font-serif text-[11px] leading-tight text-ink/60">
                Universitas Indraprasta
                <br />
                PGRI
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
