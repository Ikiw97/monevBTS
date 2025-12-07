import { useEffect, useState, useRef } from 'react';
import { supabase, Site } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { ExternalLink } from 'lucide-react';
import L from 'leaflet';
import { useTheme } from '@/context/ThemeContext';

export default function Map() {
  const { theme } = useTheme();
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchNomor, setSearchNomor] = useState('');

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
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Peta Menara</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Lihat lokasi semua menara BTS yang telah dicatat</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 rounded-lg overflow-hidden h-[500px] shadow-sm dark:shadow-none">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-cyan-500"></div>
                </div>
              ) : sites.length > 0 ? (
                <MapView sites={sites} selectedSite={selectedSite} onSelectSite={setSelectedSite} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <p>Belum ada data menara untuk ditampilkan</p>
                </div>
              )}
            </div>
          </div>

          {/* Sites List Sidebar */}
          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 rounded-lg p-6 h-[500px] overflow-y-auto shadow-sm dark:shadow-none">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Daftar Menara ({sites.length})</h2>
              <input
                type="number"
                placeholder="Cari nomor urut..."
                value={searchNomor}
                onChange={(e) => setSearchNomor(e.target.value)}
                className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-3">
              {sites
                .filter(site => !searchNomor || site.nomor_urut.toString() === searchNomor)
                .map(site => (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedSite?.id === site.id
                      ? 'bg-cyan-500/20 border border-cyan-500/50'
                      : 'bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-cyan-600/30 text-cyan-400 px-2 py-1 rounded font-semibold">
                      #{site.nomor_urut}
                    </span>
                  </div>
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
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedSite.nama_site}</h3>
                <p className="text-cyan-400 text-sm font-medium">Nomor Urut: #{selectedSite.nomor_urut}</p>
              </div>
            </div>
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
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainer.current || sites.length === 0) return;

    // Initialize map
    const mapInstance = L.map(mapContainer.current, {
      center: [sites[0].koordinat_site.lat, sites[0].koordinat_site.lng],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance);

    map.current = mapInstance;

    // Add markers for each site
    sites.forEach(site => {
      const isSelected = selectedSite?.id === site.id;

      const icon = L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: ${isSelected ? '#06b6d4' : '#3b82f6'};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            cursor: pointer;
          ">
            <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [40, 40],
        className: 'custom-marker',
      });

      const marker = L.marker([site.koordinat_site.lat, site.koordinat_site.lng], {
        icon: icon,
      })
        .addTo(mapInstance)
        .on('click', () => {
          onSelectSite(site);
        });

      markersRef.current[site.id] = marker;
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [sites]);

  // Update marker icons when selection changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([siteId, marker]) => {
      const site = sites.find(s => s.id === siteId);
      if (!site) return;

      const isSelected = selectedSite?.id === siteId;
      const icon = L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: ${isSelected ? '#06b6d4' : '#3b82f6'};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            cursor: pointer;
          ">
            <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [40, 40],
        className: 'custom-marker',
      });
      marker.setIcon(icon);
    });
  }, [selectedSite, sites]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}
