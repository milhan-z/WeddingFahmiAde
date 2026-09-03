"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { getGuestName } from "@/lib/guest";
import Cover from "@/components/Cover";
import MusicToggle from "@/components/MusicToggle";

// Love Story — tujuh babak, mengikuti alur video.
import SmaStory from "@/components/sections/SmaStory";
import CollegeStory from "@/components/sections/CollegeStory";
import FavoritePlace from "@/components/sections/FavoritePlace";
import TogetherMoments from "@/components/sections/TogetherMoments";
import Profession from "@/components/sections/Profession";
import Umrah from "@/components/sections/Umrah";
import Engagement from "@/components/sections/Engagement";

import QuranQuote from "@/components/sections/QuranQuote";
import BrideGroom from "@/components/sections/BrideGroom";
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
        <SmaStory />
        <CollegeStory />
        <FavoritePlace />
        <TogetherMoments />
        <Profession />
        <Umrah />
        <Engagement />

        <QuranQuote />
        <BrideGroom />
        <SaveTheDate />
        <WeddingDetails />
        <WeddingGift />
        <RSVPWishes guestName={guestName} />
        <Closing />

        <footer className="bg-cream-deep px-6 py-8 text-center">
          <p className="font-serif text-xs tracking-widest text-ink/40">
            Made with love — Fahmi &amp; Ade, 2026
          </p>
        </footer>
      </main>

      <MusicToggle autoStart={opened} />
    </>
  );
}
