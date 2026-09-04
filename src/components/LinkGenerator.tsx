"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { withGuest } from "@/lib/guest";

/** Sama dengan batas di lib/guest.ts — dipakai untuk memperingatkan lebih awal. */
const MAX_NAME_LENGTH = 60;

const DEFAULT_TEMPLATE = `Bismillahirrahmanirrahim.

Kepada Yth.
Bapak/Ibu/Saudara/i
*{nama}*

*Assalamualaikum Warahmatullahi Wabarakatuh*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami.

*Berikut link undangan kami*, untuk info lengkap dari acara, bisa kunjungi :

{link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

*Wassalamualaikum Warahmatullahi Wabarakatuh*

Terima Kasih

Hormat kami,
Ade & Fahmi
____________________`;

/* ── Simpan di browser ─────────────────────────────────────────────────
   Template & daftar nama disimpan di localStorage supaya tidak hilang saat
   halaman ditutup — menyebar undangan itu kerjaan berhari-hari, bukan sekali
   duduk. Sengaja localStorage, bukan database: ini halaman alat pribadi,
   datanya tidak perlu dibagi antar-perangkat, dan draf pesan mempelai tidak
   ada gunanya disimpan di server.

   Dibaca lewat useSyncExternalStore, bukan effect+setState. Dengan
   getServerSnapshot yang mengembalikan null, React memakai nilai bawaan saat
   hidrasi lalu merender ulang dengan nilai tersimpan — jadi tidak ada
   ketidakcocokan hidrasi, dan tidak melanggar aturan set-state-in-effect. */
const KEY = { template: "wa-template", names: "wa-names" } as const;

function readStore(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    /* mode privat / site data diblokir — anggap belum ada simpanan */
    return null;
  }
}

function writeStore(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* kuota penuh atau penyimpanan diblokir: biarkan, halaman tetap jalan */
  }
}

/** Tidak ada event localStorage untuk tab ini sendiri; cukup no-op. */
const noSubscribe = () => () => {};

type Row = {
  nama: string;
  link: string;
  pesan: string;
  tooLong: boolean;
  duplicate: boolean;
};

export default function LinkGenerator() {
  const savedNames = useSyncExternalStore(
    noSubscribe,
    () => readStore(KEY.names),
    () => null
  );
  const savedTemplate = useSyncExternalStore(
    noSubscribe,
    () => readStore(KEY.template),
    () => null
  );

  // Ketikan terbaru menang; kalau belum ada, pakai simpanan; kalau itu pun
  // belum ada, pakai bawaan.
  const [rawDraft, setRawDraft] = useState<string | null>(null);
  const [templateDraft, setTemplateDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const raw = rawDraft ?? savedNames ?? "";
  const template = templateDraft ?? savedTemplate ?? DEFAULT_TEMPLATE;

  const setRaw = useCallback((v: string) => {
    setRawDraft(v);
    writeStore(KEY.names, v);
  }, []);

  const setTemplate = useCallback((v: string) => {
    setTemplateDraft(v);
    writeStore(KEY.template, v);
  }, []);

  const resetTemplate = useCallback(() => {
    setTemplateDraft(DEFAULT_TEMPLATE);
    writeStore(KEY.template, DEFAULT_TEMPLATE);
  }, []);

  // origin dibaca langsung dari browser (bukan lewat effect+setState, yang
  // memicu render berantai) supaya link otomatis benar baik di localhost
  // maupun di domain Vercel — tanpa perlu env var tambahan.
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => ""
  );

  const rows = useMemo<Row[]>(() => {
    const seen = new Set<string>();
    return raw
      .split("\n")
      .map((l) => l.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .map((nama) => {
        const key = nama.toLowerCase();
        const duplicate = seen.has(key);
        seen.add(key);
        const link = `${origin}${withGuest("/", nama)}`;
        return {
          nama,
          link,
          pesan: template.replace(/\{nama\}/g, nama).replace(/\{link\}/g, link),
          tooLong: nama.length > MAX_NAME_LENGTH,
          duplicate,
        };
      });
  }, [raw, template, origin]);

  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600);
    } catch {
      setCopied("gagal");
      setTimeout(() => setCopied((c) => (c === "gagal" ? null : c)), 2500);
    }
  }

  const warnings = rows.filter((r) => r.tooLong || r.duplicate).length;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 font-sans">
      <header className="mb-8">
        <h1 className="font-serif text-2xl text-maroon">
          Generator Link Undangan
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Tempel daftar nama, satu per baris. Link &amp; pesan WhatsApp dibuat
          otomatis — encoding karakter seperti <code>&amp;</code> dan{" "}
          <code>%</code> sudah ditangani.
        </p>
        <p className="mt-1 text-xs text-ink/45">
          Daftar nama &amp; template tersimpan otomatis di browser ini, jadi
          aman ditutup dan dilanjutkan besok.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink/50">
            Daftar nama ({rows.length})
          </label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={10}
            spellCheck={false}
            className="w-full resize-y rounded-lg border border-ink/15 bg-white p-3 font-mono text-sm text-ink outline-none focus:border-maroon/50"
            placeholder={"Bapak Budi\nIbu Sari\nKeluarga Bapak Yusuf"}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/50">
              Template pesan —{" "}
              <code className="normal-case">{"{nama}"}</code> dan{" "}
              <code className="normal-case">{"{link}"}</code> diganti otomatis
            </label>
            {template !== DEFAULT_TEMPLATE && (
              <button
                type="button"
                onClick={resetTemplate}
                className="shrink-0 text-xs text-ink/45 underline underline-offset-2 hover:text-maroon"
              >
                Kembalikan ke bawaan
              </button>
            )}
          </div>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={10}
            className="w-full resize-y rounded-lg border border-ink/15 bg-white p-3 font-mono text-xs leading-relaxed text-ink outline-none focus:border-maroon/50"
          />
        </div>
      </div>

      {warnings > 0 && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 ring-1 ring-amber-200">
          {warnings} baris perlu dicek — nama di atas {MAX_NAME_LENGTH} karakter
          akan dipotong di cover, dan nama ganda ditandai supaya tidak terkirim
          dua kali.
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() =>
            copy(rows.map((r) => `${r.nama}\t${r.link}`).join("\n"), "semua")
          }
          disabled={!rows.length}
          className="rounded-lg bg-maroon px-4 py-2 text-sm text-cream transition hover:bg-maroon-deep disabled:opacity-40"
        >
          Salin semua (nama + link)
        </button>
        <button
          onClick={() => copy(rows.map((r) => r.link).join("\n"), "linksaja")}
          disabled={!rows.length}
          className="rounded-lg border border-maroon/30 px-4 py-2 text-sm text-maroon transition hover:bg-maroon/5 disabled:opacity-40"
        >
          Salin link saja
        </button>
        {copied && (
          <span
            className={`text-sm ${
              copied === "gagal" ? "text-red-600" : "text-emerald-700"
            }`}
          >
            {copied === "gagal"
              ? "Gagal menyalin — salin manual dari kolomnya."
              : "Tersalin ✓"}
          </span>
        )}
      </div>

      <ul className="mt-6 space-y-3">
        {rows.map((r, i) => (
          <li
            key={`${r.nama}-${i}`}
            className="rounded-lg border border-ink/10 bg-white p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-serif text-maroon">{r.nama}</span>
              {r.duplicate && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-800">
                  nama ganda
                </span>
              )}
              {r.tooLong && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-800">
                  {r.nama.length} karakter — akan dipotong
                </span>
              )}
            </div>

            <p className="mt-1.5 break-all font-mono text-xs text-ink/55">
              {r.link}
            </p>

            <div className="mt-2.5 flex flex-wrap gap-2">
              <button
                onClick={() => copy(r.link, `l${i}`)}
                className="rounded border border-ink/15 px-2.5 py-1 text-xs text-ink/70 transition hover:bg-ink/5"
              >
                {copied === `l${i}` ? "Tersalin ✓" : "Salin link"}
              </button>
              <button
                onClick={() => copy(r.pesan, `p${i}`)}
                className="rounded border border-ink/15 px-2.5 py-1 text-xs text-ink/70 transition hover:bg-ink/5"
              >
                {copied === `p${i}` ? "Tersalin ✓" : "Salin pesan WA"}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(r.pesan)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-emerald-600/30 px-2.5 py-1 text-xs text-emerald-700 transition hover:bg-emerald-50"
              >
                Buka di WhatsApp
              </a>
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-ink/15 px-2.5 py-1 text-xs text-ink/70 transition hover:bg-ink/5"
              >
                Pratinjau
              </a>
            </div>
          </li>
        ))}
      </ul>

      {!rows.length && (
        <p className="mt-6 text-sm text-ink/40">
          Belum ada nama. Tulis minimal satu baris di kolom kiri.
        </p>
      )}
    </div>
  );
}
