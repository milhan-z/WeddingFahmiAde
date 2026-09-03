"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { event } from "@/lib/data";

/** "Wedding Event" — akad, resepsi, dan lokasi. */
export default function WeddingDetails() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6e3e6] to-cream px-6 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-30">
        <Image
          src="/assets/floral-arch-2.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="(min-width: 640px) 384px, 288px"
          className="w-72 sm:w-96"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Wedding Event</span>
          </p>
          <p className="mx-auto mt-6 max-w-sm font-body text-base leading-relaxed text-ink/75">
            {event.intro}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 space-y-6">
          <EventCard {...event.akad} />
          <EventCard {...event.resepsi} />
        </Reveal>

        <Reveal delay={0.28} className="mt-8">
          <div className="rounded-2xl border border-mustard/30 bg-white/60 p-5 shadow-sm backdrop-blur-sm">
            <p className="font-serif text-sm font-semibold text-maroon">
              {event.location.name}
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
              {event.location.address}
            </p>
            <a
              href={event.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2 font-serif text-xs tracking-wide text-cream transition hover:bg-maroon-deep"
            >
              Buka Google Maps
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.36} className="mt-12">
          <Image
            src="/assets/boat-candid.webp"
            alt="Fahmi & Ade"
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 360px, 80vw"
            className="mx-auto w-full max-w-xs object-contain drop-shadow-lg"
          />
        </Reveal>
      </div>
    </section>
  );
}

function EventCard({
  label,
  day,
  date,
  time,
}: {
  label: string;
  day: string;
  date: string;
  time: string;
}) {
  return (
    <div className="rounded-2xl border border-mustard/30 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
      <p className="font-serif text-lg font-semibold text-maroon">{label}</p>
      <div className="mt-3 flex items-center justify-center gap-3 font-body text-sm text-ink/75">
        <span>{day}</span>
        <span className="text-mustard">|</span>
        <span>{date}</span>
      </div>
      <p className="mt-1.5 font-body text-sm text-ink/70">{time}</p>
    </div>
  );
}
