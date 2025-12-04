import { useEffect, useState, useRef } from 'react';
import { supabase, Site } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { ExternalLink } from 'lucide-react';
import maplibregl from 'maplibre-gl';

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
                      href={`https://www.openstreetmap.org/?mlat=${site.koordinat_site.lat}&mlon=${site.koordinat_site.lng}&zoom=15`}
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
                  href={`https://www.openstreetmap.org/?mlat=${selectedSite.koordinat_site.lat}&mlon=${selectedSite.koordinat_site.lng}&zoom=15`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Buka di Peta
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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: maplibregl.Marker }>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${maptilerKey}`,
      center: sites.length > 0 ? [sites[0].koordinat_site.lng, sites[0].koordinat_site.lat] : [106.8456, -6.2088],
      zoom: 10,
    });

    map.current.on('load', () => {
      // Add markers for each site
      sites.forEach(site => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.cursor = 'pointer';

        const isSelected = selectedSite?.id === site.id;
        el.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            background: ${isSelected ? '#06b6d4' : '#3b82f6'};
            border: 2px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            transition: all 0.2s;
          ">
            <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
          </div>
        `;

        el.addEventListener('click', () => {
          onSelectSite(site);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([site.koordinat_site.lng, site.koordinat_site.lat])
          .addTo(map.current!);

        markersRef.current[site.id] = marker;
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [sites]);

  // Update marker style when selection changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([siteId, marker]) => {
      const isSelected = selectedSite?.id === siteId;
      const el = marker.getElement();
      if (el && el.firstChild) {
        (el.firstChild as HTMLDivElement).style.background = isSelected ? '#06b6d4' : '#3b82f6';
      }
    });
  }, [selectedSite]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}
