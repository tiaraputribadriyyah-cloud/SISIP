import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Instagram, 
  Bookmark, 
  Sparkles, 
  Share2, 
  Check, 
  Sun, 
  Compass, 
  DollarSign,
  Heart
} from 'lucide-react';
import { CollectionFolder, DiscoveryItem } from '../types';
import { useSaved } from '../context/SavedContext';

interface DetailModalProps {
  item: DiscoveryItem | null;
  onClose: () => void;
  onShowToast: (message: string, sub?: string) => void;
}

const FOLDERS: { id: CollectionFolder; label: string }[] = [
  { id: 'places-to-visit', label: 'Places I Want to Visit' },
  { id: 'weekend-ideas', label: 'Weekend Ideas' },
  { id: 'creative-things', label: 'Creative Things' },
  { id: 'hidden-gems', label: 'Hidden Gems' },
];

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose, onShowToast }) => {
  const { isSaved, toggleSave, getFoldersContaining, moveToFolder } = useSaved();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const currentlySaved = isSaved(item.id);
  const activeFolders = getFoldersContaining(item.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Tautan tersalin ke clipboard!', 'Bagikan ke teman nongkrongmu');
    }
  };

  const handleQuickSave = () => {
    if (currentlySaved) {
      toggleSave(item.id, activeFolders[0] || 'places-to-visit');
      onShowToast('Dihapus dari koleksi tersimpan');
    } else {
      toggleSave(item.id, 'places-to-visit');
      onShowToast('Tersimpan di "Places I Want to Visit"');
    }
  };

  const images = item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#F5F1E8] border-2 border-[#252525] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252525]/20 bg-[#ECE5D6]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider font-bold bg-[#243D35] text-[#E9DCA7] px-2.5 py-0.5 rounded">
              {item.categoryName}
            </span>
            <span className="font-mono text-xs text-[#252525]/70">
              {item.city} • {item.area}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-md border border-[#252525]/30 hover:bg-[#F5F1E8] text-[#243D35] transition-colors"
              title="Bagikan"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-md border border-[#252525] bg-[#F5F1E8] hover:bg-white text-[#252525] transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Title & Tagline */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {item.editorialBadge && (
                <span className="font-mono text-xs uppercase font-bold bg-[#E9DCA7] text-[#243D35] px-2 py-0.5 rounded border border-[#252525]">
                  {item.editorialBadge}
                </span>
              )}
              {item.communityPick && (
                <span className="font-mono text-xs uppercase font-bold bg-[#D98555] text-white px-2 py-0.5 rounded flex items-center gap-1 border border-[#252525]">
                  <Sparkles className="w-3 h-3" /> Pilihan Komunitas
                </span>
              )}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243D35] leading-tight">
              {item.title}
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#D98555] mt-1.5">
              "{item.tagline}"
            </p>
          </div>

          {/* Hero Gallery with switcher */}
          <div className="space-y-3">
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border-2 border-[#252525] bg-[#ECE5D6]">
              <img
                src={images[activeImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-md overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-2 border-[#243D35] scale-105 shadow-brutal-sm'
                        : 'border-[#252525]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Practical Info Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#ECE5D6] p-4 rounded-xl border border-[#252525]/20 font-mono text-xs">
            <div>
              <span className="text-[#252525]/60 block uppercase text-[10px]">Estimasi Biaya</span>
              <span className="font-bold text-sm text-[#243D35] mt-0.5 block">{item.priceDisplay}</span>
            </div>
            <div>
              <span className="text-[#252525]/60 block uppercase text-[10px]">Waktu Ideal</span>
              <span className="font-bold text-xs text-[#243D35] mt-0.5 block">{item.idealTime}</span>
            </div>
            <div>
              <span className="text-[#252525]/60 block uppercase text-[10px]">Durasi Santai</span>
              <span className="font-bold text-xs text-[#243D35] mt-0.5 block">{item.suggestedDuration}</span>
            </div>
            <div>
              <span className="text-[#252525]/60 block uppercase text-[10px]">Karakter Ruang</span>
              <span className="font-bold text-xs text-[#243D35] mt-0.5 block capitalize">
                {item.indoorOutdoor} • {item.crowdType.replace('-friendly', '')}
              </span>
            </div>
          </div>

          {/* Editorial Curator Note Callout */}
          <div className="bg-[#E9DCA7]/70 border-2 border-[#243D35] rounded-xl p-5 shadow-brutal-sm relative">
            <div className="flex items-center gap-2 text-[#243D35] font-serif font-bold text-base mb-1.5">
              <Sparkles className="w-4 h-4 text-[#D98555]" />
              <span>Catatan Kurator SISIP</span>
            </div>
            <p className="text-sm text-[#243D35] leading-relaxed font-sans font-medium">
              "{item.curatorNote}"
            </p>
          </div>

          {/* Description & Story */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#243D35]">
              Tentang Tempat Ini
            </h3>
            <p className="text-[#252525] leading-relaxed text-base">
              {item.description}
            </p>
          </div>

          {/* Highlight Points */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-charcoal-muted">
              Yang Bikin Tempat Ini Spesial:
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {item.highlightPoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-lg border border-[#252525]/15 bg-white/50"
                >
                  <div className="p-0.5 rounded bg-[#243D35] text-[#E9DCA7] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#252525] font-medium leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Opening Hours */}
          <div className="p-4 rounded-xl border border-[#252525]/20 bg-[#ECE5D6]/60 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D98555] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono font-bold text-[#243D35]">Alamat Lengkap</p>
                <p className="text-xs sm:text-sm text-[#252525] mt-0.5">{item.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-[#252525]/10">
              <Clock className="w-4 h-4 text-[#243D35] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-mono font-bold text-[#243D35]">Jam Operasional</p>
                <p className="text-xs sm:text-sm text-[#252525] mt-0.5">{item.openingHours}</p>
              </div>
            </div>
          </div>

          {/* Folder Management */}
          <div className="p-4 rounded-xl border-2 border-dashed border-[#243D35]/40 bg-[#FAF8F3]">
            <p className="font-mono text-xs uppercase font-bold text-[#243D35] mb-2">
              Kelola Koleksi Tersimpan:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FOLDERS.map((f) => {
                const inFolder = isSaved(item.id, f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      toggleSave(item.id, f.id);
                      onShowToast(
                        inFolder ? `Dihapus dari ${f.label}` : `Ditambahkan ke ${f.label}`
                      );
                    }}
                    className={`px-3 py-2 rounded-md text-xs font-semibold border text-left flex items-center justify-between transition-all ${
                      inFolder
                        ? 'bg-[#243D35] text-[#F5F1E8] border-[#252525]'
                        : 'bg-white border-[#252525]/20 text-[#252525] hover:border-[#252525]'
                    }`}
                  >
                    <span className="truncate">{f.label}</span>
                    {inFolder && <Check className="w-3.5 h-3.5 text-[#E9DCA7] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="px-6 py-4 bg-[#ECE5D6] border-t-2 border-[#252525] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickSave}
              className={`px-4 py-2.5 rounded-lg border border-[#252525] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                currentlySaved
                  ? 'bg-[#D98555] text-white shadow-brutal-sm'
                  : 'bg-[#F5F1E8] text-[#252525] hover:bg-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${currentlySaved ? 'fill-white' : ''}`} />
              <span>{currentlySaved ? 'Tersimpan' : 'Simpan Tempat'}</span>
            </button>

            {item.instagram && (
              <a
                href={`https://instagram.com/${item.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2.5 rounded-lg border border-[#252525]/30 hover:border-[#252525] bg-[#F5F1E8] text-[#243D35] font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#D98555]" />
                <span className="hidden sm:inline">{item.instagram}</span>
              </a>
            )}
          </div>

          <a
            href={item.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm border border-[#252525] shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Buka Petunjuk Arah</span>
            <ExternalLink className="w-4 h-4 text-[#E9DCA7]" />
          </a>
        </div>
      </div>
    </div>
  );
};
