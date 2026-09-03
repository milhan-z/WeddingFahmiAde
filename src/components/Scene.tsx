"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Panggung berlapis full-screen.
 *
 * Scene menyediakan satu progress scroll (0 = section baru masuk dari bawah,
 * 1 = section sudah keluar lewat atas) lewat context. Semua <Layer> di
 * dalamnya membaca progress yang sama, jadi lapisan bergerak selaras —
 * itu yang bikin kedalamannya terbaca sebagai satu ruang, bukan elemen
 * yang jalan sendiri-sendiri.
 */
const SceneProgress = createContext<MotionValue<number> | null>(null);

export function Scene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Sedikit pegas supaya parallax tidak "nempel" kaku di jari saat scroll.
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.35,
  });

  return (
    <SceneProgress.Provider value={progress}>
      <section
        ref={ref}
        className={`relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden ${className}`}
      >
        {children}
      </section>
    </SceneProgress.Provider>
  );
}

/**
 * Satu lapisan panggung.
 *
 * `speed` = jarak tempuh vertikal dalam vh sepanjang section melintasi layar.
 * Makin besar, makin "dekat" ke mata. Langit 2-4, backdrop 4-6,
 * tokoh 8-10, foreground 14-22.
 */
export function Layer({
  children,
  speed = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const progress = useContext(SceneProgress);
  const reduced = useReducedMotion();

  if (!progress) {
    throw new Error("<Layer> harus dipakai di dalam <Scene>");
  }

  const distance = reduced ? 0 : speed;
  const y = useTransform(progress, [0, 1], [`${distance}vh`, `${-distance}vh`]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ y, ...style }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Konten yang bisa dibaca (teks) — ikut parallax pelan tapi tetap
 * bisa diseleksi/diklik, dan punya animasi masuk sendiri.
 */
export function SceneContent({
  children,
  speed = 0,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const progress = useContext(SceneProgress);
  const reduced = useReducedMotion();

  if (!progress) {
    throw new Error("<SceneContent> harus dipakai di dalam <Scene>");
  }

  const distance = reduced ? 0 : speed;
  const y = useTransform(progress, [0, 1], [`${distance}vh`, `${-distance}vh`]);

  return (
    <motion.div className={`relative z-20 ${className}`} style={{ y }}>
      {children}
    </motion.div>
  );
}
