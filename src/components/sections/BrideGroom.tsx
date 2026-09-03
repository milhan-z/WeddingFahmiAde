"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { couple } from "@/lib/data";

/**
 * Bride & Groom — mengikuti frame Figma "Layout Web": teks pembuka
 * (Assalamualaikum...), lalu tiap mempelai dengan nama + orang tua +
 * tombol Instagram, dipisah "&". Latar pelaminan pucat sebagai lengkung.
 */
export default function BrideGroom() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-[#faf3f5] to-cream px-6 py-24">
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
          <p className="mx-auto mt-6 max-w-sm font-body text-base leading-relaxed text-ink/75">
            {couple.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Person {...couple.groom} />
        </Reveal>

        <Reveal delay={0.25}>
          <span className="my-8 block font-script text-5xl text-mustard">
            &amp;
          </span>
        </Reveal>

        <Reveal delay={0.32}>
          <Person {...couple.bride} />
        </Reveal>
      </div>
    </section>
  );
}

function Person({
  name,
  shortName,
  order,
  parents,
  instagram,
}: {
  name: string;
  shortName: string;
  order: string;
  parents: string;
  instagram: string;
}) {
  return (
    <div>
      <p className="font-script text-3xl text-mustard">{shortName}</p>
      <h3 className="mt-1 font-serif text-2xl font-semibold text-maroon sm:text-3xl">
        {name}
      </h3>
      <p className="mt-3 font-body text-sm text-ink/60">{order}</p>
      <p className="font-body text-base text-ink/80">{parents}</p>

      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-maroon px-4 py-1.5 font-serif text-xs tracking-wide text-cream transition hover:bg-maroon-deep active:scale-[0.97]"
        >
          <InstagramIcon />
          Instagram
        </a>
      )}
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}
