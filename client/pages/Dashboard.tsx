import { useEffect, useState } from 'react';
import { supabase, Site, ChecklistItem } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { ArrowRight, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

export default function Dashboard() {
  const { theme } = useTheme();
  const [sites, setSites] = useState<Site[]>([]);
  const [stats, setStats] = useState({ total: 0, baik: 0, sedang: 0, buruk: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data: sitesData, error: sitesError } = await supabase
        .from('sites')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (sitesError) throw sitesError;
      setSites(sitesData || []);

      // Calculate stats
      const { data: checklistData } = await supabase
        .from('checklist_items')
        .select('kondisi');

      if (checklistData) {
        const statsData = {
          total: checklistData.length,
          baik: checklistData.filter(item => item.kondisi === 'baik').length,
          sedang: checklistData.filter(item => item.kondisi === 'sedang').length,
          buruk: checklistData.filter(item => item.kondisi === 'buruk').length,
        };
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getConditionColor = (kondisi: string) => {
    switch (kondisi) {
      case 'baik':
        return 'bg-green-500/20 text-green-400';
      case 'sedang':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'buruk':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Monitoring dan evaluasi menara BTS</p>
          </div>
          <Link
            to="/data-entry"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl dark:shadow-blue-900/30"
          >
            <Plus className="w-5 h-5" />
            Input Data Baru
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Checklist"
            value={stats.total}
            icon={<AlertCircle className="w-8 h-8" />}
            color="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            label="Kondisi Baik"
            value={stats.baik}
            icon={<CheckCircle className="w-8 h-8" />}
            color="bg-green-500/10 text-green-400"
          />
          <StatCard
            label="Kondisi Sedang"
            value={stats.sedang}
            icon={<AlertTriangle className="w-8 h-8" />}
            color="bg-yellow-500/10 text-yellow-400"
          />
          <StatCard
            label="Kondisi Buruk"
            value={stats.buruk}
            icon={<AlertCircle className="w-8 h-8" />}
            color="bg-red-500/10 text-red-400"
          />
        </div>

        {/* Recent Sites */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Data Menara Terbaru</h2>
            <Link to="/map" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors">
              Lihat Peta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : sites.length > 0 ? (
            <div className="space-y-4">
              {sites.map((site) => (
                <div key={site.id} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 bg-cyan-600/30 text-cyan-400 text-xs rounded font-semibold">
                          #{site.nomor_urut}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{site.nama_site}</h3>
                      <p className="text-slate-400 text-sm mt-1">{site.alamat_site}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-slate-600/50 text-slate-300 text-xs rounded">
                          Lokasi: {site.lokasi}
                        </span>
                        <span className="px-2 py-1 bg-slate-600/50 text-slate-300 text-xs rounded">
                          {new Date(site.tanggal_checklist).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://maps.google.com/?q=${site.koordinat_site.lat},${site.koordinat_site.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg text-sm font-medium transition-colors"
                      >
                        Lihat Lokasi
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">Belum ada data menara.</p>
              <Link to="/data-entry" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Mulai input data
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`${color} border border-slate-700/50 rounded-lg p-4`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="opacity-50">{icon}</div>
      </div>
    </div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
