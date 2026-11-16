import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { CITIES } from '../data/categories';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, sub?: string) => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hidden Places',
    city: 'Jakarta',
    area: '',
    priceRange: '',
    description: '',
    instagram: '',
    submitterName: '',
    submitterEmail: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Nama tempat atau aktivitas wajib diisi';
    if (!formData.area.trim()) errs.area = 'Area/kecamatan wajib diisi (cth: Blok M, Dago)';
    if (!formData.description.trim() || formData.description.length < 20) {
      errs.description = 'Ceritakan keunikan tempat ini minimal 20 karakter';
    }
    if (!formData.submitterName.trim()) errs.submitterName = 'Nama kamu wajib diisi';
    if (!formData.submitterEmail.trim() || !formData.submitterEmail.includes('@')) {
      errs.submitterEmail = 'Masukkan email valid';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save to user submissions in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('sisip_user_submissions') || '[]');
      const newSubmission = {
        ...formData,
        id: `sub-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };
      localStorage.setItem('sisip_user_submissions', JSON.stringify([...existing, newSubmission]));
    } catch (e) {
      console.error(e);
    }

    setIsSubmitted(true);
    onShowToast('Rekomendasi berhasil dikirim!', 'Tim kurator SISIP akan meninjau tempatmu.');
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      title: '',
      category: 'Hidden Places',
      city: 'Jakarta',
      area: '',
      priceRange: '',
      description: '',
      instagram: '',
      submitterName: '',
      submitterEmail: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#F5F1E8] border-2 border-[#252525] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#243D35] text-[#F5F1E8]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E9DCA7]" />
            <h3 className="font-serif text-xl font-bold">Submit a Discovery</h3>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-cream-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#243D35] text-[#E9DCA7] flex items-center justify-center border-2 border-[#252525] shadow-brutal-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#243D35]">
                Terima Kasih Banyak, {formData.submitterName}!
              </h4>
              <p className="text-sm text-[#252525] leading-relaxed max-w-md mx-auto">
                Rekomendasi <strong>"{formData.title}"</strong> di {formData.city} sudah masuk ke meja tim kurator SISIP. Kami akan menghubungi kamu lewat email jika tempat ini terpilih masuk featured discovery minggu depan!
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="bg-[#D98555] hover:bg-[#C77443] text-white font-semibold text-sm px-6 py-2.5 rounded-lg border border-[#252525] shadow-brutal-sm"
                >
                  Selesai & Kembali Jelajah
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#252525]/80 leading-relaxed font-sans pb-1">
                Punya hidden gem, kedai kopi unik, atau bengkel kreatif lokal yang wajib diketahui lebih banyak orang? Bagikan ceritamu di sini!
              </p>

              <div>
                <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                  Nama Tempat / Aktivitas *
                </label>
                <input
                  type="text"
                  placeholder="Cth: Kineruku Kebun Buku / Bengkel Kintsugi"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                />
                {errors.title && <p className="text-xs text-red-600 mt-1 font-mono">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                  >
                    <option>Hidden Places</option>
                    <option>Creative Workshops</option>
                    <option>Local Communities</option>
                    <option>Weekend Plans</option>
                    <option>Food & Coffee</option>
                    <option>Art & Culture</option>
                    <option>Pop-up Markets</option>
                    <option>Budget-friendly Activities</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                    Kota
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                  >
                    {CITIES.filter((c) => c !== 'Semua Kota').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Kota Lainnya">Kota Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                    Area / Kawasan *
                  </label>
                  <input
                    type="text"
                    placeholder="Cth: Blok M / Dago / Kotagede"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                  />
                  {errors.area && <p className="text-xs text-red-600 mt-1 font-mono">{errors.area}</p>}
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                    Estimasi Biaya
                  </label>
                  <input
                    type="text"
                    placeholder="Cth: Gratis / Rp25k - 50k"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                  Kenapa Tempat Ini Istimewa? *
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan atmosfernya, menu atau karya terbaiknya, atau tips berkunjung..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                />
                {errors.description && (
                  <p className="text-xs text-red-600 mt-1 font-mono">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                  Akun Instagram / Link Tempat (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="@nama.tempat"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#252525]/15">
                <div>
                  <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                    Nama Kamu *
                  </label>
                  <input
                    type="text"
                    placeholder="Nama panggilan"
                    value={formData.submitterName}
                    onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                  />
                  {errors.submitterName && (
                    <p className="text-xs text-red-600 mt-1 font-mono">{errors.submitterName}</p>
                  )}
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold text-[#243D35] uppercase mb-1">
                    Email Kontak *
                  </label>
                  <input
                    type="email"
                    placeholder="email@kamu.com"
                    value={formData.submitterEmail}
                    onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                    className="w-full bg-[#FAF8F3] border border-[#252525] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#243D35]"
                  />
                  {errors.submitterEmail && (
                    <p className="text-xs text-red-600 mt-1 font-mono">{errors.submitterEmail}</p>
                  )}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] font-bold text-sm py-3 rounded-lg border border-[#252525] shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#E9DCA7]" />
                  <span>Kirim Rekomendasi ke Kurator</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
