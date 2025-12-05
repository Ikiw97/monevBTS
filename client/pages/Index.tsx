import { Link } from 'react-router-dom';
import { MapPin, BarChart3, CheckCircle, AlertCircle, Zap, Users, TrendingUp } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Monitorin BTS</h1>
                <p className="text-xs text-slate-400">Diskominfo Purwakarta</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <a href="#fitur" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Fitur
              </a>
              <a href="#tentang" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Tentang
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Monitoring & Evaluasi
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Menara BTS
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Sistem manajemen infrastruktur telekomunikasi terintegrasi untuk Dinas Komunikasi, Informatika, dan Statistik Kabupaten Purwakarta
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <BarChart3 className="w-5 h-5" />
                Buka Dashboard
              </Link>
              <Link
                to="/data-entry"
                className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-all"
              >
                <Zap className="w-5 h-5" />
                Input Data
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatBox number="13" label="Item Monitoring" />
          <StatBox number="100%" label="Coverage Area" />
          <StatBox number="Real-time" label="Data Updates" />
          <StatBox number="24/7" label="System Monitoring" />
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center mb-16">Fitur Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12 text-cyan-400" />}
            title="Dashboard Analytics"
            description="Visualisasi data real-time dengan statistik kondisi menara dan pencapaian monitoring"
          />
          <FeatureCard
            icon={<MapPin className="w-12 h-12 text-cyan-400" />}
            title="Peta Interaktif"
            description="Lihat lokasi semua menara BTS di peta dengan zoom, pan, dan filter pencarian"
          />
          <FeatureCard
            icon={<CheckCircle className="w-12 h-12 text-cyan-400" />}
            title="Input Data Terstruktur"
            description="Form checklist lengkap dengan 13 item monitoring kondisi menara per lokasi"
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12 text-cyan-400" />}
            title="Tracking Status"
            description="Pantau kondisi menara (Baik, Sedang, Buruk) dengan riwayat perubahan"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-cyan-400" />}
            title="Multi-lokasi"
            description="Kelola menara di berbagai lokasi dengan identifikasi unik nomor urut"
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-cyan-400" />}
            title="Database Terpadu"
            description="Penyimpanan data terpusat dengan keamanan dan integritas data terjamin"
          />
        </div>
      </section>

      {/* Item Monitoring Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-800/50 rounded-lg border border-slate-700/50 my-20">
        <h3 className="text-4xl font-bold text-center mb-16">13 Item Monitoring Menara</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { no: 1, item: 'Busbar (Upper, Lower, Middle)' },
            { no: 2, item: 'Cadwel di tiap kaki tower' },
            { no: 3, item: 'Lampu (OBL, Taman, Penerangan BTS)' },
            { no: 4, item: 'Box KWH' },
            { no: 5, item: 'Box ACPDL' },
            { no: 6, item: 'Box ABL' },
            { no: 7, item: 'Tangga naik tower' },
            { no: 8, item: 'Horizontal Tray' },
            { no: 9, item: 'Tower' },
            { no: 10, item: 'Grounding' },
            { no: 11, item: 'Jumlah Shelter' },
            { no: 12, item: 'Menara yang digunakan' },
            { no: 13, item: 'Self Spotting, Microcel, Kamuflase' },
          ].map((item) => (
            <div key={item.no} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold text-lg min-w-[2rem]">{item.no}.</span>
                <span className="text-slate-200">{item.item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tentang Section */}
      <section id="tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6">Tentang Sistem</h3>
            <p className="text-slate-300 text-lg mb-4">
              Monitorin BTS adalah platform terintegrasi yang dikembangkan oleh <strong>Dinas Komunikasi, Informatika, dan Statistik Kabupaten Purwakarta</strong> untuk meningkatkan efisiensi monitoring dan evaluasi infrastruktur menara Base Transceiver Station (BTS).
            </p>
            <p className="text-slate-300 text-lg mb-4">
              Sistem ini memungkinkan pengelola dan teknisi untuk:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Mencatat dan mengelola data menara secara terstruktur</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Memantau kondisi perangkat dan komponen menara</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Visualisasi lokasi menara di peta interaktif</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Menghasilkan laporan dan statistik monitoring</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg blur-xl"></div>
            <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-cyan-400 font-bold text-sm mb-2">DINAS KOMUNIKASI, INFORMATIKA, DAN STATISTIK</h4>
                  <p className="text-slate-300">Kabupaten Purwakarta</p>
                </div>
                <div className="border-t border-slate-600 pt-6">
                  <p className="text-slate-400 text-sm">
                    Sistem ini dibangun dengan teknologi modern untuk mendukung transformasi digital dan peningkatan kualitas layanan infrastruktur telekomunikasi di Kabupaten Purwakarta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/50 rounded-lg p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Siap Mulai?</h3>
          <p className="text-slate-300 mb-8 text-lg">
            Akses dashboard untuk memulai monitoring menara BTS Anda sekarang
          </p>
          <Link
            to="/data-entry"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <Zap className="w-5 h-5" />
            Masuk ke Sistem
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Tentang Sistem</h4>
              <p className="text-slate-400 text-sm">
                Platform monitoring dan evaluasi infrastruktur menara BTS untuk Kabupaten Purwakarta
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Fitur Utama</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Dashboard Analytics</li>
                <li>Peta Interaktif</li>
                <li>Input Data Terstruktur</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kontak</h4>
              <p className="text-slate-400 text-sm">
                Dinas Komunikasi, Informatika, dan Statistik<br />
                Kabupaten Purwakarta
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8">
            <p className="text-slate-500 text-sm text-center">© 2025 Monitorin BTS. Sistem Manajemen Menara BTS Kabupaten Purwakarta.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
      <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">{number}</p>
      <p className="text-slate-400 text-sm mt-2">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 hover:border-cyan-500/50 transition-colors group">
      <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}
