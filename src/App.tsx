import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { MapPage } from './pages/MapPage';
import { PlannerPage } from './pages/PlannerPage';
import { EventsPage } from './pages/EventsPage';
import { SavedPage } from './pages/SavedPage';
import { AboutPage } from './pages/AboutPage';
import { DetailModal } from './components/DetailModal';
import { SubmitModal } from './components/SubmitModal';
import { Toast } from './components/Toast';
import { SavedProvider } from './context/SavedContext';
import { CategoryId, DiscoveryItem } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const hash = window.location.hash.replace('#', '') as ActiveTab;
    if (['home', 'explore', 'map', 'planner', 'events', 'saved', 'about'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Modal and Toast States
  const [selectedDiscovery, setSelectedDiscovery] = useState<DiscoveryItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; sub?: string }>({
    isVisible: false,
    message: '',
    sub: '',
  });

  // Global filters passed between Home and Explore
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedCity, setSelectedCity] = useState<string>('Semua Kota');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync state with URL hash
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (['home', 'explore', 'map', 'planner', 'events', 'saved', 'about'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (message: string, sub?: string) => {
    setToast({ isVisible: true, message, sub });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3800);
  };

  const handleCategoryFilterFromHome = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActiveTab('explore');
  };

  const handleCityFilterFromHome = (city: string) => {
    setSelectedCity(city);
    setActiveTab('explore');
  };

  return (
    <SavedProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#252525]">
        {/* Top Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          openSubmitModal={() => setIsSubmitModalOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomePage
              setActiveTab={setActiveTab}
              onSelectDiscovery={setSelectedDiscovery}
              onFilterCategory={handleCategoryFilterFromHome}
              onFilterCity={handleCityFilterFromHome}
              onShowToast={showToast}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'explore' && (
            <ExplorePage
              onSelectDiscovery={setSelectedDiscovery}
              onShowToast={showToast}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'map' && (
            <MapPage
              onSelectDiscovery={setSelectedDiscovery}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'planner' && (
            <PlannerPage
              onSelectDiscovery={setSelectedDiscovery}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'events' && (
            <EventsPage
              openSubmitModal={() => setIsSubmitModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'saved' && (
            <SavedPage
              setActiveTab={setActiveTab}
              onSelectDiscovery={setSelectedDiscovery}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'about' && (
            <AboutPage
              setActiveTab={setActiveTab}
              openSubmitModal={() => setIsSubmitModalOpen(true)}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          setActiveTab={setActiveTab}
          openSubmitModal={() => setIsSubmitModalOpen(true)}
        />

        {/* Detail Modal */}
        <DetailModal
          item={selectedDiscovery}
          onClose={() => setSelectedDiscovery(null)}
          onShowToast={showToast}
        />

        {/* Submit Discovery Modal */}
        <SubmitModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          onShowToast={showToast}
        />

        {/* Toast Notifications */}
        <Toast
          message={toast.message}
          subMessage={toast.sub}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
      </div>
    </SavedProvider>
  );
}

export default App;
