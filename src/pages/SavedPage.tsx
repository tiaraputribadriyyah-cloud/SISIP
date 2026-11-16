import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Share2, 
  Calendar, 
  MapPin, 
  Route, 
  Clock,
  Heart
} from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import { DISCOVERIES_DATA } from '../data/discoveries';
import { CollectionFolder, DiscoveryItem, GeneratedItinerary } from '../types';
import { DiscoveryCard } from '../components/DiscoveryCard';
import { ActiveTab } from '../components/Navbar';

interface SavedPageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDiscovery: (item: DiscoveryItem) => void;
  onShowToast: (message: string, sub?: string) => void;
}

const FOLDERS: { id: CollectionFolder; label: string; desc: string; icon: string }[] = [
  { 
    id: 'places-to-visit', 
    label: 'Places I Want to Visit', 
    desc: 'Daftar tunggu tempat yang ingin didatangi suatu hari nanti',
    icon: '📍'
  },
  { 
    id: 'weekend-ideas', 
    label: 'Weekend Ideas', 
    desc: 'Inspirasi cepat untuk akhir pekan yang santai dan gak membosankan',
    icon: '☕'
  },
  { 
    id: 'creative-things', 
    label: 'Creative Things', 
    desc: 'Workshop kriya, analog lab, studio keramik, dan kelas seni',
    icon: '🏺'
  },
  { 
    id: 'hidden-gems', 
    label: 'Hidden Gems', 
    desc: 'Sudut rahasia lokal yang belum banyak diketahui orang',
    icon: '✨'
  },
];

export const SavedPage: React.FC<SavedPageProps> = ({
  setActiveTab,
  onSelectDiscovery,
  onShowToast,
}) => {
  const { savedState, clearCollection, totalSavedCount } = useSaved();
  const [activeFolder, setActiveFolder] = useState<CollectionFolder | 'saved-plans'>('places-to-visit');
  const [savedPlans, setSavedPlans] = useState<GeneratedItinerary[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sisip_saved_plans');
      if (stored) {
        setSavedPlans(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeFolder]);

  const handleDeletePlan = (planId: string) => {
    const updated = savedPlans.filter((p) => p.id !== planId);
    setSavedPlans(updated);
    localStorage.setItem('sisip_saved_plans', JSON.stringify(updated));
    onShowToast('Itinerary dihapus dari koleksi');
  };

  const currentFolderIds = activeFolder !== 'saved-plans' ? savedState[activeFolder] || [] : [];
  const currentItems = DISCOVERIES_DATA.filter((item) => currentFolderIds.includes(item.id));

  const handleShareCollection = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Tautan koleksi disalin!', 'Bagikan wishlist tempat ke temanmu');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b-2 border-[#252525] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#D98555] tracking-wider mb-1">
            <Bookmark className="w-3.5 h-3.5 fill-[#D98555]" />
            <span>Koleksi Pribadi</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#243D35]">
            Saved Collections
          </h1>
          <p className="text-sm sm:text-base text-[#252525]/80 mt-1 max-w-2xl font-sans">
            Semua hidden gems, ide akhir pekan, dan workshop impian yang kamu simpan tersimpan rapi di browser ini.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareCollection}
            className="px-4 py-2 rounded-lg border border-[#252525] bg-white text-[#243D35] hover:bg-[#ECE5D6] font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#D98555]" />
            <span>Bagikan Koleksi</span>
          </button>
        </div>
      </div>

      {/* Folder Tab Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {FOLDERS.map((folder) => {
          const count = savedState[folder.id]?.length || 0;
          const isActive = activeFolder === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-[#243D35] text-[#F5F1E8] border-[#252525] shadow-brutal-sm'
                  : 'bg-[#FAF8F3] border-[#252525]/30 hover:border-[#252525] text-[#252525]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{folder.icon}</span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#E9DCA7] text-[#243D35]' : 'bg-[#ECE5D6] text-[#252525]'
                  }`}
                >
                  {count}
                </span>
              </div>
              <div>
                <h4 className="font-serif text-base font-bold leading-tight">{folder.label}</h4>
                <p className={`text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-cream-200' : 'text-charcoal-muted'}`}>
                  {folder.desc}
                </p>
              </div>
            </button>
          );
        })}

        {/* 5th Tab: Saved Escape Plans */}
        <button
          onClick={() => setActiveFolder('saved-plans')}
          className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
            activeFolder === 'saved-plans'
              ? 'bg-[#243D35] text-[#F5F1E8] border-[#252525] shadow-brutal-sm'
              : 'bg-[#FAF8F3] border-[#252525]/30 hover:border-[#252525] text-[#252525]'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl">🗺️</span>
            <span
              className={`font-mono text-xs px-2 py-0.5 rounded-full font-bold ${
                activeFolder === 'saved-plans' ? 'bg-[#E9DCA7] text-[#243D35]' : 'bg-[#ECE5D6] text-[#252525]'
              }`}
            >
              {savedPlans.length}
            </span>
          </div>
          <div>
            <h4 className="font-serif text-base font-bold leading-tight">Itinerary Tersimpan</h4>
            <p className={`text-[11px] mt-1 line-clamp-1 ${activeFolder === 'saved-plans' ? 'text-cream-200' : 'text-charcoal-muted'}`}>
              Rencana pelarian akhir pekan dari fitur planner
            </p>
          </div>
        </button>
      </div>

      {/* Main Content Area */}
      {activeFolder === 'saved-plans' ? (
        /* Render Saved Plans */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#243D35]">
              Daftar Itinerary Akhir Pekan ({savedPlans.length})
            </h3>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs font-mono font-bold text-[#D98555] hover:underline flex items-center gap-1"
            >
              <span>+ Buat Itinerary Baru</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-[#FAF8F3] border-2 border-[#252525] rounded-xl p-6 shadow-brutal-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase font-bold bg-[#243D35] text-[#E9DCA7] px-2.5 py-0.5 rounded">
                        {plan.city}
                      </span>
                      <span className="font-mono text-xs text-charcoal-muted">
                        Rp{plan.estimatedTotal.toLocaleString('id-ID')} / org
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[#243D35]">
                      Pelarian {plan.city} ({plan.durationHours} Jam)
                    </h4>

                    <div className="space-y-2 pt-2 border-t border-[#252525]/10">
                      <span className="font-mono text-[11px] uppercase font-bold text-charcoal-subtle block">
                        Daftar Kunjungan:
                      </span>
                      {plan.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <span className="w-5 h-5 rounded-full bg-[#243D35] text-[#E9DCA7] flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-[#243D35] truncate">{it.title}</span>
                          <span className="text-[#252525]/60 text-[11px] ml-auto">({it.area})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#252525]/15 flex items-center justify-between">
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="text-xs font-mono text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('planner')}
                      className="text-xs font-mono font-bold text-[#243D35] hover:text-[#D98555] flex items-center gap-1"
                    >
                      <span>Buka di Planner →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FAF8F3] border-2 border-dashed border-[#252525]/30 rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto">
              <Route className="w-12 h-12 text-[#D98555] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#243D35]">
                Belum Ada Itinerary Tersimpan
              </h4>
              <p className="text-sm text-[#252525]/70 font-sans">
                Gunakan fitur "Plan My Little Escape" untuk meracik rute jalan-jalan santai sesuai budgetmu, lalu simpan ke sini!
              </p>
              <button
                onClick={() => setActiveTab('planner')}
                className="bg-[#243D35] text-[#F5F1E8] font-bold text-xs px-5 py-2.5 rounded-lg border border-[#252525] shadow-brutal-sm"
              >
                Mulai Bikin Rencana
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Render Selected Discovery Folder Items */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#243D35]">
                {FOLDERS.find((f) => f.id === activeFolder)?.label} ({currentItems.length})
              </h3>
              <p className="text-xs text-[#252525]/70 font-sans mt-0.5">
                {FOLDERS.find((f) => f.id === activeFolder)?.desc}
              </p>
            </div>

            {currentItems.length > 0 && (
              <button
                onClick={() => {
                  clearCollection(activeFolder);
                  onShowToast('Koleksi folder dikosongkan');
                }}
                className="text-xs font-mono text-charcoal-muted hover:text-red-600 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kosongkan Folder</span>
              </button>
            )}
          </div>

          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => (
                <DiscoveryCard
                  key={item.id}
                  item={item}
                  onSelect={onSelectDiscovery}
                  onShowToast={onShowToast}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#FAF8F3] border-2 border-dashed border-[#252525]/30 rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto">
              <Bookmark className="w-12 h-12 text-[#D98555] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#243D35]">
                Folder Ini Masih Kosong
              </h4>
              <p className="text-sm text-[#252525]/70 font-sans">
                Kamu belum menyimpan tempat ke dalam folder "{FOLDERS.find((f) => f.id === activeFolder)?.label}". Tekan tombol ikon Bookmark pada kartu tempat yang kamu sukai.
              </p>
              <button
                onClick={() => setActiveTab('explore')}
                className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] font-bold text-xs px-5 py-2.5 rounded-lg border border-[#252525] shadow-brutal-sm"
              >
                Mulai Eksplorasi Tempat
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
