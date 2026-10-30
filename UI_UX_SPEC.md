# UI/UX SPECIFICATION (UI_UX_SPEC.md)
# EcoSort: Fasilitas Sirkular (4-Way Circular Facility)

---

## 1. Filosofi & Tata Letak Antarmuka (Overhauled Layout)
* **Prinsip Utama**: *Direct Physical Interaction, High Contrast Bins, Zero Cognitive Clutter*.
* **Area Pandang Layar**: Target rasio baku $16:9$ ($1280 \times 720\text{px}$).
* **Zona Layar**:
  * **Top Bar ($82\text{px}$)**: HUD Status Pabrik (Kemurnian Bar, Kuota, Toleransi B3, Timer LED, Skor).
  * **Instruction Banner Strip ($32\text{px}$)**: Teks panduan permanen yang jelas: *"💡 CARA MAIN: Seret atau klik sampah di konveyor, lalu masukkan ke tong yang cocok! (Bisa juga tekan Q / W / E / R)"*.
  * **Center Stage ($y = 415\text{px}$)**: Sabuk konveyor horizontal tempat sampah berjalan dengan nyaman.
  * **4 Sudut Bins Utama**:
    * 🟢 **Kiri Atas ($x=180, y=215$)**: Tong ORGANIK (Sisa Makanan, Sayur, Daun) [Q]
    * 🟡 **Kanan Atas ($x=1100, y=215$)**: Tong DAUR ULANG (Botol Plastik/Kaca, Kaleng, Kardus) [W]
    * 🔴 **Kiri Bawah ($x=180, y=605$)**: Tong B3 BAHAYA (Baterai, Obat, Racun, Neon) [E]
    * 🔘 **Kanan Bawah ($x=1100, y=605$)**: Tong RESIDU (Sachet Foil, Popok, Tisu Kotor) [R]
* **Eliminasi Tombol Dock Bawah**: Tidak ada lagi tombol dock terpisah di bawah layar yang membelah konsentrasi mata pemain. Tong di layar adalah target aksi langsung.

---

## 2. Rincian Layar Permainan (Screen Flows)

### 2.1 Layar 1: Menu Utama (Main Menu)
* **Tata Letak**:
  * Latar belakang animasi: Sabuk konveyor pabrik yang bergerak santai dengan siluet kota modern di jendela kaca.
  * Logo Game: `EcoSort: Fasilitas Sirkular` (Tipografi *Fredoka One* tebal dengan aksen daun hijau dan roda gigi kuning).
  * Panel Kontrol Menu (Tersusun vertikal rapi di kanan-tengah):
    * `[MULAI SHIFT KERJA]` (Tombol primer hijau `#27AE60`, ukuran menonjol).
    * `[PILIH DISTRIK / SHIFT]` (Tombol sekunder abu-abu baja `#34495E`).
    * `[ENSIKLOPEDIA SAMPAH]` (Tombol edukatif warna kuning amber `#E67E22`).
    * `[PENGATURAN / AUDIO]` (Ikon mekanis ringkas).

### 2.2 Layar 2: Pengarahan Shift & Onboarding (Mission Briefing)
* **Tata Letak**: Modal industrial bergaya "Papan Tugas Harian Operator" (*Clip-board / Digital Terminal*).
* **Isi Ringkas**:
  * Nama Shift (contoh: *Shift 2 — Masuknya Limbah B3*).
  * Target Kuota: Sortir minimal 30 item, Pertahankan Kemurnian $\ge 85\%$.
  * Item Baru yang Diperkenalkan: Kartu inspeksi 1 item (contoh: *Baterai Bekas — Kategori B3, Jangan biarkan masuk ke jalur daur ulang/kompos!*).
  * Tombol Aksi: `[Buka Jalur Konveyor (ENTER)]`.

### 2.3 Layar 3: Gameplay HUD (Layar Aktif)
* **Komponen HUD Atas**:
  * **Purity Meter (Gauge Kemurnian)**: Progress bar gradasi hijau ke merah dengan penunjuk jarum presisi dan angka persentase besar (`94% PURITY`).
  * **Sisa Waktu Shift**: Timer digital bergaya LED pabrik (`02:45`).
  * **Hazard Integrity (Toleransi B3)**: 3 lampu LED merah hazard berkedip (`[●][●][○]` - 2 dari 3 kesempatan tersisa).
  * **Circular Credits (Skor)**: Ikon koin daur ulang + jumlah poin dinamis (`★ 1,450`).
* **Komponen HUD Bawah (Sorting Control Dock)**:
  * 4 Tombol Taktil yang mencerminkan 4 gerbang di layar:
    1. `[Q / 1] 🟢 ORGANIK` (Sisa Makanan, Daun)
    2. `[W / 2] 🟡 DAUR ULANG` (Plastik PET, Kertas, Logam)
    3. `[E / 3] 🔴 BAHAYA (B3)` (Baterai, Kimia, Neon)
    4. `[R / 4] 🔘 RESIDU` (Sachet Foil, Popok, Puntung)
  * Setiap tombol memiliki visual indikator pegas (tertekan saat hotkey dipencet).

### 2.4 Layar 4: Pause & Bantuan Cepat (In-Game Pause)
* **Trigger**: Tombol `[ESC]` atau tombol pause di sudut kanan atas.
* **Tampilan**: Dim backdrop 50% gelap tanpa menghapus keadaan arena.
* **Fitur**: Ringkasan tombol kontrol, bagan cepat 4 kategori sampah, opsi *Lanjutkan*, *Ulangi Shift*, atau *Kembali ke Menu*.

### 2.5 Layar 5: Laporan Evaluasi Shift (Level Completion & Feedback)
* **Tata Letak**: Format "Lembar Audit Fasilitas Lingkungan Hidup".
* **Data Evaluasi**:
  * Tingkat Kemurnian Akhir: Bintang 1–3 berdasarkan akurasi ($\ge 80\%$, $\ge 88\%$, $\ge 95\%$).
  * Rincian Pemilahan: Diagram mini jumlah kilogram sampah Organik terkomposkan, Anorganik terdaur ulang, B3 diamankan, dan Residu terkarantina.
  * *Edukasi Insight*: Kotak "Catatan Supervisor" yang menjelaskan 1 fakta nyata (misal: *"Kamu berhasil mengamankan 4 baterai litium! Kamu telah mencegah pencemaran 2.000 liter air tanah"*).
  * Tombol: `[Lanjut ke Shift Berikutnya]` atau `[Ulangi untuk Bintang 3]`.

### 2.6 Layar 6: Ensiklopedia Sampah (Eco-Catalog)
* Koleksi grid item sampah yang telah ditemukan selama bermain.
* Klik pada item menampilkan profil material: Masa urai di alam liar, cara pengolahan terbaik, dan mengapa masuk ke kategori tersebut.

---

## 3. Sistem Desain Token UI (Design Tokens)

### 3.1 Spacing & Grid System
* Menggunakan kelipatan basis $8\text{px}$:
  * `$space-xs`: $4\text{px}$
  * `$space-sm`: $8\text{px}$
  * `$space-md`: $16\text{px}$
  * `$space-lg`: $24\text{px}$
  * `$space-xl`: $32\text{px}$
* Border Radius:
  * Kontainer Industrial / Panel: `$radius-md`: $8\text{px}$ (tegas, kokoh, bukan oval membulat berlebihan).
  * Tombol Interaktif: `$radius-sm`: $6\text{px}$.

### 3.2 State Interaktif Komponen (Interactive States)
* **Default**: Bayangan tebal di bawah tombol setinggi $4\text{px}$ memberi ilusi tombol fisik tebal 3D.
* **Hover**: Tombol terangkat $2\text{px}$, highlight warna bertambah terang 10%.
* **Active / Pressed**: Tombol turun $4\text{px}$ (menghilangkan bayangan bawah), border kontras menyala.
* **Disabled**: Opacity 40%, bayangan flat abu-abu.

---

## 4. Aksesibilitas & Kenyamanan Bermain (Accessibility & Usability)
1. **Dukungan Buta Warna (Colorblind-Safe Design)**:
   * Tidak hanya mengandalkan warna hijau/kuning/merah/abu-abu.
   * Setiap tombol dan penampung dilengkapi **simbol ikonik bentuk unik**:
     * Organik = Simbol Daun 🌿
     * Daur Ulang = Simbol Panah Melingkar Tiga ♻️
     * B3 = Simbol Segitiga Hazard ⚠️
     * Residu = Simbol Keranjang Akhir Silang 🗑️
2. **Dual-Input Friendly**:
   * Dapat dimainkan 100% menggunakan satu tangan pada Keyboard (`Q-W-E-R` atau `1-2-3-4`), atau 100% menggunakan Mouse/Trackpad (lab sekolah tanpa mouse gaming).
3. **Ukuran Teks Kontras Tinggi**: Seluruh rasio kontras teks mematuhi WCAG AAA ($\ge 7:1$) di atas latar belakang panel pabrik.

---

## 5. Strict Anti-AI-Slop Assurance
* Tidak ada elemen "glassmorphism blur" murahan yang mengaburkan visibilitas game.
* Tidak ada kartu rounded membulat tanpa fungsi teknis.
* Semua elemen UI mengusung estetika antarmuka kontrol pabrik (*modern industrial dashboard*) yang fungsional, bersih, dan berwibawa.
