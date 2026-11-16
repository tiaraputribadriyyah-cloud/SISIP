import React from 'react';
import { Sparkles, Heart, ArrowUpRight, Instagram, Compass } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openSubmitModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openSubmitModal }) => {
  return (
    <footer className="bg-[#243D35] text-[#F5F1E8] border-t-2 border-[#252525] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top editorial manifesto quote */}
        <div className="border-b border-[#F5F1E8]/15 pb-12 mb-12">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E9DCA7] font-bold block mb-2">
              The SISIP. Manifesto
            </span>
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-snug text-[#F5F1E8]">
              "We believe life doesn't always need big adventures. Sometimes, the smallest discoveries become the best memories."
            </p>
            <p className="font-sans text-sm text-[#F5F1E8]/70 mt-3 leading-relaxed">
              Sebuah inisiatif independen untuk menghubungkan Gen Z Indonesia dengan tempat lokal autentik, ruang kreatif independen, dan komunitas yang hangat.
            </p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#F5F1E8]/15">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-3xl font-bold tracking-tight text-[#E9DCA7]">
              SISIP<span className="text-[#D98555]">.</span>
            </span>
            <p className="font-mono text-xs text-[#F5F1E8]/80 mt-1">
              Tempat kecil untuk hal baru.
            </p>
            <p className="text-xs text-[#F5F1E8]/60 mt-3 leading-relaxed">
              Kurasian komunitas muda kreatif Indonesia: Jakarta, Bandung, Jogja, Surabaya, Bali, Bekasi, dan sekitarnya.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-white/10 hover:bg-[#D98555] text-white transition-colors"
                aria-label="Instagram SISIP"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActiveTab('about')}
                className="p-2 rounded bg-white/10 hover:bg-[#D98555] text-white transition-colors"
                aria-label="Tentang Kami"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-mono text-xs uppercase font-bold text-[#E9DCA7] tracking-wider mb-3">
              Jelajah
            </h5>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/80">
              <li>
                <button
                  onClick={() => { setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E9DCA7] transition-colors"
                >
                  Semua Rekomendasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E9DCA7] transition-colors"
                >
                  Peta Hidden Gems
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E9DCA7] transition-colors"
                >
                  Weekend Escape Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('events'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E9DCA7] transition-colors"
                >
                  Kalender Workshop & Event
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('saved'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#E9DCA7] transition-colors"
                >
                  Koleksi Tersimpan
                </button>
              </li>
            </ul>
          </div>

          {/* Kota */}
          <div>
            <h5 className="font-mono text-xs uppercase font-bold text-[#E9DCA7] tracking-wider mb-3">
              Kota Pilihan
            </h5>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/80 font-mono text-xs">
              <li>Jakarta Selatan & Kota Tua</li>
              <li>Bandung (Braga, Cidadap, Dago)</li>
              <li>Yogyakarta (Kotagede & Kaliurang)</li>
              <li>Surabaya (Tunjungan Heritage)</li>
              <li>Bali (Pererenan & Canggu)</li>
              <li>Bekasi (Pekayon & Creative Hubs)</li>
            </ul>
          </div>

          {/* Partisipasi */}
          <div>
            <h5 className="font-mono text-xs uppercase font-bold text-[#E9DCA7] tracking-wider mb-3">
              Kolektif & Partisipasi
            </h5>
            <p className="text-xs text-[#F5F1E8]/70 leading-relaxed mb-3">
              Tahu tempat keren yang belum banyak orang tahu? Bantu kami mengkurasi ruang terbaik di kotamu.
            </p>
            <button
              onClick={openSubmitModal}
              className="bg-[#D98555] hover:bg-[#C77443] text-white text-xs font-semibold px-4 py-2 rounded border border-[#252525] shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9DCA7]" />
              <span>Submit Discovery</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F1E8]/60 font-mono gap-3">
          <p>© 2024 SISIP. Dikurasi dengan rasa ingin tahu di Indonesia.</p>
          <div className="flex items-center gap-1">
            <span>Didesain untuk jiwa muda yang mencari autentisitas</span>
            <Heart className="w-3.5 h-3.5 text-[#D98555] fill-[#D98555] inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
