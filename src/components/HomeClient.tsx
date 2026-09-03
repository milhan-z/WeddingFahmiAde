"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Cover from "@/components/Cover";
import MusicToggle from "@/components/MusicToggle";
import Hero from "@/components/sections/Hero";
import SmaStory from "@/components/sections/SmaStory";
import CollegeStory from "@/components/sections/CollegeStory";
import FavoritePlace from "@/components/sections/FavoritePlace";
import TogetherMoments from "@/components/sections/TogetherMoments";
import Profession from "@/components/sections/Profession";
import Umrah from "@/components/sections/Umrah";
import Engagement from "@/components/sections/Engagement";
import WeddingDetails from "@/components/sections/WeddingDetails";
import QuranQuote from "@/components/sections/QuranQuote";
import Closing from "@/components/sections/Closing";
import RSVPWishes from "@/components/sections/RSVPWishes";

export default function HomeClient() {
  const params = useSearchParams();
  const guestName = decodeURIComponent(params.get("to") ?? "").replace(
    /\+/g,
    " "
  );
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
        <SmaStory />
        <CollegeStory />
        <FavoritePlace />
        <TogetherMoments />
        <Profession />
        <Umrah />
        <Engagement />
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
