"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { gift } from "@/lib/data";

/** "Wedding Gift" + "Kirim Kado" — rekening cashless dan alamat kirim. */
export default function WeddingGift() {
  return (
    <section className="relative bg-gradient-to-b from-cream to-[#f7edf0] px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <Reveal>
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">{gift.heading}</span>
          </p>
          <p className="mx-auto mt-6 max-w-sm font-body text-base leading-relaxed text-ink/75">
            {gift.intro}
          </p>
        </Reveal>

        <div className="mt-9 space-y-4">
          {gift.accounts.map((acc, i) => (
            <Reveal key={acc.number} delay={0.12 + i * 0.1}>
              <AccountCard {...acc} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-10">
          <p className="ornament-divider font-serif text-[11px] uppercase tracking-[0.3em] text-mustard">
            <span className="shrink-0">{gift.shipping.heading}</span>
          </p>
          <div className="mt-5 rounded-2xl border border-mustard/30 bg-white/60 p-5 shadow-sm backdrop-blur-sm">
            <p className="font-body text-sm leading-relaxed text-ink/75">
              {gift.shipping.address}
            </p>
            <p className="mt-2 font-serif text-sm font-semibold text-maroon">
              {gift.shipping.recipient}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AccountCard({
  bank,
  number,
  holder,
}: {
  bank: string;
  number: string;
  holder: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard bisa ditolak browser — nomornya tetap terlihat dan
      // bisa disalin manual, jadi tidak perlu pesan error yang mengganggu.
    }
  }

  return (
    <div className="rounded-2xl border border-mustard/30 bg-white/60 p-5 shadow-sm backdrop-blur-sm">
      <p className="font-serif text-sm font-semibold uppercase tracking-wider text-maroon">
        {bank}
      </p>
      <p className="mt-2 font-mono text-xl tracking-[0.12em] text-ink">
        {number}
      </p>
      <p className="mt-1 font-body text-sm text-ink/65">a.n {holder}</p>
      <button
        type="button"
        onClick={copy}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-maroon/30 px-4 py-1.5 font-serif text-xs tracking-wide text-maroon transition hover:bg-maroon/5 active:scale-[0.97]"
      >
        {copied ? "Nomor tersalin ✓" : "Salin Nomor"}
      </button>
    </div>
  );
}
