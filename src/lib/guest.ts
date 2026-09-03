import type { ReadonlyURLSearchParams } from "next/navigation";

/** Batas aman supaya nama panjang tidak merusak layout kartu cover. */
const MAX_LENGTH = 60;

/**
 * Ambil nama tamu dari query `?to=`.
 *
 * PENTING: jangan panggil decodeURIComponent di sini. URLSearchParams.get()
 * sudah mengembalikan nilai yang ter-decode, jadi decode kedua kali akan
 * melempar URIError untuk nama yang mengandung "%" (mis. "Diskon 50%") dan
 * mematikan seluruh halaman. Penanganan "+" juga sudah benar secara bawaan:
 * "+" polos jadi spasi, "%2B" tetap jadi "+".
 */
export function getGuestName(
  params: ReadonlyURLSearchParams | URLSearchParams
): string {
  const raw = params.get("to");
  if (!raw) return "";

  // rapikan spasi berlebih dari link yang ditulis manual
  const cleaned = raw.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";

  return cleaned.length > MAX_LENGTH
    ? `${cleaned.slice(0, MAX_LENGTH).trimEnd()}…`
    : cleaned;
}

/** Bentuk link internal sambil membawa nama tamu apa adanya. */
export function withGuest(path: string, guestName: string): string {
  if (!guestName) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}to=${encodeURIComponent(guestName)}`;
}
