"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/lib/data";

/**
 * Bride & Groom — panel teks di atas pelaminan yang memudar (meniru
 * latar lengkung putih di mockup). Urutan mengikuti referensi: Fahmi
 * lebih dulu, lalu Ade. Ilustrasi pasangan ditaruh di footer, jadi di
 * sini fokus ke nama & orang tua.
 */
export default function BrideGroom() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-[#faf3f5] to-cream px-6 py-24">
      {/* pelaminan pucat sebagai latar lengkung */}
      <div className="pointer-events-none absolute inset-x-0 top-[8%] z-0 mx-auto w-[150%] max-w-none -translate-x-[16.5%] opacity-[0.13]">
        <Image
          src="/assets/stage-backdrop.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="150vw"
          className="w-full"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-md text-center">
        <Reveal>
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Bride &amp; Groom</span>
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Person
            name={couple.groom.name}
            order={couple.groom.order}
            parents={couple.groom.parents}
          />
        </Reveal>

        <Reveal delay={0.25}>
          <span className="my-8 block font-script text-5xl text-mustard">
            &amp;
          </span>
        </Reveal>

        <Reveal delay={0.32}>
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
