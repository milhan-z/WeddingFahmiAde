"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import MusicToggle from "@/components/MusicToggle";
import SmaStory from "@/components/sections/SmaStory";
import CollegeStory from "@/components/sections/CollegeStory";
import FavoritePlace from "@/components/sections/FavoritePlace";
import TogetherMoments from "@/components/sections/TogetherMoments";
import Profession from "@/components/sections/Profession";
import Umrah from "@/components/sections/Umrah";
import Engagement from "@/components/sections/Engagement";

/**
 * Tujuh babak cerita, dipisah dari undangan utama supaya halaman depan
 * tetap ringan. Tidak ada cover di sini — tamu sudah membukanya di /.
 */
export default function JourneyClient() {
  const params = useSearchParams();
  const guestName = decodeURIComponent(params.get("to") ?? "").replace(
    /\+/g,
    " "
  );
  const backHref = guestName
    ? `/?to=${encodeURIComponent(guestName)}`
    : "/";

  return (
    <>
      {/* tombol kembali, menempel di atas layar */}
      <Link
        href={backHref}
        className="fixed left-4 top-4 z-40 flex items-center gap-1.5 rounded-full bg-maroon/85 px-4 py-2 font-serif text-xs tracking-wide text-cream shadow-lg shadow-maroon/25 backdrop-blur-sm transition hover:bg-maroon active:scale-[0.97]"
      >
        <BackIcon />
        Undangan
      </Link>

      <main>
        <SmaStory />
        <CollegeStory />
        <FavoritePlace />
        <TogetherMoments />
        <Profession />
        <Umrah />
        <Engagement />

        {/* penutup journey — jalan kembali ke undangan */}
        <section className="bg-gradient-to-b from-cream via-[#f7edf0] to-cream px-6 py-20 text-center">
          <p className="ornament-divider mx-auto max-w-xs font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">Dan hari itu tiba</span>
          </p>
          <p className="mx-auto mt-5 max-w-sm font-body text-base italic leading-relaxed text-ink/70 sm:text-lg">
            Terima kasih sudah menyimak perjalanan kami. Doa restu
            Bapak/Ibu/Saudara/i sangat berarti bagi langkah selanjutnya.
          </p>
          <Link
            href={backHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-serif text-sm tracking-wide text-cream shadow-lg shadow-maroon/25 transition hover:bg-maroon-deep active:scale-[0.97]"
          >
            <BackIcon />
            Kembali ke Undangan
          </Link>
        </section>

        <footer className="bg-cream-deep px-6 py-8 text-center">
          <p className="font-serif text-xs tracking-widest text-ink/40">
            Made with love — Ade &amp; Fahmi, 2026
          </p>
        </footer>
      </main>

      <MusicToggle autoStart />
    </>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M19 12H5m5.5 5.5L5 12l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
