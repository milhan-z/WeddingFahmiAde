import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Alex_Brush } from "next/font/google";
import "./globals.css";

/**
 * Font di-host sendiri lewat next/font, bukan <link> ke Google Fonts.
 * Bedanya nyata untuk kecepatan: tidak ada round-trip ke domain pihak
 * ketiga yang memblokir render, berkasnya di-preload, dan hanya subset
 * latin yang diunduh.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-playfair",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alexbrush",
  display: "swap",
});

/**
 * URL dasar untuk metadata (preview link WhatsApp/Telegram).
 *
 * Catatan: pakai pengecekan string kosong, bukan `??`. Vercel mengisi env
 * var yang dibiarkan kosong di dashboard sebagai string kosong — itu lolos
 * dari `??` lalu menjatuhkan build di `new URL("")`.
 *
 * Urutan fallback dibuat supaya build tidak pernah gagal tanpa konfigurasi:
 * env manual → domain produksi Vercel → URL deployment → localhost.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;

  const prodDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prodDomain) return `https://${prodDomain}`;

  const deploymentUrl = process.env.VERCEL_URL?.trim();
  if (deploymentUrl) return `https://${deploymentUrl}`;

  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Wedding of Ade & Fahmi",
  description:
    "Undangan pernikahan Ade Fitri Kurniasih & Fahmi Muzakky — Sabtu, 12 September 2026, Bojongsari, Depok.",
  openGraph: {
    title: "The Wedding of Ade & Fahmi",
    description: "Sabtu, 12 September 2026 — Bojongsari, Depok",
    type: "website",
    locale: "id_ID",
    /* JPEG, bukan WebP: WhatsApp — jalur sebar utama undangan ini —
       kerap gagal membuat pratinjau dari WebP. Ukuran ditahan di bawah
       300KB karena di atas itu WhatsApp sering melewatkan gambarnya. */
    images: [
      {
        url: "/assets/og-cover.jpg",
        width: 1200,
        height: 1200,
        type: "image/jpeg",
        alt: "Ilustrasi Ade & Fahmi di pelaminan",
      },
    ],
  },
  /* "summary" (kotak kecil), bukan "summary_large_image": kartu besar
     dipotong 2:1, yang akan memangkas judul di atas dan gaun di bawah. */
  twitter: {
    card: "summary",
    title: "The Wedding of Ade & Fahmi",
    description: "Sabtu, 12 September 2026 — Bojongsari, Depok",
    images: ["/assets/og-cover.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Undangan ini kanvas berskala: cubit-zoom malah merusak tata letaknya,
  // jadi zoom dikunci dan lebar dipaku ke lebar layar.
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: "#241009",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${cormorant.variable} ${alexBrush.variable}`}
    >
      <head>
        {/* Gambar cover = layar pertama; diminta lebih awal agar cepat tampil */}
        <link rel="preload" as="image" href="/figma/cover-title.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/figma/cover-pengantin.webp" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
