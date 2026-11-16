import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  ArrowRight, 
  Check, 
  Share2, 
  Calendar,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DISCOVERIES_DATA } from '../data/discoveries';
import { DiscoveryItem, GeneratedItinerary } from '../types';
import { CITIES } from '../data/categories';

interface PlannerPageProps {
  onSelectDiscovery: (item: DiscoveryItem) => void;
  onShowToast: (message: string, sub?: string) => void;
}

export const PlannerPage: React.FC<PlannerPageProps> = ({ onSelectDiscovery, onShowToast }) => {
  // Input controls
  const [city, setCity] = useState<string>('Jakarta');
  const [budgetPerPerson, setBudgetPerPerson] = useState<number>(100000);
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [activityVibe, setActivityVibe] = useState<string>('santai');
  const [durationHours, setDurationHours] = useState<number>(4);

  // Output State
  const [currentItinerary, setCurrentItinerary] = useState<GeneratedItinerary | null>(() => {
    // Generate initial plan matching the prompt example:
    // Budget Rp100.000, 2 orang, Jakarta, aktivitas santai
    const jktItems = DISCOVERIES_DATA.filter((d) => d.city === 'Jakarta');
    const selected = [
      jktItems.find((d) => d.id === 'disc-2') || jktItems[0], // Ruang Seduh Santa
      jktItems.find((d) => d.id === 'disc-4') || jktItems[1], // Taman Literasi Blok M
      jktItems.find((d) => d.id === 'disc-6') || jktItems[2], // Analog darkroom
    ].filter(Boolean) as DiscoveryItem[];

    return {
      id: 'plan-default',
      city: 'Jakarta',
      budgetPerPerson: 100000,
      peopleCount: 2,
      vibe: 'Santai & Me-Time Hangat',
      durationHours: 4,
      items: selected,
      estimatedTotal: 70000,
      tips: [
        'Naik MRT turun di Stasiun Blok M BCA untuk mobilitas bebas macet.',
        'Mulai santai dengan ngopi di Pasar Santa, lalu lanjut sore di Taman Literasi.',
        'Bawa totebag sendiri untuk buku atau pernak-pernik yang ingin kamu beli.'
      ],
      createdAt: new Date().toISOString(),
    };
  });

  const [isSaved, setIsSaved] = useState(false);

  // Plan generation algorithm
  const generatePlan = () => {
    const candidates = DISCOVERIES_DATA.filter((item) => {
      if (city !== 'Semua Kota' && item.city !== city) return false;
      return true;
    });

    // If city has few items, fallback to any item
    const pool = candidates.length >= 2 ? candidates : DISCOVERIES_DATA;
    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    // Pick 2-4 items based on duration
    const count = durationHours <= 3 ? 2 : durationHours <= 5 ? 3 : 4;
    const picked = shuffled.slice(0, count);

    const totalEstimatePerPerson = picked.reduce((acc, curr) => acc + curr.priceNum, 0);

    const newPlan: GeneratedItinerary = {
      id: `plan-${Date.now()}`,
      city,
      budgetPerPerson,
      peopleCount,
      vibe: activityVibe,
      durationHours,
      items: picked,
      estimatedTotal: totalEstimatePerPerson,
      tips: [
        `Rute ini dirancang untuk ${peopleCount} orang di ${city} dengan estimasi total Rp${totalEstimatePerPerson.toLocaleString('id-ID')} per orang.`,
        'Urutan aktivitas sudah disesuaikan agar kamu tidak terburu-buru.',
        'Siapkan kamera hp atau analog untuk menangkap sudut-sudut estetik.',
        'Cek jam operasional sebelum berangkat agar tidak kecele.'
      ],
      createdAt: new Date().toISOString(),
    };

    setCurrentItinerary(newPlan);
    setIsSaved(false);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#243D35', '#D98555', '#E9DCA7'],
      });
    } catch (e) {}

    onShowToast('Itinerary baru berhasil diracik!', `Disesuaikan untuk budget Rp${budgetPerPerson.toLocaleString('id-ID')}`);
  };

  const handleSavePlan = () => {
    if (!currentItinerary) return;

    try {
      const existing = JSON.parse(localStorage.getItem('sisip_saved_plans') || '[]');
      localStorage.setItem('sisip_saved_plans', JSON.stringify([currentItinerary, ...existing]));
      setIsSaved(true);
      onShowToast('Itinerary tersimpan ke koleksi!', 'Bisa kamu buka kapan saja di tab Saved.');
      
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-[#E9DCA7] text-[#243D35] px-3 py-1 rounded-md border border-[#252525] shadow-brutal-sm font-mono text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D98555]" />
          <span>Smart Weekend Generator</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#243D35] leading-tight">
          Plan My Little Escape.
        </h1>
        <p className="font-sans text-base sm:text-lg text-[#252525]/85 mt-2 leading-relaxed">
          Tentukan budget dan preferensimu. SISIP akan meracik 2–4 aktivitas autentik yang saling berdekatan dan pas di kantong anak muda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Config Panel (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F3] border-2 border-[#252525] rounded-2xl p-6 shadow-brutal space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#243D35] pb-3 border-b border-[#252525]/15">
            Preferensi Rencana
          </h3>

          {/* 1. Kota */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase text-[#243D35] mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D98555]" />
              1. Pilih Kota
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya', 'Bali', 'Bekasi'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`py-2 px-2 text-xs font-mono rounded-lg border transition-all ${
                    city === c
                      ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] font-bold shadow-brutal-sm'
                      : 'bg-white border-[#252525]/30 hover:border-[#252525] text-[#252525]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Budget Per Person */}
          <div>
            <div className="flex items-center justify-between mb-2 font-mono text-xs">
              <span className="font-bold uppercase text-[#243D35] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#D98555]" />
                2. Budget Maksimal / Orang
              </span>
              <span className="bg-[#D98555] text-white px-2 py-0.5 rounded font-bold">
                Rp{budgetPerPerson.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[50000, 100000, 175000, 250000].map((b) => (
                <button
                  key={b}
                  onClick={() => setBudgetPerPerson(b)}
                  className={`py-2 px-1 text-xs font-mono rounded-lg border text-center transition-all ${
                    budgetPerPerson === b
                      ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] font-bold shadow-brutal-sm'
                      : 'bg-white border-[#252525]/30 hover:border-[#252525] text-[#252525]'
                  }`}
                >
                  {b <= 50000 ? 'Rp50k' : b <= 100000 ? 'Rp100k' : b <= 175000 ? 'Rp175k' : 'Rp250k+'}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Jumlah Orang */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase text-[#243D35] mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#D98555]" />
              3. Jumlah Orang
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 1, label: 'Solo (1 org)' },
                { count: 2, label: 'Duo (2 org)' },
                { count: 4, label: 'Geng (3-4 org)' },
              ].map((p) => (
                <button
                  key={p.count}
                  onClick={() => setPeopleCount(p.count)}
                  className={`py-2 px-2 text-xs font-mono rounded-lg border transition-all ${
                    peopleCount === p.count
                      ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] font-bold shadow-brutal-sm'
                      : 'bg-white border-[#252525]/30 hover:border-[#252525] text-[#252525]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Jenis Aktivitas */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase text-[#243D35] mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#D98555]" />
              4. Vibe Aktivitas
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'santai', label: '☕ Santai & Ngopi' },
                { id: 'kreatif', label: '🎨 Workshop Kreatif' },
                { id: 'hidden', label: '🌿 Hidden Gem Hunt' },
                { id: 'budget', label: '🎟️ Hemat & Ramah Dompet' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActivityVibe(v.id)}
                  className={`py-2 px-2.5 text-xs font-semibold rounded-lg border text-left transition-all ${
                    activityVibe === v.id
                      ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] shadow-brutal-sm font-bold'
                      : 'bg-white border-[#252525]/30 hover:border-[#252525] text-[#252525]'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Durasi Kegiatan */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase text-[#243D35] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D98555]" />
              5. Alokasi Waktu
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { h: 3, label: '3 Jam (Quick)' },
                { h: 5, label: '5 Jam (Sore)' },
                { h: 8, label: '8 Jam (Full)' },
              ].map((d) => (
                <button
                  key={d.h}
                  onClick={() => setDurationHours(d.h)}
                  className={`py-2 px-1 text-xs font-mono rounded-lg border text-center transition-all ${
                    durationHours === d.h
                      ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] font-bold shadow-brutal-sm'
                      : 'bg-white border-[#252525]/30 hover:border-[#252525] text-[#252525]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePlan}
            className="w-full py-3.5 bg-[#D98555] hover:bg-[#C77443] text-white font-bold text-sm rounded-xl border-2 border-[#252525] shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#E9DCA7]" />
            <span>Generate Itinerary Pelarian</span>
          </button>
        </div>

        {/* Right Output Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {currentItinerary ? (
            <div className="bg-[#F5F1E8] border-2 border-[#252525] rounded-2xl p-6 sm:p-8 shadow-brutal space-y-6">
              {/* Header Box */}
              <div className="border-b-2 border-[#252525] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs uppercase font-bold bg-[#243D35] text-[#E9DCA7] px-2.5 py-0.5 rounded">
                      {currentItinerary.city}
                    </span>
                    <span className="font-mono text-xs text-[#252525]/70">
                      {currentItinerary.peopleCount} Orang • ±{currentItinerary.durationHours} Jam
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#243D35]">
                    Rencana Akhir Pekan Kurasi SISIP
                  </h3>
                  <p className="font-sans text-xs text-[#D98555] font-semibold mt-1">
                    Cocok untuk liburan singkat tanpa drama macet dan boros
                  </p>
                </div>

                {/* Total Cost Badge */}
                <div className="bg-[#E9DCA7] border-2 border-[#252525] rounded-xl p-3 text-right shrink-0">
                  <span className="block font-mono text-[10px] text-charcoal-muted uppercase">
                    Estimasi Total Biaya / Orang
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#243D35]">
                    Rp{currentItinerary.estimatedTotal.toLocaleString('id-ID')}
                  </span>
                  <span className="block font-mono text-[10px] text-emerald-800 font-bold">
                    ✓ Sesuai Target Budget
                  </span>
                </div>
              </div>

              {/* Step by step timeline */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#243D35]">
                  Alur Aktivitas ({currentItinerary.items.length} Tempat):
                </h4>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-[#252525]/20">
                  {currentItinerary.items.map((item, index) => (
                    <div key={item.id} className="relative flex items-start gap-4">
                      {/* Step Number Dot */}
                      <div className="relative z-10 w-10 h-10 rounded-full bg-[#243D35] text-[#E9DCA7] border-2 border-[#252525] flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-brutal-sm">
                        0{index + 1}
                      </div>

                      {/* Item Card */}
                      <div className="flex-1 bg-white border-2 border-[#252525] rounded-xl p-4 shadow-brutal-sm hover:border-[#D98555] transition-all flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-28 h-24 rounded-lg overflow-hidden bg-[#ECE5D6] shrink-0 border border-[#252525]/15">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] font-bold text-[#D98555] uppercase">
                                {item.categoryName}
                              </span>
                              <span className="font-mono text-xs font-bold text-[#243D35]">
                                {item.priceDisplay}
                              </span>
                            </div>
                            <h5 className="font-serif text-lg font-bold text-[#243D35] leading-snug mt-0.5">
                              {item.title}
                            </h5>
                            <p className="text-xs text-[#252525]/75 line-clamp-2 mt-1">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#252525]/10 mt-2 text-xs">
                            <span className="text-[#252525]/60 font-mono text-[11px]">
                              📍 {item.area}
                            </span>
                            <button
                              onClick={() => onSelectDiscovery(item)}
                              className="text-[#D98555] font-mono font-bold text-[11px] hover:underline flex items-center gap-0.5"
                            >
                              <span>Lihat Detail</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curator Tips */}
              <div className="bg-[#FAF8F3] border-2 border-dashed border-[#243D35]/30 rounded-xl p-4 space-y-2">
                <span className="font-mono text-xs uppercase font-bold text-[#243D35] block">
                  💡 Tips Kurator untuk Rute Ini:
                </span>
                <ul className="space-y-1.5 text-xs text-[#252525]/85">
                  {currentItinerary.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D98555] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons: Generate Another & Save My Plan */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#252525]/15">
                <button
                  onClick={generatePlan}
                  className="px-5 py-2.5 rounded-lg border-2 border-[#252525] bg-white text-[#243D35] hover:bg-[#ECE5D6] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-[#D98555]" />
                  <span>Generate Another Plan</span>
                </button>

                <button
                  onClick={handleSavePlan}
                  className={`px-6 py-2.5 rounded-lg border-2 border-[#252525] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all ${
                    isSaved
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#243D35] text-[#E9DCA7] hover:bg-[#1B3029]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                  <span>{isSaved ? 'Rencana Sudah Tersimpan ✓' : 'Save My Plan'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF8F3] border-2 border-dashed border-[#252525]/30 rounded-2xl p-8 space-y-4">
              <Compass className="w-12 h-12 text-[#D98555] mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-[#243D35]">
                Mulai Racik Rencana Akhir Pekanmu
              </h3>
              <p className="text-sm text-[#252525]/70 max-w-md mx-auto">
                Pilih opsi di sebelah kiri, lalu tekan tombol "Generate Itinerary Pelarian" untuk melihat rekomendasi rute.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
