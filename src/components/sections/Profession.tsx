"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Profession() {
  return (
    <section className="relative bg-cream px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">05</span>
          <h2 className="mt-1 font-serif text-2xl text-maroon">
            Jalan Masing-Masing
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
            Sebelum akhirnya bersatu
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Image
            src="/assets/fahmi-illustrator.webp"
            alt="Fahmi bekerja sebagai illustrator"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-sm rounded-lg object-contain"
          />
          <span className="mt-4 block font-script text-2xl text-maroon">
            Fahmi
          </span>
          <p className="mx-auto mt-1 max-w-sm font-body text-base italic leading-relaxed text-ink/75">
            Berkarya sebagai graphic designer &amp; illustrator di Jakarta,
            menuangkan cerita lewat gambar setiap hari.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14">
          <Image
            src="/assets/ade-ngaji.webp"
            alt="Ade mengajar mengaji"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-sm rounded-lg object-contain"
          />
          <span className="mt-4 block font-script text-2xl text-maroon">
            Ade
          </span>
          <p className="mx-auto mt-1 max-w-sm font-body text-base italic leading-relaxed text-ink/75">
            Mengabdi sebagai guru dan pengajar ngaji, menemani anak-anak
            mengenal Al-Qur&apos;an sejak dini.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
