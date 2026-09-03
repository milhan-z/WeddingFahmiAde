import type { Metadata } from "next";
import { Suspense } from "react";
import JourneyClient from "@/components/JourneyClient";

export const metadata: Metadata = {
  title: "Perjalanan Kami — Ade & Fahmi",
  description:
    "Delapan tahun, tujuh babak cerita: dari bangku SMA sampai hari pernikahan Ade & Fahmi.",
};

export default function JourneyPage() {
  return (
    <Suspense fallback={null}>
      <JourneyClient />
    </Suspense>
  );
}
