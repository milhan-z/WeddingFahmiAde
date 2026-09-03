import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Semua aset ilustrasi di /public/assets berukuran asli 1400x1400.
     * Tanpa batas ini Next ikut membuat varian 1920/2048/3840 — meng-upscale
     * gambar 1400px jadi lebih besar dari aslinya: file lebih berat, render
     * lebih lambat, dan di Vercel tiap transformasi itu ditagih.
     * Plafon 1400 = tidak pernah upscale; ukuran kecil tetap ada supaya
     * tamu yang buka dari HP tidak mengunduh gambar 1400px untuk slot 250px.
     */
    deviceSizes: [360, 420, 640, 828, 1080, 1400],
    imageSizes: [96, 128, 200, 256, 320, 400],
  },
};

export default nextConfig;
