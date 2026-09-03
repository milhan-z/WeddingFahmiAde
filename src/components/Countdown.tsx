"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ target }: { target: string }) {
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { label: "Hari", value: time?.days },
    { label: "Jam", value: time?.hours },
    { label: "Menit", value: time?.minutes },
    { label: "Detik", value: time?.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex w-16 flex-col items-center rounded-xl border border-mustard/30 bg-white/60 py-3 shadow-sm backdrop-blur-sm sm:w-20"
        >
          <span
            suppressHydrationWarning
            className="font-serif text-xl font-semibold text-maroon sm:text-2xl"
          >
            {item.value === undefined
              ? "--"
              : String(item.value).padStart(2, "0")}
          </span>
          <span className="mt-1 font-serif text-[10px] uppercase tracking-wide text-ink/50">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
