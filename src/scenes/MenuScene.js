/**
 * MenuScene.js
 * Main Menu Interface.
 * Features friendly visuals, steel signboards, 3D push-button switches with pilot LEDs,
 * and integrated conveyor preview.
 */
import { GAME_CONFIG } from '../config.js';
import { sounds } from '../audio/SoundManager.js';
import { LEVEL_CONFIGS } from '../data/levelConfig.js';
import { Storage } from '../utils/Storage.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    // Initialize & start gentle cheerful acoustic background music
    sounds.init();
    sounds.startAmbientBGM();

    // 1. Factory Background with Cinematic Lighting
    this.add.image(w / 2, h / 2, 'bg_facility_main')
      .setDisplaySize(w, h);

    const darkScrim = this.add.graphics();
    darkScrim.fillStyle(0x0a1017, 0.78);
    darkScrim.fillRect(0, 0, w, h);

    // 2. Decorative Plant Conveyor Preview (Bottom Arena)
    const beltY = 510;
    const bgGraphics = this.add.graphics();

    // Conveyor support legs
    bgGraphics.fillStyle(0x111822, 1);
    bgGraphics.fillRect(200, beltY, 40, 90);
    bgGraphics.fillRect(620, beltY, 40, 90);
    bgGraphics.fillRect(1040, beltY, 40, 90);

    // Conveyor rubber track
    bgGraphics.fillStyle(0x19222a, 1);
    bgGraphics.fillRect(0, beltY - 28, w, 56);
    bgGraphics.fillStyle(0x334155, 1);
    bgGraphics.fillRect(0, beltY - 34, w, 6);
    bgGraphics.fillRect(0, beltY + 28, w, 6);

    // Hazard chevrons on track
    bgGraphics.fillStyle(0xf1c40f, 0.4);
    for (let px = 0; px < w; px += 50) {
      bgGraphics.fillTriangle(px, beltY - 18, px + 14, beltY - 18, px + 22, beltY + 18);
    }

    // Moving demo props along preview track
    const demoItems = ['item_apple_core', 'item_plastic_bottle', 'item_battery_aa', 'item_glass_bottle', 'item_coffee_sachet'];
    demoItems.forEach((tex, idx) => {
      const item = this.add.image(140 + idx * 240, beltY, tex).setDisplaySize(64, 64);
      this.tweens.add({
        targets: item,
        y: beltY - 8,
        angle: 4,
        duration: 900 + idx * 100,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });

    // 3. Main Entrance Signboard (Hero Header)
    const signY = 145;
    const signW = 760;
    const signH = 150;

    const signBg = this.add.graphics();
    // Shadow
    signBg.fillStyle(0x03070a, 0.85);
    signBg.fillRoundedRect(w / 2 - signW / 2 + 8, signY - signH / 2 + 10, signW, signH, 16);

    // Heavy Stamped Signboard
    signBg.fillStyle(0x131d26, 0.96);
    signBg.fillRoundedRect(w / 2 - signW / 2, signY - signH / 2, signW, signH, 16);
    signBg.lineStyle(3.5, 0x334155, 1);
    signBg.strokeRoundedRect(w / 2 - signW / 2, signY - signH / 2, signW, signH, 16);

    // Corner Chrome Rivets
    const sRivets = [
      { rx: w / 2 - signW / 2 + 14, ry: signY - signH / 2 + 14 },
      { rx: w / 2 + signW / 2 - 14, ry: signY - signH / 2 + 14 },
      { rx: w / 2 - signW / 2 + 14, ry: signY + signH / 2 - 14 },
      { rx: w / 2 + signW / 2 - 14, ry: signY + signH / 2 - 14 }
    ];
    signBg.fillStyle(0x94a3b8, 1);
    sRivets.forEach(rv => signBg.fillCircle(rv.rx, rv.ry, 4));

    // Top Corner: Quick Return to Splash Cover Button
    const coverBtn = this.add.container(110, 34);
    const coverBg = this.add.graphics();
    coverBg.fillStyle(0x0f172a, 0.9);
    coverBg.fillRoundedRect(-85, -16, 170, 32, 16);
    coverBg.lineStyle(1.5, 0x334155, 1);
    coverBg.strokeRoundedRect(-85, -16, 170, 32, 16);

    const coverText = this.add.text(0, 0, '◀ COVER GAME', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#38BDF8'
    }).setOrigin(0.5);

    coverBtn.add([coverBg, coverText]);
    const coverHit = this.add.rectangle(0, 0, 170, 32, 0x000000, 0.001);
    coverHit.setInteractive({ useHandCursor: true });
    coverBtn.add(coverHit);

    coverHit.on('pointerdown', () => {
      sounds.playClick();
      this.scene.start('SplashScene');
    });
    coverHit.on('pointerover', () => coverBtn.setScale(1.05));
    coverHit.on('pointerout', () => coverBtn.setScale(1.0));

    // Top Right: Sound Mute / Unmute Toggle Button
    const audioBtn = this.add.container(w - 75, 34);
    const audioBg = this.add.graphics();
    audioBg.fillStyle(0x0f172a, 0.9);
    audioBg.fillRoundedRect(-50, -16, 100, 32, 16);
    audioBg.lineStyle(1.5, 0x334155, 1);
    audioBg.strokeRoundedRect(-50, -16, 100, 32, 16);

    const audioText = this.add.text(0, 0, sounds.isMuted ? 'AUDIO: OFF' : 'AUDIO: ON', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12.5px',
      fontStyle: 'bold',
      color: sounds.isMuted ? '#94A3B8' : '#4ADE80'
    }).setOrigin(0.5);

    audioBtn.add([audioBg, audioText]);
    const audioHit = this.add.rectangle(0, 0, 100, 32, 0x000000, 0.001);
    audioHit.setInteractive({ useHandCursor: true });
    audioBtn.add(audioHit);

    audioHit.on('pointerdown', () => {
      const isMuted = sounds.toggleMute();
      audioText.setText(isMuted ? 'AUDIO: OFF' : 'AUDIO: ON');
      audioText.setColor(isMuted ? '#94A3B8' : '#4ADE80');
      if (!isMuted) sounds.playClick();
    });
    audioHit.on('pointerover', () => audioBtn.setScale(1.05));
    audioHit.on('pointerout', () => audioBtn.setScale(1.0));

    // Green Eco Badge
    const badgeBg = this.add.graphics();
    badgeBg.fillStyle(0x15803d, 1);
    badgeBg.fillRoundedRect(w / 2 - 190, signY - 60, 380, 28, 14);
    badgeBg.lineStyle(2, 0x4ade80, 0.8);
    badgeBg.strokeRoundedRect(w / 2 - 190, signY - 60, 380, 28, 14);

    this.add.text(w / 2, signY - 46, 'EDUKASI PEMILAHAN SAMPAH LINGKUNGAN', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    // Main Game Title
    this.add.text(w / 2, signY - 5, 'Pilah Sampah', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '52px',
      fontStyle: 'bold',
      color: '#FFFFFF',
      stroke: '#0F172A',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(w / 2, signY + 44, 'Pahlawan Kebersihan Kota • Belajar Memilah 4 Kategori Sampah', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '15px',
      color: '#CBD5E1'
    }).setOrigin(0.5);

    // 4. Operator Control Console Buttons (Stable, Standardized Symmetrical Layout)
    // Button 1: Primary Heavy Switch (MULAI PERMAINAN - Masuk ke Peta Kota)
    this.createIndustrialButton(
      w / 2,
      268,
      440,
      54,
      'MULAI PERMAINAN ▶',
      0x16a34a,
      0x22c55e,
      () => {
        sounds.init();
        sounds.playClick();
        this.scene.start('ShiftSelectScene');
      }
    );

    // Button 2: Secondary Heavy Switch (KAMUS SAMPAH)
    this.createIndustrialButton(
      w / 2,
      330,
      440,
      48,
      'KAMUS SAMPAH',
      0x334155,
      0x64748b,
      () => {
        sounds.init();
        sounds.playClick();
        this.scene.start('CatalogScene');
      }
    );

    // Row 3: Dual Symmetrical Switches (Baris 3 Berdampingan)
    // Button 3: Panduan & Cara Main
    this.createIndustrialButton(
      w / 2 - 114,
      392,
      212,
      48,
      'ℹ️ CARA MAIN',
      0x0284c7,
      0x38bdf8,
      () => {
        sounds.init();
        sounds.playClick();
        this.openGuideModal();
      }
    );

    // Button 4: Tentang Pengembang
    this.createIndustrialButton(
      w / 2 + 114,
      392,
      212,
      48,
      '👤 PENGEMBANG',
      0x475569,
      0x64748b,
      () => {
        sounds.init();
        sounds.playClick();
        this.openAboutModal();
      }
    );

    // 5. Stamped Metal Footer Safety Plate
    const footY = h - 34;
    const fg = this.add.graphics();
    fg.fillStyle(0x0f172a, 0.95);
    fg.fillRect(0, footY - 8, w, 42);
    fg.lineStyle(2, 0x1e293b, 1);
    fg.strokeRect(0, footY - 8, w, 42);

    this.add.text(24, footY + 12, 'PILAH SAMPAH: PAHLAWAN KEBERSIHAN KOTA • EDISI PEMBELAJARAN INTERAKTIF', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      color: '#94A3B8'
    }).setOrigin(0, 0.5);

    this.add.text(w - 24, footY + 12, 'KONTROL: SERET SAMPAH KE TONG ATAU TEKAN HOTKEY [Q, W, E, R]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(1, 0.5);
  }

  createIndustrialButton(x, y, width, height, text, baseColor, highlightColor, onClick) {
    const btn = this.add.container(x, y);

    const halfW = width / 2;
    const halfH = height / 2;

    const bg = this.add.graphics();
    btn.add(bg);

    const drawBtnState = (isPressed = false, isHovered = false) => {
      bg.clear();

      // Shadow
      bg.fillStyle(0x03070a, 0.7);
      bg.fillRoundedRect(-halfW + 4, -halfH + 6, width, height, 10);

      // Heavy Metallic Bezel Ring
      bg.fillStyle(0x0f172a, 1);
      bg.fillRoundedRect(-halfW, -halfH, width, height, 10);
      bg.lineStyle(2.5, 0x475569, 1);
      bg.strokeRoundedRect(-halfW, -halfH, width, height, 10);

      // Switch Core Faceplate
      const faceColor = isHovered ? highlightColor : baseColor;
      const pressOffsetY = isPressed ? 2 : 0;
      bg.fillStyle(faceColor, 1);
      bg.fillRoundedRect(-halfW + 6, -halfH + 6 + pressOffsetY, width - 12, height - 12, 6);

      // Pilot LED Status Light (Left Dot)
      bg.fillStyle(0xffffff, 0.9);
      bg.fillCircle(-halfW + 20, pressOffsetY, 5);
      bg.fillStyle(faceColor, 1);
      bg.fillCircle(-halfW + 20, pressOffsetY, 3);
    };

    drawBtnState(false, false);

    const label = this.add.text(8, 0, text, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: height >= 60 ? '20px' : (width < 250 ? '14px' : '16px'),
      fontStyle: 'bold',
      color: '#FFFFFF',
      stroke: '#0F172A',
      strokeThickness: 3
    }).setOrigin(0.5);
    label.setName('btnLabel');
    btn.add(label);

    const hitZone = this.add.rectangle(0, 0, width, height, 0x000000, 0.001);
    hitZone.setInteractive({ useHandCursor: true });
    btn.add(hitZone);

    hitZone.on('pointerover', () => {
      drawBtnState(false, true);
      btn.setScale(1.03);
    });

    hitZone.on('pointerout', () => {
      drawBtnState(false, false);
      btn.setScale(1.0);
    });

    hitZone.on('pointerdown', () => {
      drawBtnState(true, true);
      label.y = 2;
      if (onClick) onClick();
    });

    hitZone.on('pointerup', () => {
      drawBtnState(false, true);
      label.y = 0;
    });

    return btn;
  }

  openGuideModal() {
    if (this.activeModal) {
      this.activeModal.destroy();
      this.activeModal = null;
    }

    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const modal = this.add.container(0, 0).setDepth(2000);

    // Dim Backdrop
    const backdrop = this.add.rectangle(w / 2, h / 2, w, h, 0x02060e, 0.88);
    backdrop.setInteractive();
    backdrop.on('pointerdown', () => {
      sounds.playClick();
      modal.destroy();
      this.activeModal = null;
    });
    modal.add(backdrop);

    // Main Modal Frame (1140 x 620 - Roomy & Proportional)
    const mW = 1140;
    const mH = 620;
    const mX = w / 2;
    const mY = h / 2;

    const blocker = this.add.rectangle(mX, mY, mW, mH, 0x000000, 0.001);
    blocker.setInteractive();
    modal.add(blocker);

    const bg = this.add.graphics();
    // Shadow
    bg.fillStyle(0x000000, 0.85);
    bg.fillRoundedRect(mX - mW / 2 + 8, mY - mH / 2 + 10, mW, mH, 14);

    // Frame Body
    bg.fillStyle(0x0b131e, 0.98);
    bg.fillRoundedRect(mX - mW / 2, mY - mH / 2, mW, mH, 14);
    bg.lineStyle(2.5, 0x38bdf8, 1);
    bg.strokeRoundedRect(mX - mW / 2, mY - mH / 2, mW, mH, 14);

    // Top Header Banner
    bg.fillStyle(0x0f172a, 1);
    bg.fillRoundedRect(mX - mW / 2, mY - mH / 2, mW, 66, { tl: 14, tr: 14, bl: 0, br: 0 });
    bg.lineStyle(1.5, 0x1e293b, 1);
    bg.lineBetween(mX - mW / 2, mY - mH / 2 + 66, mX + mW / 2, mY - mH / 2 + 66);
    modal.add(bg);

    // Header Title & Subtitle
    const title = this.add.text(mX - mW / 2 + 30, mY - mH / 2 + 20, 'INFORMASI GAME & CARA BERMAIN', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    });

    const sub = this.add.text(mX - mW / 2 + 30, mY - mH / 2 + 45, 'EDUKASI PEMILAHAN SAMPAH LINGKUNGAN HIDUP & KOTA BERSIH', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#38BDF8'
    });

    // Close button (✕)
    const closeBtn = this.add.text(mX + mW / 2 - 34, mY - mH / 2 + 32, '✕', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#94A3B8'
    }).setOrigin(0.5);
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      sounds.playClick();
      modal.destroy();
      this.activeModal = null;
    });
    closeBtn.on('pointerover', () => closeBtn.setColor('#EF4444'));
    closeBtn.on('pointerout', () => closeBtn.setColor('#94A3B8'));

    modal.add([title, sub, closeBtn]);

    // Container for switching between Tab 1 (Informasi Game) and Tab 2 (Cara Bermain)
    const contentContainer = this.add.container(0, 0);
    modal.add(contentContainer);

    // Tab buttons
    let activeTab = 'info'; // 'info' or 'rules'

    const tabInfoBtn = this.add.container(mX - 180, mY - mH / 2 + 98);
    const tabRulesBtn = this.add.container(mX + 180, mY - mH / 2 + 98);

    const renderTabs = () => {
      contentContainer.removeAll(true);

      // Tab Info Styling
      tabInfoBtn.removeAll(true);
      const bgInfo = this.add.graphics();
      bgInfo.fillStyle(activeTab === 'info' ? 0x0284c7 : 0x1e293b, 1);
      bgInfo.fillRoundedRect(-165, -19, 330, 38, 6);
      bgInfo.lineStyle(1.5, activeTab === 'info' ? 0x38bdf8 : 0x334155, 1);
      bgInfo.strokeRoundedRect(-165, -19, 330, 38, 6);
      const txtInfo = this.add.text(0, 0, '1. INFORMASI & 4 KATEGORI', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '13px',
        fontStyle: 'bold',
        color: activeTab === 'info' ? '#FFFFFF' : '#94A3B8'
      }).setOrigin(0.5);
      tabInfoBtn.add([bgInfo, txtInfo]);
      tabInfoBtn.setSize(330, 38);
      tabInfoBtn.setInteractive({ useHandCursor: true });

      // Tab Rules Styling
      tabRulesBtn.removeAll(true);
      const bgRules = this.add.graphics();
      bgRules.fillStyle(activeTab === 'rules' ? 0x0284c7 : 0x1e293b, 1);
      bgRules.fillRoundedRect(-165, -19, 330, 38, 6);
      bgRules.lineStyle(1.5, activeTab === 'rules' ? 0x38bdf8 : 0x334155, 1);
      bgRules.strokeRoundedRect(-165, -19, 330, 38, 6);
      const txtRules = this.add.text(0, 0, '2. CARA BERMAIN & KONTROL', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '13px',
        fontStyle: 'bold',
        color: activeTab === 'rules' ? '#FFFFFF' : '#94A3B8'
      }).setOrigin(0.5);
      tabRulesBtn.add([bgRules, txtRules]);
      tabRulesBtn.setSize(330, 38);
      tabRulesBtn.setInteractive({ useHandCursor: true });

      if (activeTab === 'info') {
        this.renderTabInfo(contentContainer, mX, mY, mW, mH);
      } else {
        this.renderTabRules(contentContainer, mX, mY, mW, mH);
      }
    };

    tabInfoBtn.on('pointerdown', () => {
      if (activeTab !== 'info') {
        sounds.playClick();
        activeTab = 'info';
        renderTabs();
      }
    });

    tabRulesBtn.on('pointerdown', () => {
      if (activeTab !== 'rules') {
        sounds.playClick();
        activeTab = 'rules';
        renderTabs();
      }
    });

    modal.add([tabInfoBtn, tabRulesBtn]);
    renderTabs();

    this.activeModal = modal;
  }

  renderTabInfo(container, mX, mY, mW, mH) {
    // 1. Top Summary Box
    const topY = mY - mH / 2 + 158;
    const topBg = this.add.graphics();
    topBg.fillStyle(0x0f172a, 0.95);
    topBg.fillRoundedRect(mX - 540, topY - 32, 1080, 68, 8);
    topBg.lineStyle(1.5, 0x15803d, 0.9);
    topBg.strokeRoundedRect(mX - 540, topY - 32, 1080, 68, 8);

    const pTitle = this.add.text(mX - 520, topY - 24, '🌿 LATAR BELAKANG & TUJUAN EDUKASI PEMILAHAN SAMPAH', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#4ADE80'
    });

    const pDesc = this.add.text(mX - 520, topY - 3, 'Media Pembelajaran Interaktif (MPI) ini dirancang untuk menumbuhkan kepedulian lingkungan dan kebiasaan memilah sampah sejak dini.\nPemain diajak melatih kecepatan dan ketepatan memilah 4 kategori sampah modern sebelum mencemari lingkungan perkotaan.', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13.5px',
      color: '#E2E8F0',
      lineSpacing: 4
    });

    container.add([topBg, pTitle, pDesc]);

    // 2. 4 Categorical Columns (Organik, Daur Ulang, B3 Bahaya, Residu)
    const cardData = [
      {
        name: 'ORGANIK',
        key: '[ Q ]',
        binName: 'TONG HIJAU',
        color: 0x166534,
        border: 0x22c55e,
        hex: '#4ADE80',
        trait: 'Limbah basah & sisa makanan mudah terurai alami.',
        examples: 'Sisa Apel, Daun Kering, Kulit Pisang, Roti Berjamur, Tongkol Jagung, Ampas Kopi & Teh.',
        destination: 'Komposter Sekolah, Lubang Biopori, Pakan Maggot BSF.'
      },
      {
        name: 'DAUR ULANG',
        key: '[ W ]',
        binName: 'TONG BIRU',
        color: 0x0369a1,
        border: 0x38bdf8,
        hex: '#38BDF8',
        trait: 'Anorganik bersih bernilai jual yang bisa didaur ulang.',
        examples: 'Buku Tulis, Kotak Susu, Botol Plastik, Kardus, Toples Selai, Kaleng Sarden.',
        destination: 'Bank Sampah Sekolah & Sentra Pabrik Daur Ulang.'
      },
      {
        name: 'B3 (BAHAYA)',
        key: '[ E ]',
        binName: 'TONG MERAH',
        color: 0x991b1b,
        border: 0xef4444,
        hex: '#F87171',
        trait: 'Bahan Berbahaya & Beracun, berisiko tinggi bagi ekosistem.',
        examples: 'Baterai Bekas, Pestisida, Obat Kedaluwarsa, Lampu Neon, E-Waste Mouse.',
        destination: 'TPS Limbah B3 Berizin Khusus untuk dimusnahkan aman.'
      },
      {
        name: 'RESIDU',
        key: '[ R ]',
        binName: 'TONG ABU-ABU',
        color: 0x334155,
        border: 0x94a3b8,
        hex: '#CBD5E1',
        trait: 'Sampah kotor / multilayer yang ditolak pabrik daur ulang.',
        examples: 'Bungkus Ciki, Sachet Kopi, Styrofoam Minyak, Sedotan, Kresek, Popok, Tisu.',
        destination: 'TPA Sanitasi Kota & Fasilitas Pengolah Bahan Bakar RDF.'
      }
    ];

    const cardW = 258;
    const cardH = 370;
    const startX = mX - 540 + cardW / 2;
    const cardY = mY - mH / 2 + 400;

    cardData.forEach((cd, idx) => {
      const cx = startX + idx * (cardW + 16);
      const card = this.add.container(cx, cardY);

      const cbg = this.add.graphics();
      cbg.fillStyle(0x0f172a, 0.96);
      cbg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 8);
      cbg.lineStyle(2, cd.border, 0.9);
      cbg.strokeRoundedRect(-cardW / 2, -cardH / 2, cardW, cardH, 8);

      // Card Header
      cbg.fillStyle(cd.color, 1);
      cbg.fillRoundedRect(-cardW / 2, -cardH / 2, cardW, 52, { tl: 8, tr: 8, bl: 0, br: 0 });

      const cTitle = this.add.text(0, -cardH / 2 + 17, `${cd.name} ${cd.key}`, {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '17px',
        fontStyle: 'bold',
        color: '#FFFFFF'
      }).setOrigin(0.5);

      const cBin = this.add.text(0, -cardH / 2 + 37, cd.binName, {
        fontFamily: "'Chakra Petch', monospace",
        fontSize: '12.5px',
        fontStyle: 'bold',
        color: '#FEF08A'
      }).setOrigin(0.5);

      // Characteristic
      const l1 = this.add.text(-cardW / 2 + 14, -cardH / 2 + 64, 'CIRI UTAMA:', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '12px',
        fontStyle: 'bold',
        color: cd.hex
      });

      const t1 = this.add.text(-cardW / 2 + 14, -cardH / 2 + 82, cd.trait, {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '13.5px',
        color: '#E2E8F0',
        wordWrap: { width: cardW - 28 },
        lineSpacing: 2
      });

      // Examples
      const l2 = this.add.text(-cardW / 2 + 14, -cardH / 2 + 154, 'CONTOH SAMPAH:', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '12px',
        fontStyle: 'bold',
        color: cd.hex
      });

      const t2 = this.add.text(-cardW / 2 + 14, -cardH / 2 + 172, cd.examples, {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '13.5px',
        color: '#F8FAFC',
        wordWrap: { width: cardW - 28 },
        lineSpacing: 2
      });

      // Destination
      const l3 = this.add.text(-cardW / 2 + 14, -cardH / 2 + 264, 'ALUR PENGOLAHAN 3R:', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '12px',
        fontStyle: 'bold',
        color: cd.hex
      });

      const t3 = this.add.text(-cardW / 2 + 14, -cardH / 2 + 282, cd.destination, {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '13.5px',
        fontStyle: 'italic',
        color: '#CBD5E1',
        wordWrap: { width: cardW - 28 },
        lineSpacing: 2
      });

      card.add([cbg, cTitle, cBin, l1, t1, l2, t2, l3, t3]);
      container.add(card);
    });
  }

  renderTabRules(container, mX, mY, mW, mH) {
    const panW = 530;
    const panH = 445;
    const panY = mY - mH / 2 + 368;

    // Left Panel: Dual Controls
    const leftX = mX - 275;
    const leftContainer = this.add.container(leftX, panY);

    const lbg = this.add.graphics();
    lbg.fillStyle(0x0f172a, 0.96);
    lbg.fillRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);
    lbg.lineStyle(2, 0x0284c7, 0.9);
    lbg.strokeRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);

    lbg.fillStyle(0x0369a1, 1);
    lbg.fillRoundedRect(-panW / 2, -panH / 2, panW, 48, { tl: 8, tr: 8, bl: 0, br: 0 });

    const lTitle = this.add.text(0, -panH / 2 + 24, '🎮 METODE KONTROL GANDA (DUAL CONTROLS)', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const lBody = this.add.text(-panW / 2 + 22, -panH / 2 + 68, 
      'Pemain dapat memilih cara memilah yang paling nyaman:\n\n' +
      '1. METODE SERET (DRAG & DROP):\n' +
      '   • Klik & tahan sampah yang berjalan di rel konveyor.\n' +
      '   • Seret langsung ke tong yang sesuai di 4 sudut layar.\n\n' +
      '2. METODE KLIK & TOMBOL KEYBOARD (HOTKEY):\n' +
      '   • Klik sampah di konveyor untuk memilihnya.\n' +
      '   • Tekan tombol keyboard sesuai warna tong:\n' +
      '     [ Q ] : Corong HIJAU (Organik)\n' +
      '     [ W ] : Corong BIRU (Daur Ulang)\n' +
      '     [ E ] : Corong MERAH (B3 Bahaya)\n' +
      '     [ R ] : Corong ABU-ABU (Residu)\n' +
      '   (Atau klik langsung tong tujuan setelah sampah dipilih).\n\n' +
      '💡 TIPS: Anda bebas memadukan kedua metode selama permainan!', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13.5px',
      color: '#E2E8F0',
      lineSpacing: 5
    });

    leftContainer.add([lbg, lTitle, lBody]);

    // Right Panel: Mechanics & Scoring
    const rightX = mX + 275;
    const rightContainer = this.add.container(rightX, panY);

    const rbg = this.add.graphics();
    rbg.fillStyle(0x0f172a, 0.96);
    rbg.fillRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);
    rbg.lineStyle(2, 0xd97706, 0.9);
    rbg.strokeRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);

    rbg.fillStyle(0xb45309, 1);
    rbg.fillRoundedRect(-panW / 2, -panH / 2, panW, 48, { tl: 8, tr: 8, bl: 0, br: 0 });

    const rTitle = this.add.text(0, -panH / 2 + 24, '⚡ MEKANIKA SPESIAL & PENILAIAN SKOR', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const rBody = this.add.text(-panW / 2 + 22, -panH / 2 + 68,
      'Strategi untuk meraih Bintang 3 di setiap distrik kota:\n\n' +
      '🎯 TARGET KUOTA & BATAS WAKTU:\n' +
      '   Penuhi target jumlah sampah sebelum timer shift habis.\n\n' +
      '🔥 AKURASI & BONUS KOMBO BERUNTUN:\n' +
      '   Pilah secara konsisten tanpa salah untuk memicu pengganda\n' +
      '   skor kombo bertingkat (x1.5 hingga x2.0).\n\n' +
      '⚠️ LIMBAH KRITIS B3 (PRIORITAS BAHAYA):\n' +
      '   Sampah B3 wajib segera dipilah sebelum lolos dari konveyor\n' +
      '   agar kesempatan keselamatan (sirene) tidak berkurang!\n\n' +
      '⭐ SAMPAH EMAS (3R HERO):\n' +
      '   Sampah dengan kilau partikel emas memberi skor dobel (x2.0).', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13.5px',
      color: '#E2E8F0',
      lineSpacing: 5
    });

    rightContainer.add([rbg, rTitle, rBody]);
    container.add([leftContainer, rightContainer]);
  }

  openAboutModal() {
    if (this.activeModal) {
      this.activeModal.destroy();
      this.activeModal = null;
    }

    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const modal = this.add.container(0, 0).setDepth(2000);

    // Dim Backdrop
    const backdrop = this.add.rectangle(w / 2, h / 2, w, h, 0x02060e, 0.88);
    backdrop.setInteractive();
    backdrop.on('pointerdown', () => {
      sounds.playClick();
      modal.destroy();
      this.activeModal = null;
    });
    modal.add(backdrop);

    // Main Modal Frame (1040 x 610 - Spacious & Professional)
    const mW = 1040;
    const mH = 610;
    const mX = w / 2;
    const mY = h / 2;

    const blocker = this.add.rectangle(mX, mY, mW, mH, 0x000000, 0.001);
    blocker.setInteractive();
    modal.add(blocker);

    const bg = this.add.graphics();
    // Shadow
    bg.fillStyle(0x000000, 0.85);
    bg.fillRoundedRect(mX - mW / 2 + 8, mY - mH / 2 + 10, mW, mH, 14);

    // Frame Body
    bg.fillStyle(0x0b131e, 0.98);
    bg.fillRoundedRect(mX - mW / 2, mY - mH / 2, mW, mH, 14);
    bg.lineStyle(2.5, 0x64748b, 1);
    bg.strokeRoundedRect(mX - mW / 2, mY - mH / 2, mW, mH, 14);

    // Top Header Banner
    bg.fillStyle(0x0f172a, 1);
    bg.fillRoundedRect(mX - mW / 2, mY - mH / 2, mW, 66, { tl: 14, tr: 14, bl: 0, br: 0 });
    bg.lineStyle(1.5, 0x1e293b, 1);
    bg.lineBetween(mX - mW / 2, mY - mH / 2 + 66, mX + mW / 2, mY - mH / 2 + 66);
    modal.add(bg);

    // Header Title & Subtitle
    const title = this.add.text(mX - mW / 2 + 30, mY - mH / 2 + 20, 'TENTANG PENGEMBANG (ABOUT DEVELOPER)', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    });

    const sub = this.add.text(mX - mW / 2 + 30, mY - mH / 2 + 45, 'PILAH SAMPAH: PAHLAWAN KEBERSIHAN KOTA • BBGTK JATENG', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#38BDF8'
    });

    // Close button (✕)
    const closeBtn = this.add.text(mX + mW / 2 - 34, mY - mH / 2 + 32, '✕', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#94A3B8'
    }).setOrigin(0.5);
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      sounds.playClick();
      modal.destroy();
      this.activeModal = null;
    });
    closeBtn.on('pointerover', () => closeBtn.setColor('#EF4444'));
    closeBtn.on('pointerout', () => closeBtn.setColor('#94A3B8'));

    modal.add([title, sub, closeBtn]);

    // Left Box: Developer Profile
    const panW = 480;
    const panH = 415;
    const panY = mY - mH / 2 + 285;

    const leftContainer = this.add.container(mX - 250, panY);
    const lbg = this.add.graphics();
    lbg.fillStyle(0x0f172a, 0.95);
    lbg.fillRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);
    lbg.lineStyle(2, 0x16a34a, 0.9);
    lbg.strokeRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);

    lbg.fillStyle(0x15803d, 1);
    lbg.fillRoundedRect(-panW / 2, -panH / 2, panW, 46, { tl: 8, tr: 8, bl: 0, br: 0 });

    const lTitle = this.add.text(0, -panH / 2 + 23, '👤 IDENTITAS PENGEMBANG MEDIA', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const lDesc = this.add.text(-panW / 2 + 22, -panH / 2 + 58,
      '• NAMA PENGEMBANG:\n' +
      '  Riskhi Ilham Hidayat\n\n' +
      '• JABATAN:\n' +
      '  Pengembang Teknologi Pembelajaran\n\n' +
      '• INSTANSI:\n' +
      '  BBGTK Jateng (Balai Besar Guru & Tenaga Kependidikan)\n\n' +
      '• JUDUL KARYA:\n' +
      '  Pilah Sampah: Pahlawan Kebersihan Kota\n\n' +
      '• SASARAN PENGGUNA:\n' +
      '  Siswa Sekolah Dasar & Menengah, Pendidik, serta Masyarakat\n\n' +
      '• TUJUAN PENGEMBANGAN:\n' +
      '  Menciptakan media pembelajaran berbasis gamifikasi yang interaktif\n' +
      '  untuk menumbuhkan kepedulian lingkungan dan kebiasaan pilah sampah.', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13.5px',
      color: '#E2E8F0',
      lineSpacing: 3
    });

    leftContainer.add([lbg, lTitle, lDesc]);

    // Right Box: Technology Stack & Specs
    const rightContainer = this.add.container(mX + 250, panY);
    const rbg = this.add.graphics();
    rbg.fillStyle(0x0f172a, 0.95);
    rbg.fillRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);
    rbg.lineStyle(2, 0x0284c7, 0.9);
    rbg.strokeRoundedRect(-panW / 2, -panH / 2, panW, panH, 8);

    rbg.fillStyle(0x0369a1, 1);
    rbg.fillRoundedRect(-panW / 2, -panH / 2, panW, 46, { tl: 8, tr: 8, bl: 0, br: 0 });

    const rTitle = this.add.text(0, -panH / 2 + 23, '⚙️ SPESIFIKASI TEKNOLOGI GAME', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const rDesc = this.add.text(-panW / 2 + 22, -panH / 2 + 58,
      '• GAME ENGINE & RUNTIME:\n' +
      '  Phaser 3.80+ (HTML5 Canvas & WebGL High Performance)\n\n' +
      '• PENGEMBANGAN KODE:\n' +
      '  Modern Vanilla JavaScript (ESNext) & Vite Bundler\n\n' +
      '• SISTEM GRAFIS & ASET:\n' +
      '  2D Cel-Shaded Vector Engine (48 Aset Sampah Realistis)\n\n' +
      '• SISTEM AUDIO AKUSTIK:\n' +
      '  Web Audio API Organic Synthesizer (Ketukan Marimba Kayu\n' +
      '  Physical Acoustic Modeling, Zero External Dependency)\n\n' +
      '• EDISI & VERSI:\n' +
      '  Versi 1.2 (Edisi Pembelajaran Interaktif)', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13.5px',
      color: '#E2E8F0',
      lineSpacing: 3
    });

    rightContainer.add([rbg, rTitle, rDesc]);

    // Bottom Ecological Quote Plate
    const quoteY = mY + mH / 2 - 34;
    const qbg = this.add.graphics();
    qbg.fillStyle(0x0f172a, 0.95);
    qbg.fillRoundedRect(mX - 480, quoteY - 22, 960, 44, 6);
    qbg.lineStyle(1.5, 0x475569, 0.8);
    qbg.strokeRoundedRect(mX - 480, quoteY - 22, 960, 44, 6);

    const quoteTxt = this.add.text(mX, quoteY, '"Bumi bukan warisan nenek moyang, melainkan titipan anak cucu kita. Belajar memilah sampah dari sekarang!"', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13.5px',
      fontStyle: 'italic',
      color: '#FBBF24'
    }).setOrigin(0.5);

    modal.add([leftContainer, rightContainer, qbg, quoteTxt]);
    this.activeModal = modal;
  }
}
