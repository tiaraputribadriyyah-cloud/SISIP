import React, { useState } from 'react';
import { 
  Bookmark, 
  MapPin, 
  Star, 
  ArrowUpRight, 
  Clock, 
  Users, 
  Check, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { CollectionFolder, DiscoveryItem } from '../types';
import { useSaved } from '../context/SavedContext';

interface DiscoveryCardProps {
  item: DiscoveryItem;
  onSelect: (item: DiscoveryItem) => void;
  onShowToast: (message: string, sub?: string) => void;
}

const FOLDERS: { id: CollectionFolder; label: string }[] = [
  { id: 'places-to-visit', label: 'Places I Want to Visit' },
  { id: 'weekend-ideas', label: 'Weekend Ideas' },
  { id: 'creative-things', label: 'Creative Things' },
  { id: 'hidden-gems', label: 'Hidden Gems' },
];

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ item, onSelect, onShowToast }) => {
  const { isSaved, toggleSave, getFoldersContaining, moveToFolder } = useSaved();
  const [showFolderMenu, setShowFolderMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currentlySaved = isSaved(item.id);
  const activeFolders = getFoldersContaining(item.id);

  const handleQuickSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentlySaved) {
      // Toggle off
      toggleSave(item.id, activeFolders[0] || 'places-to-visit');
      onShowToast('Dihapus dari koleksi tersimpan');
    } else {
      toggleSave(item.id, 'places-to-visit');
      onShowToast(
        'Tersimpan di "Places I Want to Visit"',
        'Bisa kamu cek di tab Saved kapan saja'
      );
    }
  };

  const handleSaveToFolder = (e: React.MouseEvent, folder: CollectionFolder) => {
    e.stopPropagation();
    moveToFolder(item.id, folder);
    setShowFolderMenu(false);
    const folderMeta = FOLDERS.find((f) => f.id === folder);
    onShowToast(`Disimpan ke "${folderMeta?.label}"`);
  };

  return (
    <div className="group relative bg-[#F5F1E8] border-2 border-[#252525] rounded-xl overflow-hidden shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
      {/* Image Container with Badges */}
      <div 
        onClick={() => onSelect(item)}
        className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden cursor-pointer bg-[#ECE5D6]"
      >
        <img
          src={imageError ? 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80' : item.image}
          alt={item.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1 items-start pointer-events-auto">
            {item.editorialBadge ? (
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold bg-[#E9DCA7] text-[#243D35] px-2 py-0.5 rounded shadow-sm border border-[#252525]">
                {item.editorialBadge}
              </span>
            ) : item.communityPick ? (
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold bg-[#D98555] text-white px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border border-[#252525]">
                <Sparkles className="w-2.5 h-2.5" /> Pilihan Komunitas
              </span>
            ) : null}

            <span className="font-mono text-[10px] bg-[#243D35]/90 text-white px-2 py-0.5 rounded backdrop-blur-sm">
              {item.categoryName}
            </span>
          </div>

          {/* Bookmark Button */}
          <div className="relative pointer-events-auto">
            <div className="flex items-center">
              <button
                onClick={handleQuickSave}
                aria-label={currentlySaved ? 'Hapus simpan' : 'Simpan tempat ini'}
                className={`p-2 rounded-l-md border border-[#252525] transition-all flex items-center justify-center ${
                  currentlySaved
                    ? 'bg-[#D98555] text-white shadow-sm'
                    : 'bg-[#F5F1E8]/90 text-[#252525] hover:bg-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${currentlySaved ? 'fill-white' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFolderMenu(!showFolderMenu);
                }}
                aria-label="Pilih folder koleksi"
                className={`p-1.5 rounded-r-md border-t border-b border-r border-[#252525] transition-all flex items-center justify-center ${
                  currentlySaved
                    ? 'bg-[#C77443] text-white'
                    : 'bg-[#ECE5D6]/90 text-[#252525] hover:bg-white'
                }`}
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Folder Dropdown */}
            {showFolderMenu && (
              <div 
                className="absolute right-0 top-10 z-30 w-52 bg-[#F5F1E8] border-2 border-[#252525] rounded-lg shadow-brutal p-1.5 animate-scale-up"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-mono text-[10px] text-charcoal-muted uppercase tracking-wider px-2 py-1 border-b border-[#252525]/15">
                  Simpan ke Folder:
                </p>
                <div className="flex flex-col gap-1 mt-1">
                  {FOLDERS.map((folder) => {
                    const isInThisFolder = isSaved(item.id, folder.id);
                    return (
                      <button
                        key={folder.id}
                        onClick={(e) => handleSaveToFolder(e, folder.id)}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded font-medium flex items-center justify-between transition-colors ${
                          isInThisFolder
                            ? 'bg-[#243D35] text-[#F5F1E8]'
                            : 'hover:bg-[#ECE5D6] text-[#252525]'
                        }`}
                      >
                        <span className="truncate">{folder.label}</span>
                        {isInThisFolder && <Check className="w-3.5 h-3.5 text-[#E9DCA7] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom image overlay: City & Area */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
          <div className="flex items-center gap-1 font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
            <MapPin className="w-3 h-3 text-[#E9DCA7]" />
            <span>{item.city} — {item.area}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded font-mono text-[11px] backdrop-blur-sm">
            <Star className="w-3 h-3 text-[#E9DCA7] fill-[#E9DCA7]" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div 
            onClick={() => onSelect(item)}
            className="cursor-pointer group/title"
          >
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#243D35] group-hover/title:text-[#D98555] transition-colors leading-tight line-clamp-1">
              {item.title}
            </h3>
            <p className="font-mono text-xs text-[#D98555] font-semibold mt-1 line-clamp-1">
              {item.tagline}
            </p>
          </div>

          <p className="text-sm text-[#252525]/80 mt-2.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#252525]/10">
            <span className="font-mono text-[11px] bg-[#ECE5D6] text-[#243D35] px-2 py-0.5 rounded">
              {item.indoorOutdoor === 'indoor' ? '🏠 Indoor' : item.indoorOutdoor === 'outdoor' ? '🌿 Outdoor' : '🍃 Semi-outdoor'}
            </span>
            <span className="font-mono text-[11px] bg-[#ECE5D6] text-[#243D35] px-2 py-0.5 rounded">
              {item.crowdType === 'solo-friendly' ? '👤 Solo-friendly' : '👥 Group-friendly'}
            </span>
            <span className="font-mono text-[11px] text-charcoal-muted flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" /> {item.suggestedDuration}
            </span>
          </div>
        </div>

        {/* Footer Card: Price & CTA */}
        <div className="mt-4 pt-3 border-t border-[#252525]/15 flex items-center justify-between gap-2">
          <div>
            <span className="block font-mono text-[10px] text-charcoal-subtle uppercase">Estimasi Biaya</span>
            <span className={`font-semibold text-sm ${item.isFree ? 'text-[#243D35] font-bold underline decoration-[#E9DCA7] decoration-2' : 'text-[#252525]'}`}>
              {item.priceDisplay}
            </span>
          </div>

          <button
            onClick={() => onSelect(item)}
            className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] text-xs font-semibold px-3 py-2 rounded-md transition-all flex items-center gap-1 group-hover:translate-x-0.5"
          >
            <span>Lihat Detail</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#E9DCA7]" />
          </button>
        </div>
      </div>
    </div>
  );
};
