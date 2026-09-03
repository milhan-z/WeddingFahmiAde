"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { couple } from "@/lib/data";

export default function Cover({
  guestName,
  onOpen,
}: {
  guestName: string;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-cream"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* soft sky backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/assets/cloud-light.webp"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-cream/60 to-cream" />
      </div>

      {/* floating seagulls */}
      <motion.div
        className="absolute left-[8%] top-[14%] w-16 opacity-80 animate-float-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      >
        <Image src="/assets/seagull.webp" alt="" width={120} height={120} />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-[24%] w-10 opacity-70 animate-float-soft"
        style={{ animationDelay: "1.5s" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.7, duration: 1.2 }}
      >
        <Image src="/assets/seagull.webp" alt="" width={90} height={90} />
      </motion.div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-xs tracking-[0.35em] text-maroon/70 uppercase"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-3 font-script text-6xl text-maroon sm:text-7xl"
        >
          Ade &amp; Fahmi
        </motion.h1>

        {/* floral arch frame */}
        <motion.div
          className="relative mt-8 flex h-72 w-64 items-end justify-center sm:h-80 sm:w-72"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Image
            src="/assets/floral-arch.webp"
            alt=""
            fill
            className="object-contain"
          />
          <div className="relative z-10 mb-10 flex flex-col items-center gap-1">
            <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-ink/60">
              Kepada Yth.
            </span>
            <span className="max-w-[11rem] font-serif text-lg font-semibold text-maroon">
              {guestName || "Bapak / Ibu / Saudara/i"}
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-6 max-w-xs font-body text-sm italic text-ink/70"
        >
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
          untuk hadir di hari bahagia kami, {couple.bride.shortName} &amp;{" "}
          {couple.groom.shortName}.
        </motion.p>

        <motion.button
          onClick={onOpen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 flex items-center gap-2 rounded-full bg-maroon px-8 py-3 font-serif text-sm tracking-wide text-cream shadow-lg shadow-maroon/20 transition hover:bg-maroon-deep"
        >
          <EnvelopeIcon />
          Buka Undangan
        </motion.button>
      </div>
    </motion.div>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m4 6.5 8 6.5 8-6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
