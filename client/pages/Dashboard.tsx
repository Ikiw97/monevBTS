import { useEffect, useState } from 'react';
import { supabase, Site, ChecklistItem } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { ArrowRight, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

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
        <StatsGrid stats={stats} />

        {/* Recent Sites */}
        <RecentSitesSection sites={sites} loading={loading} />
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
    <div className={`${color} border rounded-lg p-4 shadow-sm dark:shadow-none`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{value}</p>
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
