import { useState } from 'react';
import { supabase, Site, ChecklistItem } from '@/lib/supabase';
import Layout from '@/components/Layout';
import { Save, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const LOKASI_OPTIONS = ['P', 'K', 'S', 'PK', 'JU', 'JL', 'JT'];

const CHECKLIST_ITEMS = [
  { nomor: 1, material: 'Busbar', spesifikasi: 'Upper, Lower, Middle' },
  { nomor: 2, material: 'Cadwel di tiap kaki tower', spesifikasi: '' },
  { nomor: 3, material: 'Lampu', spesifikasi: 'OBL, Taman, Penerangan BTS' },
  { nomor: 4, material: 'Box KWH', spesifikasi: '' },
  { nomor: 5, material: 'Box ACPDL', spesifikasi: '' },
  { nomor: 6, material: 'Box ABL', spesifikasi: '' },
  { nomor: 7, material: 'Tangga naik tower', spesifikasi: '' },
  { nomor: 8, material: 'Horizontal Tray', spesifikasi: '' },
  { nomor: 9, material: 'Tower', spesifikasi: '' },
  { nomor: 10, material: 'Grounding', spesifikasi: '' },
  { nomor: 11, material: 'Jumlah Shelter', spesifikasi: '' },
  { nomor: 12, material: 'Menara yang digunakan', spesifikasi: '' },
  { nomor: 13, material: 'Self Spotting, Microcel, Kamuflase', spesifikasi: '' },
];

export default function DataEntry() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    nomor_urut: '',
    nama_site: '',
    alamat_site: '',
    lat: '',
    lng: '',
    tanggal_checklist: new Date().toISOString().split('T')[0],
    lokasi: 'P',
  });

  const [checklistData, setChecklistData] = useState<any[]>(
    CHECKLIST_ITEMS.map(item => ({
      ...item,
      kondisi: 'baik',
      keterangan: '',
    }))
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (index: number, field: string, value: string) => {
    setChecklistData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nomor_urut || !formData.nama_site || !formData.alamat_site || !formData.lat || !formData.lng) {
      setMessage('Semua field site harus diisi');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      // Insert site
      const { data: siteData, error: siteError } = await supabase
        .from('sites')
        .insert([{
          nomor_urut: parseInt(formData.nomor_urut),
          nama_site: formData.nama_site,
          alamat_site: formData.alamat_site,
          koordinat_site: { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) },
          tanggal_checklist: formData.tanggal_checklist,
          lokasi: formData.lokasi,
        }])
        .select()
        .single();

      if (siteError) throw siteError;

      // Insert checklist items
      const checklistPayload = checklistData.map(item => ({
        site_id: siteData.id,
        nomor_item: item.nomor,
        material: item.material,
        spesifikasi: item.spesifikasi,
        kondisi: item.kondisi,
        keterangan: item.keterangan,
      }));

      const { error: checklistError } = await supabase
        .from('checklist_items')
        .insert(checklistPayload);

      if (checklistError) throw checklistError;

      setMessage('✓ Data berhasil disimpan!');
      
      // Reset form
      setTimeout(() => {
        setFormData({
          nomor_urut: '',
          nama_site: '',
          alamat_site: '',
          lat: '',
          lng: '',
          tanggal_checklist: new Date().toISOString().split('T')[0],
          lokasi: 'P',
        });
        setChecklistData(CHECKLIST_ITEMS.map(item => ({
          ...item,
          kondisi: 'baik',
          keterangan: '',
        })));
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('✗ Gagal menyimpan data. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Input Data Menara</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Masukkan detail menara dan checklist kondisi perangkat</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Site Details Section */}
          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 rounded-lg p-6 shadow-sm dark:shadow-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Detail Menara</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nomor Urut *</label>
                <input
                  type="number"
                  value={formData.nomor_urut}
                  onChange={(e) => handleFormChange('nomor_urut', e.target.value)}
                  placeholder="Contoh: 1, 2, 3..."
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nama Site *</label>
                <input
                  type="text"
                  value={formData.nama_site}
                  onChange={(e) => handleFormChange('nama_site', e.target.value)}
                  placeholder="Contoh: PT PROTELINDO"
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Lokasi *</label>
                <select
                  value={formData.lokasi}
                  onChange={(e) => handleFormChange('lokasi', e.target.value)}
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                >
                  {LOKASI_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Alamat Site *</label>
                <textarea
                  value={formData.alamat_site}
                  onChange={(e) => handleFormChange('alamat_site', e.target.value)}
                  placeholder="Masukkan alamat lengkap menara"
                  rows={2}
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Latitude *</label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.lat}
                  onChange={(e) => handleFormChange('lat', e.target.value)}
                  placeholder="Contoh: -6.2088"
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Longitude *</label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.lng}
                  onChange={(e) => handleFormChange('lng', e.target.value)}
                  placeholder="Contoh: 106.8456"
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tanggal Checklist *</label>
                <input
                  type="date"
                  value={formData.tanggal_checklist}
                  onChange={(e) => handleFormChange('tanggal_checklist', e.target.value)}
                  className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Checklist Section */}
          <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 rounded-lg p-6 shadow-sm dark:shadow-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Checklist Perangkat</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-200 dark:border-slate-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Material</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Spesifikasi</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Kondisi</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistData.map((item, index) => (
                    <tr key={index} className="border-b border-blue-100 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 text-sm">{item.nomor}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 text-sm font-medium">{item.material}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-sm">{item.spesifikasi}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.kondisi}
                          onChange={(e) => handleChecklistChange(index, 'kondisi', e.target.value)}
                          className="bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded px-2 py-1 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                        >
                          <option value="baik">Baik</option>
                          <option value="sedang">Sedang</option>
                          <option value="buruk">Buruk</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.keterangan}
                          onChange={(e) => handleChecklistChange(index, 'keterangan', e.target.value)}
                          placeholder="Catatan..."
                          className="w-full bg-blue-50 dark:bg-slate-700/50 border border-blue-200 dark:border-slate-600 rounded px-2 py-1 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 transition-all"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${message.startsWith('✓') ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50'}`}>
              <AlertCircle className="w-5 h-5" />
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl dark:shadow-blue-900/30 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
