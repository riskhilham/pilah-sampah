# 🌿 Pilah Sampah: Pahlawan Kebersihan Kota
### *Game Edukasi Interaktif Pemilahan Sampah 4 Kategori*

Game edukasi interaktif berbasis web yang mengajarkan prinsip **Ekologi Kota & Ekonomi Sirkular** melalui mekanika pemilahan sampah 4 kategori berkecepatan tinggi yang taktil dan menyenangkan.

Dikembangkan menggunakan **Phaser 3**, **Vite 6**, dan arsitektur modular modern dengan aset visual berstandar profesional (**Style #2: Premium Cartoon 2D**).

---

## 🌟 Fitur Utama Permainan

1. **Mekanika Drag & Drop Alami & Ergonomis**:
   * **Seret & Lepas (*Drag & Drop*)**: Seret sampah dari sabuk konveyor langsung ke salah satu dari 4 Tong Sampah Besar di sudut layar.
   * **Klik untuk Ambil (*Click to Pick*)**: Klik sampah untuk memilihnya $\rightarrow$ klik tong tujuan untuk menerbangkan sampah secara otomatis.
   * **Jalan Pintas Keyboard (`Q`, `W`, `E`, `R`)**: Untuk pemain yang menyukai refleks tombol cepat.
2. **Onboarding Interaktif Langsung (Guided First Step)**:
   * Pada Shift 1, konveyor berhenti sejenak saat sampah pertama tiba di tengah. Panah animasi dan dialog ramah memandu pemain langkah demi langkah.
3. **4 Kategori Sampah Berstandar Nasional**:
   * 🟢 **ORGANIK [Q]**: Sisa Apel, Tulang Ikan, Kulit Pisang, Kulit Telur. *(Diproses jadi kompos & energi biodigester)*.
   * 🟡 **DAUR ULANG [W]**: Botol PET, Kaleng Aluminium, Kardus Bersih, Botol Kaca. *(Bahan baku sirkular industri)*.
   * 🔴 **B3 / BAHAYA [E]**: Baterai AA, Aerosol Pestisida, Lampu Neon, Obat Kedaluwarsa. *(Zat beracun, ledakan jika salah kelola)*.
   * 🔘 **RESIDU [R]**: Sachet Foil Multilayer, Tisu Kotor, Puntung Rokok, Styrofoam Berminyak. *(Dialihkan ke RDF/landfill aman)*.
4. **Game Feel & Audio Taktil**:
   * Synthesizer prosedural audio via **Web Audio API** (chime keberhasilan harmonik, buzzer peringatan, sirene darurat B3, dan deru konveyor) tanpa risiko kegagalan unduh file MP3 eksternal.
   * Efek partikel selebrasi (daun hijau, bintang emas, kilat biru UV, dan serbuk debu).
   * Efek ledakan asap merah dan guncangan layar (*screen shake*) jika limbah B3 salah dipilah.
   * Sistem **Combo Multiplier** (`x2`, `x3`, `x5`) untuk memacu fokus dan skor siswa.
5. **Ensiklopedia Sampah Interaktif (Eco-Catalog)**:
   * Katalog 16 item sampah lengkap dengan estimasi masa urai di alam liar, cara daur ulang, dan penjelasan ilmiah di baliknya.

---

## 🚀 Panduan Menjalankan Proyek

### 1. Menjalankan di Mode Pengembangan (Local Dev Server)
Pastikan Node.js (v18+) terpasang di komputer Anda.
```bash
# Masuk ke direktori proyek
cd pilah-sampah

# Pasang dependensi (jika baru pertama kali)
npm install

# Jalankan server lokal Vite
npm run dev
```
Buka browser dan akses URL lokal yang ditampilkan (default: **`http://localhost:3000/`**).

### 2. Membangun Versi Rilis Produksi (Production Build)
```bash
npm run build
```
Hasil kompilasi siap saji akan berada di folder **`dist/`**. Folder ini bersifat mandiri (*zero backend dependency*).

---

## 🌐 Opsi Deployment / Publikasi

Karena game ini dibangun sebagai **Single Page Application (SPA) Statik**, game dapat di-deploy dengan sangat mudah ke berbagai platform:

### Opsi A: Server Lokal Sekolah / Web Server (Offline Lab Friendly)
* Salin seluruh isi folder `dist/` ke direktori web server (misalnya direktori `htdocs/pilah-sampah` pada XAMPP atau `www/pilah-sampah` pada Laragon/Nginx/Apache).
* Seluruh komputer lab siswa dapat mengakses game via IP LAN lokal sekolah (misal: `http://192.168.1.50/pilah-sampah`) **tanpa memerlukan koneksi internet**.

### Opsi B: Vercel / Netlify (Zero-Config Cloud Hosting)
1. Hubungkan repositori Git ke Vercel atau Netlify.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Game akan langsung aktif dengan HTTPS gratis dan CDN global super cepat.

### Opsi C: GitHub Pages
1. Pasang paket `gh-pages` (`npm i -D gh-pages`).
2. Tambahkan script rilis di `package.json`: `"deploy": "gh-pages -d dist"`.
3. Jalankan `npm run deploy` untuk hosting gratis di domain `username.github.io/pilah-sampah`.

---

## 📁 Struktur Berkas Proyek

```
pilah-sampah/
├── index.html                     # Entry HTML dengan viewport setup dan web fonts
├── package.json                   # Definisi dependencies & script Vite
├── vite.config.js                 # Konfigurasi Vite
├── dist/                          # Hasil kompilasi produksi siap hosting
├── assets/                        # Direktori aset grafis (PNG terverifikasi)
│   ├── backgrounds/               # bg_facility_main.png (1280x720)
│   ├── environment/               # 4 corong pemilah (chute_*.png)
│   └── items/                     # 16 sprite item sampah (item_*.png)
├── src/
│   ├── main.js                    # Inisialisasi Phaser Game & scene registration
│   ├── config.js                  # Token warna global dan konstanta rasio 16:9
│   ├── data/
│   │   ├── wasteDatabase.js       # Database 16 item sampah & fakta sains
│   │   └── levelConfig.js         # Konfigurasi 5 shift & kurva kesulitan
│   ├── scenes/
│   │   ├── BootScene.js           # Preloader aset fasilitas
│   │   ├── MenuScene.js           # Menu utama dengan preview konveyor
│   │   ├── GameScene.js           # Core gameplay loop Drag-and-Drop & evaluasi
│   │   ├── HUDScene.js            # Top bar metrik & banner instruksi permanen
│   │   ├── SummaryScene.js        # Lembar audit lingkungan & rating bintang
│   │   └── CatalogScene.js        # Ensiklopedia interaktif sampah kota
│   ├── objects/
│   │   ├── ConveyorBelt.js        # Sabuk konveyor modular
│   │   ├── SortingBin.js          # 4 Tong sudut interaktif (drop targets)
│   │   └── WasteItem.js           # Entitas sampah dengan draggable physics
│   ├── audio/
│   │   └── SoundManager.js        # Synthesizer audio prosedural Web Audio API
│   └── utils/
│       └── Storage.js             # Penyimpanan progress level & skor (LocalStorage)
└── Dokumen Desain & Audit:
    ├── PROJECT_STATE.md           # Pelacakan status fase & keputusan proyek
    ├── GAME_DESIGN.md             # Game Design Document lengkap
    ├── ART_DIRECTION.md           # Spesifikasi seni visual (Premium Cartoon 2D)
    ├── UI_UX_SPEC.md              # Spesifikasi antarmuka & ergonomi interaksi
    ├── ASSET_MANIFEST.json        # Manifest 21 aset terverifikasi
    ├── IMPLEMENTATION_PLAN.md     # Rencana arsitektur teknis
    └── QA_REPORT.md               # Laporan audit pengujian fungsionalitas & performa
```

---

## 📜 Lisensi & Catatan Edukasi
Proyek ini dirancang sebagai media pembelajaran interaktif untuk mendukung edukasi gaya hidup berkelanjutan, kepedulian lingkungan hidup, dan program sekolah Adiwiyata.
