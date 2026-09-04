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

const img = (src: string) => (
  <img alt="" src={`${A}/${src}`} className="absolute inset-0 size-full max-w-none object-cover pointer-events-none" />
);

/* ══════════════════════════ COVER ══════════════════════════ */

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
      <div className="absolute left-1/2 top-[1360px] w-[760px] -translate-x-1/2 rounded-[60px] bg-white/55 px-10 py-7 text-center backdrop-blur-[2px]">
        <p className="font-serif text-[37px] uppercase tracking-[0.3em] text-[#5c1f2e]/75">Kepada Yth.</p>
        <p className="mt-1 font-serif text-[50px] font-semibold leading-tight text-[#5c1f2e]">{guestName || "Tamu Undangan"}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════ STORY: bagian atas (Figma) ══════════════════════════ */
const TOP_H = 7125;

function StoryTop({ groomIg, brideIg }: { groomIg?: string; brideIg?: string }) {
  return (
    <div className="relative w-[1080px]" style={{ height: TOP_H }}>
      <div className="absolute left-0 top-0 h-[2021px] w-[1080px]" style={{ background: SKY }} />
      <div className="absolute left-0 top-[3073px] h-[4052px] w-[1080px]" style={{ background: CYAN }} />
      <div className="absolute left-[89px] top-[3955px] h-[3170px] w-[903px] rounded-[451.5px] bg-white" />

      {/* header */}
      <div className="absolute left-0 top-[-320px] size-[1080px]">{img("ranting.webp")}</div>
      <div className="absolute left-[63px] top-[440px] size-[954px]">{img("title-white.webp")}</div>
      <p className="absolute left-1/2 top-[1150px] -translate-x-1/2 whitespace-nowrap text-[60.7px] font-bold tracking-[0.12em] text-white">12 . 09 . 2026</p>
      <div className="absolute left-[-302px] top-[1435px] size-[880px]">{img("runout.webp")}</div>
      <div className="absolute left-[476px] top-[1435px] size-[880px]">{img("runout.webp")}</div>
      <div className="absolute left-[100px] top-[1465px] size-[880px]">{img("runout.webp")}</div>

      {/* video warung */}
      <div className="absolute left-[65px] top-[2147px] h-[1692px] w-[951px] overflow-hidden bg-black">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <span className="flex size-[150px] items-center justify-center rounded-full bg-white/95 shadow-lg">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="#241019" /></svg>
          </span>
          <span className="rounded-full bg-white/15 px-8 py-3 text-[44px] font-medium text-white/90">Video menyusul</span>
        </div>
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

      {/* Bride & Groom */}
      <div className="absolute left-1/2 top-[4431px] -translate-x-1/2 text-center font-sans text-black">
        <p className="text-[60.7px] font-bold leading-tight">Bride &amp;<br />Groom</p>
      </div>
      <div className="absolute left-1/2 top-[4680px] w-[760px] -translate-x-1/2 text-center font-sans text-[36px] font-semibold leading-normal text-black">
        {couple.intro}
      </div>
      <PersonBlock topName={4990} name={couple.groom} ig={groomIg} />
      <p className="absolute left-1/2 top-[5660px] -translate-x-1/2 text-center font-sans text-[173px] font-bold leading-none text-black">&amp;</p>
      <PersonBlock topName={6028} name={couple.bride} ig={brideIg} />
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
  return (
    <div className="absolute left-1/2 -translate-x-1/2 text-center font-sans text-black" style={{ top: topName, width: 900 }}>
      <p className="text-[60.7px] font-bold leading-tight">{name.name}</p>
      <p className="mt-[16px] text-[36px] font-semibold leading-normal">
        {name.order} {name.parents}
      </p>
      <div className="mt-[22px] flex justify-center">
        <a
          href={ig ? `https://instagram.com/${ig}` : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-[33px] bg-black px-[35px] py-[18px] text-[40px] font-bold text-white ${ig ? "" : "pointer-events-none opacity-60"}`}
        >
          Instagram
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════ STORY: konten (flow) ══════════════════════════ */

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[903px] rounded-[80px] bg-white px-[75px] py-[90px] text-center font-sans text-black shadow-[0_24px_60px_rgba(20,40,60,0.12)]">
      {title && <h2 className="mb-[50px] text-[64px] font-extrabold leading-tight">{title}</h2>}
      {children}
    </div>
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
                  <span className="text-[62px] font-extrabold leading-none text-black">{String(v).padStart(2, "0")}</span>
                  <span className="mt-[10px] text-[32px] font-semibold text-black/60">{l}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Wedding Event">
            {[event.akad, event.resepsi].map((e) => (
              <div key={e.label} className="mb-[40px] rounded-[36px] border-2 border-black/10 py-[44px]">
                <p className="text-[50px] font-bold text-black">{e.label}</p>
                <p className="mt-[18px] text-[39px] text-black/75">{e.day} | {e.date}</p>
                <p className="mt-[6px] text-[39px] text-black/75">{e.time}</p>
              </div>
            ))}
            <div className="rounded-[36px] border-2 border-black/10 px-[40px] py-[44px]">
              <p className="text-[44px] font-bold text-black">{event.location.name}</p>
              <p className="mt-[16px] text-[36px] leading-relaxed text-black/70">{event.location.address}</p>
              <a
                href={event.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[30px] inline-flex rounded-full bg-black px-[46px] py-[28px] text-[39px] font-bold text-white"
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
                  <p className="text-[44px] font-extrabold uppercase tracking-wide text-black">{acc.bank}</p>
                  <p className="mt-[16px] text-[54px] font-bold tracking-[0.08em] text-black">{acc.number}</p>
                  <p className="mt-[8px] text-[37px] text-black/65">a.n {acc.holder}</p>
                  <button
                    onClick={() => copy(acc.number, acc.number)}
                    className="mt-[28px] inline-flex rounded-full border-2 border-black px-[40px] py-[24px] text-[37px] font-bold text-black active:scale-[0.97]"
                  >
                    {copied === acc.number ? "Tersalin ✓" : "Salin Nomor"}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-[50px]">
              <h3 className="text-[52px] font-extrabold text-black">{gift.shipping.heading}</h3>
              <div className="mt-[30px] rounded-[36px] border-2 border-black/10 px-[44px] py-[40px]">
                <p className="text-[36px] leading-relaxed text-black/75">{gift.shipping.address}</p>
                <p className="mt-[14px] text-[39px] font-bold text-black">{gift.shipping.recipient}</p>
                <button
                  onClick={() => copy(`${gift.shipping.address} (${gift.shipping.recipient})`, "addr")}
                  className="mt-[28px] inline-flex rounded-full border-2 border-black px-[40px] py-[24px] text-[37px] font-bold text-black active:scale-[0.97]"
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
function TransitionScene() {
  return (
    <div className="relative w-[1080px] overflow-hidden" style={{ height: 1500, background: `linear-gradient(${CYAN} 0%, ${CYAN} 42%, #28110b 100%)` }}>
      {/* semak di belakang */}
      <div className="absolute left-[-180px] top-[360px] size-[900px]">{img("kk.webp")}</div>
      <div className="absolute left-[560px] top-[330px] size-[900px]">{img("kk.webp")}</div>
      {/* pasangan candid */}
      <div className="absolute left-1/2 top-[300px] h-[1000px] w-[1000px] -translate-x-1/2">{img("slenei.webp")}</div>
      {/* dahan berbunga sebagai garis batas ke zona gelap */}
      <div className="absolute left-[-6px] top-[880px] size-[1080px]">{img("ranting.webp")}</div>
      <div className="absolute left-[-160px] top-[980px] size-[760px]">{img("runout.webp")}</div>
      <div className="absolute left-[480px] top-[980px] size-[760px]">{img("runout.webp")}</div>
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

  useEffect(() => {
    if (guestName) setName((c) => c || guestName);
  }, [guestName]);
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
          <label className="mb-[12px] block text-[34px] font-bold text-black/60">Nama*</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nama Anda" className={inputCls} />
        </div>
        <div>
          <label className="mb-[12px] block text-[34px] font-bold text-black/60">Konfirmasi Kehadiran*</label>
          <div className="grid grid-cols-3 gap-[16px]">
            {(Object.keys(labels) as Wish["attendance"][]).map((k) => (
              <button
                type="button"
                key={k}
                onClick={() => setAttendance(k)}
                className={`rounded-[20px] border-2 py-[30px] text-[34px] font-bold ${attendance === k ? "border-black bg-black text-white" : "border-black/15 text-black/70"}`}
              >
                {labels[k]}
              </button>
            ))}
          </div>
        </div>
        {need && (
          <div>
            <label className="mb-[12px] block text-[34px] font-bold text-black/60">Jumlah Kehadiran*</label>
            <input type="number" inputMode="numeric" min={1} max={20} value={guests} onChange={(e) => setGuests(e.target.value)} required className={inputCls} />
          </div>
        )}
        <div>
          <label className="mb-[12px] block text-[34px] font-bold text-black/60">Alamat Domisili</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Kota / kecamatan (opsional)" className={inputCls} />
        </div>
        <div>
          <label className="mb-[12px] block text-[34px] font-bold text-black/60">Ucapan &amp; Doa*</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={3} placeholder="Tuliskan ucapan & doa terbaik Anda..." className={`${inputCls} resize-none`} />
        </div>
        <button type="submit" disabled={status === "loading"} className="rounded-full bg-black py-[36px] text-[42px] font-bold text-white disabled:opacity-60">
          {status === "loading" ? "Mengirim..." : status === "sent" ? "Terkirim, terima kasih!" : "Submit"}
        </button>
        {status === "error" && <p className="text-center text-[32px] text-red-600">Gagal mengirim, coba lagi.</p>}
      </form>

      {wishes.length > 0 && (
        <div className="mt-[70px] text-left">
          <h3 className="mb-[30px] text-center text-[52px] font-extrabold text-black">Best Wishes</h3>
          <div className="flex max-h-[900px] flex-col gap-[24px] overflow-y-auto">
            {wishes.map((w) => (
              <div key={w.id} className="rounded-[28px] bg-[#eafcff] px-[36px] py-[28px]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[39px] font-bold text-black">{w.name}</span>
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
        <p className="text-[39px] font-medium leading-relaxed text-white/85">{closing.text}</p>
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

  function open() {
    setFading(true);
    setTimeout(() => {
      setOpened(true);
      setFading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 450);
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] transition-opacity duration-500" style={{ opacity: fading ? 0 : 1, background: CYAN }}>
      {opened ? (
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
