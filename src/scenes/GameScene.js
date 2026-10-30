/**
 * GameScene.js
 * Intuitive Drag-and-Drop & Click-to-Sort recycling gameplay.
 * Features 4 distinct corner bins, smooth item dragging, interactive first-step tutorial,
 * celebratory feedback, and educational hazard mitigation.
 */
import { GAME_CONFIG } from '../config.js';
import { ConveyorBelt } from '../objects/ConveyorBelt.js';
import { SortingBin } from '../objects/SortingBin.js';
import { WasteItem } from '../objects/WasteItem.js';
import { WASTE_ITEMS, WASTE_CATEGORIES } from '../data/wasteDatabase.js';
import { getLevelConfig } from '../data/levelConfig.js';
import { sounds } from '../audio/SoundManager.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.currentLevel = data.level || 1;
    this.levelConfig = getLevelConfig(this.currentLevel);

    this.score = 0;
    this.totalSorted = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.hazardMisses = 0;
    this.comboCount = 0;
    this.timeRemaining = this.levelConfig.timeLimitSeconds;
    this.isLevelActive = false;
    this.isTutorialActive = false;

    this.activeWasteItems = [];
    this.selectedItem = null;
    this.spawnTimer = null;
    this.countdownTimer = null;
    this.isSurgeActive = false;
    this.hasSurged = false;

    // Smart Randomization & Variety Tracking (Prevents duplicate streaks)
    this.lastSpawnedId = null;
    this.lastCategoryId = null;
    this.consecutiveCategoryCount = 0;
    this.recentSpawnHistory = [];
  }

  create() {
    sounds.init();
    sounds.startConveyorHum();

    // 1. District-Specific Facility Background (6 District Levels)
    const bgMap = {
      1: 'bg_level_1_residential',
      2: 'bg_level_1_residential',
      3: 'bg_level_2_business',
      4: 'bg_level_3_culinary',
      5: 'bg_level_4_market',
      6: 'bg_level_5_metropolis'
    };
    const bgKey = bgMap[this.currentLevel] || 'bg_facility_main';
    const textureToUse = this.textures.exists(bgKey) ? bgKey : 'bg_facility_main';
    this.add.image(GAME_CONFIG.WIDTH / 2, GAME_CONFIG.HEIGHT / 2, textureToUse)
      .setDisplaySize(GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);

    // 1b. Floor Safety Markings & Zoning Lines (Painted on Concrete Floor)
    this.createFloorZoningMarkings();

    // 1c. District Atmospheric Lighting & Environment per Shift
    this.applyDistrictEnvironmentAtmosphere();

    // 2. Conveyor Belt across middle
    this.conveyorY = 415;
    this.conveyor = new ConveyorBelt(
      this,
      0,
      this.conveyorY,
      GAME_CONFIG.WIDTH,
      100,
      this.levelConfig.conveyorSpeed * 0.75 // Comfortable speed for dragging
    );

    // 3. Four Large 2D Cel-Shaded Cartoon Wheelie Sorting Bins
    this.bins = {
      ORGANIC: new SortingBin(this, 180, 244, 'ORGANIC', {
        color: 0x16a34a,
        accentColor: 0x22c55e,
        title: 'ORGANIK',
        subtitle: 'Sisa Makanan, Sayur, Daun, Roti',
        icon: 'BIO',
        textureKey: 'bin_organic',
        hotkey: 'Q'
      }),
      RECYCLE: new SortingBin(this, 1100, 244, 'RECYCLE', {
        color: 0x0284c7,
        accentColor: 0x38bdf8,
        title: 'DAUR ULANG',
        subtitle: 'Botol, Kaleng, Kardus, Toples',
        icon: 'REC',
        textureKey: 'bin_recycle',
        hotkey: 'W'
      }),
      HAZARD: new SortingBin(this, 180, 600, 'HAZARD', {
        color: 0xdc2626,
        accentColor: 0xf87171,
        title: 'B3 (BAHAYA)',
        subtitle: 'Baterai, Beling, E-Waste, Cat',
        icon: 'HAZ',
        textureKey: 'bin_hazard',
        hotkey: 'E'
      }),
      RESIDUAL: new SortingBin(this, 1100, 600, 'RESIDUAL', {
        color: 0x334155,
        accentColor: 0x64748b,
        title: 'RESIDU',
        subtitle: 'Sachet, Sedotan, Popok, Mika',
        icon: 'RES',
        textureKey: 'bin_residual',
        hotkey: 'R'
      })
    };

    // Setup Click-on-Bin listeners for click-to-pick workflow
    Object.values(this.bins).forEach(bin => {
      bin.on('pointerdown', () => {
        if (this.selectedItem && !this.selectedItem.isSorted) {
          this.handleItemDroppedIntoBin(this.selectedItem, bin);
        }
      });
    });

    // Screen Flash on Hazard error
    this.hazardFlash = this.add.rectangle(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2,
      GAME_CONFIG.WIDTH,
      GAME_CONFIG.HEIGHT,
      0xe74c3c,
      0
    );

    // Setup Keyboard Hotkeys (Q, W, E, R)
    this.setupKeyboardHotkeys();

    // Launch HUD Scene
    this.scene.launch('HUDScene');

    // Show Shift Mission Briefing Board before starting
    this.showShiftMissionBriefing();
  }

  showShiftMissionBriefing() {
    this.conveyor.setRunning(false);
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const cfg = this.levelConfig;

    const overlay = this.add.container(0, 0);

    // Dark environmental dim
    const dim = this.add.rectangle(w / 2, h / 2, w, h, 0x05080c, 0.75);
    overlay.add(dim);

    // Heavy Industrial Clipboard Chassis
    const bW = 680;
    const bH = 430;
    const bX = w / 2;
    const bY = h / 2;

    const bg = this.add.graphics();
    // Drop shadow
    bg.fillStyle(0x020406, 0.9);
    bg.fillRoundedRect(bX - bW / 2 + 8, bY - bH / 2 + 10, bW, bH, 16);

    // Armor Casing
    bg.fillStyle(0x0f172a, 0.98);
    bg.fillRoundedRect(bX - bW / 2, bY - bH / 2, bW, bH, 16);

    let themeBorder = 0x22c55e;
    if (this.currentLevel === 2) themeBorder = 0xf59e0b;
    else if (this.currentLevel === 3) themeBorder = 0xef4444;
    else if (this.currentLevel === 4) themeBorder = 0x38bdf8;
    else if (this.currentLevel === 5) themeBorder = 0xa855f7;

    bg.lineStyle(3, themeBorder, 1);
    bg.strokeRoundedRect(bX - bW / 2, bY - bH / 2, bW, bH, 16);

    // Corner Hex Bolts
    bg.fillStyle(0x94a3b8, 1);
    bg.fillCircle(bX - bW / 2 + 16, bY - bH / 2 + 16, 4);
    bg.fillCircle(bX + bW / 2 - 16, bY - bH / 2 + 16, 4);
    bg.fillCircle(bX - bW / 2 + 16, bY + bH / 2 - 16, 4);
    bg.fillCircle(bX + bW / 2 - 16, bY + bH / 2 - 16, 4);

    overlay.add(bg);

    // Header: Briefing Badge
    const badgeText = this.add.text(bX, bY - bH / 2 + 32, '[ PETUNJUK LEVEL ]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#38BDF8'
    }).setOrigin(0.5);

    const titleText = this.add.text(bX, bY - bH / 2 + 66, cfg.title.toUpperCase(), {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const subTitleText = this.add.text(bX, bY - bH / 2 + 96, cfg.subtitle, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    // Narrative Lore Box
    const loreBox = this.add.graphics();
    loreBox.fillStyle(0x0a1017, 0.9);
    loreBox.fillRoundedRect(bX - bW / 2 + 30, bY - 92, bW - 60, 100, 8);
    loreBox.lineStyle(1.5, 0x1e293b, 1);
    loreBox.strokeRoundedRect(bX - bW / 2 + 30, bY - 92, bW - 60, 100, 8);
    overlay.add(loreBox);

    const descText = this.add.text(bX, bY - 42, cfg.description, {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '15.5px',
      color: '#E2E8F0',
      lineSpacing: 5,
      align: 'center',
      wordWrap: { width: bW - 80 }
    }).setOrigin(0.5);

    // Target Metrics Grid
    const metricsY = bY + 50;
    const mBg = this.add.graphics();
    mBg.fillStyle(0x131f2b, 1);
    mBg.fillRoundedRect(bX - bW / 2 + 30, metricsY - 26, bW - 60, 52, 6);
    overlay.add(mBg);

    const mText = this.add.text(bX, metricsY, `TARGET: ${cfg.targetItems} Sampah   |   WAKTU: ${cfg.timeLimitSeconds}s   |   MIN. AKURASI: ${Math.round(cfg.minPurityForWin * 100)}%   |   BATAS KESALAHAN B3: ${cfg.allowedHazardMisses}x`, {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '13.5px',
      fontStyle: 'bold',
      color: '#4ADE80'
    }).setOrigin(0.5);

    // Action Button: [MULAI MAIN SEKARANG]
    const btnY = bY + bH / 2 - 50;
    const startBtn = this.add.container(bX, btnY);
    const sbg = this.add.graphics();
    sbg.fillStyle(0x16a34a, 1);
    sbg.fillRoundedRect(-190, -25, 380, 50, 8);
    sbg.lineStyle(2, 0xffffff, 0.6);
    sbg.strokeRoundedRect(-190, -25, 380, 50, 8);

    const stxt = this.add.text(0, 0, 'MULAI MAIN SEKARANG ▶', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    startBtn.add([sbg, stxt]);
    startBtn.setSize(380, 50);
    startBtn.setInteractive({ useHandCursor: true });

    startBtn.on('pointerdown', () => {
      sounds.playClick();
      overlay.destroy();
      this.conveyor.setRunning(true);

      if (this.currentLevel === 1) {
        this.startTutorialShift();
      } else {
        this.startShift();
      }
    });

    startBtn.on('pointerover', () => startBtn.setScale(1.04));
    startBtn.on('pointerout', () => startBtn.setScale(1.0));

    overlay.add([badgeText, titleText, subTitleText, descText, mText, startBtn]);
  }

  setupKeyboardHotkeys() {
    this.input.keyboard.on('keydown', (event) => {
      if (!this.isLevelActive && !this.isTutorialActive) return;
      const key = event.key.toUpperCase();
      let cat = null;

      if (key === 'Q' || key === '1') cat = 'ORGANIC';
      else if (key === 'W' || key === '2') cat = 'RECYCLE';
      else if (key === 'E' || key === '3') cat = 'HAZARD';
      else if (key === 'R' || key === '4') cat = 'RESIDUAL';

      if (cat && this.bins[cat]) {
        // If an item is already selected, send it to that bin
        const item = this.selectedItem || this.getClosestItem();
        if (item && !item.isSorted) {
          this.handleItemDroppedIntoBin(item, this.bins[cat]);
        }
      }
    });
  }

  getClosestItem() {
    const candidates = this.activeWasteItems.filter(i => !i.isSorted && i.x > 80 && i.x < 1180);
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => b.x - a.x);
    return candidates[0];
  }

  selectItem(item) {
    if (this.selectedItem && this.selectedItem !== item) {
      this.selectedItem.setSelected(false);
    }
    this.selectedItem = item;
    item.setSelected(true);
    sounds.playClick();
  }

  checkBinHover(x, y) {
    Object.values(this.bins).forEach(bin => {
      const bounds = bin.getBounds();
      if (bounds.contains(x, y)) {
        bin.highlightHover();
      } else if (typeof bin.drawNormalState === 'function') {
        bin.drawNormalState();
      }
    });
  }

  findBinAt(x, y) {
    for (const bin of Object.values(this.bins)) {
      const bounds = bin.getBounds();
      if (bounds.contains(x, y)) {
        return bin;
      }
    }
    return null;
  }

  startTutorialShift() {
    this.isTutorialActive = true;
    this.conveyor.setRunning(true);

    // Spawn 1 apple core for guided tutorial
    const itemData = WASTE_ITEMS.find(i => i.id === 'item_apple_core');
    const tutorialItem = new WasteItem(this, -40, this.conveyorY, itemData);
    tutorialItem.setSpeed(120);
    this.activeWasteItems.push(tutorialItem);

    // Wait until it reaches near center, then pause and show guide
    const checkTutorialArrival = this.time.addEvent({
      delay: 50,
      loop: true,
      callback: () => {
        if (tutorialItem.x >= 600) {
          checkTutorialArrival.remove();
          this.conveyor.setRunning(false);
          tutorialItem.setSpeed(0);
          this.showTutorialOverlay(tutorialItem);
        }
      }
    });
  }

  createFloorZoningMarkings() {
    const fg = this.add.graphics();

    // 1. Painted Floor Pathway Lines (Connecting Conveyor to Bins)
    // Organic (Green Pathway, Top-Left)
    fg.lineStyle(4, 0x22c55e, 0.45);
    fg.beginPath();
    fg.moveTo(340, 365);
    fg.lineTo(240, 365);
    fg.lineTo(180, 320);
    fg.strokePath();

    // Recycle (Amber Pathway, Top-Right)
    fg.lineStyle(4, 0xf59e0b, 0.45);
    fg.beginPath();
    fg.moveTo(940, 365);
    fg.lineTo(1040, 365);
    fg.lineTo(1100, 320);
    fg.strokePath();

    // Hazard (Red Pathway, Bottom-Left)
    fg.lineStyle(4, 0xef4444, 0.45);
    fg.beginPath();
    fg.moveTo(340, 465);
    fg.lineTo(240, 465);
    fg.lineTo(180, 520);
    fg.strokePath();

    // Residual (Slate Pathway, Bottom-Right)
    fg.lineStyle(4, 0x94a3b8, 0.45);
    fg.beginPath();
    fg.moveTo(940, 465);
    fg.lineTo(1040, 465);
    fg.lineTo(1100, 520);
    fg.strokePath();

    // 2. Floor Safety Boundary Boxes under each Bin
    const binZones = [
      { x: 180, y: 244, color: 0x22c55e, label: 'ZONA 1: BIO-ORGANIK' },
      { x: 1100, y: 244, color: 0xf59e0b, label: 'ZONA 2: DAUR ULANG' },
      { x: 180, y: 600, color: 0xef4444, label: 'ZONA 3: B3 BAHAYA' },
      { x: 1100, y: 600, color: 0x94a3b8, label: 'ZONA 4: RESIDU KOTA' }
    ];

    binZones.forEach(z => {
      fg.lineStyle(2, z.color, 0.35);
      fg.strokeRoundedRect(z.x - 115, z.y - 82, 230, 164, 14);

      // Stenciled Floor Text
      this.add.text(z.x, z.y + 86, z.label, {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '13px',
        fontStyle: 'bold',
        color: '#94A3B8'
      }).setOrigin(0.5);
    });
  }

  applyDistrictEnvironmentAtmosphere() {
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const lvl = this.currentLevel;

    // 1. Atmosphere Profiles per District Level (6 Levels)
    const profiles = {
      1: {
        districtName: 'DISTRIK 01: GRIYA ASRI',
        tintColor: 0xf59e0b,
        tintAlpha: 0.12,
        ambientVignette: 0x064e3b,
        vignetteAlpha: 0.15,
        themeBorder: 0x22c55e,
        timeBadge: 'PAGI HARI (GOLDEN DAWN)',
        particleColor: [0x4ade80, 0xfacc15]
      },
      2: {
        districtName: 'DISTRIK 02: SD HIJAU MERDEKA',
        tintColor: 0x10b981,
        tintAlpha: 0.12,
        ambientVignette: 0x064e3b,
        vignetteAlpha: 0.15,
        themeBorder: 0x16a34a,
        timeBadge: 'JAM ISTIRAHAT KANTIN SEKOLAH',
        particleColor: [0x34d399, 0xfacc15]
      },
      3: {
        districtName: 'DISTRIK 03: PERKANTORAN KOTA',
        tintColor: 0x0284c7,
        tintAlpha: 0.12,
        ambientVignette: 0x0c2538,
        vignetteAlpha: 0.18,
        themeBorder: 0x38bdf8,
        timeBadge: 'SIANG METROPOLIS',
        particleColor: [0x38bdf8, 0xe0f2fe]
      },
      4: {
        districtName: 'DISTRIK 04: PUSAT KULINER & MALL',
        tintColor: 0xe11d48,
        tintAlpha: 0.15,
        ambientVignette: 0x4c0519,
        vignetteAlpha: 0.22,
        themeBorder: 0xf97316,
        timeBadge: 'SENJA PENDAR NEON (DUSK)',
        particleColor: [0xfb923c, 0xf43f5e]
      },
      5: {
        districtName: 'DISTRIK 05: PASAR TRADISIONAL',
        tintColor: 0xca8a04,
        tintAlpha: 0.15,
        ambientVignette: 0x020617,
        vignetteAlpha: 0.32,
        themeBorder: 0xeab308,
        timeBadge: 'LEMBUR MALAM INDUSTRI',
        particleColor: [0xfde047, 0x94a3b8]
      },
      6: {
        districtName: 'DISTRIK 06: METROPOLIS ZERO WASTE',
        tintColor: 0x10b981,
        tintAlpha: 0.14,
        ambientVignette: 0x3b0764,
        vignetteAlpha: 0.20,
        themeBorder: 0xa855f7,
        timeBadge: 'FAJAR FUTURISTIK SIRKULAR',
        particleColor: [0x34d399, 0xa7f3d0]
      }
    };

    const p = profiles[lvl] || profiles[1];

    // 2. Atmospheric Sky & Window Color Grading Tint
    const skyTint = this.add.graphics();
    skyTint.fillStyle(p.tintColor, p.tintAlpha);
    skyTint.fillRect(0, 0, w, h);

    // Vignette / Ambient Edge Atmosphere
    const edgeVignette = this.add.graphics();
    edgeVignette.fillStyle(p.ambientVignette, p.vignetteAlpha);
    edgeVignette.fillRect(0, 0, w, 120);
    edgeVignette.fillRect(0, h - 70, w, 70);

    // 3. District Intake Chute Header Plate (Mounted above left conveyor inlet)
    const inX = 165;
    const inY = 328;
    const inW = 320;
    const inH = 48;

    const inBg = this.add.graphics();
    inBg.fillStyle(0x0f172a, 0.95);
    inBg.fillRoundedRect(inX - inW / 2, inY - inH / 2, inW, inH, 6);
    inBg.lineStyle(2, p.themeBorder, 0.9);
    inBg.strokeRoundedRect(inX - inW / 2, inY - inH / 2, inW, inH, 6);

    // Glowing Intake Status LED
    const inLed = this.add.circle(inX - inW / 2 + 14, inY, 5, p.themeBorder, 1);
    this.tweens.add({
      targets: inLed,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    this.add.text(inX - inW / 2 + 28, inY - 11, p.districtName, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    });

    this.add.text(inX - inW / 2 + 28, inY + 8, `${p.timeBadge} • JALUR BONGKAR MUAT`, {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#CBD5E1'
    });

    // 4. Ambient Drifting Atmospheric Particles (7 subtle floating motes)
    for (let i = 0; i < 7; i++) {
      const px = Phaser.Math.Between(40, w - 40);
      const py = Phaser.Math.Between(80, h - 140);
      const col = Phaser.Utils.Array.GetRandom(p.particleColor);
      const mote = this.add.circle(px, py, Phaser.Math.Between(2, 4), col, Phaser.Math.FloatBetween(0.3, 0.65));

      this.tweens.add({
        targets: mote,
        x: px + Phaser.Math.Between(-80, 80),
        y: py + Phaser.Math.Between(-40, 40),
        alpha: { from: 0.2, to: 0.7 },
        duration: Phaser.Math.Between(2500, 4500),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }
  }

  showTutorialOverlay(tutorialItem) {
    const overlay = this.add.container(0, 0);

    // Dark environmental dim
    const dim = this.add.rectangle(
      GAME_CONFIG.WIDTH / 2,
      GAME_CONFIG.HEIGHT / 2,
      GAME_CONFIG.WIDTH,
      GAME_CONFIG.HEIGHT,
      0x05080c,
      0.65
    );
    overlay.add(dim);

    // Rugged Industrial Intercom / Walkie-Talkie Transceiver Frame
    const icX = 640;
    const icY = 270;
    const icW = 620;
    const icH = 160;

    const icBg = this.add.graphics();
    // Shadow
    icBg.fillStyle(0x020406, 0.8);
    icBg.fillRoundedRect(icX - icW / 2 + 6, icY - icH / 2 + 8, icW, icH, 14);

    // Outer Heavy Casing
    icBg.fillStyle(0x0f172a, 0.98);
    icBg.fillRoundedRect(icX - icW / 2, icY - icH / 2, icW, icH, 14);
    icBg.lineStyle(3, 0x22c55e, 1);
    icBg.strokeRoundedRect(icX - icW / 2, icY - icH / 2, icW, icH, 14);

    // Chrome bolts on corners
    const bolts = [
      { bx: icX - icW / 2 + 12, by: icY - icH / 2 + 12 },
      { bx: icX + icW / 2 - 12, by: icY - icH / 2 + 12 },
      { bx: icX - icW / 2 + 12, by: icY + icH / 2 - 12 },
      { bx: icX + icW / 2 - 12, by: icY + icH / 2 - 12 }
    ];
    icBg.fillStyle(0x94a3b8, 1);
    bolts.forEach(b => icBg.fillCircle(b.bx, b.by, 3.5));

    // Walkie-Talkie Speaker Grille Lines
    icBg.lineStyle(2, 0x334155, 0.8);
    for (let gy = icY - 20; gy <= icY + 30; gy += 10) {
      icBg.lineBetween(icX - icW / 2 + 20, gy, icX - icW / 2 + 55, gy);
    }

    overlay.add(icBg);

    // Frequency / Call Sign Header
    const freqText = this.add.text(icX, icY - 54, '[ LIVE TRANSMISI: PENGAWAS PABRIK SIRKULAR ]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#4ADE80'
    }).setOrigin(0.5);

    const title = this.add.text(icX + 20, icY - 26, 'SAMPEL ORGANIK TERDETEKSI DI KONVEYOR!', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const desc = this.add.text(icX + 20, icY + 18, 'Seret Sisa Apel ini ke CORONG HIJAU (Organik) di atas-kiri,\natau klik sampahnya lalu klik tongnya untuk memilah!', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '14.5px',
      color: '#E2E8F0',
      align: 'center'
    }).setOrigin(0.5);

    const promptAction = this.add.text(icX + 20, icY + 54, '⚡ [ PRAKTIKKAN SEKARANG DENGAN MENYERET SAMPAH ]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    overlay.add([freqText, title, desc, promptAction]);

    // Animated Pointer Arrow pointing toward the Organic Bin
    const arrow = this.add.text(tutorialItem.x - 20, tutorialItem.y - 65, '↖️ SERET KE CORONG HIJAU', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '19px',
      fontStyle: 'bold',
      color: '#22C55E',
      backgroundColor: '#0F172A',
      padding: { x: 10, y: 6 }
    }).setOrigin(0.5);
    overlay.add(arrow);

    this.tweens.add({
      targets: arrow,
      x: 270,
      y: 260,
      duration: 1100,
      repeat: -1,
      yoyo: true,
      ease: 'Sine.easeInOut'
    });

    this.tutorialOverlay = overlay;
    this.children.bringToTop(tutorialItem);
  }

  completeTutorial() {
    if (this.tutorialOverlay) {
      this.tutorialOverlay.destroy();
      this.tutorialOverlay = null;
    }
    this.isTutorialActive = false;
    this.conveyor.setRunning(true);
    this.startShift();
  }

  startShift() {
    this.isLevelActive = true;

    // Item Spawner
    this.spawnTimer = this.time.addEvent({
      delay: Math.max(1600, this.levelConfig.spawnInterval * 1.2),
      callback: this.spawnNextItem,
      callbackScope: this,
      loop: true
    });

    // Countdown Clock
    this.countdownTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (!this.isLevelActive) return;
        this.timeRemaining--;
        this.syncStats();

        if (this.timeRemaining <= 0) {
          this.endShift(this.checkWinCondition());
        }
      },
      callbackScope: this,
      loop: true
    });

    this.syncStats();
  }

  spawnNextItem() {
    if (!this.isLevelActive) return;

    // 1. Base pool based on level categories
    const pool = WASTE_ITEMS.filter(item => 
      this.levelConfig.activeCategories.includes(item.category)
    );

    // 2. Smart Fair Variety Filter:
    // A) Exclude items currently active/visible on the conveyor belt to prevent identical duplicates on screen
    const activeIds = this.activeWasteItems
      .filter(w => !w.isSorted && w.active)
      .map(w => w.itemData.id);

    // Combine active items on conveyor with recent spawn history (last 3 items)
    const excludeIds = new Set([...activeIds, ...(this.recentSpawnHistory || [])]);
    let candidates = pool.filter(item => !excludeIds.has(item.id));

    // Fallback 1: If pool is smaller than excludeIds, just avoid items currently on screen
    if (candidates.length === 0) {
      candidates = pool.filter(item => !activeIds.includes(item.id));
    }

    // Fallback 2: At minimum, avoid spawning the exact same item back-to-back
    if (candidates.length === 0) {
      candidates = pool.filter(item => item.id !== this.lastSpawnedId);
    }
    if (candidates.length === 0) {
      candidates = pool;
    }

    // B) Prevent category saturation: if same category spawned 2x in a row, prefer alternate category
    if (this.consecutiveCategoryCount >= 2 && this.levelConfig.activeCategories.length > 1) {
      const alternateCandidates = candidates.filter(item => item.category !== this.lastCategoryId);
      if (alternateCandidates.length > 0) {
        candidates = alternateCandidates;
      }
    }

    const randomItemData = Phaser.Utils.Array.GetRandom(candidates) || Phaser.Utils.Array.GetRandom(pool);

    // Update tracking & history
    if (randomItemData.category === this.lastCategoryId) {
      this.consecutiveCategoryCount++;
    } else {
      this.consecutiveCategoryCount = 1;
      this.lastCategoryId = randomItemData.category;
    }
    this.lastSpawnedId = randomItemData.id;

    if (!this.recentSpawnHistory) this.recentSpawnHistory = [];
    this.recentSpawnHistory.push(randomItemData.id);
    if (this.recentSpawnHistory.length > 4) {
      this.recentSpawnHistory.shift();
    }

    // Dynamic Trait Generation (Golden items & Critical Hazmat)
    let trait = 'NORMAL';
    if (randomItemData.category === WASTE_CATEGORIES.RECYCLE || randomItemData.category === WASTE_CATEGORIES.ORGANIC) {
      if (Math.random() < 0.12) trait = 'GOLDEN';
    } else if (randomItemData.category === WASTE_CATEGORIES.HAZARD) {
      if (Math.random() < 0.18) trait = 'CRITICAL_HAZMAT';
    }

    const waste = new WasteItem(this, -50, this.conveyorY, randomItemData, trait);
    
    // Dynamic Speed: base speed scaled by weight multiplier and active surge
    const surgeMultiplier = this.isSurgeActive ? 1.25 : 1.0;
    waste.setSpeed(this.levelConfig.conveyorSpeed * 0.75 * waste.speedMult * surgeMultiplier);

    this.activeWasteItems.push(waste);
  }

  handleItemDroppedIntoBin(item, bin) {
    if (item.isSorted) return;

    // If tutorial was active, complete it now
    if (this.isTutorialActive) {
      this.completeTutorial();
    }

    const selectedCategory = bin.category;
    const isCorrect = (item.itemData.category === selectedCategory);
    this.totalSorted++;

    // Deselect
    if (this.selectedItem === item) {
      this.selectedItem = null;
    }

    // Remove from active array
    const idx = this.activeWasteItems.indexOf(item);
    if (idx !== -1) {
      this.activeWasteItems.splice(idx, 1);
    }

    // Animate item flying into bin
    item.divertTo(bin.x, bin.y, () => {
      if (bin && typeof bin.drawNormalState === 'function') {
        bin.drawNormalState();
      }
    });

    if (isCorrect) {
      this.correctCount++;
      this.comboCount++;
      bin.triggerSuccessBounce();

      let bonusMult = 1.0;
      if (this.comboCount >= 8) bonusMult = 3.0;
      else if (this.comboCount >= 5) bonusMult = 2.0;
      else if (this.comboCount >= 3) bonusMult = 1.5;

      let earned = Math.floor(item.itemData.points * bonusMult);

      // Trait Score Boosts
      if (item.trait === 'GOLDEN') {
        earned *= 2;
      } else if (item.trait === 'CRITICAL_HAZMAT') {
        earned += 150; // Critical rescue bonus!
      }

      this.score += earned;
      sounds.playSortSuccess(selectedCategory);

      // Particle celebration
      this.createSortParticles(bin.x, bin.y, selectedCategory);

      // Floating Score Popup above the bin!
      let floatColor = '#4ADE80';
      if (item.trait === 'GOLDEN') floatColor = '#FBBF24';
      else if (selectedCategory === 'RECYCLE') floatColor = '#38BDF8';
      else if (selectedCategory === 'HAZARD') floatColor = '#F87171';
      else if (selectedCategory === 'RESIDUAL') floatColor = '#CBD5E1';

      this.createFloatingScore(bin.x, bin.y - 70, `+${earned}`, floatColor);

      // Trigger mid-shift Rush Hour Surge at 50% target
      if (!this.hasSurged && this.totalSorted >= Math.floor(this.levelConfig.targetItems * 0.5) && this.totalSorted < this.levelConfig.targetItems - 2) {
        this.triggerRushHourSurge();
      }

      const comboText = this.comboCount >= 3 ? `COMBO x${this.comboCount}! ` : `TEPAT! `;
      const traitText = item.trait === 'GOLDEN' ? `[EMAS x2] ` : (item.trait === 'CRITICAL_HAZMAT' ? `[PENYELAMATAN B3] ` : '');
      this.events.emit('showFeedback', {
        text: `${comboText}${traitText}${item.itemData.name} masuk ${bin.config.title} (+${earned})`,
        isSuccess: true
      });
    } else {
      this.wrongCount++;
      this.comboCount = 0;
      this.score = Math.max(0, this.score - 50);
      bin.triggerErrorShake();
      sounds.playSortError();

      if (item.itemData.category === WASTE_CATEGORIES.HAZARD) {
        this.hazardMisses++;
        sounds.playHazardAlarm();
        this.cameras.main.shake(250, 0.02);
        this.createHazardExplosion(bin.x, bin.y);

        this.events.emit('showFeedback', {
          text: `BAHAYA! ${item.itemData.name} adalah limbah B3 beracun!`,
          isSuccess: false
        });

        if (this.hazardMisses >= this.levelConfig.allowedHazardMisses) {
          this.endShift(false, 'Batas kesalahan pemilahan limbah B3 habis!');
          return;
        }
      } else {
        this.cameras.main.shake(120, 0.008);
        this.events.emit('showFeedback', {
          text: `SALAH! ${item.itemData.name} seharusnya masuk kategori ${item.itemData.category}!`,
          isSuccess: false
        });
      }
    }

    this.syncStats();

    if (this.totalSorted >= this.levelConfig.targetItems) {
      this.endShift(this.checkWinCondition());
    }
  }

  createSortParticles(x, y, category) {
    let color = 0x2ecc71;
    if (category === 'RECYCLE') color = 0xf1c40f;
    if (category === 'HAZARD') color = 0x00e5ff;
    if (category === 'RESIDUAL') color = 0xbdc3c7;

    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14;
      const speed = Phaser.Math.Between(60, 150);
      const p = this.add.circle(x, y, Phaser.Math.Between(4, 8), color, 0.95);

      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed - 15,
        scaleX: 0.1,
        scaleY: 0.1,
        alpha: 0,
        duration: Phaser.Math.Between(450, 650),
        ease: 'Cubic.easeOut',
        onComplete: () => p.destroy()
      });
    }
  }

  createFloatingScore(x, y, text, color = '#4ADE80') {
    const scoreText = this.add.text(x, y, text, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '24px',
      fontStyle: 'bold',
      color: color,
      stroke: '#0F172A',
      strokeThickness: 5
    }).setOrigin(0.5);

    this.tweens.add({
      targets: scoreText,
      y: y - 55,
      alpha: 0,
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 850,
      ease: 'Cubic.easeOut',
      onComplete: () => scoreText.destroy()
    });
  }

  triggerRushHourSurge() {
    this.hasSurged = true;
    this.isSurgeActive = true;

    // Show temporary dynamic banner
    const w = GAME_CONFIG.WIDTH;
    const banner = this.add.container(w / 2, 85);

    const bg = this.add.graphics();
    bg.fillStyle(0xf59e0b, 0.95);
    bg.fillRoundedRect(-220, -18, 440, 36, 18);
    bg.lineStyle(2, 0xffffff, 0.9);
    bg.strokeRoundedRect(-220, -18, 440, 36, 18);

    const txt = this.add.text(0, 0, '⚡ GELOMBANG KANTIN: Volume sampah meningkat sebentar!', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '12.5px',
      fontStyle: 'bold',
      color: '#FFFFFF',
      stroke: '#0F172A',
      strokeThickness: 3
    }).setOrigin(0.5);

    banner.add([bg, txt]);

    this.tweens.add({
      targets: banner,
      scaleX: 1.05,
      scaleY: 1.05,
      yoyo: true,
      duration: 300,
      repeat: 3
    });

    // Auto-remove after 8 seconds and return conveyor to normal
    this.time.delayedCall(8000, () => {
      this.isSurgeActive = false;
      this.tweens.add({
        targets: banner,
        alpha: 0,
        y: 60,
        duration: 400,
        onComplete: () => banner.destroy()
      });
    });
  }

  createHazardExplosion(x, y) {
    this.hazardFlash.setAlpha(0.45);
    this.tweens.add({
      targets: this.hazardFlash,
      alpha: 0,
      duration: 350
    });

    const ring = this.add.circle(x, y, 20, 0xe74c3c, 0.8);
    ring.setStrokeStyle(4, 0xf1c40f);

    this.tweens.add({
      targets: ring,
      scaleX: 4,
      scaleY: 4,
      alpha: 0,
      duration: 450,
      ease: 'Cubic.easeOut',
      onComplete: () => ring.destroy()
    });
  }

  update(time, delta) {
    if (!this.isLevelActive && !this.isTutorialActive) return;

    this.conveyor.update(time, delta);

    // Update waste positions & handle falloff
    for (let i = this.activeWasteItems.length - 1; i >= 0; i--) {
      const item = this.activeWasteItems[i];
      item.update(delta);

      // Missed at end of conveyor
      if (item.x > GAME_CONFIG.WIDTH + 40 && !item.isSorted) {
        this.handleItemMissed(item);
        this.activeWasteItems.splice(i, 1);
      }
    }
  }

  handleItemMissed(item) {
    this.totalSorted++;
    this.wrongCount++;
    this.comboCount = 0;

    if (item.itemData.category === WASTE_CATEGORIES.HAZARD) {
      this.hazardMisses++;
      sounds.playHazardAlarm();
      this.cameras.main.shake(250, 0.02);
      this.createHazardExplosion(item.x, item.y);

      this.events.emit('showFeedback', {
        text: `[BAHAYA] Limbah B3 lolos ke pembuangan akhir!`,
        isSuccess: false
      });

      if (this.hazardMisses >= this.levelConfig.allowedHazardMisses) {
        this.endShift(false, 'Limbah B3 lolos dan mencemari lingkungan!');
        return;
      }
    } else {
      sounds.playSortError();
      this.events.emit('showFeedback', {
        text: `Sampah ${item.itemData.name} terlewat tanpa dipilah!`,
        isSuccess: false
      });
    }

    item.fallOff();
    this.syncStats();

    if (this.totalSorted >= this.levelConfig.targetItems) {
      this.endShift(this.checkWinCondition());
    }
  }

  checkWinCondition() {
    const purity = this.totalSorted > 0 ? (this.correctCount / this.totalSorted) : 0;
    return (purity >= this.levelConfig.minPurityForWin && this.hazardMisses < this.levelConfig.allowedHazardMisses);
  }

  syncStats() {
    const purity = this.totalSorted > 0 ? (this.correctCount / this.totalSorted) : 1.0;

    this.events.emit('updateStats', {
      levelTitle: this.levelConfig.title,
      quotaText: `TARGET: ${this.totalSorted} / ${this.levelConfig.targetItems}`,
      purity: purity,
      score: this.score,
      timeRemaining: this.timeRemaining,
      hazardMisses: this.hazardMisses,
      allowedHazardMisses: this.levelConfig.allowedHazardMisses
    });
  }

  endShift(isWin, customMessage = null) {
    if (!this.isLevelActive && !this.isTutorialActive) return;
    this.isLevelActive = false;
    this.isTutorialActive = false;

    if (this.spawnTimer) this.spawnTimer.remove();
    if (this.countdownTimer) this.countdownTimer.remove();
    sounds.stopConveyorHum();

    if (isWin) {
      sounds.playLevelComplete();
    } else {
      sounds.playLevelFailed();
    }

    const purity = this.totalSorted > 0 ? (this.correctCount / this.totalSorted) : 0;

    this.time.delayedCall(1000, () => {
      this.scene.stop('HUDScene');
      this.scene.start('SummaryScene', {
        level: this.currentLevel,
        isWin: isWin,
        purity: purity,
        score: this.score,
        correctCount: this.correctCount,
        wrongCount: this.wrongCount,
        hazardMisses: this.hazardMisses,
        customMessage: customMessage,
        levelConfig: this.levelConfig
      });
    });
  }
}
