"use client";

import { useEffect, useRef, useState } from "react";
import { musicSrc } from "@/lib/data";

export default function MusicToggle({ autoStart }: { autoStart: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasSource, setHasSource] = useState(true);

  useEffect(() => {
    if (!autoStart || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart]);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        onError={() => setHasSource(false)}
      />
      {hasSource && (
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-maroon text-cream shadow-lg shadow-maroon/30 transition hover:bg-maroon-deep"
        >
          <span
            className="h-5 w-5 rounded-full border-2 border-cream/70"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-maroon-deep) 30%, transparent 31%)",
              animation: playing ? "spin 3s linear infinite" : "none",
            }}
          />
        </button>
      )}
    </>
  );
}
