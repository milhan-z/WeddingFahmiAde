"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

/**
 * Pemisah bergaya scene (Figma "Layout Web"): semak membingkai kedua sisi
 * atas, burung camar melayang di tengah, di atas langit cyan. Dekoratif —
 * tanpa teks.
 */
export default function SceneSeagull() {
  return (
    <section className="relative overflow-hidden bg-sky py-4">
      <div className="relative mx-auto h-40 max-w-md sm:h-48">
        {/* semak kiri & kanan */}
        <div className="pointer-events-none absolute -left-[8%] -top-[10%] w-[42%] max-w-[13rem]">
          <Image
            src="/assets/bush.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 200px, 42vw"
            className="w-full drop-shadow"
          />
        </div>
        <div className="pointer-events-none absolute -right-[8%] -top-[10%] w-[42%] max-w-[13rem] -scale-x-100">
          <Image
            src="/assets/bush.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 200px, 42vw"
            className="w-full drop-shadow"
          />
        </div>

        {/* burung camar melayang di tengah */}
        <Reveal direction="left" className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/assets/seagull.webp"
            alt="Burung camar"
            width={600}
            height={600}
            sizes="150px"
            className="animate-float-soft h-28 w-auto object-contain drop-shadow-md sm:h-32"
          />
        </Reveal>
      </div>
    </section>
  );
}
