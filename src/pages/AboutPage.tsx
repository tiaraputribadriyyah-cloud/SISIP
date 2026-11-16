import React from 'react';
import { Sparkles, Heart, Compass, CheckCircle2, Users, MapPin, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../components/Navbar';

interface AboutPageProps {
  setActiveTab: (tab: ActiveTab) => void;
  openSubmitModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab, openSubmitModal }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. HERO MANIFESTO */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#E9DCA7] text-[#243D35] px-3.5 py-1 rounded-full border border-[#252525] shadow-brutal-sm font-mono text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#D98555]" />
          <span>Tentang SISIP.</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#243D35] leading-tight">
          "We believe life doesn't always need big adventures. Sometimes, the smallest discoveries become the best memories."
        </h1>

        <p className="font-sans text-base sm:text-xl text-[#252525]/85 leading-relaxed">
          SISIP hadir karena kami percaya bahwa rasa penasaran anak muda Indonesia tidak selalu harus dipuaskan dengan tiket pesawat mahal atau liburan jauh. Keajaiban sering kali tersembunyi di ruko lantai dua, gang belakang stasiun, atau bengkel seni di ujung kota.
        </p>
      </div>

      {/* 2. THREE PILLARS EDITORIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF8F3] border-2 border-[#252525] rounded-xl p-6 shadow-brutal-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#243D35] text-[#E9DCA7] flex items-center justify-center font-mono font-bold text-lg border border-[#252525]">
            01
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#243D35]">
            Autentisitas Lokal
          </h3>
          <p className="text-sm text-[#252525]/80 leading-relaxed font-sans">
            Kami menghindari tempat komersial yang terlalu bising atau sekadar viral sesaat demi algoritma. Yang kami cari adalah ruang yang punya jiwa, cerita pemiliknya, dan ketulusan rasa.
          </p>
        </div>

        <div className="bg-[#FAF8F3] border-2 border-[#252525] rounded-xl p-6 shadow-brutal-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#D98555] text-white flex items-center justify-center font-mono font-bold text-lg border border-[#252525]">
            02
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#243D35]">
            Ruang Bertumbuh
          </h3>
          <p className="text-sm text-[#252525]/80 leading-relaxed font-sans">
            Dari kelas tembikar, kamar gelap foto analog, hingga zine-making. Kami ingin anak muda kembali menyentuh material fisik dan melatih kreativitas tanpa takut dihakimi.
          </p>
        </div>

        <div className="bg-[#FAF8F3] border-2 border-[#252525] rounded-xl p-6 shadow-brutal-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#E9DCA7] text-[#243D35] flex items-center justify-center font-mono font-bold text-lg border border-[#252525]">
            03
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#243D35]">
            Koneksi Tanpa Sekat
          </h3>
          <p className="text-sm text-[#252525]/80 leading-relaxed font-sans">
            Menemukan teman sehobi di kota besar tidak boleh rumit. SISIP menghubungkan komunitas buku independen, pelari senja santai, dan pegiat seni dalam suasana akrab.
          </p>
        </div>
      </div>

      {/* 3. STORY EDITORIAL BLOCK */}
      <div className="bg-[#243D35] text-[#F5F1E8] border-2 border-[#252525] rounded-2xl p-8 sm:p-12 shadow-brutal space-y-6">
        <div className="flex items-center gap-2 text-[#E9DCA7] font-mono text-xs uppercase tracking-wider font-bold">
          <Users className="w-4 h-4" />
          <span>Mengapa Nama "SISIP."?</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F1E8] leading-tight">
          Menyisipkan jeda kecil di sela rutinitas yang serba cepat.
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-[#F5F1E8]/85 font-sans leading-relaxed">
          <p>
            Kata <strong>"Menyisipkan"</strong> bermakna memasukkan sesuatu yang kecil namun berharga di antara lipatan-lipatan waktu. Di tengah tuntutan perkuliahan, pekerjaan, dan tekanan sosial generasi Z, kita semua butuh ruang aman untuk bernapas.
          </p>
          <p>
            SISIP bukan sekadar direktori tempat, melainkan kurasi rasa. Kami menguji coba setiap rekomendasi: apakah kopinya benar-benar diseduh dengan cinta? Apakah suasananya ramah bagi yang datang sendirian? Apakah harganya masuk akal bagi kantong anak muda?
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 border-t border-[#F5F1E8]/15">
          <button
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#D98555] hover:bg-[#C77443] text-white font-bold text-sm px-6 py-3 rounded-lg border border-[#252525] shadow-brutal-sm flex items-center gap-2 transition-all"
          >
            <span>Mulai Temukan Tempat</span>
            <ArrowRight className="w-4 h-4 text-[#E9DCA7]" />
          </button>

          <button
            onClick={openSubmitModal}
            className="bg-transparent hover:bg-white/10 text-[#E9DCA7] font-mono text-xs font-bold px-4 py-3 rounded-lg border border-[#E9DCA7]/40 flex items-center gap-2 transition-colors"
          >
            <span>Ikut Mengkurasi Tempatmu ↗</span>
          </button>
        </div>
      </div>

      {/* 4. VALUES CHECKLIST */}
      <div className="bg-[#FAF8F3] border-2 border-[#252525] rounded-2xl p-8 space-y-6 shadow-brutal-sm">
        <h3 className="font-serif text-2xl font-bold text-[#243D35]">
          Prinsip Kurasi Editorial SISIP
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            'Anti-Gatekeeping: Kami percaya tempat bagus berhak didukung secara etis.',
            'Jujur & Transparan: Estimasi biaya kami cantumkan sejelas mungkin.',
            'Solo-Friendly Verified: Kami beri tanda khusus untuk ruang yang nyaman dikunjungi sendiri.',
            'Dukungan Usaha Mandiri: Prioritas kami adalah roaster lokal, perajin rumahan, dan seniman independen.',
            'Data Terverifikasi: Koordinat peta dan jam operasional dicek langsung sebelum tayang.',
            'Bebas Tekanan FOMO: Eksplorasi dengan ritmemu sendiri, bukan sekadar ikut tren.',
          ].map((principle, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#ECE5D6]/60 border border-[#252525]/15">
              <CheckCircle2 className="w-4 h-4 text-[#243D35] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#252525] font-medium leading-snug">
                {principle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
