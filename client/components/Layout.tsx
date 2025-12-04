import { Link } from 'react-router-dom';
import { MapPin, BarChart3, Plus } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Monitorin BTS</h1>
                <p className="text-xs text-slate-400">Menara & Evaluasi</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/data-entry"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Input Data
              </Link>
              <Link
                to="/map"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Peta Menara
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <details className="group">
                <summary className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </summary>
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-2">
                  <Link to="/" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/data-entry" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    Input Data
                  </Link>
                  <Link to="/map" className="block px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    Peta Menara
                  </Link>
                </div>
              </details>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Tentang</h3>
              <p className="text-slate-400 text-sm">Sistem monitoring dan evaluasi menara BTS untuk memastikan kualitas infrastruktur telekomunikasi.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Fitur</h3>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Input data menara</li>
                <li>Peta monitoring</li>
                <li>Dashboard analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Kontak</h3>
              <p className="text-slate-400 text-sm">Untuk dukungan teknis hubungi tim infrastruktur kami.</p>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8">
            <p className="text-slate-500 text-sm text-center">© 2025 Monitorin BTS. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
