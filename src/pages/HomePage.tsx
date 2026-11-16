import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Calendar, 
  Bookmark, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Heart
} from 'lucide-react';
import { CATEGORIES, CITIES } from '../data/categories';
import { DISCOVERIES_DATA } from '../data/discoveries';
import { EVENTS_DATA } from '../data/events';
import { CategoryId, DiscoveryItem } from '../types';
import { DiscoveryCard } from '../components/DiscoveryCard';
import { ActiveTab } from '../components/Navbar';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDiscovery: (item: DiscoveryItem) => void;
  onFilterCategory: (cat: CategoryId) => void;
  onFilterCity: (city: string) => void;
  onShowToast: (message: string, sub?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setActiveTab,
  onSelectDiscovery,
  onFilterCategory,
  onFilterCity,
  onShowToast,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCityChip, setSelectedCityChip] = useState<string>('Jakarta');

  // Featured discoveries (curator top picks)
  const featured = DISCOVERIES_DATA.slice(0, 4);
  const trending = DISCOVERIES_DATA.filter((d) => d.communityPick).slice(0, 3);
  const upcomingEvents = EVENTS_DATA.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('explore');
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCityChip(city);
    onFilterCity(city);
    setActiveTab('explore');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 border-b-2 border-[#252525] bg-gradient-to-b from-[#F5F1E8] via-[#F5F1E8] to-[#ECE5D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E9DCA7] text-[#243D35] px-3.5 py-1 rounded-full border border-[#252525] shadow-brutal-sm font-mono text-xs font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#D98555]" />
              <span>Lifestyle Discovery untuk Gen Z Indonesia</span>
            </div>

            {/* Headline & Subheadline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#243D35] tracking-tight leading-[1.1]">
              Your next little adventure is closer than you think.
            </h1>

            <p className="font-sans text-base sm:text-xl text-[#252525]/85 max-w-2xl mx-auto leading-relaxed">
              Temukan tempat, aktivitas, dan cerita kecil yang bikin hari-harimu berwarna.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-8">
              <div className="relative flex items-center bg-white border-2 border-[#252525] rounded-xl shadow-brutal p-1.5 transition-all focus-within:shadow-brutal-lg">
                <Search className="w-5 h-5 text-[#243D35] ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Cari tempat, aktivitas, atau pengalaman..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-3 text-sm sm:text-base text-[#252525] placeholder:text-[#252525]/50 bg-transparent focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] px-5 sm:px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm border border-[#252525] shrink-0 transition-all"
                >
                  Cari
                </button>
              </div>
            </form>

            {/* City Filter Chips */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
              <span className="font-mono text-xs text-[#252525]/70 mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D98555]" />
                Pilih Kota:
              </span>
              {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Bali', 'Bekasi', 'Kota lainnya'].map(
                (city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city === 'Kota lainnya' ? 'Semua Kota' : city)}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full border border-[#252525] transition-all duration-150 ${
                      selectedCityChip === city
                        ? 'bg-[#243D35] text-[#E9DCA7] shadow-brutal-sm font-bold'
                        : 'bg-[#F5F1E8] hover:bg-white text-[#252525]'
                    }`}
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL RUNNING TICKER */}
      <div className="bg-[#243D35] text-[#E9DCA7] py-3.5 border-y-2 border-[#252525] overflow-hidden whitespace-nowrap select-none">
        <div className="inline-flex gap-8 items-center font-mono text-xs sm:text-sm uppercase tracking-wider font-semibold animate-marquee">
          <span>☕ SLOW FILTER COFFEE</span>
          <span>✦</span>
          <span>🏺 HANDMADE POTTERY</span>
          <span>✦</span>
          <span>📷 35MM ANALOG LAB</span>
          <span>✦</span>
          <span>📚 INDIE BOOKSTORE</span>
          <span>✦</span>
          <span>🌿 GREENHOUSE BOTANICAL</span>
          <span>✦</span>
          <span>🎨 RISOGRAPH ZINE</span>
          <span>✦</span>
          <span>🌅 SUNSET SILENT READING</span>
          <span>✦</span>
          <span>🎒 VINTAGE THRIFT MARKET</span>
        </div>
      </div>

      {/* 3. FEATURED DISCOVERIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#D98555] tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Koleksi Terpilih Minggu Ini</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243D35]">
              Featured Discovery
            </h2>
            <p className="text-sm text-[#252525]/75 mt-1 font-sans">
              Tempat-tempat dengan cerita autentik yang baru saja dikurasi tim editorial SISIP.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('explore')}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#243D35] hover:text-[#D98555] pb-1 border-b border-[#252525] group w-fit"
          >
            <span>Lihat Semua Tempat ({DISCOVERIES_DATA.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid 4 Featured Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <DiscoveryCard
              key={item.id}
              item={item}
              onSelect={onSelectDiscovery}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      </section>

      {/* 4. CALLOUT BANNER: WEEKEND ESCAPE PLANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border-2 border-[#252525] bg-[#E9DCA7] p-8 sm:p-12 shadow-brutal overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="font-mono text-xs uppercase font-bold tracking-wider bg-[#243D35] text-[#E9DCA7] px-3 py-1 rounded border border-[#252525] inline-block">
              Fitur Baru: Generator Itinerary
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#243D35] leading-tight">
              Plan My Little Escape.
            </h3>
            <p className="text-sm sm:text-base text-[#243D35]/90 font-medium leading-relaxed">
              Bingung akhir pekan mau ke mana? Tentukan budget, jumlah teman, dan kotamu. Biarkan SISIP meracik 2–4 aktivitas yang saling berdekatan dalam hitungan detik!
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('planner')}
                className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] font-bold text-sm px-6 py-3 rounded-lg border border-[#252525] shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Bikin Rencana Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#E9DCA7]" />
              </button>
              <span className="font-mono text-xs text-[#243D35]/80">
                100% Gratis • Instan • Sesuai Budget
              </span>
            </div>
          </div>

          {/* Decorative stamp on the side */}
          <div className="hidden lg:block absolute -right-6 -bottom-6 w-72 h-72 rounded-full border-8 border-dashed border-[#243D35]/20 pointer-events-none rotate-12 flex items-center justify-center text-center p-8">
            <span className="font-mono text-xs uppercase font-bold text-[#243D35]/40 leading-tight">
              SISIP ESCAPE CURATION SYSTEM • READY FOR WEEKEND
            </span>
          </div>
        </div>
      </section>

      {/* 5. CATEGORIES BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase font-bold text-[#D98555] tracking-widest block mb-1">
            Eksplorasi Tematik
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243D35]">
            Cari Berdasarkan Vibe & Kebutuhan
          </h2>
          <p className="text-sm text-[#252525]/75 mt-2">
            Dari sudut sunyi untuk solo reading hingga workshop keramik bareng teman dekat.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onFilterCategory(cat.id);
                setActiveTab('explore');
              }}
              className="group cursor-pointer p-5 bg-[#FAF8F3] border-2 border-[#252525] rounded-xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#D98555] bg-[#D98555]/10 px-2 py-0.5 rounded">
                    {cat.count} tempat
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#243D35] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#243D35] group-hover:text-[#D98555] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-[#252525]/70 mt-1 leading-snug line-clamp-2">
                  {cat.tagline}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#252525]/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-charcoal-muted uppercase">Buka Kategori</span>
                <span className="text-[#243D35] font-bold text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. UPCOMING COMMUNITY WORKSHOPS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#243D35] text-[#F5F1E8] rounded-2xl border-2 border-[#252525] p-6 sm:p-10 shadow-brutal">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[#E9DCA7] tracking-wider block mb-1">
                Aktivitas & Pertemuan Komunitas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1E8]">
                Event Kecil yang Bikin Hidup
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-mono font-bold text-[#E9DCA7] hover:underline flex items-center gap-1.5"
            >
              <span>Lihat Kalender Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setActiveTab('events')}
                className="group cursor-pointer bg-[#1B3029] border border-[#F5F1E8]/20 rounded-xl overflow-hidden hover:border-[#E9DCA7] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-black/40 relative">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#243D35]/90 text-[#E9DCA7] font-mono text-[10px] px-2 py-0.5 rounded border border-[#E9DCA7]/30">
                      {evt.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="font-mono text-xs text-[#D98555] block mb-1">
                      {evt.date} • {evt.city}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#F5F1E8] group-hover:text-[#E9DCA7] transition-colors line-clamp-1">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-[#F5F1E8]/70 mt-1 line-clamp-2">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[#F5F1E8]/10 mt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#E9DCA7] font-bold">{evt.priceDisplay}</span>
                  <span className="text-white/60">Sisa {evt.slotsLeft} slot</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
