import { useEffect, useState } from 'react';
import { supabase, Site } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { ExternalLink } from 'lucide-react';

export default function Map() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSites(data || []);
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapUrl = sites.length > 0
    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyDQK5Zw3N5V5Y5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z&q=${sites[0]?.koordinat_site?.lat},${sites[0]?.koordinat_site?.lng}&zoom=12`
    : '';

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Peta Menara</h1>
          <p className="text-slate-400 mt-2">Lihat lokasi semua menara BTS yang telah dicatat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden h-[500px]">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                </div>
              ) : sites.length > 0 ? (
                <MapView sites={sites} selectedSite={selectedSite} onSelectSite={setSelectedSite} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <p>Belum ada data menara untuk ditampilkan</p>
                </div>
              )}
            </div>
          </div>

          {/* Sites List Sidebar */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 h-[500px] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Daftar Menara ({sites.length})</h2>
            <div className="space-y-3">
              {sites.map(site => (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedSite?.id === site.id
                      ? 'bg-cyan-500/20 border border-cyan-500/50'
                      : 'bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50'
                  }`}
                >
                  <h3 className="font-semibold text-white text-sm">{site.nama_site}</h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{site.alamat_site}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-slate-600/50 text-slate-300 px-2 py-1 rounded">
                      {site.lokasi}
                    </span>
                    <a
                      href={`https://maps.google.com/?q=${site.koordinat_site.lat},${site.koordinat_site.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Site Details */}
        {selectedSite && (
          <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-700/50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">{selectedSite.nama_site}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Alamat</p>
                <p className="text-white font-medium">{selectedSite.alamat_site}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Koordinat</p>
                <p className="text-white font-medium">
                  {selectedSite.koordinat_site.lat.toFixed(6)}, {selectedSite.koordinat_site.lng.toFixed(6)}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Lokasi</p>
                <p className="text-white font-medium">{selectedSite.lokasi}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Tanggal Checklist</p>
                <p className="text-white font-medium">
                  {new Date(selectedSite.tanggal_checklist).toLocaleDateString('id-ID')}
                </p>
              </div>
              <div className="md:col-span-2">
                <a
                  href={`https://maps.google.com/?q=${selectedSite.koordinat_site.lat},${selectedSite.koordinat_site.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function MapView({ sites, selectedSite, onSelectSite }: { sites: Site[]; selectedSite: Site | null; onSelectSite: (site: Site) => void }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 500"
      className="bg-gradient-to-br from-slate-700 to-slate-800"
    >
      {/* Background grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="1200" height="500" fill="url(#grid)" />

      {/* Sites markers */}
      {sites.map((site, idx) => {
        const x = 100 + (idx % 3) * 300 + Math.random() * 100;
        const y = 100 + Math.floor(idx / 3) * 150 + Math.random() * 100;
        const isSelected = selectedSite?.id === site.id;

        return (
          <g key={site.id}>
            {/* Marker circle */}
            <circle
              cx={x}
              cy={y}
              r={isSelected ? 20 : 15}
              fill={isSelected ? '#06b6d4' : '#3b82f6'}
              opacity={isSelected ? 1 : 0.7}
              className="cursor-pointer hover:opacity-100 transition-all"
              onClick={() => onSelectSite(site)}
            />
            {/* Inner circle */}
            <circle
              cx={x}
              cy={y}
              r={isSelected ? 10 : 7}
              fill="white"
              onClick={() => onSelectSite(site)}
              className="cursor-pointer"
            />
            {/* Label */}
            <text
              x={x}
              y={y + 30}
              textAnchor="middle"
              className="text-xs fill-white font-semibold cursor-pointer"
              onClick={() => onSelectSite(site)}
            >
              {site.nama_site}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(20, 20)">
        <rect width="200" height="80" fill="rgba(15, 23, 42, 0.8)" stroke="#475569" strokeWidth="1" rx="8" />
        <text x="10" y="25" className="text-sm fill-white font-semibold">
          Lokasi Menara BTS
        </text>
        <circle cx="20" cy="50" r="6" fill="#3b82f6" />
        <text x="35" y="55" className="text-xs fill-slate-300">
          Menara
        </text>
        <circle cx="20" cy="70" r="6" fill="#06b6d4" />
        <text x="35" y="75" className="text-xs fill-slate-300">
          Terpilih
        </text>
      </g>
    </svg>
  );
}
