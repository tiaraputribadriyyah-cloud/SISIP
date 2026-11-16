import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  ChevronDown, 
  SlidersHorizontal 
} from 'lucide-react';
import { CATEGORIES, CITIES } from '../data/categories';
import { DISCOVERIES_DATA } from '../data/discoveries';
import { CategoryId, DiscoveryItem } from '../types';
import { DiscoveryCard } from '../components/DiscoveryCard';

interface ExplorePageProps {
  onSelectDiscovery: (item: DiscoveryItem) => void;
  onShowToast: (message: string, sub?: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onSelectDiscovery,
  onShowToast,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
}) => {
  // Additional Filters
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'under-50k' | 'under-150k' | 'above-150k'>('all');
  const [spaceType, setSpaceType] = useState<'all' | 'indoor' | 'outdoor' | 'semi-outdoor'>('all');
  const [crowdType, setCrowdType] = useState<'all' | 'solo-friendly' | 'group-friendly'>('all');
  const [onlyCommunityPick, setOnlyCommunityPick] = useState(false);
  const [sortBy, setSortBy] = useState<'curator' | 'rating' | 'price-low' | 'price-high'>('curator');
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return DISCOVERIES_DATA.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesArea = item.area.toLowerCase().includes(query);
        const matchesCity = item.city.toLowerCase().includes(query);
        const matchesCat = item.categoryName.toLowerCase().includes(query);
        const matchesTag = item.highlightPoints.some((p) => p.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesArea && !matchesCity && !matchesCat && !matchesTag) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all') {
        if (item.category !== selectedCategory) return false;
      }

      // 3. City
      if (selectedCity !== 'Semua Kota') {
        if (item.city !== selectedCity) return false;
      }

      // 4. Price Filter
      if (priceFilter === 'free' && !item.isFree) return false;
      if (priceFilter === 'under-50k' && item.priceNum > 50000) return false;
      if (priceFilter === 'under-150k' && (item.priceNum < 50000 || item.priceNum > 150000)) return false;
      if (priceFilter === 'above-150k' && item.priceNum <= 150000) return false;

      // 5. Indoor / Outdoor
      if (spaceType !== 'all') {
        if (item.indoorOutdoor !== spaceType) return false;
      }

      // 6. Crowd type
      if (crowdType !== 'all') {
        if (item.crowdType !== crowdType) return false;
      }

      // 7. Community Pick
      if (onlyCommunityPick && !item.communityPick) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.priceNum - b.priceNum;
      if (sortBy === 'price-high') return b.priceNum - a.priceNum;
      return 0; // curator order
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedCity,
    priceFilter,
    spaceType,
    crowdType,
    onlyCommunityPick,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('Semua Kota');
    setPriceFilter('all');
    setSpaceType('all');
    setCrowdType('all');
    setOnlyCommunityPick(false);
    setSearchQuery('');
    setSortBy('curator');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCity !== 'Semua Kota' ||
    priceFilter !== 'all' ||
    spaceType !== 'all' ||
    crowdType !== 'all' ||
    onlyCommunityPick ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-[#252525] pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#D98555] tracking-wider mb-1">
              <span>Kurasi Discovery SISIP</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#243D35]">
              Eksplorasi Tempat & Pengalaman
            </h1>
            <p className="text-sm sm:text-base text-[#252525]/80 mt-1 max-w-2xl font-sans">
              Temukan hidden gems, aktivitas seni, sudut baca, dan ruang komunitas yang autentik di sekitarmu.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="font-mono text-xs bg-[#243D35] text-[#E9DCA7] px-3 py-1.5 rounded-lg border border-[#252525] shadow-brutal-sm font-bold">
              {filteredItems.length} Tempat Tersedia
            </span>
          </div>
        </div>
      </div>

      {/* Main Search & Category Tabs Bar */}
      <div className="space-y-4">
        {/* Search Bar + City Selector */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 bg-white border-2 border-[#252525] rounded-xl shadow-brutal-sm flex items-center px-3 py-1.5 focus-within:shadow-brutal transition-all">
            <Search className="w-4 h-4 text-[#243D35] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, aktivitas, atau area (misal: Blok M, pottery, kaset)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm py-2 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-charcoal-subtle hover:text-[#252525]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Dropdown */}
          <div className="relative sm:w-56 shrink-0">
            <div className="flex items-center bg-[#FAF8F3] border-2 border-[#252525] rounded-xl shadow-brutal-sm px-3 py-2.5">
              <MapPin className="w-4 h-4 text-[#D98555] mr-2 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-transparent focus:outline-none cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilterModal(true)}
            className="sm:hidden bg-[#243D35] text-[#F5F1E8] px-4 py-2.5 rounded-xl border border-[#252525] flex items-center justify-center gap-2 font-mono text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#E9DCA7]" />
            <span>Filter Lanjutan</span>
          </button>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-mono text-xs px-3.5 py-2 rounded-lg border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#243D35] text-[#F5F1E8] border-[#252525] shadow-brutal-sm font-bold'
                    : 'bg-[#ECE5D6] hover:bg-white text-[#252525] border-[#252525]/30'
                }`}
              >
                <span>{cat.name}</span>
                {cat.id !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-[#E9DCA7] text-[#243D35]' : 'bg-[#252525]/10 text-charcoal'
                  }`}>
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Secondary Filter Bar (Desktop) */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#ECE5D6]/70 border border-[#252525]/20 rounded-xl font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#252525]/70">Biaya:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="bg-white border border-[#252525]/30 rounded px-2 py-1 font-semibold focus:outline-none"
              >
                <option value="all">Semua Harga</option>
                <option value="free">100% Gratis</option>
                <option value="under-50k">Di bawah Rp50k</option>
                <option value="under-150k">Rp50k – Rp150k</option>
                <option value="above-150k">Di atas Rp150k</option>
              </select>
            </div>

            {/* Space Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#252525]/70">Ruang:</span>
              <select
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value as any)}
                className="bg-white border border-[#252525]/30 rounded px-2 py-1 font-semibold focus:outline-none"
              >
                <option value="all">Indoor & Outdoor</option>
                <option value="indoor">Indoor Saja</option>
                <option value="outdoor">Outdoor Saja</option>
                <option value="semi-outdoor">Semi-Outdoor</option>
              </select>
            </div>

            {/* Crowd Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#252525]/70">Vibe:</span>
              <select
                value={crowdType}
                onChange={(e) => setCrowdType(e.target.value as any)}
                className="bg-white border border-[#252525]/30 rounded px-2 py-1 font-semibold focus:outline-none"
              >
                <option value="all">Semua Vibe</option>
                <option value="solo-friendly">Solo-friendly (Me-time)</option>
                <option value="group-friendly">Group-friendly (Nongkrong)</option>
              </select>
            </div>

            {/* Community Pick Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyCommunityPick}
                onChange={(e) => setOnlyCommunityPick(e.target.checked)}
                className="rounded border-[#252525] text-[#D98555] focus:ring-0"
              />
              <span className="font-semibold text-[#D98555]">✦ Pilihan Komunitas</span>
            </label>
          </div>

          {/* Sort By & Reset */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-[#252525]/70">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#252525]/30 rounded px-2 py-1 font-semibold focus:outline-none"
              >
                <option value="curator">Pilihan Kurator</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-low">Harga: Terendah</option>
                <option value="price-high">Harga: Tertinggi</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[#D98555] hover:underline flex items-center gap-1 font-bold pl-2 border-l border-[#252525]/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredItems.map((item) => (
            <DiscoveryCard
              key={item.id}
              item={item}
              onSelect={onSelectDiscovery}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FAF8F3] border-2 border-dashed border-[#243D35]/40 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-[#E9DCA7] text-[#243D35] flex items-center justify-center mx-auto border-2 border-[#252525]">
            <Sparkles className="w-8 h-8 text-[#D98555]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#243D35]">
            Belum Ada Tempat yang Cocok
          </h3>
          <p className="text-sm text-[#252525]/80 leading-relaxed font-sans">
            Kombinasi filter atau kata kuncimu terlalu spesifik. Coba ubah kategori, longgarkan filter harga, atau reset filter untuk melihat tempat menarik lainnya.
          </p>
          <div className="pt-2">
            <button
              onClick={resetAllFilters}
              className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] px-5 py-2.5 rounded-lg border border-[#252525] font-mono text-xs font-bold shadow-brutal-sm"
            >
              Reset Semua Filter
            </button>
          </div>
        </div>
      )}

      {/* Mobile Filters Drawer */}
      {showMobileFilterModal && (
        <div className="fixed inset-0 z-50 sm:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F5F1E8] border-t-2 border-[#252525] rounded-t-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#252525]/20">
              <h3 className="font-serif text-xl font-bold text-[#243D35]">Filter Pencarian</h3>
              <button onClick={() => setShowMobileFilterModal(false)} className="p-1 rounded-full border">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="font-mono text-xs font-bold uppercase block mb-1">Kisaran Biaya</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="w-full bg-white border border-[#252525] rounded-lg p-2.5 text-xs font-mono"
              >
                <option value="all">Semua Harga</option>
                <option value="free">100% Gratis</option>
                <option value="under-50k">Di bawah Rp50k</option>
                <option value="under-150k">Rp50k – Rp150k</option>
                <option value="above-150k">Di atas Rp150k</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-xs font-bold uppercase block mb-1">Karakter Ruang</label>
              <select
                value={spaceType}
                onChange={(e) => setSpaceType(e.target.value as any)}
                className="w-full bg-white border border-[#252525] rounded-lg p-2.5 text-xs font-mono"
              >
                <option value="all">Indoor & Outdoor</option>
                <option value="indoor">Indoor Saja</option>
                <option value="outdoor">Outdoor Saja</option>
                <option value="semi-outdoor">Semi-Outdoor</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-xs font-bold uppercase block mb-1">Vibe Kunjungan</label>
              <select
                value={crowdType}
                onChange={(e) => setCrowdType(e.target.value as any)}
                className="w-full bg-white border border-[#252525] rounded-lg p-2.5 text-xs font-mono"
              >
                <option value="all">Semua Vibe</option>
                <option value="solo-friendly">Solo-friendly (Me-time)</option>
                <option value="group-friendly">Group-friendly (Nongkrong)</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-[#D98555]">
                <input
                  type="checkbox"
                  checked={onlyCommunityPick}
                  onChange={(e) => setOnlyCommunityPick(e.target.checked)}
                />
                <span>Hanya Tampilkan Pilihan Komunitas</span>
              </label>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-3 border border-[#252525] rounded-lg font-mono text-xs font-bold text-[#243D35]"
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilterModal(false)}
                className="flex-1 py-3 bg-[#243D35] text-[#F5F1E8] rounded-lg font-mono text-xs font-bold"
              >
                Terapkan ({filteredItems.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
