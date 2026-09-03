import type { Metadata } from "next";
import LinkGenerator from "@/components/LinkGenerator";

/**
 * Halaman bantu untuk mempelai — tidak ditautkan dari undangan.
 * noindex supaya tidak muncul di hasil pencarian; isinya tidak rahasia
 * (hanya menyusun link), jadi tidak perlu login.
 */
export const metadata: Metadata = {
  title: "Generator Link Undangan",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-cream">
      <LinkGenerator />
    </div>
  );
}
