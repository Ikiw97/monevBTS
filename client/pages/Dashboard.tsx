import { useEffect, useState } from "react";
import { supabase, Site, ChecklistItem } from "@/lib/supabase";
import Layout from "@/components/Layout";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { theme } = useTheme();
  const [sites, setSites] = useState<Site[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    baik: 0,
    sedang: 0,
    buruk: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: sitesData, error: sitesError } = await supabase
        .from("sites")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (sitesError) throw sitesError;
      setSites(sitesData || []);

      // Calculate stats
      const { data: checklistData } = await supabase
        .from("checklist_items")
        .select("kondisi");

      if (checklistData) {
        const statsData = {
          total: checklistData.length,
          baik: checklistData.filter((item) => item.kondisi === "baik").length,
          sedang: checklistData.filter((item) => item.kondisi === "sedang")
            .length,
          buruk: checklistData.filter((item) => item.kondisi === "buruk")
            .length,
        };
        setStats(statsData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConditionColor = (kondisi: string) => {
    switch (kondisi) {
      case "baik":
        return "bg-green-500/20 text-green-400";
      case "sedang":
        return "bg-yellow-500/20 text-yellow-400";
      case "buruk":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Monitoring dan evaluasi menara BTS
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/data-entry"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl dark:shadow-blue-900/30"
            >
              <Plus className="w-5 h-5" />
              Input Data Baru
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
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
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatCard
            label="Total Checklist"
            value={stats.total}
            icon={<AlertCircle className="w-8 h-8" />}
            color="bg-blue-500 text-white"
            delay={0}
          />
          <StatCard
            label="Kondisi Baik"
            value={stats.baik}
            icon={<CheckCircle className="w-8 h-8" />}
            color="bg-green-500 text-white"
            delay={0.1}
          />
          <StatCard
            label="Kondisi Sedang"
            value={stats.sedang}
            icon={<AlertTriangle className="w-8 h-8" />}
            color="bg-yellow-500 text-white"
            delay={0.2}
          />
          <StatCard
            label="Kondisi Buruk"
            value={stats.buruk}
            icon={<AlertCircle className="w-8 h-8" />}
            color="bg-red-500 text-white"
            delay={0.3}
          />
        </motion.div>

        {/* Recent Sites */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md dark:shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Data Menara Terbaru
            </h2>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                to="/map"
                className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-2 transition-colors"
              >
                Lihat Peta
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-cyan-500"
              />
            </div>
          ) : sites.length > 0 ? (
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
              className="space-y-4"
            >
              {sites.map((site, index) => (
                <motion.div
                  key={site.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-blue-100 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="px-2 py-1 bg-blue-600 text-white text-xs rounded font-semibold"
                        >
                          #{site.nomor_urut}
                        </motion.span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {site.nama_site}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                        {site.alamat_site}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-blue-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs rounded">
                          Lokasi: {site.lokasi}
                        </span>
                        <span className="px-2 py-1 bg-blue-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs rounded">
                          {new Date(site.tanggal_checklist).toLocaleDateString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://maps.google.com/?q=${site.koordinat_site.lat},${site.koordinat_site.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                      >
                        Lihat Lokasi
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Belum ada data menara.
              </p>
              <Link
                to="/data-entry"
                className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors"
              >
                Mulai input data
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`${color} rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="opacity-80 text-sm font-medium">{label}</p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: delay + 0.2 }}
            className="text-3xl font-bold mt-2"
          >
            {value}
          </motion.p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="opacity-50"
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
