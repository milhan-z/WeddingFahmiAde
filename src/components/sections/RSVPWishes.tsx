"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import type { Wish } from "@/app/api/wishes/route";

const attendanceLabel: Record<Wish["attendance"], string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak Hadir",
  ragu: "Masih Ragu",
};

export default function RSVPWishes({ guestName }: { guestName: string }) {
  const [name, setName] = useState(guestName);
  const [attendance, setAttendance] =
    useState<Wish["attendance"]>("hadir");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then((d) => setWishes(d.wishes ?? []))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attendance, message }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setWishes((prev) => [data.wish, ...prev]);
      setMessage("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative bg-cream px-6 py-24">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <span className="font-script text-4xl text-mustard">09</span>
          <h2 className="mt-1 font-serif text-2xl text-maroon">
            RSVP &amp; Ucapan
          </h2>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-ink/50">
            Doa restu Bapak/Ibu/Saudara/i
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-mustard/30 bg-white/60 p-6 shadow-sm backdrop-blur-sm"
          >
            <div>
              <label className="mb-1 block font-serif text-xs uppercase tracking-wide text-ink/50">
                Nama
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Nama Anda"
                className="w-full rounded-lg border border-mustard/30 bg-white px-3 py-2 font-body text-sm text-ink outline-none focus:border-maroon"
              />
            </div>

            <div>
              <label className="mb-1 block font-serif text-xs uppercase tracking-wide text-ink/50">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(attendanceLabel) as Wish["attendance"][]).map(
                  (key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setAttendance(key)}
                      className={`rounded-lg border px-2 py-2 font-serif text-xs transition ${
                        attendance === key
                          ? "border-maroon bg-maroon text-cream"
                          : "border-mustard/30 bg-white text-ink/70"
                      }`}
                    >
                      {attendanceLabel[key]}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-serif text-xs uppercase tracking-wide text-ink/50">
                Ucapan &amp; Doa
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="w-full resize-none rounded-lg border border-mustard/30 bg-white px-3 py-2 font-body text-sm text-ink outline-none focus:border-maroon"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-maroon py-2.5 font-serif text-sm tracking-wide text-cream transition hover:bg-maroon-deep disabled:opacity-60"
            >
              {status === "loading"
                ? "Mengirim..."
                : status === "sent"
                ? "Terkirim, terima kasih!"
                : "Kirim Ucapan"}
            </button>
            {status === "error" && (
              <p className="text-center font-body text-xs text-red-600">
                Gagal mengirim, coba lagi.
              </p>
            )}
          </form>
        </Reveal>

        {wishes.length > 0 && (
          <Reveal delay={0.25} className="mt-8">
            <div className="max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-mustard/30 bg-white/50 p-5 backdrop-blur-sm">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="border-b border-mustard/15 pb-3 text-left last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-maroon">
                      {w.name}
                    </span>
                    <span className="font-serif text-[10px] uppercase tracking-wide text-ink/40">
                      {attendanceLabel[w.attendance]}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-sm text-ink/70">
                    {w.message}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
