import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Site = {
  id: string;
  nomor_urut: number;
  nama_site: string;
  alamat_site: string;
  koordinat_site: { lat: number; lng: number };
  tanggal_checklist: string;
  lokasi: 'P' | 'K' | 'S' | 'PK' | 'JU' | 'JL' | 'JT';
  created_at: string;
  updated_at: string;
};

export type ChecklistItem = {
  id: string;
  site_id: string;
  nomor_item: number;
  material: string;
  spesifikasi: string;
  kondisi: 'baik' | 'sedang' | 'buruk';
  keterangan: string;
  created_at: string;
  updated_at: string;
};
