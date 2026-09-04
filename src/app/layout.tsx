import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    images: ["/assets/journey-title.webp"],
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
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:wght@500;600;700&family=Alex+Brush&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
