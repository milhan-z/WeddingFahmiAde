"use client";

import Reveal from "@/components/Reveal";
import { couple } from "@/lib/data";

/**
 * Bride & Groom — mengikuti frame Figma "Layout Web": kartu putih beratap
 * lengkung (arch) di atas latar langit cyan, teks pembuka Assalamualaikum,
 * lalu tiap mempelai (nama + orang tua + tombol Instagram hitam), dipisah "&".
 */
export default function BrideGroom() {
  return (
    <section className="bg-sky px-5 py-16">
      <div className="mx-auto max-w-md overflow-hidden rounded-t-[45%] rounded-b-[2rem] bg-white px-7 pb-12 pt-24 text-center shadow-[0_18px_40px_rgba(46,42,37,0.12)]">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-ink">
            Bride &amp;
            <br />
            Groom
          </h2>
          <p className="mx-auto mt-5 max-w-sm font-body text-sm leading-relaxed text-ink/70">
            {couple.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Person {...couple.groom} />
        </Reveal>

        <Reveal delay={0.25}>
          <span className="my-6 block font-script text-6xl text-ink/80">
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
      <p className="font-script text-4xl text-maroon">{shortName}</p>
      <h3 className="mt-1 font-serif text-2xl font-semibold text-ink sm:text-[1.7rem]">
        {name}
      </h3>
      <p className="mx-auto mt-3 max-w-[16rem] font-body text-sm leading-relaxed text-ink/65">
        {order} {parents}
      </p>

      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 font-sans text-xs font-medium tracking-wide text-white transition hover:opacity-90 active:scale-[0.97]"
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
    </svg>
  );
}
