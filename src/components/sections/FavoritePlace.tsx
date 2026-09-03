"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

export default function FavoritePlace() {
  const [showLater, setShowLater] = useState(false);

  return (
    <section
      className="relative overflow-hidden px-6 py-24"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #2c3654 0%, #1a2036 55%, #10132a 100%)",
      }}
    >
      {/* stars */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(1px_1px_at_20%_30%,white,transparent),radial-gradient(1px_1px_at_70%_60%,white,transparent),radial-gradient(1.5px_1.5px_at_45%_15%,white,transparent),radial-gradient(1px_1px_at_85%_25%,white,transparent),radial-gradient(1px_1px_at_60%_80%,white,transparent),radial-gradient(1.5px_1.5px_at_10%_70%,white,transparent)]" />

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <span className="font-script text-4xl text-mustard">03</span>
          <h2 className="mt-1 font-serif text-2xl text-cream">
            Tempat Favorit
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-cream/50">
            Warung pecel lele &amp; ramen langganan
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <Image
            src="/assets/pecel-lele-stall.webp"
            alt="Warung pecel lele langganan"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-sm rounded-lg object-contain"
          />
        </Reveal>

        <Reveal delay={0.25} className="mt-4">
          <Image
            src="/assets/ramen-scene.webp"
            alt="Makan ramen berdua"
            width={1400}
            height={1400}
            className="mx-auto w-full max-w-sm rounded-lg object-contain"
          />
          <p className="mx-auto mt-5 max-w-sm font-body text-base italic leading-relaxed text-cream/80 sm:text-lg">
            Di meja kecil yang sama, cerita mereka terus berlanjut — dari
            obrolan ringan malam hari hingga rencana masa depan.
          </p>
        </Reveal>

        <CalendarFlip onFlip={() => setShowLater(true)} />

        <Reveal delay={0.2}>
          <p
            className={`mt-6 font-serif text-sm tracking-wide text-cream/70 transition-opacity duration-700 ${
              showLater ? "opacity-100" : "opacity-40"
            }`}
          >
            8 tahun perjalanan, satu tujuan yang sama.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CalendarFlip({ onFlip }: { onFlip: () => void }) {
  const [year, setYear] = useState<"2018" | "2026">("2018");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = setTimeout(() => {
              setYear("2026");
              onFlip();
            }, 1200);
            return () => clearTimeout(t);
          }
        });
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById("calendar-flip");
    if (el) observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Reveal delay={0.3}>
      <div
        id="calendar-flip"
        className="relative mx-auto mt-10 h-40 w-56 sm:h-48 sm:w-64"
      >
        <Image
          src={`/assets/year-${year}.webp`}
          alt={year}
          fill
          className="object-contain transition-opacity duration-700"
        />
      </div>
    </Reveal>
  );
}
