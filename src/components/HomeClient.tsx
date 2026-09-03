"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { getGuestName } from "@/lib/guest";
import Cover from "@/components/Cover";
import MusicToggle from "@/components/MusicToggle";

// Love Story kini satu section berisi video (masih placeholder).
// Komponen bab lama (SmaStory, CollegeStory, dst.) masih ada di repo
// kalau sewaktu-waktu versi web-nya dibutuhkan lagi.
import LoveStory from "@/components/sections/LoveStory";

import QuranQuote from "@/components/sections/QuranQuote";
import BrideGroom from "@/components/sections/BrideGroom";
import SceneSeagull from "@/components/sections/SceneSeagull";
import SaveTheDate from "@/components/sections/SaveTheDate";
import WeddingDetails from "@/components/sections/WeddingDetails";
import WeddingGift from "@/components/sections/WeddingGift";
import RSVPWishes from "@/components/sections/RSVPWishes";
import Closing from "@/components/sections/Closing";

/**
 * Urutan mengikuti permintaan mempelai:
 * Love Story (video langsung dimulai) → We Found Love → Bride & Groom →
 * Save the Date → Wedding Event → Wedding Gift & Kirim Kado → RSVP →
 * Best Wishes (di dalam RSVP) → penutup.
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
        {/* Love Story — cerita langsung dimulai begitu undangan dibuka */}
        <LoveStory />

        <QuranQuote />
        <BrideGroom />
        <SceneSeagull />
        <SaveTheDate />
        <WeddingDetails />
        <WeddingGift />
        <RSVPWishes guestName={guestName} />
        <Closing />
      </main>

      <MusicToggle autoStart={opened} />
    </>
  );
}
