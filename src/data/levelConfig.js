/**
 * levelConfig.js
 * Progression and challenge parameters for the 6 levels of Pilah Sampah.
 */
import { WASTE_CATEGORIES } from './wasteDatabase.js';

export const LEVEL_CONFIGS = [
  {
    level: 1,
    title: 'Level 1: Perumahan Asri',
    subtitle: 'Distrik Griya Asri — Pemilahan Organik & Daur Ulang',
    description: 'Bantu warga perumahan memilah sisa makanan (Organik) dan botol/kardus (Daur Ulang). Langkah awal yang menyenangkan!',
    targetItems: 16,
    timeLimitSeconds: 85,
    conveyorSpeed: 120, // px per second
    spawnInterval: 2400, // ms
    activeCategories: [WASTE_CATEGORIES.ORGANIC, WASTE_CATEGORIES.RECYCLE],
    allowedHazardMisses: 3,
    minPurityForWin: 0.80, // 80%
    starThresholds: [0.80, 0.88, 0.95],
    factsTip: 'Pemilahan dari rumah adalah langkah pertama menjaga bumi: 60% sampah perkotaan adalah sisa makanan dan kemasan!'
  },
  {
    level: 2,
    title: 'Level 2: Lingkungan Sekolah',
    subtitle: 'SD Ceria Hijau — Pembelajaran Pilah Sampah',
    description: 'Piket kebersihan sekolah! Pilah daun kering halaman, sisa semangka kantin, buku tulis bekas, dan kotak susu UHT.',
    targetItems: 22,
    timeLimitSeconds: 95,
    conveyorSpeed: 140,
    spawnInterval: 2100,
    activeCategories: [WASTE_CATEGORIES.ORGANIC, WASTE_CATEGORIES.RECYCLE],
    allowedHazardMisses: 3,
    minPurityForWin: 0.82,
    starThresholds: [0.82, 0.89, 0.96],
    factsTip: 'Bank Sampah Sekolah mendidik siswa menabung dari hasil daur ulang buku tulis bekas dan botol plastik bersih!'
  },
  {
    level: 3,
    title: 'Level 3: Perkantoran Kota',
    subtitle: 'Kawasan Bisnis — Waspada Limbah Bahaya (B3)',
    description: 'Hati-hati! Spidol whiteboard habis, baterai bekas, dan lampu neon mulai masuk. Buang ke tong merah B3!',
    targetItems: 28,
    timeLimitSeconds: 105,
    conveyorSpeed: 160,
    spawnInterval: 1900,
    activeCategories: [WASTE_CATEGORIES.ORGANIC, WASTE_CATEGORIES.RECYCLE, WASTE_CATEGORIES.HAZARD],
    allowedHazardMisses: 2,
    minPurityForWin: 0.85,
    starThresholds: [0.85, 0.91, 0.96],
    factsTip: 'Limbah B3 seperti baterai mengandung racun berbahaya. Jangan sampai tercampur ke sampah organik atau selokan warga.'
  },
  {
    level: 4,
    title: 'Level 4: Kuliner & Mall',
    subtitle: 'Pusat Jajanan — Mengenal Sampah Residu',
    description: 'Banyak sampah sachet bumbu, sedotan plastik, dan popok. Sampah yang tidak bisa didaur ulang harus masuk tong Residu!',
    targetItems: 34,
    timeLimitSeconds: 115,
    conveyorSpeed: 185,
    spawnInterval: 1700,
    activeCategories: [
      WASTE_CATEGORIES.ORGANIC,
      WASTE_CATEGORIES.RECYCLE,
      WASTE_CATEGORIES.HAZARD,
      WASTE_CATEGORIES.RESIDUAL
    ],
    allowedHazardMisses: 2,
    minPurityForWin: 0.86,
    starThresholds: [0.86, 0.92, 0.97],
    factsTip: 'Bungkus sachet dan sedotan plastik sulit didaur ulang pabrik biasa, sehingga diproses khusus menjadi bahan bakar RDF.'
  },
  {
    level: 5,
    title: 'Level 5: Pasar Tradisional',
    subtitle: 'Pasar & Terminal — Sampah Cepat & Melimpah',
    description: 'Aliran konveyor berjalan kencang! Perhatikan bentuk sampah dengan cepat dan masukkan ke tong yang tepat.',
    targetItems: 42,
    timeLimitSeconds: 125,
    conveyorSpeed: 215,
    spawnInterval: 1400,
    activeCategories: [
      WASTE_CATEGORIES.ORGANIC,
      WASTE_CATEGORIES.RECYCLE,
      WASTE_CATEGORIES.HAZARD,
      WASTE_CATEGORIES.RESIDUAL
    ],
    allowedHazardMisses: 1,
    minPurityForWin: 0.88,
    starThresholds: [0.88, 0.94, 0.98],
    factsTip: 'Pasar tradisional menghasilkan banyak sayur dan buah sisa. Jika segera diolah, sampah ini jadi pupuk organik berkualitas tinggi!'
  },
  {
    level: 6,
    title: 'Level 6: Kota Bersih Metropolis',
    subtitle: 'Pusat Daur Ulang Terpadu — Ujian Puncak Pahlawan Sampah',
    description: 'Level puncak kota! Seluruh 48 jenis sampah kota dan sekolah datang bersamaan. Buktikan ketangkasanmu memilah 4 jenis sampah!',
    targetItems: 50,
    timeLimitSeconds: 135,
    conveyorSpeed: 240,
    spawnInterval: 1200,
    activeCategories: [
      WASTE_CATEGORIES.ORGANIC,
      WASTE_CATEGORIES.RECYCLE,
      WASTE_CATEGORIES.HAZARD,
      WASTE_CATEGORIES.RESIDUAL
    ],
    allowedHazardMisses: 1,
    minPurityForWin: 0.90,
    starThresholds: [0.90, 0.95, 0.99],
    factsTip: 'Kota cerdas masa depan memilah 100% sampahnya langsung dari sumber, sehingga bebas timbunan sampah di TPA!'
  }
];

export function getLevelConfig(levelNumber) {
  const cfg = LEVEL_CONFIGS.find(l => l.level === levelNumber);
  return cfg || LEVEL_CONFIGS[0];
}
