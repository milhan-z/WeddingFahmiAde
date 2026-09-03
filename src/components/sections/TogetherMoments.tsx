"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function TogetherMoments() {
  return (
    <section className="relative overflow-hidden bg-cream-deep px-6 py-24">
      <div className="absolute inset-0 -z-10 opacity-30">
        <Image
          src="/assets/mountain-lake.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-deep/60 via-cream-deep/70 to-cream-deep" />
      </div>

      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">04</span>
          <h2 className="mt-1 font-serif text-2xl text-maroon">
            Momen Kebersamaan
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
            Danau &amp; lembaran baru
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <Image
            src="/assets/swan-boat.webp"
            alt="Naik perahu angsa di danau"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-sm object-contain drop-shadow-lg"
          />
          <p className="mx-auto mt-5 max-w-sm font-body text-base italic leading-relaxed text-ink/75 sm:text-lg">
            Menyusuri danau berdua, dikelilingi pegunungan — momen sederhana
            yang selalu mereka rindukan.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14">
          <Image
            src="/assets/boat-candid.webp"
            alt="Ade & Fahmi bersandar di geladak kapal"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-sm object-contain drop-shadow-lg"
          />
        </Reveal>

        <Reveal delay={0.4} className="mt-14">
          <Image
            src="/assets/haircut.webp"
            alt="Ade memotong rambut Fahmi"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-xs rounded-lg object-contain"
          />
          <p className="mx-auto mt-5 max-w-sm font-body text-base italic leading-relaxed text-ink/75 sm:text-lg">
            Rambut gondrong yang dulu jadi ciri khas, kini dipotong sebagai
            simbol lembaran hidup baru yang akan mereka mulai bersama.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
