import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Sparkles, 
  Filter, 
  Star, 
  Compass, 
  ArrowUpRight, 
  Check, 
  Layers,
  Info
} from 'lucide-react';
import L from 'leaflet';
import { DISCOVERIES_DATA } from '../data/discoveries';
import { CATEGORIES, CITIES } from '../data/categories';
import { CategoryId, DiscoveryItem } from '../types';

interface MapPageProps {
  onSelectDiscovery: (item: DiscoveryItem) => void;
  onShowToast: (message: string, sub?: string) => void;
}

// City coordinates mapping for map flyTo
const CITY_CENTERS: Record<string, [number, number, number]> = {
  'Semua Kota': [-6.9, 108.5, 7],
  'Jakarta': [-6.2088, 106.8456, 12],
  'Bandung': [-6.9175, 107.6191, 13],
  'Yogyakarta': [-7.7956, 110.3695, 13],
  'Surabaya': [-7.2575, 112.7521, 13],
  'Bali': [-8.6500, 115.1385, 12],
  'Bekasi': [-6.2383, 106.9756, 13],
  'Semarang': [-7.0051, 110.4381, 12],
};

export const MapPage: React.FC<MapPageProps> = ({ onSelectDiscovery, onShowToast }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedCity, setSelectedCity] = useState<string>('Jakarta');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'under-50k' | 'under-150k'>('all');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Filtered discoveries for map
  const filteredItems = DISCOVERIES_DATA.filter((item) => {
    if (selectedCity !== 'Semua Kota' && item.city !== selectedCity) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (priceFilter === 'free' && !item.isFree) return false;
    if (priceFilter === 'under-50k' && item.priceNum > 50000) return false;
    if (priceFilter === 'under-150k' && item.priceNum > 150000) return false;
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCenter: [number, number] = [-6.2088, 106.8456];
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: 12,
        scrollWheelZoom: true,
      });

      // CartoDB Positron / OpenStreetMap warm clean tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map alive or cleanup if unmounting
    };
  }, []);

  // Update markers when filteredItems or activeItemId change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    filteredItems.forEach((item) => {
      const isSelected = item.id === activeItemId;
      
      // Custom HTML Pin Marker
      const iconHtml = `
        <div class="relative group cursor-pointer">
          <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#252525] shadow-brutal-sm transition-transform duration-200 ${
            isSelected 
              ? 'bg-[#D98555] text-white scale-125 z-30' 
              : 'bg-[#243D35] text-[#E9DCA7] hover:scale-110 z-10'
          }">
            <span style="font-size: 14px;">${
              item.category === 'food-coffee' ? '☕' :
              item.category === 'workshops' ? '🏺' :
              item.category === 'hidden-places' ? '🌿' :
              item.category === 'art-culture' ? '🎨' :
              item.category === 'budget-friendly' ? '🎟️' :
              item.category === 'popup-markets' ? '🛍️' : '📍'
            }</span>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#252525] rotate-45"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(item.coordinates, { icon: customIcon });

      const popupContent = `
        <div style="width: 240px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 110px; object-fit: cover; border-bottom: 1.5px solid #252525;" />
          <div style="padding: 12px; background: #F5F1E8;">
            <span style="font-family: 'Space Mono', monospace; font-size: 9px; text-transform: uppercase; background: #243D35; color: #E9DCA7; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
              ${item.categoryName}
            </span>
            <h4 style="font-family: 'DM Serif Display', serif; font-size: 16px; font-weight: bold; color: #243D35; margin: 6px 0 2px 0; line-height: 1.2;">
              ${item.title}
            </h4>
            <p style="font-size: 11px; color: #4A4A4A; margin: 0 0 8px 0;">${item.city} — ${item.area}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(37,37,37,0.15); padding-top: 8px;">
              <span style="font-size: 11px; font-weight: bold; color: #D98555;">${item.priceDisplay}</span>
              <a href="${item.mapsUrl}" target="_blank" rel="noreferrer" style="font-size: 10px; font-family: 'Space Mono', monospace; background: #243D35; color: #F5F1E8; padding: 4px 8px; border-radius: 4px; text-decoration: none; font-weight: bold;">
                Petunjuk Arah ↗
              </a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveItemId(item.id);
      });

      markersLayer.addLayer(marker);
    });

    // Fly to city center if items exist
    const cityConfig = CITY_CENTERS[selectedCity];
    if (cityConfig && filteredItems.length > 0) {
      map.flyTo([cityConfig[0], cityConfig[1]], cityConfig[2], { duration: 1.2 });
    }
  }, [filteredItems, selectedCity, activeItemId]);

  const handleItemClick = (item: DiscoveryItem) => {
    setActiveItemId(item.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(item.coordinates, 15, { duration: 1.0 });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner & Demo Warning */}
      <div className="bg-[#E9DCA7] border-2 border-[#252525] rounded-xl p-4 sm:p-5 shadow-brutal-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-[#243D35] text-[#E9DCA7] rounded-lg border border-[#252525] shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#243D35]">
              Peta Eksplorasi Hidden Gems
            </h1>
            <p className="text-xs sm:text-sm text-[#243D35]/80 font-sans mt-0.5">
              Jelajahi titik-titik kreatif, kedai kopi slow bar, dan oase tersembunyi berdasarkan lokasi.
            </p>
          </div>
        </div>

        {/* Demo Indicator Notice */}
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] bg-[#FAF8F3] text-[#243D35] px-3 py-1.5 rounded-lg border border-[#252525] font-semibold shrink-0">
          <Info className="w-3.5 h-3.5 text-[#D98555]" />
          <span>Data Contoh Demo • 100% Realistis</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#F5F1E8] border-2 border-[#252525] rounded-xl p-4 shadow-brutal-sm flex flex-wrap items-center justify-between gap-4">
        {/* City Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#243D35] uppercase mr-1">Kota:</span>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`font-mono text-xs px-3 py-1 rounded-full border transition-all ${
                selectedCity === city
                  ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] font-bold shadow-brutal-sm'
                  : 'bg-white text-[#252525] border-[#252525]/30 hover:border-[#252525]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Category & Price Dropdowns */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#252525]/70">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-white border border-[#252525] rounded-md px-2.5 py-1 text-xs font-medium focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#252525]/70">Biaya:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="bg-white border border-[#252525] rounded-md px-2.5 py-1 text-xs font-medium focus:outline-none"
            >
              <option value="all">Semua Harga</option>
              <option value="free">Gratis</option>
              <option value="under-50k">&lt; Rp50k</option>
              <option value="under-150k">&lt; Rp150k</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Map & Side List Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[640px]">
        {/* Left Side: Places List (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-[#FAF8F3] border-2 border-[#252525] rounded-xl shadow-brutal-sm overflow-hidden">
          {/* Header */}
          <div className="p-3.5 bg-[#ECE5D6] border-b border-[#252525]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#243D35] uppercase">
                Daftar Tempat di {selectedCity}
              </span>
              <span className="font-mono text-[11px] bg-[#243D35] text-[#E9DCA7] px-2 py-0.2 rounded font-bold">
                {filteredItems.length}
              </span>
            </div>
            <span className="text-[11px] font-mono text-charcoal-muted">Klik untuk zoom peta</span>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isActive = item.id === activeItemId;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`cursor-pointer p-3.5 rounded-lg border-2 transition-all flex gap-3 ${
                      isActive
                        ? 'bg-[#E9DCA7]/60 border-[#243D35] shadow-brutal-sm'
                        : 'bg-white border-[#252525]/20 hover:border-[#252525] hover:bg-[#F5F1E8]'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-[#ECE5D6] shrink-0 border border-[#252525]/20">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#D98555] truncate">
                            {item.categoryName}
                          </span>
                          <span className="font-mono text-[10px] text-charcoal-muted shrink-0">
                            ★ {item.rating.toFixed(1)}
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#243D35] truncate leading-tight mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#252525]/70 truncate mt-0.5 font-sans">
                          {item.city} — {item.area}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#252525]/10 mt-2">
                        <span className="font-semibold text-xs text-[#243D35]">
                          {item.priceDisplay}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={item.mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 rounded bg-[#243D35] text-[#E9DCA7] hover:bg-[#1B3029] transition-colors"
                            title="Buka Google Maps"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDiscovery(item);
                            }}
                            className="text-[11px] font-mono font-bold text-[#D98555] hover:underline px-1"
                          >
                            Detail →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 px-4 space-y-2">
                <MapPin className="w-8 h-8 text-[#D98555] mx-auto" />
                <p className="font-serif text-lg font-bold text-[#243D35]">Tidak ada pin lokasi</p>
                <p className="text-xs text-[#252525]/70">
                  Coba ubah filter kategori atau pilih kota lainnya di atas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Leaflet Interactive Map (7 cols on lg) */}
        <div className="lg:col-span-7 h-full rounded-xl border-2 border-[#252525] shadow-brutal overflow-hidden relative">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Overlay Badge */}
          <div className="absolute top-4 right-4 z-20 bg-[#F5F1E8]/95 border-2 border-[#252525] rounded-lg px-3 py-1.5 shadow-brutal-sm font-mono text-[11px] font-bold text-[#243D35] flex items-center gap-1.5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{filteredItems.length} Pins Aktif</span>
          </div>
        </div>
      </div>
    </div>
  );
};
