import { Link } from 'react-router-dom';
import { MapPin, BarChart3, CheckCircle, AlertCircle, Zap, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white">
      {/* Header Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-0 z-40 border-b border-blue-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.div
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold">Monitorin BTS</h1>
                <p className="text-xs text-slate-400">Diskominfo Purwakarta</p>
              </div>
            </motion.div>
            <nav className="hidden md:flex items-center gap-1">
              <motion.a
                href="#fitur"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fitur
              </motion.a>
              <motion.a
                href="#tentang"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tentang
              </motion.a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-slate-900 dark:text-white"
            >
              Monitoring & Evaluasi
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
              >
                Menara BTS
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
            >
              Sistem manajemen infrastruktur telekomunikasi terintegrasi untuk Dinas Komunikasi, Informatika, dan Statistik Kabupaten Purwakarta
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-cyan-600 hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-700 dark:hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 dark:shadow-cyan-500/20 hover:shadow-xl hover:shadow-blue-600/40 dark:hover:shadow-cyan-500/30"
                >
                  <BarChart3 className="w-5 h-5" />
                  Buka Dashboard
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/data-entry"
                  className="inline-flex items-center justify-center gap-2 bg-blue-100 dark:bg-slate-700 hover:bg-blue-200 dark:hover:bg-slate-600 text-blue-900 dark:text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-md shadow-blue-300/40 dark:shadow-none"
                >
                  <Zap className="w-5 h-5" />
                  Input Data
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatBox number="13" label="Item Monitoring" />
          <StatBox number="100%" label="Coverage Area" />
          <StatBox number="Real-time" label="Data Updates" />
          <StatBox number="24/7" label="System Monitoring" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white"
        >
          Fitur Utama
        </motion.h3>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<BarChart3 className="w-12 h-12 text-blue-600 dark:text-cyan-400" />}
            title="Dashboard Analytics"
            description="Visualisasi data real-time dengan statistik kondisi menara dan pencapaian monitoring"
          />
          <FeatureCard
            icon={<MapPin className="w-12 h-12 text-blue-600 dark:text-cyan-400" />}
            title="Peta Interaktif"
            description="Lihat lokasi semua menara BTS di peta dengan zoom, pan, dan filter pencarian"
          />
          <FeatureCard
            icon={<CheckCircle className="w-12 h-12 text-blue-600 dark:text-cyan-400" />}
            title="Input Data Terstruktur"
            description="Form checklist lengkap dengan 13 item monitoring kondisi menara per lokasi"
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12 text-blue-600 dark:text-cyan-400" />}
            title="Tracking Status"
            description="Pantau kondisi menara (Baik, Sedang, Buruk) dengan riwayat perubahan"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-blue-600 dark:text-cyan-400" />}
            title="Multi-lokasi"
            description="Kelola menara di berbagai lokasi dengan identifikasi unik nomor urut"
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-blue-600 dark:text-cyan-400" />}
            title="Database Terpadu"
            description="Penyimpanan data terpusat dengan keamanan dan integritas data terjamin"
          />
        </motion.div>
      </section>

      {/* Tentang Section */}
      <section id="tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Tentang Sistem</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
              Monitorin BTS adalah platform terintegrasi yang dikembangkan oleh <strong>Dinas Komunikasi, Informatika, dan Statistik Kabupaten Purwakarta</strong> untuk meningkatkan efisiensi monitoring dan evaluasi infrastruktur menara Base Transceiver Station (BTS).
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
              Sistem ini memungkinkan pengelola dan teknisi untuk:
            </p>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-3"
            >
              <ChecklistItem text="Mencatat dan mengelola data menara secara terstruktur" />
              <ChecklistItem text="Memantau kondisi perangkat dan komponen menara" />
              <ChecklistItem text="Visualisasi lokasi menara di peta interaktif" />
              <ChecklistItem text="Menghasilkan laporan dan statistik monitoring" />
            </motion.ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 dark:from-blue-500/20 to-blue-300/20 dark:to-cyan-500/20 rounded-lg blur-xl"></div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 rounded-lg p-8 shadow-lg shadow-blue-200/50 dark:shadow-none"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-blue-700 dark:text-cyan-400 font-bold text-sm mb-2">DINAS KOMUNIKASI, INFORMATIKA, DAN STATISTIK</h4>
                  <p className="text-slate-600 dark:text-slate-300">Kabupaten Purwakarta</p>
                </div>
                <div className="border-t border-blue-200 dark:border-slate-600 pt-6">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Sistem ini dibangun dengan teknologi modern untuk mendukung transformasi digital dan peningkatan kualitas layanan infrastruktur telekomunikasi di Kabupaten Purwakarta.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-600/20 dark:to-cyan-600/20 border border-blue-300 dark:border-blue-500/50 rounded-lg p-12 text-center shadow-lg shadow-blue-300/50 dark:shadow-none"
        >
          <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Siap Mulai?</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
            Akses dashboard untuk memulai monitoring menara BTS Anda sekarang
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-cyan-600 hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-700 dark:hover:to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/30 dark:shadow-cyan-500/20 hover:shadow-xl hover:shadow-blue-600/40 dark:hover:shadow-cyan-500/30"
            >
              <BarChart3 className="w-5 h-5" />
              Masuk ke Sistem
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-blue-200 dark:border-slate-700/50 bg-blue-50 dark:bg-slate-900/50 mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Tentang Sistem</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Platform monitoring dan evaluasi infrastruktur menara BTS untuk Kabupaten Purwakarta
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Fitur Utama</h4>
              <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-2">
                <li>Dashboard Analytics</li>
                <li>Peta Interaktif</li>
                <li>Input Data Terstruktur</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Kontak</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Dinas Komunikasi, Informatika, dan Statistik<br />
                Kabupaten Purwakarta
              </p>
            </div>
          </div>
          <div className="border-t border-blue-200 dark:border-slate-700/50 pt-8">
            <p className="text-slate-500 dark:text-slate-500 text-sm text-center">© 2025 Monitorin BTS. Sistem Manajemen Menara BTS Kabupaten Purwakarta.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

function StatBox({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-600/10 dark:to-cyan-600/10 border border-blue-200 dark:border-blue-500/30 rounded-lg p-6 text-center hover:border-blue-300 dark:hover:border-cyan-500/50 transition-colors shadow-md shadow-blue-200/50 dark:shadow-none"
    >
      <motion.p
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text"
      >
        {number}
      </motion.p>
      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{label}</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 rounded-lg p-8 hover:border-blue-400 dark:hover:border-cyan-500/50 transition-colors group shadow-md shadow-blue-200/40 dark:shadow-none"
    >
      <motion.div
        className="mb-4"
        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h4>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex items-center gap-3"
    >
      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
      <span className="text-slate-600 dark:text-slate-300">{text}</span>
    </motion.li>
  );
}
