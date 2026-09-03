"use client";

import { useSearchParams } from "next/navigation";

import { getGuestName } from "@/lib/guest";
import { couple } from "@/lib/data";
import InviteCanvas from "@/components/InviteCanvas";

/**
 * Undangan memakai port kanvas berskala dari Figma Make export
 * (lihat InviteCanvas). Konten section (Wedding Event, Gift, RSVP,
 * Best Wishes) sedang dipindahkan masuk ke kanvas — menyusul.
 */
export default function HomeClient() {
  const params = useSearchParams();
  const guestName = getGuestName(params);

  return (
    <InviteCanvas
      guestName={guestName}
      groomIg={couple.groom.instagram || undefined}
      brideIg={couple.bride.instagram || undefined}
    />
  );
}
