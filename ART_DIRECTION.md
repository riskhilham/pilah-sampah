# ART DIRECTION SPECIFICATION (ART_DIRECTION.md)
# EcoSort: Fasilitas Sirkular (4-Way Circular Facility)

---

## 1. Visi Seni & Gaya Terpilih (Locked Style)
* **Gaya Terpilih**: **Style #2 — Premium Cartoon 2D**
* **Inspirasi Visual**: *Overcooked*, *Plants vs. Zombies*, *SteamWorld Dig*, *Factorio (Clean Edition)*.
* **Intensi Artistik**: Menampilkan fasilitas pengolahan sampah mutakhir yang terasa hidup, mekanis, berenergi tinggi, dan sangat mudah dibaca (*high visual readability*). Sampah tidak digambarkan jorok atau menjijikkan, melainkan sebagai "material sumber daya berharga" yang memiliki karakter fisik unik.

---

## 2. Perspektif & Sudut Pandang Kamera (Perspective & Camera)
* **Kamera**: *Fixed Top-Down Angled (2.5D Orthographic / 60-degree tilt)*.
* **Layout Panggung**:
  * **Sabuk Konveyor Utama**: Membentang horizontal di tengah layar dari kiri ke kanan.
  * **Gerbang Pemilah (Diverter Chutes)**:
    * 🟢 **Atas-Kiri**: Jalur Komposter Organik
    * 🟡 **Bawah-Kiri**: Jalur Baler/Press Anorganik Daur Ulang
    * 🔴 **Atas-Kanan**: Vault Netralisasi B3 (Hazard)
    * 🔘 **Bawah-Kanan**: Jalur RDF / Residu Non-Recyclable
  * **Latar Belakang**: Ruang kontrol pabrik bersih dengan jendela kaca besar yang memperlihatkan pemandangan kota hijau yang membaik seiring level diselesaikan.

---

## 3. Palet Warna Terstandar (Color Tokens & Palette)

### 3.1 Warna Inti 4 Aliran Sampah (Primary Waste Stream Tokens)
| Kategori | Hex Utama | Hex Aksen / Highlight | Makna Visual |
| :--- | :--- | :--- | :--- |
| **Organik** | `#27AE60` (Bio Green) | `#2ECC71` (Sprout Green) | Alami, segar, kehidupan, pupuk hayati |
| **Anorganik Daur Ulang**| `#E67E22` (Amber Gold) | `#F1C40F` (Solar Yellow) | Nilai ekonomi sirkular, material terbarukan |
| **B3 (Hazardous)** | `#C0392B` (Crimson Hazard)| `#E74C3C` (Warning Coral) | Bahaya kritis, waspada, racun/api |
| **Residu** | `#34495E` (Deep Slate) | `#7F8C8D` (Neutral Gray) | Sisa akhir, non-sirkular, stabil |

### 3.2 Warna Fasilitas & Mesin (Industrial Environment Tokens)
* **Conveyor Belt & Plat Baja**: `#1E272C` (Dark Rubber) & `#2C3E50` (Industrial Steel).
* **Marka Keselamatan (Hazard Stripes)**: `#F1C40F` bergantian dengan `#2C3E50` (stripes 45 derajat).
* **Fasilitas Bersih (Walls & Rails)**: `#ECEFF1` (Clean White) dengan aksen `#90A4AE` (Brushed Aluminum).
* **Latar Belakang Kota Luar**: Langit biru cerah `#4FC3F7` dan pepohonan hijau `#66BB6A`.

---

## 4. Karakteristik & Siluet Aset (Object Silhouette & Silhouette Language)
* **Outline**: Garis luar tegas (*bold outline* 3px – 4px) berwarna gelap pekat (`#1A252F`) untuk memisahkan objek sampah dari latar belakang konveyor.
* **Shading**: *2-Tone to 3-Tone Cel Shading* bersih tanpa blur gradasi halus yang memudar.
* **Proporsi Objek**: Sedikit *chunky / stylized exaggeration* (misal: tutup botol plastik dibuat proporsional lebih besar agar mudah dikenali; simbol hazard pada baterai dibuat jelas dan kontras).
* **Dimensi Standar Aset Item**: $128 \times 128 \text{ px}$ (tampil $96 \times 96 \text{ px}$ di layar untuk ketajaman Retina/HiDPI).

---

## 5. Material & Pencahayaan (Lighting & Shaders)
* **Karakter Material**:
  * *Plastik PET*: Transparan dengan highlight pantulan putih melengkung.
  * *Kaleng Logam*: Kilap specular tajam vertikal (*metallic sheen*).
  * *Kertas/Kardus*: Tekstur matte berserat tanpa pantulan silau.
  * *Organik (Buah/Daun)*: Tekstur segar, sedikit lekukan lunak alami.
  * *B3 (Baterai/Kimia)*: Denyut cahaya (*emissive pulsing rim-light*) merah lembut untuk menarik perhatian insting pemain.
* **Lighting Environment**: Penerangan studio pabrik merata dari atas-kiri dengan bayangan jatuh tegas (*hard drop shadow*) 30% opacity ke permukaan belt konveyor.

---

## 6. Tipografi (Typography)
* **Judul & Banner Utama**: *Fredoka One* / *Lilita One* (Rounded sans-serif yang tebal, ramah, dan energik).
* **Teks HUD & Angka Indikator**: *Chakra Petch* / *Rajdhani Bold* (Teknis, presisi, mudah dibaca cepat saat angka bergerak).
* **Instruksi & Dialog Edukasi**: *Inter* / *Plus Jakarta Sans* (Sangat ergonomis untuk teks bahasa Indonesia).

---

## 7. Prinsip Animasi & "Juice" (Animation & Game Feel)
1. **Snappy & Mechanical**: Gerbang pemilah membuka dan menutup dengan gerakan pegas tegas (bukan linier membosankan; gunakan *overshoot / bounce easing*).
2. **Squash & Stretch**: Item sampah sedikit memadat saat jatuh ke dalam hopper penampung (*squash*) lalu kembali (*settle*).
3. **Particle Bursts**:
   * *Organik*: Taburan daun kecil dan kilau hijau melayang.
   * *Anorganik*: Koin emas/bintang dan partikel sparkle kuning.
   * *B3 Benar*: Kilat biru-putih sterilisasi UV yang memuaskan.
   * *Salah Sortir*: Asap abu-abu/percikan bunga api peringatan disertai getaran layar (*screen shake*) 150ms.
4. **Conveyor Dynamics**: Sabuk bergaris bergerak halus dengan kecepatan yang mencerminkan RPM motor mesin.

---

## 8. Anti-AI-Slop & Quality Lock
* ❌ DILARANG menggunakan karakter clipart murahan atau gambar generic AI bertekstur lilin/plastik cair.
* ❌ DILARANG menggunakan emoji standar sistem operasi sebagai pengganti aset game.
* ❌ DILARANG menggunakan warna gradien pelangi tanpa palet terstruktur.
* ✅ Seluruh aset visual harus mematuhi palet warna, ketebalan outline, dan perspektif kamera yang telah dikunci di atas.

