"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layer, Scene, SceneContent } from "@/components/Scene";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Bab 01 — Bangku SMA.
 *
 * Mengikuti frame asli video (00:15–00:30): langit biru cerah dengan awan
 * putih, bangunan sekolah hijau-kuning tampil PENUH (bukan wallpaper pudar),
 * tokoh digambar besar di dalam scene. Aset school-courtyard bagian langitnya
 * transparan, jadi ia menumpuk mulus di atas gradient langit.
 *
 * Catatan performa: animasi ditaruh di div pembungkus (transform saja),
 * filter/shadow di <Image> — supaya blur tidak dihitung ulang tiap frame.
 */
export default function SmaStory() {
  return (
    <Scene className="justify-between bg-gradient-to-b from-[#4facdf] via-[#8fd2f0] to-[#dcf0fa] px-6 pb-0 pt-12">
      {/* ── MATAHARI: flare transparan, blending normal ── */}
      <Layer speed={3} className="-right-[24%] -top-[10%] z-[1] w-[90%]">
        <Image
          src="/assets/sun-glow.webp"
          alt=""
          width={1400}
          height={1400}
          sizes="90vw"
          className="w-full opacity-90"
        />
      </Layer>

      {/* ── AWAN: dua lapis, kecepatan beda supaya langit terasa dalam ── */}
      <Layer speed={5} className="-left-[10%] top-[6%] z-[2] w-[80%]">
        <div className="animate-drift">
          <Image
            src="/assets/cloud-light.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="80vw"
            className="w-full opacity-95"
          />
        </div>
      </Layer>

      <Layer speed={8} className="-right-[14%] top-[20%] z-[2] w-[70%]">
        <div className="animate-drift [animation-delay:3s]">
          <Image
            src="/assets/cloud-blue.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="70vw"
            className="w-full"
          />
        </div>
      </Layer>

      {/* ── SEKOLAH: tampil penuh, berdiri dari dasar layar ── */}
      <Layer speed={6} className="inset-x-0 bottom-0 z-[3] h-[72%]">
        <Image
          src="/assets/school-courtyard.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </Layer>

      {/* ── JUDUL: di ruang langit, seperti penempatan nama di video ── */}
      <SceneContent speed={2} className="mx-auto w-full max-w-md pt-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="font-script text-5xl text-white drop-shadow-[0_2px_6px_rgba(30,70,100,0.45)]">
            01
          </span>
          <h2 className="mt-1 font-serif text-2xl text-white drop-shadow-[0_2px_6px_rgba(30,70,100,0.5)] sm:text-3xl">
            Masa Perkenalan
          </h2>
          <p className="mt-1 font-serif text-xs uppercase tracking-[0.3em] text-white/85 drop-shadow-[0_1px_4px_rgba(30,70,100,0.5)]">
            Bangku SMA
          </p>
        </motion.div>

        {/* narasi ikut di area langit — meniru kartu teks di video, dan
            membebaskan bagian bawah supaya tokoh bisa menapak tanah */}
        <motion.p
          className="mx-auto mt-4 max-w-sm font-body text-[15px] leading-relaxed text-white drop-shadow-[0_2px_6px_rgba(30,70,100,0.55)] sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
        >
          Semua berawal dari seragam putih abu-abu — dua remaja yang tak pernah
          menyangka pertemanan sederhana di sekolah akan menjadi awal dari
          perjalanan panjang menuju hari ini.
        </motion.p>
      </SceneContent>

      {/* ── TOKOH: besar, berdiri di halaman sekolah ── */}
      <SceneContent
        speed={11}
        className="mx-auto mt-auto flex w-full max-w-md items-end justify-center gap-1 pb-10 sm:gap-4"
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="animate-float-soft">
            <Image
              src="/assets/ade-sma.webp"
              alt="Ade masa SMA"
              width={1400}
              height={1400}
              sizes="(min-width: 640px) 400px, 260px"
              className="h-64 w-auto object-contain drop-shadow-[0_16px_20px_rgba(20,50,30,0.35)] sm:h-80"
            />
          </div>
          <span className="-mt-1 font-script text-3xl text-white drop-shadow-[0_2px_5px_rgba(30,70,100,0.55)]">
            Ade
          </span>
        </motion.div>

        <motion.span
          className="mb-16 font-script text-4xl text-white drop-shadow-[0_2px_5px_rgba(30,70,100,0.55)]"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
        >
          &amp;
        </motion.span>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="animate-float-soft [animation-delay:1.4s]">
            <Image
              src="/assets/fahmi-sma.webp"
              alt="Fahmi masa SMA"
              width={1400}
              height={1400}
              sizes="(min-width: 640px) 400px, 260px"
              className="h-64 w-auto object-contain drop-shadow-[0_16px_20px_rgba(20,50,30,0.35)] sm:h-80"
            />
          </div>
          <span className="-mt-1 font-script text-3xl text-white drop-shadow-[0_2px_5px_rgba(30,70,100,0.55)]">
            Fahmi
          </span>
        </motion.div>
      </SceneContent>

      {/* ── FOREGROUND: semak & rumput, lapisan terdekat ── */}
      <Layer speed={20} className="-bottom-[5%] -left-[12%] z-10 w-[58%] sm:w-[34%]">
        <div className="animate-sway-slow">
          <Image
            src="/assets/bush.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 34vw, 58vw"
            className="w-full"
          />
        </div>
      </Layer>

      <Layer speed={24} className="-bottom-[8%] -right-[14%] z-10 w-[62%] sm:w-[36%]">
        <div className="animate-sway-slow [animation-delay:2.5s]">
          <Image
            src="/assets/bush.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 36vw, 62vw"
            className="w-full -scale-x-100"
          />
        </div>
      </Layer>

      <Layer speed={16} className="-left-[16%] -top-[3%] z-10 w-[62%] sm:w-[40%]">
        <div className="animate-sway">
          <Image
            src="/assets/branch-flowers.webp"
            alt=""
            width={1400}
            height={1400}
            sizes="(min-width: 640px) 40vw, 62vw"
            className="w-full -rotate-6"
          />
        </div>
      </Layer>

    </Scene>
  );
}
