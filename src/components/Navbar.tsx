import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Map, 
  CalendarDays, 
  Bookmark, 
  Menu, 
  X, 
  Sparkles, 
  PlusCircle, 
  Layers, 
  Info,
  Route
} from 'lucide-react';
import { useSaved } from '../context/SavedContext';

export type ActiveTab = 'home' | 'explore' | 'map' | 'planner' | 'events' | 'saved' | 'about';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openSubmitModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openSubmitModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalSavedCount } = useSaved();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'explore' as ActiveTab, label: 'Explore', icon: Compass },
    { id: 'map' as ActiveTab, label: 'Peta', icon: Map },
    { id: 'planner' as ActiveTab, label: 'Planner', icon: Route, badge: 'Baru' },
    { id: 'events' as ActiveTab, label: 'Event', icon: CalendarDays },
    { 
      id: 'saved' as ActiveTab, 
      label: 'Saved', 
      icon: Bookmark, 
      count: totalSavedCount 
    },
    { id: 'about' as ActiveTab, label: 'Tentang SISIP', icon: Info },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#F5F1E8]/95 backdrop-blur-md border-[#252525]/20 shadow-sm py-3'
            : 'bg-[#F5F1E8] border-[#252525] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group flex items-baseline gap-2.5 select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#243D35] group-hover:text-[#D98555] transition-colors">
                SISIP<span className="text-[#D98555]">.</span>
              </span>
            </div>
            <span className="hidden md:inline-block font-mono text-[11px] text-[#252525]/70 tracking-tight border-l border-[#252525]/20 pl-2.5">
              Tempat kecil untuk hal baru
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#243D35] text-[#F5F1E8] shadow-brutal-sm font-semibold'
                      : 'text-[#252525] hover:text-[#243D35] hover:bg-[#ECE5D6]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E9DCA7]' : 'text-[#243D35]/70'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-[#D98555] text-white text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#E9DCA7] text-[#243D35]' : 'bg-[#243D35] text-[#E9DCA7]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openSubmitModal}
              className="text-xs font-mono font-medium text-[#243D35] hover:text-[#D98555] px-2.5 py-1.5 border border-[#252525]/30 rounded hover:border-[#252525] transition-all flex items-center gap-1.5"
              title="Kirim rekomendasi tempat atau event barumu"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#D98555]" />
              <span>Submit Discovery</span>
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className="bg-[#D98555] hover:bg-[#C77443] text-white text-sm font-medium px-4 py-2 rounded-md shadow-brutal-sm border border-[#252525] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E9DCA7]" />
              <span>Mulai Eksplorasi</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('saved')}
              className="relative p-2 rounded text-[#243D35] border border-[#252525]/30 bg-[#ECE5D6]"
              aria-label="Saved items"
            >
              <Bookmark className="w-5 h-5" />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D98555] text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalSavedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md border border-[#252525] bg-[#ECE5D6] text-[#243D35] hover:bg-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full bg-[#F5F1E8] border-t-2 border-[#252525] rounded-t-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#252525]/15">
              <div>
                <span className="font-serif text-2xl font-bold text-[#243D35]">
                  SISIP<span className="text-[#D98555]">.</span>
                </span>
                <p className="text-xs text-[#252525]/70 font-mono mt-0.5">
                  Tempat kecil untuk hal baru
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full border border-[#252525] hover:bg-cream-200"
              >
                <X className="w-5 h-5 text-[#252525]" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 my-5">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-2 transition-all ${
                      isActive
                        ? 'bg-[#243D35] text-[#F5F1E8] border-[#252525] shadow-brutal-sm'
                        : 'bg-[#ECE5D6]/70 border-[#252525]/20 text-[#252525]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#E9DCA7]' : 'text-[#243D35]'}`} />
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold bg-[#D98555] text-white">
                          {item.count}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 pt-3 border-t border-[#252525]/15">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSubmitModal();
                }}
                className="w-full py-2.5 border border-[#252525] rounded-md font-mono text-xs font-semibold text-[#243D35] bg-[#ECE5D6] flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-[#D98555]" />
                Submit Discovery Kamu
              </button>
              <button
                onClick={() => handleNavClick('explore')}
                className="w-full py-3 bg-[#D98555] text-white font-semibold rounded-md border border-[#252525] shadow-brutal-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#E9DCA7]" />
                Mulai Eksplorasi Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
