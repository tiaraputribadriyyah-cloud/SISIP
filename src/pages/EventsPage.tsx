import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowUpRight, 
  PlusCircle, 
  Check, 
  Sparkles, 
  Instagram, 
  Filter,
  X,
  Ticket
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { EventItem } from '../types';
import confetti from 'canvas-confetti';

interface EventsPageProps {
  openSubmitModal: () => void;
  onShowToast: (message: string, sub?: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ openSubmitModal, onShowToast }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Semua');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const filteredEvents = EVENTS_DATA.filter((e) => {
    if (selectedCity !== 'Semua' && e.city !== selectedCity) return false;
    return true;
  });

  const handleOpenRsvp = (evt: EventItem) => {
    setSelectedEvent(evt);
    setRsvpSuccess(false);
    setShowRsvpModal(true);
  };

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;

    setRsvpSuccess(true);
    onShowToast('RSVP Terkonfirmasi!', `Tiket dikirim ke ${rsvpEmail}`);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b-2 border-[#252525] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#D98555] tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Kolektif & Lokakarya Terbatas</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#243D35]">
            Community & Events
          </h1>
          <p className="text-sm sm:text-base text-[#252525]/80 mt-1 max-w-2xl font-sans">
            Aktivitas berkesadaran, kelas kreatif tangan, pasar kaget kurasian, dan lingkar diskusi hangat tanpa jarak.
          </p>
        </div>

        {/* Submit Event CTA */}
        <button
          onClick={openSubmitModal}
          className="bg-[#243D35] hover:bg-[#1B3029] text-[#E9DCA7] px-4 py-2.5 rounded-lg border border-[#252525] shadow-brutal-sm font-mono text-xs font-bold flex items-center gap-2 self-start md:self-end"
        >
          <PlusCircle className="w-4 h-4 text-[#D98555]" />
          <span>Submit Event / Komunitas</span>
        </button>
      </div>

      {/* City Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="font-mono text-xs font-bold text-[#243D35] uppercase mr-2 shrink-0">
          Filter Kota:
        </span>
        {['Semua', 'Jakarta', 'Bandung', 'Yogyakarta', 'Surabaya'].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCity(c)}
            className={`font-mono text-xs px-3.5 py-1.5 rounded-full border transition-all shrink-0 ${
              selectedCity === c
                ? 'bg-[#243D35] text-[#E9DCA7] border-[#252525] font-bold shadow-brutal-sm'
                : 'bg-white border-[#252525]/30 hover:border-[#252525] text-[#252525]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="group bg-[#FAF8F3] border-2 border-[#252525] rounded-xl overflow-hidden shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Event Image */}
              <div className="aspect-[16/10] overflow-hidden bg-[#ECE5D6] relative">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#243D35]/90 text-[#E9DCA7] font-mono text-[10px] px-2.5 py-1 rounded font-bold uppercase border border-[#252525] backdrop-blur-sm">
                  {evt.category}
                </div>
                <div className="absolute top-3 right-3 bg-[#FAF8F3] text-[#243D35] font-mono text-[10px] px-2 py-0.5 rounded font-bold border border-[#252525]">
                  Sisa {evt.slotsLeft} slot
                </div>
              </div>

              {/* Event Body */}
              <div className="p-5 space-y-3">
                <div className="font-mono text-xs text-[#D98555] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.date}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#243D35] leading-snug group-hover:text-[#D98555] transition-colors">
                  {evt.title}
                </h3>

                <p className="text-xs text-[#252525]/75 leading-relaxed line-clamp-2">
                  {evt.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs font-mono text-[#252525]/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-charcoal-subtle" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-charcoal-subtle" />
                    <span className="truncate">{evt.city} • {evt.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-charcoal-subtle" />
                    <span>Kapasitas: {evt.capacity}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {evt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] bg-[#ECE5D6] text-[#243D35] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-3 border-t border-[#252525]/15 flex items-center justify-between gap-3 bg-[#F5F1E8]">
              <div>
                <span className="block font-mono text-[10px] text-charcoal-subtle uppercase">
                  Biaya Masuk
                </span>
                <span className="font-semibold text-sm text-[#243D35]">
                  {evt.priceDisplay}
                </span>
              </div>

              <button
                onClick={() => handleOpenRsvp(evt)}
                className="bg-[#D98555] hover:bg-[#C77443] text-white font-bold text-xs px-4 py-2 rounded-lg border border-[#252525] shadow-brutal-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5"
              >
                <span>Daftar / Detail</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E9DCA7]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Submit a Discovery Banner */}
      <section className="rounded-2xl border-2 border-[#252525] bg-[#E9DCA7] p-8 sm:p-10 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="font-mono text-xs uppercase font-bold text-[#243D35] bg-[#FAF8F3] px-2.5 py-0.5 rounded border border-[#252525]">
            Ruang Terbuka Komunitas
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#243D35]">
            Mengadakan Workshop, Pop-up Market, atau Book Club?
          </h3>
          <p className="text-sm text-[#243D35]/85 leading-relaxed font-sans">
            Kami senang membantu inisiatif independen mendapatkan audiens anak muda yang tepat. Kirimkan detail eventmu secara gratis ke tim kurator SISIP.
          </p>
        </div>

        <button
          onClick={openSubmitModal}
          className="bg-[#243D35] hover:bg-[#1B3029] text-[#F5F1E8] font-bold text-sm px-6 py-3.5 rounded-xl border border-[#252525] shadow-brutal-sm shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-[#E9DCA7]" />
          <span>Kirimkan Event Kamu Sekarang</span>
        </button>
      </section>

      {/* RSVP / Event Detail Modal */}
      {showRsvpModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F5F1E8] border-2 border-[#252525] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#243D35] text-[#F5F1E8] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#E9DCA7] uppercase">
                {selectedEvent.category} • {selectedEvent.city}
              </span>
              <button 
                onClick={() => setShowRsvpModal(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#243D35]">
                  {selectedEvent.title}
                </h3>
                <p className="font-mono text-xs text-[#D98555] font-semibold mt-1">
                  Diselenggarakan oleh: {selectedEvent.organizer}
                </p>
              </div>

              <div className="bg-[#ECE5D6] p-4 rounded-xl border border-[#252525]/15 space-y-1.5 font-mono text-xs">
                <p>📅 <strong>Waktu:</strong> {selectedEvent.date}, {selectedEvent.time}</p>
                <p>📍 <strong>Lokasi:</strong> {selectedEvent.location}</p>
                <p>📌 <strong>Alamat:</strong> {selectedEvent.address}</p>
                <p>🎟️ <strong>Biaya:</strong> {selectedEvent.priceDisplay}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase font-bold text-[#243D35] mb-1.5">
                  Yang Kamu Dapatkan di Sesi Ini:
                </h4>
                <ul className="space-y-1 text-xs text-[#252525]/85">
                  {selectedEvent.whatYouGet.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D98555] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {rsvpSuccess ? (
                <div className="bg-emerald-100 border-2 border-emerald-800 rounded-xl p-5 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-emerald-950">
                    Sampai Jumpa, {rsvpName}!
                  </h4>
                  <p className="text-xs text-emerald-900 leading-relaxed font-sans">
                    Slot partisipasi untuk <strong>"{selectedEvent.title}"</strong> telah diamankan. E-ticket dan tautan grup koordinasi telah dikirim ke <strong>{rsvpEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setShowRsvpModal(false)}
                    className="mt-3 bg-emerald-800 text-white text-xs font-mono font-bold px-4 py-2 rounded-lg"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmRsvp} className="space-y-3 pt-2 border-t border-[#252525]/15">
                  <h4 className="font-mono text-xs uppercase font-bold text-[#243D35]">
                    Konfirmasi Kehadiran (RSVP Cepat):
                  </h4>
                  <div>
                    <label className="block text-[11px] font-mono text-charcoal-muted uppercase mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: Nadia Kirana"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full bg-white border border-[#252525] rounded-lg px-3 py-2 text-xs font-sans focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-charcoal-muted uppercase mb-1">
                      Email Konfirmasi Tiket
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nadia@example.com"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full bg-white border border-[#252525] rounded-lg px-3 py-2 text-xs font-sans focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#D98555] hover:bg-[#C77443] text-white font-bold text-xs sm:text-sm rounded-lg border border-[#252525] shadow-brutal-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <Ticket className="w-4 h-4 text-[#E9DCA7]" />
                    <span>Daftar / Reservasi Slot</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
