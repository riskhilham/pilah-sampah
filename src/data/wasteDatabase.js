/**
 * wasteDatabase.js
 * Educational database containing scientific facts, sorting rules, hazard profiles,
 * and environmental sustainability guidelines.
 * Expanded to 32 distinct items (8 items per category, including school-contextual items).
 */

export const WASTE_CATEGORIES = {
  ORGANIC: 'ORGANIC',
  RECYCLE: 'RECYCLE',
  HAZARD: 'HAZARD',
  RESIDUAL: 'RESIDUAL'
};

export const WASTE_ITEMS = [
  // ========================================================
  // --- KATEGORI 1: ORGANIK (HIJAU) - 8 ITEM ---
  // ========================================================
  {
    id: 'item_apple_core',
    name: 'Sisa Apel',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_apple_core',
    points: 100,
    decomposeTime: '2 – 4 Minggu',
    locationTag: 'RUMAH TANGGA',
    fact: 'Limbah organik kaya nutrisi, sangat baik diproses menjadi pupuk kompos atau pakan maggot BSF.',
    funFact: 'Jika terperangkap di TPA tanpa oksigen, sampah organik menghasilkan gas metana yang memicu pemanasan global.',
    ecoAction: 'Kumpulkan dalam komposter ember tumpuk untuk diolah menjadi pupuk cair tanaman.',
    hazardLevel: 0
  },
  {
    id: 'item_dry_leaves',
    name: 'Daun Kering Halaman',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_dry_leaves',
    points: 100,
    decomposeTime: '1 – 3 Bulan',
    locationTag: 'HALAMAN SEKOLAH',
    fact: 'Daun kering kaya akan unsur karbon (C) cokelat yang sangat penting untuk menyeimbangkan nitrogen pada tumpukan komposter sekolah.',
    funFact: 'Daun gugur yang disapu saat piket pagi jangan dibakar! Pembakaran menghasilkan gas karbon monoksida berbahaya.',
    ecoAction: 'Masukkan ke lubang biopori atau bak komposting sekolah untuk menyuburkan taman.',
    hazardLevel: 0
  },
  {
    id: 'item_snack_fruit',
    name: 'Sisa Semangka Kantin',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_snack_fruit',
    points: 100,
    decomposeTime: '2 – 4 Minggu',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Potongan buah kantin mengandung kadar air dan glukosa tinggi yang mempercepat aktivitas mikroorganisme pengurai tanah.',
    funFact: 'Jika tercampur di tong plastik tertutup, sisa buah semangka cepat berfermentasi dan menimbulkan bau asam.',
    ecoAction: 'Pisahkan kulit buah langsung di tong hijau kantin sebelum membuang kemasan plastiknya.',
    hazardLevel: 0
  },
  {
    id: 'item_orange_peel',
    name: 'Kulit Jeruk',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_orange_peel',
    points: 100,
    decomposeTime: '1 – 3 Bulan',
    locationTag: 'KANTIN / KELAS',
    fact: 'Kulit jeruk mengandung minyak atsiri (limonene) alami yang bisa diolah menjadi pembersih ramah lingkungan (eco-enzyme).',
    funFact: 'Kulit jeruk bisa ditaruh di loker atau meja kelas untuk menyerap bau pengap secara alami!',
    ecoAction: 'Campurkan dengan gula merah dan air untuk membuat cairan pembersih serbaguna eco-enzyme.',
    hazardLevel: 0
  },
  {
    id: 'item_fish_bone',
    name: 'Tulang Ikan',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_fish_bone',
    points: 100,
    decomposeTime: '1 – 2 Bulan',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Kaya akan kalsium dan fosfor alami untuk menyuburkan tanah dalam proses komposting biodigester.',
    funFact: 'Tulang ikan yang dihancurkan menjadi tepung tulang bernilai tinggi untuk nutrisi tanaman buah sekolah.',
    ecoAction: 'Timbun dalam lubang kompos gembur agar terurai cepat oleh cacing tanah.',
    hazardLevel: 0
  },
  {
    id: 'item_chicken_bone',
    name: 'Tulang Ayam',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_chicken_bone',
    points: 110,
    decomposeTime: '1 – 3 Bulan',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Sisa tulang ayam kaya kalsium dan protein sisa, sangat bergizi untuk pakan larva maggot Black Soldier Fly (BSF).',
    funFact: 'Peternak maggot menyukai sisa tulang ayam karena menghasilkan pupuk kasgot (bekas maggot) berkualitas tinggi.',
    ecoAction: 'Kumpulkan terpisah dari sendok plastik agar mempermudah pemilahan di kantin.',
    hazardLevel: 0
  },
  {
    id: 'item_banana_peel',
    name: 'Kulit Pisang',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_banana_peel',
    points: 100,
    decomposeTime: '2 – 6 Minggu',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Mengandung kalium tinggi yang mempercepat pematangan buah tanaman jika dijadikan pupuk organik cair.',
    funFact: 'Kulit pisang mudah terurai tetapi jika dibuang ke selokan dapat menyumbat aliran air.',
    ecoAction: 'Rendam kulit pisang dalam air selama 3 hari untuk dijadikan pupuk siram tanaman hias.',
    hazardLevel: 0
  },
  {
    id: 'item_egg_shell',
    name: 'Kulit Telur',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_egg_shell',
    points: 120,
    decomposeTime: '1 – 2 Tahun (Organik Keras)',
    locationTag: 'DAPUR KANTIN',
    fact: 'Tersusun atas 95% kalsium karbonat murni. Menjadi nutrisi penting bagi tanah asam dan mengusir hama siput.',
    funFact: 'Kulit telur yang diremukkan halus mempercepat pengomposan sayuran hingga dua kali lebih cepat.',
    ecoAction: 'Hancurkan menjadi bubuk kasar sebelum ditaburkan di atas media tanam pot sekolah.',
    hazardLevel: 0
  },

  // ========================================================
  // --- KATEGORI 2: ANORGANIK DAUR ULANG (BIRU) - 8 ITEM ---
  // ========================================================
  {
    id: 'item_school_paper',
    name: 'Kertas Buku Tulis Bekas',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_school_paper',
    points: 120,
    decomposeTime: '2 – 6 Minggu',
    locationTag: 'RUANG KELAS',
    fact: 'Kertas buku tulis berbahan selulosa murni sangat mudah dicacah kembali menjadi bubur kertas (pulp) untuk dicetak ulang.',
    funFact: 'Mendaur ulang 1 ton kertas menghemat 17 pohon pinus dewasa dan menghemat 26.000 liter air bersih!',
    ecoAction: 'Simpan rapi kertas bekas di sudut kelas tanpa diremas agar mudah disetorkan ke Bank Sampah Sekolah.',
    hazardLevel: 0
  },
  {
    id: 'item_milk_carton',
    name: 'Kotak Susu UHT Kantin',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_milk_carton',
    points: 140,
    decomposeTime: '5 Tahun (Tetra Pak)',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Kemasan karton berlapis poly-aluminium ini dipisahkan serat kertasnya di pabrik untuk dijadikan kertas daur ulang dan atap gelombang ramah lingkungan.',
    funFact: 'Teknik 3L: Lipat, Letakkan, Lepas sedotan! Kotak susu yang dipipihkan menghemat 80% volume tempat sampah.',
    ecoAction: 'Bilas sisa susunya dengan sedikit air, pipihkan kotaknya, lalu masukkan ke tong daur ulang.',
    hazardLevel: 0
  },
  {
    id: 'item_plastic_bottle',
    name: 'Botol Plastik PET',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_plastic_bottle',
    points: 150,
    decomposeTime: '450 Tahun',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Plastik jenis PET (kode 1) sangat diminati industri daur ulang untuk diubah menjadi serat polyester baju, tas, atau botol baru.',
    funFact: 'Daur ulang 1 ton botol plastik menghemat 3,8 barel minyak bumi mentah!',
    ecoAction: 'Buka tutup botolnya, remas botol hingga kempes agar hemat ruang, lalu setorkan ke bank sampah.',
    hazardLevel: 0
  },
  {
    id: 'item_plastic_cup',
    name: 'Gelas Plastik Bening',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_plastic_cup',
    points: 140,
    decomposeTime: '400 – 450 Tahun',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Gelas plastik berbahan PP (kode 5) bernilai tinggi di bank sampah dan dicacah menjadi biji plastik serbaguna.',
    funFact: 'Pastikan sedotan dan sisa es dibuang terpisah sebelum gelasnya disetorkan ke bank sampah.',
    ecoAction: 'Bawa tumbler pakai-ulang sendiri dari rumah saat jajan es di kantin!',
    hazardLevel: 0
  },
  {
    id: 'item_aluminum_can',
    name: 'Kaleng Minuman Aluminium',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_aluminum_can',
    points: 200,
    decomposeTime: '200 – 500 Tahun',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Aluminium dapat didaur ulang tanpa batas waktu tanpa menurunkan kualitas logamnya sedikit pun.',
    funFact: 'Mendaur ulang kaleng aluminium menghemat 95% energi dibanding menambang bauksit baru di alam.',
    ecoAction: 'Injak kaleng hingga pipih dan kumpulkan bersama regu piket kelas untuk bank sampah.',
    hazardLevel: 0
  },
  {
    id: 'item_cardboard_box',
    name: 'Kardus Karton Bersih',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_cardboard_box',
    points: 120,
    decomposeTime: '2 – 3 Bulan',
    locationTag: 'GUDANG / KELAS',
    fact: 'Kardus kering dapat dicacah menjadi bubur kertas untuk dicetak ulang hingga 5-7 kali siklus daur ulang.',
    funFact: 'Jika kardus terkena minyak makanan pekat, seratnya rusak dan harus masuk kategori Residu!',
    ecoAction: 'Lipat kardus bekas pengiriman ATK sekolah dan ikat rapi sebelum dijual ke bank sampah.',
    hazardLevel: 0
  },
  {
    id: 'item_newspaper',
    name: 'Koran Bekas',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_newspaper',
    points: 130,
    decomposeTime: '1 – 2 Bulan',
    locationTag: 'PERPUSTAKAAN',
    fact: 'Kertas koran dapat didaur ulang menjadi karton pelindung telur, pembungkus paket ramah lingkungan, atau kertas tulis baru.',
    funFact: 'Daur ulang 1 ton koran bekas menyelamatkan setara dengan 17 pohon peneduh dewasa!',
    ecoAction: 'Manfaatkan koran bekas sebagai alas karya seni rupa atau kriya bubur kertas di kelas.',
    hazardLevel: 0
  },
  {
    id: 'item_glass_bottle',
    name: 'Botol Kaca Sirup',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_glass_bottle',
    points: 180,
    decomposeTime: '1 Juta Tahun (Dapat Didaur Ulang 100%)',
    locationTag: 'KANTIN / DAPUR',
    fact: 'Kaca adalah material sirkular sejati yang dapat dilebur dan dibentuk ulang tanpa batas kualitas.',
    funFact: 'Mendaur ulang 1 botol kaca menghemat energi yang cukup untuk menyalakan lampu LED selama 24 jam.',
    ecoAction: 'Cuci bersih botol kaca agar dapat dipakai ulang (reuse) untuk wadah tanaman hias hidroponik.',
    hazardLevel: 0
  },

  // ========================================================
  // --- KATEGORI 3: B3 / BAHAYA & BERACUN (MERAH) - 8 ITEM ---
  // ========================================================
  {
    id: 'item_whiteboard_marker',
    name: 'Spidol Whiteboard Habis',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_whiteboard_marker',
    points: 300,
    decomposeTime: 'Senyawa Kimia Volatil (B3)',
    locationTag: 'RUANG KELAS',
    fact: 'Tinta spidol papan tulis mengandung pelarut kimia organik (alkohol/xylene) yang mudah terbakar dan melepaskan uap neurotoksik jika dibakar.',
    funFact: 'Banyak sekolah kini menggunakan spidol isi ulang (*refill*) untuk mengurangi timbulan limbah tabung plastik B3.',
    ecoAction: 'Kumpulkan spidol habis di kotak limbah B3 sekolah dan gunakan tabung tinta isi ulang.',
    hazardLevel: 3
  },
  {
    id: 'item_antiseptic_bottle',
    name: 'Botol Antiseptik UKS',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_antiseptic_bottle',
    points: 320,
    decomposeTime: 'Limbah Farmasi & Kimia Toksik',
    locationTag: 'RUANG UKS SEKOLAH',
    fact: 'Sisa cairan antiseptik alkohol dan povidone iodine pekat dapat mematikan bakteri pengurai baik di septic tank jika dibuang sembarangan ke wastafel.',
    funFact: 'Kader UKS sekolah dilatih untuk memisahkan limbah medis tajam dan botol antiseptik di kotak kuning khusus.',
    ecoAction: 'Serahkan botol antiseptik habis ke petugas kebersihan untuk disalurkan ke fasilitas limbah medis resmi.',
    hazardLevel: 3
  },
  {
    id: 'item_battery_aa',
    name: 'Baterai Bekas',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_battery_aa',
    points: 300,
    decomposeTime: '100+ Tahun (Logam Berat Beracun)',
    locationTag: 'LAB KOMPUTER / KELAS',
    fact: 'Mengandung logam berat timbal, merkuri, dan kadmium yang dapat merembes meracuni air tanah sumur sekolah jika tertimbun.',
    funFact: '1 buah baterai bekas ukuran kancing saja mampu mencemari 600.000 liter air bersih!',
    ecoAction: 'Sediakan *e-waste drop box* kecil di lorong sekolah khusus untuk mengumpulkan baterai bekas jam dinding dan remote.',
    hazardLevel: 3
  },
  {
    id: 'item_bleach_bottle',
    name: 'Botol Karbol Pembersih',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_bleach_bottle',
    points: 320,
    decomposeTime: 'Bahan Kimia Korosif',
    locationTag: 'GUDANG KEBERSIHAN',
    fact: 'Cairan pembersih lantai dan karbol mengandung zat kimia korosif keras yang meracuni saluran drainase dan berbahaya bagi kulit.',
    funFact: 'Jangan mencampur sisa pemutih dan pembersih amonia karena bisa memicu gas kloramin beracun!',
    ecoAction: 'Bilas wadah bekas desinfektan sebelum dibuang dan gunakan sarung tangan pengaman.',
    hazardLevel: 3
  },
  {
    id: 'item_spray_pesticide',
    name: 'Kaleng Semprot Pestisida',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_spray_pesticide',
    points: 350,
    decomposeTime: '200 Tahun (Mudah Meledak)',
    locationTag: 'GUDANG TAMAN',
    fact: 'Kaleng aerosol bertekanan tinggi dengan sisa racun kimia dapat meledak dan memicu kebakaran jika terkena panas terik atau kompresor.',
    funFact: 'Wajib dipisahkan dan diserahkan ke fasilitas drop-point pengolahan limbah B3 resmi.',
    ecoAction: 'Pastikan tabung benar-benar kosong dan jangan melubangi kaleng aerosol secara paksa.',
    hazardLevel: 3
  },
  {
    id: 'item_thermometer',
    name: 'Termometer Air Raksa',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_thermometer',
    points: 380,
    decomposeTime: 'Merkuri Sangat Beracun',
    locationTag: 'RUANG UKS / LAB IPA',
    fact: 'Mengandung merkuri cair murni. Jika pecah, uap raksanya sangat berbahaya bagi paru-paru dan sistem saraf manusia.',
    funFact: 'Jika termometer raksa pecah, jangan pernah disapu atau di-vacuum! Gunakan selotip perekat untuk memungut butiran air raksanya.',
    ecoAction: 'Gunakan termometer digital di sekolah untuk menghilangkan risiko paparan merkuri cair.',
    hazardLevel: 3
  },
  {
    id: 'item_fluorescent_lamp',
    name: 'Lampu Neon / CFL',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_fluorescent_lamp',
    points: 300,
    decomposeTime: 'Kaca Berisi Uap Gas Merkuri',
    locationTag: 'PLAFON RUANG KELAS',
    fact: 'Mengandung uap gas merkuri neurotoksik yang membahayakan sistem pernapasan manusia jika tabung kaca pecah terhirup.',
    funFact: 'Lampu neon bekas harus dibungkus karton tebal agar kacanya tidak pecah saat pengangkutan.',
    ecoAction: 'Ganti lampu neon lama kelas dengan lampu LED ramah lingkungan yang bebas merkuri dan hemat listrik 60%.',
    hazardLevel: 3
  },
  {
    id: 'item_expired_medicine',
    name: 'Obat Kedaluwarsa',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_expired_medicine',
    points: 320,
    decomposeTime: 'Zat Kimia Aktif Farmasi',
    locationTag: 'RUANG UKS',
    fact: 'Membuang antibiotik atau obat kimia ke wastafel mencemari air minum dan memicu resistensi bakteri patogen berbahaya.',
    funFact: 'Puskesmas setempat siap menerima limbah obat kedaluwarsa dari sekolah untuk dimusnahkan di insinerator bersuhu tinggi.',
    ecoAction: 'Periksa kotak obat UKS secara berkala setiap 6 bulan dan catat tanggal kedaluwarsanya.',
    hazardLevel: 3
  },

  // ========================================================
  // --- KATEGORI 4: RESIDU (ABU-ABU) - 8 ITEM ---
  // ========================================================
  {
    id: 'item_snack_wrapper',
    name: 'Bungkus Ciki / Snack Plastik',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_snack_wrapper',
    points: 120,
    decomposeTime: '200 – 400 Tahun',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Kemasan makanan ringan terbuat dari plastik multilayer yang dilaminasi aluminium foil sehingga tidak dapat dipisahkan oleh mesin daur ulang biasa.',
    funFact: 'Sampah bungkus ciki adalah limbah terbanyak yang ditemukan di tong sampah sekolah saat jam istirahat!',
    ecoAction: 'Dapat dikreasikan menjadi kerajinan ecobrick (botol padat plastik) untuk membuat kursi taman sekolah.',
    hazardLevel: 1
  },
  {
    id: 'item_plastic_straw',
    name: 'Sedotan Plastik Kantin',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_plastic_straw',
    points: 100,
    decomposeTime: '200 – 500 Tahun',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Sedotan plastik terlalu kecil dan ringan untuk mesin pemilah otomatis di bank sampah sehingga selalu berakhir di TPA atau laut.',
    funFact: 'Rata-rata siswa memakai sedotan hanya selama 10 menit, tetapi sedotan itu bertahan mengotori bumi selama 5 abad!',
    ecoAction: 'Tolak penggunaan sedotan plastik saat jajan di kantin sekolah atau gunakan sedotan stainless bawaan.',
    hazardLevel: 1
  },
  {
    id: 'item_coffee_sachet',
    name: 'Bungkus Sachet Kopi',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_coffee_sachet',
    points: 150,
    decomposeTime: '500+ Tahun',
    locationTag: 'KANTIN / RUANG GURU',
    fact: 'Terdiri dari lapisan plastik dan aluminium foil yang dilaminasi bersama, sehingga mesin daur ulang biasa tidak bisa memisahkannya.',
    funFact: 'Kemasan sachet multilayer kini mulai dialihkan menjadi bahan bakar refused-derived fuel (RDF) pengganti batubara.',
    ecoAction: 'Gunakan cangkir keramik dan bubuk kopi stoples untuk menghindari sampah sachet sekali pakai.',
    hazardLevel: 1
  },
  {
    id: 'item_plastic_bag',
    name: 'Kantong Kresek Tipis',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_plastic_bag',
    points: 120,
    decomposeTime: '10 – 20 Tahun (Mikroplastik)',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Kresek tipis bermutu rendah sering tersangkut merusak gigi mesin pencacah daur ulang, sehingga digolongkan residu TPA.',
    funFact: 'Kresek yang terbuang ke alam terfragmentasi menjadi partikel mikroplastik berbahaya yang dapat termakan ikan.',
    ecoAction: 'Bawa tas belanja lipat kain (*tote bag*) saat jajan atau berbelanja kebutuhan sekolah.',
    hazardLevel: 1
  },
  {
    id: 'item_diaper',
    name: 'Popok Bayi Bekas',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_diaper',
    points: 150,
    decomposeTime: '250 – 500 Tahun',
    locationTag: 'RUMAH TANGGA',
    fact: 'Mengandung gel penyerap super (SAP) dan limbah biologis kotor sehingga mutlak tidak bisa didaur ulang dan harus ke TPA.',
    funFact: 'Popok sekali pakai adalah salah satu kontributor limbah terbesar yang mencemari aliran sungai perkotaan.',
    ecoAction: 'Gunakan popok kain (*cloth diaper*) yang dapat dicuci berulang kali untuk mengurangi timbulan residu.',
    hazardLevel: 1
  },
  {
    id: 'item_dirty_tissue',
    name: 'Tisu Kotor Bekas Pakai',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_dirty_tissue',
    points: 100,
    decomposeTime: '1 Bulan (Terkontaminasi Minyak/Kuman)',
    locationTag: 'KELAS / TOILET',
    fact: 'Serat tisu terlalu pendek dan rapuh untuk dicetak ulang, serta membawa kuman atau minyak sehingga ditolak komposter.',
    funFact: 'Gunakan sapu tangan kain yang bisa dicuci berulang kali untuk mengurangi timbulan residu tisu sekolah.',
    ecoAction: 'Biasakan selalu membawa sapu tangan kain bersih di saku seragam sekolah.',
    hazardLevel: 1
  },
  {
    id: 'item_cigarette_butt',
    name: 'Puntung Rokok',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_cigarette_butt',
    points: 150,
    decomposeTime: '10 – 15 Tahun',
    locationTag: 'LUAR PAGAR SEKOLAH',
    fact: 'Filternya terbuat dari plastik selulosa asetat mikroskopis yang menyerap ribuan racun kimiawi karsinogenik berbahaya.',
    funFact: 'Puntung rokok adalah jenis sampah residu nomor satu yang paling banyak mengotori selokan dan pantai dunia.',
    ecoAction: 'Dukung kawasan sekolah bebas rokok 100% demi kesehatan generasi muda bangsa.',
    hazardLevel: 2
  },
  {
    id: 'item_dirty_styrofoam',
    name: 'Styrofoam Berminyak',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_dirty_styrofoam',
    points: 130,
    decomposeTime: '500+ Tahun (Tak Pernah Terurai)',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Pori-pori gabus styrofoam yang telah meresap minyak kuah makanan tidak dapat dicuci bersih dan ditolak pabrik daur ulang.',
    funFact: 'Kantin sekolah ramah lingkungan mewajibkan penjual menggunakan piring makan atau kertas daun pisang.',
    ecoAction: 'Bawa kotak makan (*lunch box*) sendiri saat memesan makanan hangat di kantin sekolah.',
    hazardLevel: 1
  },

  // ========================================================
  // --- TAMBAHAN ORGANIK BARU (4 ITEM) ---
  // ========================================================
  {
    id: 'item_bread_crust',
    name: 'Roti Berjamur Kantin',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_bread_crust',
    points: 110,
    decomposeTime: '1 – 2 Minggu',
    locationTag: 'KANTIN / KELAS',
    fact: 'Roti tawar berjamur mengandung ragi dan karbohidrat tinggi yang sangat disukai cacing tanah dalam proses vermikompos.',
    funFact: 'Jamur pada roti (Rhizopus) adalah salah satu organisme pengurai alami tertua di ekosistem bumi.',
    ecoAction: 'Masukkan roti kedaluwarsa ke komposter ember tumpuk sekolah agar cepat terfermentasi menjadi pupuk cair.',
    hazardLevel: 0
  },
  {
    id: 'item_corn_cob',
    name: 'Tongkol Jagung Rebus',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_corn_cob',
    points: 120,
    decomposeTime: '2 – 6 Bulan',
    locationTag: 'KANTIN / PASAR',
    fact: 'Tongkol jagung tersusun atas serat lignin dan selulosa padat yang sangat ideal untuk media tumbuh budidaya jamur tiram.',
    funFact: 'Tongkol jagung yang dikeringkan dan dicacah kasar bisa menjadi briket arang ramah lingkungan pengganti batubara.',
    ecoAction: 'Kumpulkan limbah jagung dari kantin dan olah menjadi mulsa penutup tanah taman sekolah.',
    hazardLevel: 0
  },
  {
    id: 'item_tea_bag',
    name: 'Kantong Teh Ampas Daun',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_tea_bag',
    points: 100,
    decomposeTime: '1 – 2 Bulan',
    locationTag: 'RUANG GURU / KANTIN',
    fact: 'Ampas teh basah kaya akan unsur nitrogen dan tanin alami yang berfungsi sebagai penyubur tanaman hias dan pengusir hama kebun.',
    funFact: 'Lepaskan staples kawat kecilnya sebelum ampas teh dimasukkan ke lubang biopori atau pot tanaman!',
    ecoAction: 'Taburkan ampas teh langsung di sekitar pangkal batang mawar atau tanaman hias sekolah.',
    hazardLevel: 0
  },
  {
    id: 'item_coffee_grounds',
    name: 'Ampas Kopi Hitam',
    category: WASTE_CATEGORIES.ORGANIC,
    texture: 'item_coffee_grounds',
    points: 110,
    decomposeTime: '1 – 2 Bulan',
    locationTag: 'RUANG GURU / KANTIN',
    fact: 'Ampas kopi bubuk memiliki pH sedikit asam yang sangat disukai tanaman bougenville, cabai, dan tanaman pot hias sekolah.',
    funFact: 'Aroma kafein pada ampas kopi mengusir semut, siput perusak daun, dan kucing liar secara alami!',
    ecoAction: 'Jemur ampas kopi hingga kering lalu campurkan sebagai media tanam bibit hidroponik atau pot kelas.',
    hazardLevel: 0
  },

  // ========================================================
  // --- TAMBAHAN DAUR ULANG BARU (4 ITEM) ---
  // ========================================================
  {
    id: 'item_glass_jar',
    name: 'Toples Kaca Selai',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_glass_jar',
    points: 190,
    decomposeTime: '1 Juta Tahun (100% Sirkular)',
    locationTag: 'KANTIN / DAPUR',
    fact: 'Kaca bening dapat dilebur ulang berkali-kali tanpa pernah kehilangan kejernihan maupun kekuatannya.',
    funFact: 'Daur ulang toples kaca menghemat 30% energi listrik dibandingkan membuat kaca dari tambang pasir silika baru.',
    ecoAction: 'Bilas bersih toples kaca bekas selai agar dapat dipakai ulang (*reuse*) sebagai vas bunga atau wadah pensil.',
    hazardLevel: 0
  },
  {
    id: 'item_metal_can_food',
    name: 'Kaleng Sarden Logam',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_metal_can_food',
    points: 180,
    decomposeTime: '50 – 100 Tahun (Besi / Tinplate)',
    locationTag: 'DAPUR KANTIN',
    fact: 'Kaleng makanan berbahan lembaran baja berlapis timah (*tinplate*) dapat dilebur kembali menjadi produk baja konstruksi.',
    funFact: 'Industri daur ulang logam menggunakan magnet raksasa untuk memisahkan kaleng baja dari sampah lainnya dengan cepat.',
    ecoAction: 'Bilas sisa minyak sarden dan tekan sedikit badan kaleng sebelum disetorkan ke Bank Sampah Sekolah.',
    hazardLevel: 0
  },
  {
    id: 'item_cardboard_cup',
    name: 'Cup Kertas Kopi / Paper Cup',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_cardboard_cup',
    points: 130,
    decomposeTime: '2 – 5 Tahun (Polietilena)',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Paper cup memiliki serat karton berkualitas tinggi. Di fasilitas modern, lapisan plastiknya dipisahkan agar seratnya bisa dicetak ulang.',
    funFact: 'Banyak kedai minuman kini menggunakan cup kertas berlapis bioplastik PLA yang lebih mudah terurai.',
    ecoAction: 'Lepas tutup plastik dan sedotannya, lalu kumpulkan cup kertas kering di tong daur ulang.',
    hazardLevel: 0
  },
  {
    id: 'item_shampoo_bottle',
    name: 'Botol Sampo HDPE Tebal',
    category: WASTE_CATEGORIES.RECYCLE,
    texture: 'item_shampoo_bottle',
    points: 160,
    decomposeTime: '450 Tahun (HDPE Kode 2)',
    locationTag: 'UKS / RUMAH TANGGA',
    fact: 'Plastik jenis HDPE (High-Density Polyethylene) sangat stabil, kuat, dan paling diminati industri daur ulang untuk pipa saluran air dan ember cor.',
    funFact: 'Plastik HDPE tidak melepaskan zat kimia berbahaya saat didaur ulang hingga 10 kali putaran!',
    ecoAction: 'Bilas sisa sabun di dalamnya dengan sedikit air, lalu buang dalam keadaan tutup botol terlepas.',
    hazardLevel: 0
  },

  // ========================================================
  // --- TAMBAHAN B3 BAHAYA BARU (4 ITEM) ---
  // ========================================================
  {
    id: 'item_broken_glass',
    name: 'Pecahan Kaca Beling Tajam',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_broken_glass',
    points: 340,
    decomposeTime: 'Limbah Fisik Berbahaya',
    locationTag: 'KANTIN / RUANG KELAS',
    fact: 'Pecahan kaca runcing berisiko tinggi melukai tangan petugas kebersihan dan merobek kantong sampah jika dibuang sembarangan.',
    funFact: 'Pecahan kaca wajib dibungkus koran tebal atau kardus lalu diberi tanda peringatan sebelum diserahkan.',
    ecoAction: 'Bungkus rapi pecahan kaca dengan kardus atau lakban tebal dan buang khusus ke tempat sampah limbah B3/tajam.',
    hazardLevel: 3
  },
  {
    id: 'item_electronics_mouse',
    name: 'Mouse Komputer Rusak (E-Waste)',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_electronics_mouse',
    points: 360,
    decomposeTime: 'Limbah Elektronik (Timbal / Tembaga)',
    locationTag: 'LAB KOMPUTER SEKOLAH',
    fact: 'Papan sirkuit mouse mengandung timah solder, tembaga, dan brominated flame retardants (BFR) yang berbahaya jika terbakar di TPA.',
    funFact: 'Limbah elektronik bernilai tinggi jika diproses oleh fasilitas pengolahan resmi yang mampu mengekstraksi logam mulianya.',
    ecoAction: 'Kumpulkan mouse, keyboard, dan kabel USB rusak di kotak E-Waste Drop Zone sekolah.',
    hazardLevel: 3
  },
  {
    id: 'item_paint_can',
    name: 'Kaleng Cat Minyak / Thinner',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_paint_can',
    points: 380,
    decomposeTime: 'Pelarut Kimia & Logam Berat',
    locationTag: 'GUDANG SENI / BENGKEL',
    fact: 'Sisa cat minyak dan tiner mengandung senyawa organik volatil (VOC) yang mudah tersulut api dan melepaskan uap beracun bagi pernapasan.',
    funFact: 'Jangan pernah mencuci kuas cat minyak di wastafel sekolah karena sisa tiner meracuni mikroba instalasi pengolahan air!',
    ecoAction: 'Biarkan sisa cat mengering sempurna di ruang berventilasi sebelum kalengnya diserahkan ke pengelola B3 resmi.',
    hazardLevel: 3
  },
  {
    id: 'item_syringe',
    name: 'Jarum Suntik Medis UKS',
    category: WASTE_CATEGORIES.HAZARD,
    texture: 'item_syringe',
    points: 400,
    decomposeTime: 'Limbah Medis Tajam Infeksius',
    locationTag: 'RUANG UKS SEKOLAH',
    fact: 'Jarum bekas dapat menularkan penyakit patogen berbahaya dan darah infeksius jika menusuk kulit.',
    funFact: 'UKS sekolah wajib memiliki kotak kuning tebal anti-tembus (*Safety Box*) khusus pembuangan jarum imunisasi.',
    ecoAction: 'Pastikan penutup pengaman jarum terpasang dan langsung masukkan ke safety box limbah medis berizin.',
    hazardLevel: 3
  },

  // ========================================================
  // --- TAMBAHAN RESIDU BARU (4 ITEM) ---
  // ========================================================
  {
    id: 'item_bubble_wrap',
    name: 'Plastik Gelembung Paket Olshop',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_bubble_wrap',
    points: 120,
    decomposeTime: '200 – 400 Tahun (Polietilena Film)',
    locationTag: 'KANTOR / RUANG GURU',
    fact: 'Plastik gelembung tipis memiliki rasio udara tinggi dan kerap tersangkut di mesin pencacah otomatis bank sampah, sehingga digolongkan residu.',
    funFact: 'Gunakan kembali (*reuse*) bubble wrap bersih sebagai pelindung barang kiriman atau prakarya kerajinan siswa.',
    ecoAction: 'Kempeskan gelembung udaranya atau gunakan kembali sebagai pembungkus prakarya seni sebelum dibuang ke residu.',
    hazardLevel: 1
  },
  {
    id: 'item_broken_ceramic',
    name: 'Pecahan Piring Keramik',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_broken_ceramic',
    points: 110,
    decomposeTime: 'Tak Pernah Terurai (Silika Anorganik)',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Keramik dibuat dari tanah liat yang dibakar pada suhu >1200°C sehingga memiliki titik lebur berbeda dengan botol kaca dan ditolak pabrik daur ulang kaca.',
    funFact: 'Pecahan keramik antik sering dimanfaatkan seniman untuk karya seni mozaik dinding (*trencadís*) yang indah.',
    ecoAction: 'Kumpulkan pecahan keramik untuk kerajinan seni mozaik pot bunga atau buang terbungkus rapi ke tong residu.',
    hazardLevel: 1
  },
  {
    id: 'item_mika_plastic',
    name: 'Mika Plastik Jajanan Pasar',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_mika_plastic',
    points: 130,
    decomposeTime: '400 – 500 Tahun (Mika PVC / PET Tipis)',
    locationTag: 'KANTIN SEKOLAH',
    fact: 'Mika plastik tipis pembungkus kue basah dan gorengan biasanya berminyak pekat dan tidak bernilai ekonomis di bank sampah.',
    funFact: 'Kantin Adiwiyata mendorong penjual menggunakan piring lidi beralas daun pisang alami untuk menggantikan plastik mika.',
    ecoAction: 'Dukung program kantin hijau dengan membawa wadah makan sendiri saat jajan kue basah.',
    hazardLevel: 1
  },
  {
    id: 'item_sanitary_pad',
    name: 'Pembalut Sanitasi Bekas Pakai',
    category: WASTE_CATEGORIES.RESIDUAL,
    texture: 'item_sanitary_pad',
    points: 140,
    decomposeTime: '250 – 500 Tahun',
    locationTag: 'TOILET SISWI',
    fact: 'Mengandung gel polimer superabsorben (SAP), perekat sintetis, dan limbah biologis sehingga mutlak harus berakhir di TPA/insinerator.',
    funFact: 'Toilet sekolah ramah anak menyediakan kantong kertas khusus pembalut di bilik toilet siswi agar pembuangan higienis.',
    ecoAction: 'Bungkus rapat dengan kertas atau kantong pembungkus sebelum dibuang langsung ke tong sampah residu tertutup.',
    hazardLevel: 1
  }
];

export function getItemById(id) {
  return WASTE_ITEMS.find(item => item.id === id);
}

export function getItemsByCategory(cat) {
  return WASTE_ITEMS.filter(item => item.category === cat);
}
