-- Create sites table
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_site VARCHAR(255) NOT NULL,
  alamat_site TEXT NOT NULL,
  koordinat_site JSONB NOT NULL,
  tanggal_checklist DATE NOT NULL,
  lokasi VARCHAR(10) NOT NULL CHECK (lokasi IN ('P', 'K', 'S', 'PK', 'JU', 'JL', 'JT')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create checklist_items table
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  nomor_item INTEGER NOT NULL,
  material VARCHAR(255) NOT NULL,
  spesifikasi TEXT,
  kondisi VARCHAR(10) NOT NULL CHECK (kondisi IN ('baik', 'sedang', 'buruk')),
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_checklist_items_site_id ON checklist_items(site_id);
CREATE INDEX IF NOT EXISTS idx_sites_tanggal_checklist ON sites(tanggal_checklist);

-- Enable RLS (Row Level Security)
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (update these for production)
CREATE POLICY "Allow all operations on sites" ON sites
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on checklist_items" ON checklist_items
  USING (true) WITH CHECK (true);
