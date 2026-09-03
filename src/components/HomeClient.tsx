"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { getGuestName } from "@/lib/guest";
import Cover from "@/components/Cover";
import MusicToggle from "@/components/MusicToggle";
import JourneyInvite from "@/components/JourneyInvite";
import Hero from "@/components/sections/Hero";
import WeddingDetails from "@/components/sections/WeddingDetails";
import QuranQuote from "@/components/sections/QuranQuote";
import Closing from "@/components/sections/Closing";
import RSVPWishes from "@/components/sections/RSVPWishes";

/**
 * Halaman undangan utama — sengaja ringkas: yang dibutuhkan hampir semua
 * tamu (tanggal, lokasi, RSVP). Tujuh bab cerita dipindah ke /journey
 * supaya tamu yang cuma mau konfirmasi kehadiran tidak perlu memuat
 * tujuh scene ilustrasi.
 */
export default function HomeClient() {
  const params = useSearchParams();
  const guestName = getGuestName(params);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!opened && (
          <Cover guestName={guestName} onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      <main
        className={`transition-opacity duration-700 ${
          opened ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!opened}
      >
        <Hero />
        <JourneyInvite guestName={guestName} />
        <WeddingDetails />
        <QuranQuote />
        <Closing />
        <RSVPWishes guestName={guestName} />

        <footer className="bg-cream-deep px-6 py-8 text-center">
          <p className="font-serif text-xs tracking-widest text-ink/40">
            Made with love — Ade &amp; Fahmi, 2026
          </p>
        </footer>
      </main>

      <MusicToggle autoStart={opened} />
    </>
  );
}
