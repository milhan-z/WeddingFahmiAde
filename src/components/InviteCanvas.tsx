"use client";

import { useEffect, useRef, useState } from "react";
import { couple, event, gift, closing } from "@/lib/data";
import type { Wish } from "@/app/api/wishes/route";

/**
 * Undangan sebagai KANVAS berskala (port Figma Make export "Bagian Awal" +
 * "Layout Web"). Lebar desain dikunci 1080px lalu diskala seragam:
 * - Cover : diskala MAX → mengisi penuh layar, tanpa bilah putih.
 * - Story : diskala ke lebar wadah → satu kanvas menerus (tidak terpotong
 *   per-bagian). Bagian atas (header, video, Bride & Groom) memakai posisi
 *   persis Figma; bagian bawah diisi konten & fitur dari referensi undangan
 *   (Wedding Event, Gift, RSVP, Best Wishes) — tanpa bagian cerita.
 */
const DESIGN_W = 1080;
const COVER_H = 2210;
const A = "/figma";
const SKY = "#7bd4ff";
const CYAN = "#adfffe";

/**
 * Dekorasi kanvas cerita. `loading="lazy"` aman dipakai menyeluruh: gambar
 * yang sudah berada di viewport tetap diunduh segera, sedangkan sisanya —
 * kanvasnya ~19.000px — baru diambil saat tamu menggulir mendekatinya.
 */
const img = (src: string) => (
  <img
    alt=""
    src={`${A}/${src}`}
    loading="lazy"
    decoding="async"
    className="absolute inset-0 size-full max-w-none object-cover pointer-events-none"
  />
);

/**
 * Muncul saat digulir.
 *
 * Kelas `reveal` (yang menyembunyikan) sengaja dipasang lewat JS setelah
 * mount, bukan langsung di markup. Jadi kalau JS gagal atau lambat, isinya
 * tetap terbaca — tidak mengulang masalah lama di mana konten tersangkut
 * di opacity 0. IntersectionObserver hanya menambah kelas; animasinya CSS,
 * jadi berjalan di compositor dan ringan.
 */
/**
 * Jaring pengaman untuk efek muncul-saat-digulir.
 *
 * Kalau ada elemen yang JELAS berada di dalam viewport tapi belum ter-reveal
 * setelah 1,5 detik, berarti IntersectionObserver tidak menyala (mesin render
 * dibekukan / tab tersembunyi). Dalam kondisi itu efeknya dimatikan menyeluruh
 * lewat kelas di <html>, supaya undangan tidak pernah tersangkut tak terlihat
 * — persis kegagalan yang dulu terjadi dengan animasi berbasis JS.
 */
let safetyArmed = false;
function armRevealSafetyNet() {
  if (safetyArmed) return;
  safetyArmed = true;

  let sinceInView = 0;
  const timer = window.setInterval(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    // Ada yang sudah menyala => observer bekerja, pengaman tidak diperlukan.
    if (els.some((el) => el.classList.contains("is-in"))) {
      window.clearInterval(timer);
      return;
    }

    const anyInView = els.some((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    });

    // Hitung hanya saat memang ada elemen di layar. Dua kali berturut-turut
    // (±1,6 detik) masih gelap => observer tidak menyala, matikan efeknya.
    sinceInView = anyInView ? sinceInView + 1 : 0;
    if (sinceInView >= 2) {
      document.documentElement.classList.add("reveal-off");
      window.clearInterval(timer);
    }
  }, 800);

  // Berhenti memeriksa setelah 30 detik apa pun hasilnya.
  window.setTimeout(() => window.clearInterval(timer), 30000);
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal");
    armRevealSafetyNet();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════ COVER ══════════════════════════ */

function CoverArt({ guestName }: { guestName: string }) {
  return (
    <div className="relative size-full bg-white">
      <div className="absolute left-[-832px] size-[2690px] top-[-7px]">
        <img alt="" src={`${A}/cover-panggung.webp`} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-0 top-0 h-[1955px] w-[1080px] bg-gradient-to-b from-white to-transparent" />
      <div className="absolute left-[158px] top-[866px] h-[1089px] w-[770px]">
        <img alt="Fahmi & Ade" src={`${A}/cover-pengantin.webp`} fetchPriority="high" decoding="async" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-[-115px] size-[1316px] top-[893px]">
        <img alt="" src={`${A}/kenbangdrown.webp`} className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-[129px] size-[828px] top-0">
        <img alt="The Wedding of Ade & Fahmi" src={`${A}/cover-title.webp`} fetchPriority="high" decoding="async" className="absolute inset-0 size-full max-w-none object-cover" />
      </div>
      <div className="absolute left-1/2 top-[1360px] w-[760px] -translate-x-1/2 rounded-[60px] bg-white/55 px-10 py-7 text-center backdrop-blur-[2px]">
        <p className="font-serif text-[37px] uppercase tracking-[0.3em] text-[#5c1f2e]/75">Kepada Yth.</p>
        <p className="mt-1 font-serif text-[50px] font-semibold leading-tight text-[#5c1f2e]">{guestName || "Tamu Undangan"}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════ STORY: bagian atas (Figma) ══════════════════════════ */
const TOP_H = 7125;

/**
 * Pemutar video perjalanan.
 *
 * - `preload="none"` + poster: berkasnya ~13MB, jadi baru diunduh kalau tamu
 *   benar-benar menekan play — tidak membebani kuota saat undangan dibuka.
 * - `muted`: videonya memang TIDAK punya trek audio (dicek dengan ffmpeg),
 *   jadi lagu latar yang jadi soundtrack-nya. Tanpa atribut ini browser
 *   memblokir pemutaran karena dianggap media bersuara tanpa gestur.
 */
function JourneyVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  /** Kalau tamu menghentikan sendiri, jangan dipaksa main lagi saat digulir. */
  const pausedByGuest = useRef(false);

  useEffect(() => {
    const v = ref.current;
    const w = wrap.current;
    if (!v || !w) return;

    // Hormati mode hemat data / koneksi lambat: video ~13MB, jangan diunduh
    // otomatis kalau tamu jelas-jelas sedang irit kuota.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const thrifty = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!pausedByGuest.current && !thrifty) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(w);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      pausedByGuest.current = false;
      v.play().catch(() => {});
    } else {
      pausedByGuest.current = true;
      v.pause();
    }
  }

  return (
    <div ref={wrap} className="absolute inset-0">
      <video
        ref={ref}
        className="size-full object-cover"
        src="/video/journey.mp4"
        poster="/video/poster.webp"
        preload="none"
        playsInline
        muted
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Tombol besar di tengah saat berhenti — mudah disentuh walau kanvas
          diskala. Saat berjalan, mengecil ke pojok agar tidak menutupi video. */}
      {playing ? (
        <button
          onClick={toggle}
          aria-label="Hentikan video"
          className="absolute bottom-[40px] right-[40px] flex size-[130px] items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm active:scale-95"
        >
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
            <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
          </svg>
        </button>
      ) : (
        <button
          onClick={toggle}
          aria-label="Putar video perjalanan"
          className="absolute inset-0 flex items-center justify-center bg-black/30"
        >
          <span className="animate-pulse-ring flex size-[170px] items-center justify-center rounded-full bg-white/95 shadow-lg">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#241019" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

function StoryTop({ groomIg, brideIg }: { groomIg?: string; brideIg?: string }) {
  return (
    <div className="relative w-[1080px]" style={{ height: TOP_H }}>
      <div className="absolute left-0 top-0 h-[2021px] w-[1080px]" style={{ background: SKY }} />
      <div className="absolute left-0 top-[3073px] h-[4052px] w-[1080px]" style={{ background: CYAN }} />
      <div className="absolute left-[89px] top-[3955px] h-[3170px] w-[903px] rounded-[451.5px] bg-white" />

      {/* header */}
      <div className="animate-sway-soft absolute left-0 top-[-320px] size-[1080px]">{img("ranting.webp")}</div>
      <div className="animate-bob absolute left-[63px] top-[440px] size-[954px]">{img("title-white.webp")}</div>
      <p className="absolute left-1/2 top-[1150px] -translate-x-1/2 whitespace-nowrap text-[60.7px] font-semibold tracking-[0.12em] text-white">12 . 09 . 2026</p>
      <div className="absolute left-[-302px] top-[1435px] size-[880px]">{img("runout.webp")}</div>
      <div className="absolute left-[476px] top-[1435px] size-[880px]">{img("runout.webp")}</div>
      <div className="absolute left-[100px] top-[1465px] size-[880px]">{img("runout.webp")}</div>

      {/* video warung */}
      <div className="absolute left-[65px] top-[2147px] h-[1692px] w-[951px] overflow-hidden bg-black">
        <JourneyVideo />
      </div>
      <div className="absolute left-[-236px] top-[1855px] h-[746px] w-[1553px] overflow-hidden pointer-events-none">
        <img alt="" src={`${A}/atap.webp`} loading="lazy" decoding="async" className="absolute left-0 top-[-47.11%] h-[147.17%] w-full max-w-none" />
      </div>
      <div className="absolute left-[930px] top-[2147px] h-[1692px] w-[230px] overflow-hidden pointer-events-none">
        <img alt="" src={`${A}/bats.webp`} loading="lazy" decoding="async" className="absolute left-[-209.66%] top-[-0.04%] h-[100.08%] w-[519.33%] max-w-none" />
      </div>
      <div className="absolute left-[-41px] top-[2147px] h-[1692px] w-[230px] overflow-hidden pointer-events-none">
        <img alt="" src={`${A}/bats.webp`} loading="lazy" decoding="async" className="absolute left-[-209.66%] top-[-0.04%] h-[100.08%] w-[519.33%] max-w-none" />
      </div>

      {/* Bride & Groom — tipografi elegan (script + serif), bukan sans tebal */}
      <div className="absolute left-1/2 top-[4400px] -translate-x-1/2 text-center text-maroon">
        <p className="font-script text-[104px] leading-[0.95]">Bride &amp;<br />Groom</p>
      </div>
      <div className="absolute left-1/2 top-[4690px] w-[770px] -translate-x-1/2 text-center font-body text-[38px] leading-relaxed text-ink">
        {couple.intro}
      </div>
      <PersonBlock topName={4960} name={couple.groom} ig={groomIg} />
      <p className="absolute left-1/2 top-[5640px] -translate-x-1/2 text-center font-script text-[150px] leading-none text-mustard">&amp;</p>
      <PersonBlock topName={5998} name={couple.bride} ig={brideIg} />
    </div>
  );
}

function PersonBlock({
  topName,
  name,
  ig,
}: {
  topName: number;
  name: { name: string; shortName: string; order: string; parents: string };
  ig?: string;
}) {
  // Reveal dipasang di elemen DALAM, bukan di pembungkus yang memakai
  // -translate-x-1/2: kelas .reveal menulis `transform`, jadi kalau ditempel
  // di elemen yang sama, penengahan horizontalnya ikut tertimpa.
  const ref = useReveal<HTMLDivElement>();
  return (
    <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: topName, width: 900 }}>
      <div ref={ref}>
      <p className="font-script text-[86px] leading-none text-mustard">{name.shortName}</p>
      <p className="mt-[26px] font-serif text-[62px] font-semibold leading-tight text-maroon">{name.name}</p>
      <p className="mx-auto mt-[20px] max-w-[700px] font-body text-[38px] leading-normal text-ink/80">
        {name.order} {name.parents}
      </p>
      <div className="mt-[26px] flex justify-center">
        <a
          href={ig ? `https://instagram.com/${ig}` : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-[14px] rounded-full bg-maroon px-[40px] py-[18px] font-serif text-[36px] tracking-wide text-cream ${ig ? "" : "pointer-events-none opacity-50"}`}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.4" cy="6.6" r="1.4" fill="currentColor" />
          </svg>
          Instagram
        </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ STORY: konten (flow) ══════════════════════════ */

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="mx-auto w-[903px] rounded-[80px] bg-white px-[75px] py-[90px] text-center font-body text-ink shadow-[0_24px_60px_rgba(20,40,60,0.12)]">
        {title && <h2 className="mb-[50px] font-script text-[92px] leading-none text-maroon">{title}</h2>}
        {children}
      </div>
    </Reveal>
  );
}

function useCountdown(iso: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);
  return t;
}

function StoryContent({ guestName }: { guestName: string }) {
  const cd = useCountdown(event.isoDateTime);
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1800);
    } catch {
      /* diam — nomor tetap terlihat */
    }
  }

  return (
    <>
      {/* ── ZONA CYAN: Save the Date + Wedding Event ── */}
      <div className="w-[1080px] px-[40px] pb-[60px] pt-[120px]" style={{ background: CYAN }}>
        <div className="flex flex-col gap-[120px]">
          <Card title="Save the Date">
            <p className="text-[46px] font-semibold text-black">{event.dateLabel}</p>
            <div className="mt-[50px] flex justify-center gap-[24px]">
              {[["Hari", cd.d], ["Jam", cd.h], ["Menit", cd.m], ["Detik", cd.s]].map(([l, v]) => (
                <div key={l as string} className="flex w-[150px] flex-col items-center rounded-[28px] bg-[#adfffe] py-[36px]">
                  <span className="text-[62px] font-semibold leading-none text-black">{String(v).padStart(2, "0")}</span>
                  <span className="mt-[10px] text-[32px] font-semibold text-black/60">{l}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Wedding Event">
            {[event.akad, event.resepsi].map((e) => (
              <div key={e.label} className="mb-[40px] rounded-[36px] border-2 border-black/10 py-[44px]">
                <p className="text-[50px] font-semibold text-black">{e.label}</p>
                <p className="mt-[18px] text-[39px] text-black/75">{e.day} | {e.date}</p>
                <p className="mt-[6px] text-[39px] text-black/75">{e.time}</p>
              </div>
            ))}
            <div className="rounded-[36px] border-2 border-black/10 px-[40px] py-[44px]">
              <p className="text-[44px] font-semibold text-black">{event.location.name}</p>
              <p className="mt-[16px] text-[36px] leading-relaxed text-black/70">{event.location.address}</p>
              <a
                href={event.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[30px] inline-flex rounded-full bg-black px-[46px] py-[28px] text-[39px] font-semibold text-white"
              >
                Buka Google Maps
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* ── TRANSISI: pasangan candid di taman (cyan → gelap) ── */}
      <TransitionScene />

      {/* ── ZONA LANTAU (gelap): Wedding Gift + RSVP + Best Wishes ── */}
      <div
        className="w-[1080px] px-[40px] pb-[120px] pt-[80px]"
        style={{
          backgroundColor: "#28110b",
          backgroundImage: `url(${A}/lantau.webp)`,
          backgroundSize: "1080px auto",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "top center",
        }}
      >
        <div className="flex flex-col gap-[120px]">
          <Card title={gift.heading}>
            <p className="mx-auto max-w-[720px] text-[37px] leading-relaxed text-black/75">{gift.intro}</p>
            <div className="mt-[50px] flex flex-col gap-[34px]">
              {gift.accounts.map((acc) => (
                <div key={acc.number} className="rounded-[36px] border-2 border-black/10 px-[44px] py-[40px]">
                  <img
                    src={`${A}/${acc.bank.toLowerCase().includes("bca") ? "logo-bca" : "logo-mandiri"}.webp`}
                    alt={acc.bank}
                    loading="lazy" decoding="async" className="mx-auto mb-[20px] h-[64px] w-auto object-contain"
                  />
                  <p className="text-[44px] font-semibold uppercase tracking-wide text-black">{acc.bank}</p>
                  <p className="mt-[16px] text-[54px] font-semibold tracking-[0.08em] text-black">{acc.number}</p>
                  <p className="mt-[8px] text-[37px] text-black/65">a.n {acc.holder}</p>
                  <button
                    onClick={() => copy(acc.number, acc.number)}
                    className="mt-[28px] inline-flex rounded-full border-2 border-black px-[40px] py-[24px] text-[37px] font-semibold text-black active:scale-[0.97]"
                  >
                    {copied === acc.number ? "Tersalin ✓" : "Salin Nomor"}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-[50px]">
              <h3 className="text-[52px] font-semibold text-black">{gift.shipping.heading}</h3>
              <div className="mt-[30px] rounded-[36px] border-2 border-black/10 px-[44px] py-[40px]">
                <p className="text-[36px] leading-relaxed text-black/75">{gift.shipping.address}</p>
                <p className="mt-[14px] text-[39px] font-semibold text-black">{gift.shipping.recipient}</p>
                <button
                  onClick={() => copy(`${gift.shipping.address} (${gift.shipping.recipient})`, "addr")}
                  className="mt-[28px] inline-flex rounded-full border-2 border-black px-[40px] py-[24px] text-[37px] font-semibold text-black active:scale-[0.97]"
                >
                  {copied === "addr" ? "Tersalin ✓" : "Salin Alamat"}
                </button>
              </div>
            </div>
          </Card>

          <RsvpCard guestName={guestName} />
        </div>
      </div>
    </>
  );
}

/** Transisi bergaya scene: pasangan candid (slenei) di taman, dari langit
 *  cyan memudar ke tirai gelap (Lantau). Dekoratif — tanpa teks. */
/**
 * Urutan lapisan (dari belakang ke depan) dibuat eksplisit supaya batas
 * cyan -> gelap tidak terlihat sebagai garis lurus yang kaku:
 *   z-0  latar gelap (Lantau) di bagian bawah
 *   z-10 semak — di BELAKANG pasangan, dipasang rendah seperti pagar tanaman
 *   z-20 pasangan candid
 *   z-30 dahan + bunga — menimpa perbatasan sehingga peralihannya menyatu
 */
/**
 * Scene transisi: pasangan candid di taman, lalu turun ke zona gelap.
 *
 * Pasangan + dedaunan + semak dipakai sebagai SATU aset gabungan
 * (scene-couple.webp) — hasil komposisi dari mempelai — jadi tidak perlu
 * menebak-nebak posisi tiap rumpun daun lagi.
 *
 * Lapisan (belakang -> depan):
 *   z-0  kartu putih (cyan tetap terlihat di tepi, seperti kartu lain)
 *   z-5  dasar gelap (Lantau) — DI BAWAH dedaunan, bukan memotong lurus
 *   z-10 scene pasangan
 *   z-30 dahan + hamparan bunga yang menutup perbatasan
 */
function TransitionScene() {
  return (
    <div className="relative w-[1080px] overflow-hidden" style={{ height: 1360, background: CYAN }}>
      {/* kartu putih di belakang, senada kartu konten lain */}
      <div className="absolute left-[89px] top-[-260px] z-0 h-[1290px] w-[903px] rounded-b-[240px] bg-white" />

      {/* dasar gelap */}
      <div
        className="absolute inset-x-0 bottom-0 z-[5]"
        style={{
          height: 400,
          backgroundColor: "#28110b",
          backgroundImage: `url(${A}/lantau.webp)`,
          backgroundSize: "1080px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "top center",
        }}
      />

      {/* pasangan + dedaunan + semak (satu aset) */}
      <div className="absolute left-1/2 top-[90px] z-10 w-[1120px] -translate-x-1/2">
        <img
          src={`${A}/scene-couple.webp`}
          alt="Fahmi & Ade"
          loading="lazy"
          decoding="async"
          className="w-full max-w-none"
        />
      </div>

      {/* dahan + hamparan bunga menutup perbatasan taman -> zona gelap.
          Dipakai flower-bed (garland horizontal) karena `runout` hanyalah
          semak hijau polos — tidak akan memberi hamparan bunga seperti
          rancangan. Dua lapis, sedikit bergeser, agar rapat. */}
      <div className="animate-sway-soft absolute left-[-6px] top-[680px] z-30 size-[1080px]">{img("ranting.webp")}</div>
      <div className="absolute inset-x-0 top-[790px] z-[31] mx-auto w-[1260px] max-w-none -translate-x-[8%]">
        <img src={`${A}/flower-bed.webp`} alt="" loading="lazy" decoding="async" className="w-full max-w-none" />
      </div>
      <div className="absolute inset-x-0 top-[856px] z-[32] mx-auto w-[1340px] max-w-none -translate-x-[12%]">
        <img src={`${A}/flower-bed.webp`} alt="" loading="lazy" decoding="async" className="w-full max-w-none -scale-x-100" />
      </div>
    </div>
  );
}

function RsvpCard({ guestName }: { guestName: string }) {
  const [name, setName] = useState(guestName);
  const [attendance, setAttendance] = useState<Wish["attendance"]>("hadir");
  const [guests, setGuests] = useState("1");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  // guestName sudah tersedia saat render pertama (dari useSearchParams),
  // jadi cukup dipakai sebagai nilai awal useState di atas — tidak perlu
  // disinkronkan lewat effect.
  useEffect(() => {
    fetch("/api/wishes").then((r) => r.json()).then((d) => setWishes(d.wishes ?? [])).catch(() => {});
  }, []);

  const need = attendance !== "tidak_hadir";
  const labels: Record<Wish["attendance"], string> = { hadir: "Hadir", tidak_hadir: "Tidak hadir", ragu: "Masih Ragu" };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attendance, guests: need ? guests : null, address, message }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      setWishes((p) => [d.wish, ...p]);
      setMessage("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  // py cukup besar supaya tinggi sentuh tetap >=44px setelah kanvas diskala
  const inputCls = "w-full rounded-[24px] border-2 border-black/15 bg-white px-[32px] py-[38px] text-[39px] text-black outline-none";

  return (
    <Card title="RSVP">
      <form onSubmit={submit} className="flex flex-col gap-[30px] text-left">
        <div>
          <label className="mb-[12px] block text-[34px] font-semibold text-black/60">Nama*</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nama Anda" className={inputCls} />
        </div>
        <div>
          <label className="mb-[12px] block text-[34px] font-semibold text-black/60">Konfirmasi Kehadiran*</label>
          <div className="grid grid-cols-3 gap-[16px]">
            {(Object.keys(labels) as Wish["attendance"][]).map((k) => (
              <button
                type="button"
                key={k}
                onClick={() => setAttendance(k)}
                className={`rounded-[20px] border-2 py-[30px] text-[34px] font-semibold ${attendance === k ? "border-black bg-black text-white" : "border-black/15 text-black/70"}`}
              >
                {labels[k]}
              </button>
            ))}
          </div>
        </div>
        {need && (
          <div>
            <label className="mb-[12px] block text-[34px] font-semibold text-black/60">Jumlah Kehadiran*</label>
            <input type="number" inputMode="numeric" min={1} max={20} value={guests} onChange={(e) => setGuests(e.target.value)} required className={inputCls} />
          </div>
        )}
        <div>
          <label className="mb-[12px] block text-[34px] font-semibold text-black/60">Alamat Domisili</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Kota / kecamatan (opsional)" className={inputCls} />
        </div>
        <div>
          <label className="mb-[12px] block text-[34px] font-semibold text-black/60">Ucapan &amp; Doa*</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={3} placeholder="Tuliskan ucapan & doa terbaik Anda..." className={`${inputCls} resize-none`} />
        </div>
        <button type="submit" disabled={status === "loading"} className="rounded-full bg-black py-[36px] text-[42px] font-semibold text-white disabled:opacity-60">
          {status === "loading" ? "Mengirim..." : status === "sent" ? "Terkirim, terima kasih!" : "Submit"}
        </button>
        {status === "error" && <p className="text-center text-[32px] text-red-600">Gagal mengirim, coba lagi.</p>}
      </form>

      {wishes.length > 0 && (
        <div className="mt-[70px] text-left">
          <h3 className="mb-[30px] text-center text-[52px] font-semibold text-black">Best Wishes</h3>
          <div className="flex max-h-[900px] flex-col gap-[24px] overflow-y-auto">
            {wishes.map((w) => (
              <div key={w.id} className="rounded-[28px] bg-[#eafcff] px-[36px] py-[28px]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[39px] font-semibold text-black">{w.name}</span>
                  <span className="shrink-0 text-[30px] font-semibold text-black/45">
                    {labels[w.attendance]}{w.guests ? ` · ${w.guests}` : ""}
                  </span>
                </div>
                <p className="mt-[10px] text-[37px] leading-relaxed text-black/70">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ══════════════════════════ STORY: footer ══════════════════════════ */

function StoryFooter() {
  return (
    <div
      className="relative w-[1080px]"
      style={{
        height: 2400,
        backgroundColor: "#28110b",
        backgroundImage: `url(${A}/lantau.webp)`,
        backgroundSize: "1080px auto",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
      }}
    >
      <div className="absolute inset-x-0 top-[220px] px-[90px] text-center font-sans text-white">
        <p className="text-[39px] font-normal leading-relaxed text-white/85">{closing.text}</p>
        <p className="mt-[40px] font-serif text-[64px] font-semibold text-white">{couple.pairName}</p>
      </div>
      <div className="absolute left-[-189px] top-[820px] size-[1466px]">{img("gapura.webp")}</div>
      <div className="absolute left-[-2px] top-[960px] h-[1532px] w-[1083px]">{img("pengantin3.webp")}</div>
    </div>
  );
}

/* ══════════════════════════ WADAH SKALA ══════════════════════════ */

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
  const [musicOn, setMusicOn] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  /** Niat tamu soal musik — dipakai saat kembali dari tab/aplikasi lain. */
  const wantsMusic = useRef(false);

  function open() {
    setFading(true);
    setTimeout(() => {
      setOpened(true);
      setFading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      // Autoplay hanya diizinkan browser kalau dipicu gestur tamu — di sini
      // pemicunya tombol "Buka Undangan", jadi aman.
      wantsMusic.current = true;
      audio.current?.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    }, 450);
  }

  function toggleMusic() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      wantsMusic.current = true;
      a.play().then(() => setMusicOn(true)).catch(() => {});
    } else {
      wantsMusic.current = false;
      a.pause();
      setMusicOn(false);
    }
  }

  /**
   * Lagu berhenti begitu tamu meninggalkan halaman (pindah tab, kunci layar,
   * buka aplikasi lain) — tanpa ini musik terus jalan di latar. Dilanjutkan
   * lagi saat tamu kembali, tapi hanya kalau memang tadinya menyala.
   */
  useEffect(() => {
    const a = audio.current;
    if (!a) return;

    const onVisibility = () => {
      if (document.hidden) {
        a.pause();
        setMusicOn(false);
      } else if (wantsMusic.current) {
        a.play().then(() => setMusicOn(true)).catch(() => {});
      }
    };
    const onLeave = () => {
      a.pause();
      setMusicOn(false);
    };

    // Sengaja TIDAK memakai window "blur": itu ikut terpicu saat tamu cuma
    // menyentuh address bar, jadi musik mati tanpa alasan. visibilitychange
    // sudah menangani pindah tab / aplikasi / layar terkunci.
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onLeave);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onLeave);
    };
  }, []);


  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] overflow-x-hidden transition-opacity duration-500" style={{ opacity: fading ? 0 : 1, background: CYAN }}>
      <audio ref={audio} src="/music/song.m4a" loop preload="none" />

      {opened ? (
        <>
          <StoryScaler>
            {/* overflow-hidden: dekorasi Figma (atap, bata, semak) sengaja
                melebihi 1080px; tanpa ini kanvas meluber ke samping dan
                halaman bisa digeser horizontal. */}
            <div className="w-[1080px] overflow-hidden">
              <StoryTop groomIg={groomIg} brideIg={brideIg} />
              <StoryContent guestName={guestName} />
              <StoryFooter />
            </div>
          </StoryScaler>

          {/* tombol musik: di luar kanvas supaya ukurannya tidak ikut diskala */}
          <button
            onClick={toggleMusic}
            aria-label={musicOn ? "Matikan musik" : "Nyalakan musik"}
            className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-[#241009]/85 text-white shadow-lg backdrop-blur-sm active:scale-95"
            style={{ right: "max(1.25rem, calc((100vw - 480px) / 2 + 1.25rem))" }}
          >
            {musicOn ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                <path d="m17 9 4 6M21 9l-4 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </>
      ) : (
        <CoverScaler onOpen={open}>
          <CoverArt guestName={guestName} />
        </CoverScaler>
      )}
    </div>
  );
}

function CoverScaler({ children, onOpen }: { children: React.ReactNode; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setS(Math.max(el.clientWidth / DESIGN_W, el.clientHeight / COVER_H));
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
    // items-start: kalau kanvas lebih tinggi dari layar, yang terpangkas HANYA
    // bagian bawah (bunga dekoratif). Kalau dipusatkan, judul di atas ikut
    // terpotong di layar pendek.
    <div ref={ref} className="relative flex h-dvh w-full items-start justify-center overflow-hidden bg-white">
      <div style={{ width: DESIGN_W * s, height: COVER_H * s, position: "relative", flexShrink: 0 }}>
        <div style={{ width: DESIGN_W, height: COVER_H, transformOrigin: "top left", transform: `scale(${s})`, position: "absolute", inset: 0 }}>
          {children}
        </div>
        {/* Tombol Buka Undangan (Figma: 316,1623, 448x67). Tinggi/lebar diberi
            batas minimum agar tetap nyaman disentuh di layar kecil — pada
            skala 0.38 ukuran Figma cuma ~26px, di bawah ambang sentuh 44px.
            Posisi dijaga tetap berpusat di titik desain yang sama. */}
        <button
          onClick={onOpen}
          style={{
            position: "absolute",
            left: 316 * s + (448 * s) / 2 - Math.max(448 * s, 220) / 2,
            top: 1623 * s + (67 * s) / 2 - Math.max(67 * s, 46) / 2,
            width: Math.max(448 * s, 220),
            height: Math.max(67 * s, 46),
            borderRadius: 9999,
            fontSize: Math.max(40 * s, 15),
          }}
          className="flex cursor-pointer items-center justify-center bg-black font-semibold text-white shadow-lg transition active:scale-[0.97]"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

/** Story: skala ke lebar wadah; tinggi mengikuti konten (variabel). */
function StoryScaler({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0);
  const [h, setH] = useState(0);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const update = () => {
      const scale = o.clientWidth / DESIGN_W;
      setS(scale);
      setH(i.offsetHeight * scale);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="relative w-full" style={{ height: h || undefined }}>
      <div ref={inner} style={{ width: DESIGN_W, transformOrigin: "top left", transform: `scale(${s})`, position: "absolute", top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}
