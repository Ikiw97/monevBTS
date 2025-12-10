import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY as string;

export function createClientSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Untuk server (service key) bila dibutuhkan
export function createServerSupabase() {
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY as string;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}
