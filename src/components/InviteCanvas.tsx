"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Port dari Figma Make export (frame "Bagian Awal" + "Layout Web").
 *
 * Desain dikunci pada lebar 1080px lalu DISKALA secara seragam:
 * - Cover  : diskala agar MUAT PENUH layar (min lebar/tinggi) — tanpa scroll.
 * - Story  : diskala ke lebar wadah — satu kanvas menerus, tidak terpotong
 *            per-bagian.
 * Seluruh aset & teks berada di koordinat absolut persis seperti Figma;
 * teks placeholder ("Fahmi" ganda) sudah diperbaiki memakai data asli.
 */
const DESIGN_W = 1080;
const COVER_H = 2210;
const STORY_H = 19320;
const A = "/figma"; // folder aset hasil export

/* ────────────────────────── COVER (Bagian Awal) ────────────────────────── */

function CoverArt({ guestName }: { guestName: string }) {
  return (
    <div className="relative size-full bg-white">
      <div className="absolute left-[-832px] size-[2690px] top-[-7px]">
        <img alt="" src={`${A}/cover-panggung.webp`} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-0 top-0 h-[1955px] w-[1080px] bg-gradient-to-b from-white to-transparent" />
      <div className="absolute left-[158px] top-[866px] h-[1089px] w-[770px]">
        <img alt="Fahmi & Ade" src={`${A}/cover-pengantin.webp`} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-[-115px] size-[1316px] top-[893px]">
        <img alt="" src={`${A}/kenbangdrown.webp`} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-[129px] size-[828px] top-0">
        <img alt="The Wedding of Ade & Fahmi" src={`${A}/cover-title.webp`} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>

      {/* nama tamu — tidak ada di export, ditambah supaya link personal tetap
          tampil; diberi panel semitransparan agar terbaca di atas gaun */}
      <div className="absolute left-1/2 top-[1360px] w-[760px] -translate-x-1/2 rounded-[60px] bg-white/55 px-10 py-7 text-center backdrop-blur-[2px]">
        <p className="font-serif text-[28px] uppercase tracking-[0.3em] text-[#5c1f2e]/75">Kepada Yth.</p>
        <p className="mt-1 font-serif text-[50px] font-semibold leading-tight text-[#5c1f2e]">
          {guestName || "Tamu Undangan"}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────── STORY (Layout Web) ────────────────────────── */

function Instagram({ top, href }: { top: number; href?: string }) {
  const cls =
    "absolute left-[418px] flex items-center justify-center rounded-[33px] bg-black px-[35.5px] py-[7.6px] text-[34.9px] font-bold text-white";
  const label = <span className="whitespace-nowrap">Instagram</span>;
  return href ? (
    <a className={cls} style={{ top }} href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  ) : (
    <div className={cls} style={{ top }}>
      {label}
    </div>
  );
}

function StoryArt({
  onPlayVideo,
  groomIg,
  brideIg,
}: {
  onPlayVideo?: () => void;
  groomIg?: string;
  brideIg?: string;
}) {
  const img = (src: string) =>
    (<img alt="" src={`${A}/${src}`} className="absolute inset-0 size-full max-w-none object-cover pointer-events-none" />);

  return (
    <div className="relative size-full bg-white text-black">
      {/* zona warna */}
      <div className="absolute left-px top-0 h-[2021px] w-[1079px] bg-[#7bd4ff]" />
      <div className="absolute left-px top-[3073px] h-[7391px] w-[1079px] bg-[#adfffe]" />
      {/* kartu putih arch */}
      <div className="absolute left-[89px] top-[3955px] h-[3170px] w-[903px] rounded-[451.5px] bg-white" />
      <div className="absolute left-[89px] top-[7160px] h-[3304px] w-[903px] rounded-[451.5px] bg-white" />

      {/* header */}
      <div className="absolute left-0 top-[-320px] size-[1080px]">{img("ranting.webp")}</div>
      <div className="absolute left-[63px] top-[440px] size-[954px] opacity-90">{img("title-a.webp")}</div>
      <p className="absolute left-[370px] top-[1134px] whitespace-nowrap text-[60.7px] font-bold text-white">12.09.2026</p>
      <div className="absolute left-[-302px] top-[1435px] size-[880px]">{img("runout.webp")}</div>
      <div className="absolute left-[476px] top-[1435px] size-[880px]">{img("runout.webp")}</div>
      <div className="absolute left-[100px] top-[1465px] size-[880px]">{img("runout.webp")}</div>

      {/* video placeholder + bingkai warung */}
      <div className="absolute left-[65px] top-[2147px] h-[1692px] w-[951px] overflow-hidden bg-black">
        <button
          onClick={onPlayVideo}
          className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          aria-label="Putar video"
        >
          <span className="flex size-[150px] items-center justify-center rounded-full bg-white/95 shadow-lg">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#241019" /></svg>
          </span>
          <span className="rounded-full bg-white/15 px-8 py-3 text-[34px] font-medium text-white/90">Video menyusul</span>
        </button>
      </div>
      <div className="absolute left-[-236px] top-[1855px] h-[746px] w-[1553px] overflow-hidden pointer-events-none">
        <img alt="" src={`${A}/atap.webp`} className="absolute left-0 top-[-47.11%] h-[147.17%] w-full max-w-none" />
      </div>
      <div className="absolute left-[930px] top-[2147px] h-[1692px] w-[230px] overflow-hidden pointer-events-none">
        <img alt="" src={`${A}/bats.webp`} className="absolute left-[-209.66%] top-[-0.04%] h-[100.08%] w-[519.33%] max-w-none" />
      </div>
      <div className="absolute left-[-41px] top-[2147px] h-[1692px] w-[230px] overflow-hidden pointer-events-none">
        <img alt="" src={`${A}/bats.webp`} className="absolute left-[-209.66%] top-[-0.04%] h-[100.08%] w-[519.33%] max-w-none" />
      </div>

      {/* ── Bride & Groom (teks diperbaiki) ── */}
      <div className="absolute left-[540px] top-[4431px] -translate-x-1/2 whitespace-nowrap text-center text-[60.7px] font-bold leading-tight">
        <p className="mb-0">Bride &amp;</p>
        <p>Groom</p>
      </div>
      <div className="absolute left-[530.5px] top-[4638px] -translate-x-1/2 text-center text-[27.5px] font-bold leading-normal">
        <p className="mb-0">Assalamualaikum Wr. Wb.</p>
        <p className="mb-0">Dengan memohon Rahmat &amp; Ridho Allah SWT, kami</p>
        <p className="mb-0">bermaksud mengundang Bapak/Ibu/Saudara/i untuk</p>
        <p>menghadiri acara pernikahan putra-putri kami:</p>
      </div>

      {/* Fahmi */}
      <p className="absolute left-[540.5px] top-[4981px] -translate-x-1/2 whitespace-nowrap text-center text-[60.7px] font-bold">Fahmi</p>
      <p className="absolute left-[540.5px] top-[5152px] -translate-x-1/2 whitespace-nowrap text-center text-[60.7px] font-bold">Fahmi Muzakky</p>
      <div className="absolute left-[530.5px] top-[5286px] -translate-x-1/2 text-center text-[27.5px] font-bold leading-normal">
        <p className="mb-0">Putra Kedua dari Bapak H. Ramli &amp;</p>
        <p>Ibu Hj. Murtining</p>
      </div>
      <Instagram top={5431} href={groomIg ? `https://instagram.com/${groomIg}` : undefined} />

      {/* & */}
      <p className="absolute left-[540.5px] top-[5684px] -translate-x-1/2 whitespace-nowrap text-center text-[173px] font-bold">&amp;</p>

      {/* Ade (sebelumnya placeholder "Fahmi") */}
      <p className="absolute left-[540.5px] top-[6019px] -translate-x-1/2 whitespace-nowrap text-center text-[60.7px] font-bold">Ade</p>
      <p className="absolute left-[540.5px] top-[6190px] -translate-x-1/2 whitespace-nowrap text-center text-[60.7px] font-bold">Ade Fitri Kurniasih</p>
      <div className="absolute left-[530.5px] top-[6324px] -translate-x-1/2 text-center text-[27.5px] font-bold leading-normal">
        <p className="mb-0">Putri Bungsu dari Bapak H. Anda &amp;</p>
        <p>Ibu Hj. Zubaidah</p>
      </div>
      <Instagram top={6469} href={brideIg ? `https://instagram.com/${brideIg}` : undefined} />

      {/* ── dekorasi bawah (persis export) ── */}
      <div className="absolute left-[-634px] top-[6424px] size-[1387px]">{img("runout.webp")}</div>
      <div className="absolute left-[358px] top-[6424px] size-[1387px]">{img("runout.webp")}</div>
      <div className="absolute left-[-603px] top-[6647px] flex size-[1164px] items-center justify-center">
        <div className="rotate-90"><div className="relative size-[1164px]">{img("runout.webp")}</div></div>
      </div>
      <div className="absolute left-[540px] top-[6647px] flex size-[1164px] items-center justify-center">
        <div className="-rotate-90"><div className="relative size-[1164px]">{img("runout.webp")}</div></div>
      </div>
      <div className="absolute left-[-36px] top-[6647px] size-[1116px]">{img("runout.webp")}</div>
      <div className="absolute left-[-18px] top-[6522px] flex size-[1116px] items-center justify-center">
        <div className="rotate-180"><div className="relative size-[1116px]">{img("runout.webp")}</div></div>
      </div>
      <div className="absolute left-[-94px] top-[6526px] size-[1268px]">{img("burung.webp")}</div>

      {/* zona taman + footer */}
      <div className="absolute left-[-335px] top-[9763px] h-[898px] w-[899px]">{img("kk.webp")}</div>
      <div className="absolute left-[105px] top-[9643px] h-[898px] w-[899px]">{img("kk.webp")}</div>
      <div className="absolute left-[565px] top-[9733px] h-[898px] w-[899px]">{img("kk.webp")}</div>
      <div className="absolute left-[-6px] top-[9501px] size-[1093px]">{img("slenei.webp")}</div>
      <div className="absolute left-[-300px] top-[9372px] size-[1680px]">{img("kenbangdrown.webp")}</div>
      <div className="absolute left-[-6px] top-[10054px] size-[1080px]">{img("ranting.webp")}</div>

      {/* lantai berulang */}
      {[10661, 12841, 15021, 17138].map((t) => (
        <div key={`lt-${t}`} className="absolute left-0 h-[1090px] w-[1089px]" style={{ top: t }}>{img("lantau.webp")}</div>
      ))}
      {[11751, 13931, 16111, 18228].map((t) => (
        <div key={`ltf-${t}`} className="absolute left-0 flex h-[1090px] w-[1089px] items-center justify-center" style={{ top: t }}>
          <div className="-scale-y-100"><div className="relative h-[1090px] w-[1089px]">{img("lantau.webp")}</div></div>
        </div>
      ))}

      <div className="absolute left-[-189px] top-[16950px] size-[1466px]">{img("gapura.webp")}</div>
      <div className="absolute left-[-2px] top-[17100px] h-[1532px] w-[1083px]">{img("pengantin3.webp")}</div>
    </div>
  );
}

/* ────────────────────────── WADAH SKALA ────────────────────────── */

export default function InviteCanvas({
  guestName,
  groomIg,
  brideIg,
}: {
  guestName: string;
  groomIg?: string;
  brideIg?: string;
}) {
  const [opened, setOpened] = useState(false);
  const [fading, setFading] = useState(false);

  function open() {
    setFading(true);
    setTimeout(() => {
      setOpened(true);
      setFading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 450);
  }

  return (
    <div
      className="mx-auto min-h-dvh w-full max-w-[480px] bg-white transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {opened ? (
        <StoryScaler>
          <StoryArt groomIg={groomIg} brideIg={brideIg} />
        </StoryScaler>
      ) : (
        <CoverScaler onOpen={open}>
          <CoverArt guestName={guestName} />
        </CoverScaler>
      )}
    </div>
  );
}

/** Cover: skala agar muat penuh (lebar & tinggi), tombol overlay presisi. */
function CoverScaler({ children, onOpen }: { children: React.ReactNode; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setS(Math.min(w / DESIGN_W, h / COVER_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-white">
      <div style={{ width: DESIGN_W * s, height: COVER_H * s, position: "relative", flexShrink: 0 }}>
        <div style={{ width: DESIGN_W, height: COVER_H, transformOrigin: "top left", transform: `scale(${s})`, position: "absolute", inset: 0 }}>
          {children}
        </div>
        {/* tombol Buka Undangan (Figma: 316,1623, 448x67) — pil hitam */}
        <button
          onClick={onOpen}
          style={{
            position: "absolute",
            left: 316 * s,
            top: 1623 * s,
            width: 448 * s,
            height: 67 * s,
            borderRadius: 9999,
            fontSize: 40 * s,
          }}
          className="flex cursor-pointer items-center justify-center gap-2 bg-black font-semibold text-white shadow-lg transition active:scale-[0.97]"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

/** Story: skala ke lebar wadah, tinggi mengikuti. */
function StoryScaler({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setS(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full" style={{ height: STORY_H * s }}>
      <div style={{ width: DESIGN_W, height: STORY_H, transformOrigin: "top left", transform: `scale(${s})`, position: "absolute", top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}
