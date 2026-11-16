# SISIP. — Tempat kecil untuk hal baru.

> Platform discovery berbasis lifestyle untuk Gen Z Indonesia. Menemukan hidden gems, aktivitas kreatif, komunitas lokal, workshop, pop-up events, dan pengalaman autentik yang belum mainstream.

![SISIP Cover](https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80)

---

## ✦ Tentang SISIP.

*"We believe life doesn't always need big adventures. Sometimes, the smallest discoveries become the best memories."*

SISIP hadir untuk membantu anak muda Indonesia (usia 18–27 tahun) lebih dekat dengan tempat lokal, ruang seni independen, dan komunitas kreatif yang hangat di kota-kota seperti Jakarta, Bandung, Yogyakarta, Surabaya, Bali, dan Bekasi.

---

## 🎨 Visual Identity & Design System

* **Warm Cream** (`#F5F1E8`): Latar belakang utama bernuansa kertas editorial hangat.
* **Deep Forest Green** (`#243D35`): Warna primer berkarakter kuat, tenang, dan dewasa.
* **Muted Orange** (`#D98555`): Aksen playful terakota untuk call-to-action dan highlight.
* **Soft Yellow** (`#E9DCA7`): Aksen *highlighter tape* dan badge pilihan kurator.
* **Charcoal** (`#252525`): Tipografi dan garis border brutalist halus (*paper-border*).
* **Typography**:
  * Headline: **DM Serif Display** (estetika majalah independen)
  * Body: **Plus Jakarta Sans** (bersih, modern, dan sangat nyaman dibaca)
  * Meta & Badge: **Space Mono**

---

## ✨ Fitur Utama

1. **Homepage Eksploratif**:
   * Hero headline & subheadline editorial.
   * Search bar instan untuk menemukan tempat, aktivitas, dan pengalaman.
   * Filter cepat pilihan kota (Jakarta, Bandung, Jogja, Surabaya, Bali, Bekasi).
   * Kurasi mingguan *Featured Discovery*.
   * Running marquee ticker nuansa print-press.

2. **Explore Page**:
   * Kategori lengkap: *Hidden Places, Creative Workshops, Local Communities, Weekend Plans, Food & Coffee, Art & Culture, Pop-up Markets, Budget-friendly Activities*.
   * Multi-filter: Kota, rentang biaya (Gratis, <50k, 50k-150k, >150k), karakter ruang (*indoor/outdoor*), dan vibe kunjungan (*solo/group*).
   * Modal detail komprehensif: *Catatan Kurator SISIP*, cerita tempat, jam buka, panduan rute Google Maps, dan tautan Instagram.

3. **Interactive Map Discovery (Peta)**:
   * Peta interaktif berbasis Leaflet dengan custom pin sesuai kategori tempat.
   * Sinkronisasi dua arah antara klik pin dan daftar tempat di samping peta.
   * Fitur auto-zoom ke kota terpilih dan tombol petunjuk arah langsung.

4. **"Plan My Little Escape" (Weekend Planner)**:
   * Generator itinerary cerdas berdasarkan kota, batas budget per orang, jumlah rombongan, vibe aktivitas, dan alokasi durasi.
   * Menghasilkan 2–4 rekomendasi aktivitas yang berdekatan dengan estimasi total biaya transparan.
   * Tombol *Generate Another Plan* & *Save My Plan*.

5. **Community & Events**:
   * Agenda event & workshop lokal: *Pottery Class, 35mm Analog Photo Walk, Creative Journaling, Book Club, Thrift Market, Mini Art Exhibition*.
   * Form RSVP interaktif dengan konfirmasi tiket instan.
   * Form **Submit a Discovery** untuk pengguna mendaftarkan tempat atau komunitas baru.

6. **Saved Collections (LocalStorage Persistent)**:
   * Folder terorganisir: *Places I Want to Visit, Weekend Ideas, Creative Things, Hidden Gems*, serta riwayat *Itinerary Tersimpan*.
   * Tersimpan permanen di browser dan siap dibagikan ke teman.

---

## 🛠️ Tech Stack

* **Framework**: React 18 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS (Custom Color System & Brutalist Shadow Extensions)
* **Icons**: Lucide React
* **Interactive Map**: Leaflet
* **Interactions**: Canvas Confetti
* **State & Storage**: React Context + LocalStorage API

---

## 🚀 Panduan Memulai (Quick Start)

### Prasyarat
* Node.js (v18 atau lebih baru)
* npm atau yarn / pnpm

### Instalasi & Menjalankan Lokal

```bash
# 1. Clone repositori ini
git clone https://github.com/<username-kamu>/sisip-lifestyle.git

# 2. Masuk ke direktori proyek
cd sisip-lifestyle

# 3. Install dependensi
npm install

# 4. Jalankan server lokal
npm run dev
```

Buka peramban di `http://localhost:5173`.

### Build untuk Produksi

```bash
npm run build
npm run preview
```

---

## 📁 Struktur Direktori

```
sisip-website/
├── public/
├── src/
│   ├── components/       # Komponen reusable (Navbar, Footer, Card, Modal, Toast)
│   ├── context/          # Context API untuk Saved Collections (LocalStorage)
│   ├── data/             # Mock data realistis kurasi tempat, event, dan kategori
│   ├── pages/            # Halaman (Home, Explore, Map, Planner, Events, Saved, About)
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app layout & routing
│   ├── main.tsx          # React entry point
│   └── index.css         # Tailwind & custom editorial CSS
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan portofolio dan eksplorasi digital product lifestyle di Indonesia. Dilisensikan di bawah [MIT License](LICENSE).
