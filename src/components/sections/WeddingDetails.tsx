"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import { event } from "@/lib/data";

export default function WeddingDetails() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-[#f6e3e6] px-6 py-24">
      <div className="absolute inset-0 -z-10 opacity-15">
        <Image
          src="/assets/stage-backdrop.webp"
          alt=""
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/60 to-[#f6e3e6]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-30">
        <Image
          src="/assets/floral-arch-2.webp"
          alt=""
          width={500}
          height={500}
          className="w-72 sm:w-96"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">08</span>
          <h2 className="mt-1 font-serif text-2xl text-maroon">
            Hari Bahagia Kami
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
            Save the date
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-6">
          <Image
            src="/assets/couple-javanese.webp"
            alt="Ade & Fahmi mengenakan busana adat Jawa"
            width={990}
            height={1400}
            className="mx-auto h-64 w-auto object-contain drop-shadow-xl sm:h-72"
          />
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <Countdown target={event.isoDateTime} />
        </Reveal>

        <Reveal delay={0.28} className="mt-12 space-y-6">
          <EventCard {...event.akad} />
          <EventCard {...event.resepsi} />
        </Reveal>

        <Reveal delay={0.36} className="mt-8">
          <div className="rounded-2xl border border-mustard/30 bg-white/60 p-5 shadow-sm backdrop-blur-sm">
            <p className="font-serif text-sm font-semibold text-maroon">
              {event.location.name}
            </p>
            <p className="mt-1 font-body text-sm text-ink/70">
              {event.location.address}
            </p>
            <a
              href={event.location.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-maroon px-5 py-2 font-serif text-xs tracking-wide text-cream transition hover:bg-maroon-deep"
            >
              Buka Google Maps
            </a>
          </div>
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
      <p className="mt-2 font-body text-base text-ink/80">
        {day}, {date}
      </p>
      <p className="mt-1 font-body text-sm text-ink/60">{time}</p>
    </div>
  );
}
