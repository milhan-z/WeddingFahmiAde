"use client";

import Image from "next/image";
import Link from "next/link";
import { withGuest } from "@/lib/guest";

/**
 * Ajakan membuka halaman cerita. Nama tamu ikut dibawa lewat query supaya
 * tombol "kembali ke undangan" di /journey tidak kehilangan sapaannya.
 */
export default function JourneyInvite({ guestName }: { guestName: string }) {
  const href = withGuest("/journey", guestName);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-[#f7edf0] to-cream px-6 py-20">
      {/* dua tokoh SMA sebagai cuplikan cerita */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-6 opacity-[0.13]"
      >
        <Image
          src="/assets/ade-sma.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="140px"
          className="h-36 w-auto object-contain"
        />
        <Image
          src="/assets/fahmi-sma.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="140px"
          className="h-36 w-auto object-contain"
        />
      </div>

      <div className="relative mx-auto max-w-md text-center">
        <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
          <span className="shrink-0">Perjalanan Kami</span>
        </p>

        <h2 className="mt-5 font-serif text-2xl leading-snug text-maroon sm:text-3xl">
          Dari bangku SMA
          <br />
          sampai hari ini
        </h2>

        <p className="mx-auto mt-4 max-w-sm font-body text-base italic leading-relaxed text-ink/70 sm:text-lg">
          Delapan tahun, tujuh babak cerita — sekolah, jarak, warung langganan,
          danau, hingga lamaran. Kami ceritakan lewat ilustrasi.
        </p>

        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-serif text-sm tracking-wide text-cream shadow-lg shadow-maroon/25 transition hover:bg-maroon-deep active:scale-[0.97]"
        >
          Lihat Journey Kami
          <ArrowIcon />
        </Link>

        <p className="mt-3 font-serif text-[11px] tracking-wider text-ink/40">
          7 babak · sekitar 2 menit
        </p>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M5 12h14m-5.5-5.5L19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
