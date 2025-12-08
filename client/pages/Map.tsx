import { useEffect, useState, useRef } from "react";
import { supabase, Site } from "@/lib/supabase";
import Layout from "@/components/Layout";
import { ExternalLink } from "lucide-react";
import L from "leaflet";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Map() {
  const { theme } = useTheme();
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchNomor, setSearchNomor] = useState("");

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const { data, error } = await supabase
        .from("sites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSites(data || []);
    } catch (error) {
      console.error("Error fetching sites:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Peta Menara
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Lihat lokasi semua menara BTS yang telah dicatat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden h-[500px] shadow-md">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-cyan-500"
                  />
                </div>
              ) : sites.length > 0 ? (
                <MapView
                  sites={sites}
                  selectedSite={selectedSite}
                  onSelectSite={setSelectedSite}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <p>Belum ada data menara untuk ditampilkan</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sites List Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 h-[500px] overflow-y-auto shadow-md"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                Daftar Menara ({sites.length})
              </h2>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                placeholder="Cari nomor urut..."
                value={searchNomor}
                onChange={(e) => setSearchNomor(e.target.value)}
                className="w-full bg-blue-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all text-sm"
              />
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="space-y-3"
            >
              {sites
                .filter(
                  (site) =>
                    !searchNomor || site.nomor_urut.toString() === searchNomor,
                )
                .map((site) => (
                  <motion.div
                    key={site.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    onClick={() => setSelectedSite(site)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedSite?.id === site.id
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-blue-100 dark:bg-slate-700 hover:bg-blue-200 dark:hover:bg-slate-600 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded font-semibold"
                      >
                        #{site.nomor_urut}
                      </motion.span>
                    </div>
                    <h3
                      className={`font-semibold text-sm ${
                        selectedSite?.id === site.id
                          ? "text-white"
                          : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {site.nama_site}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        selectedSite?.id === site.id
                          ? "text-blue-50"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {site.alamat_site}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          selectedSite?.id === site.id
                            ? "bg-blue-400 text-blue-900"
                            : "bg-blue-200 dark:bg-slate-600 text-blue-700 dark:text-slate-300"
                        }`}
                      >
                        {site.lokasi}
                      </span>
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        href={`https://www.openstreetmap.org/?mlat=${site.koordinat_site.lat}&mlon=${site.koordinat_site.lng}&zoom=15`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${
                          selectedSite?.id === site.id
                            ? "text-white hover:text-blue-50"
                            : "text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Site Details */}
        <AnimatePresence>
          {selectedSite && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-cyan-600 rounded-lg p-6 shadow-md text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedSite.nama_site}
                  </h3>
                  <p className="text-blue-100 text-sm font-medium">
                    Nomor Urut: #{selectedSite.nomor_urut}
                  </p>
                </div>
              </div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <DetailItem label="Alamat" value={selectedSite.alamat_site} />
                <DetailItem
                  label="Koordinat"
                  value={`${selectedSite.koordinat_site.lat.toFixed(6)}, ${selectedSite.koordinat_site.lng.toFixed(6)}`}
                />
                <DetailItem label="Lokasi" value={selectedSite.lokasi} />
                <DetailItem
                  label="Tanggal Checklist"
                  value={new Date(
                    selectedSite.tanggal_checklist,
                  ).toLocaleDateString("id-ID")}
                />
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="md:col-span-2"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://www.openstreetmap.org/?mlat=${selectedSite.koordinat_site.lat}&mlon=${selectedSite.koordinat_site.lng}&zoom=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Buka di Peta
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <p className="text-blue-100 text-sm mb-1">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </motion.div>
  );
}

function MapView({
  sites,
  selectedSite,
  onSelectSite,
}: {
  sites: Site[];
  selectedSite: Site | null;
  onSelectSite: (site: Site) => void;
}) {
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
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance);

    map.current = mapInstance;

    // Add markers for each site with pulse animation
    sites.forEach((site) => {
      const isSelected = selectedSite?.id === site.id;

      const icon = L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: ${isSelected ? "#06b6d4" : "#3b82f6"};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            cursor: pointer;
            animation: ${isSelected ? 'pulse 2s infinite' : 'none'};
          ">
            <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        `,
        iconSize: [40, 40],
        className: "custom-marker",
      });

      const marker = L.marker(
        [site.koordinat_site.lat, site.koordinat_site.lng],
        {
          icon: icon,
        },
      )
        .addTo(mapInstance)
        .on("click", () => {
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
      const site = sites.find((s) => s.id === siteId);
      if (!site) return;

      const isSelected = selectedSite?.id === siteId;
      const icon = L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: ${isSelected ? "#06b6d4" : "#3b82f6"};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            cursor: pointer;
            animation: ${isSelected ? 'pulse 2s infinite' : 'none'};
          ">
            <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        `,
        iconSize: [40, 40],
        className: "custom-marker",
      });
      marker.setIcon(icon);
    });
  }, [selectedSite, sites]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
