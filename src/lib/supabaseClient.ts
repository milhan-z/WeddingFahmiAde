import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Kalau env var belum di-set, client-nya null dan API route akan
// fallback ke penyimpanan sementara (lihat src/app/api/wishes/route.ts).
// Supaya ucapan & RSVP tersimpan permanen, buat project Supabase gratis,
// lalu isi NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY di
// Vercel > Settings > Environment Variables.
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;
