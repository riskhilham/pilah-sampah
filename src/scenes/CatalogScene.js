/**
 * CatalogScene.js
 * Interactive Waste Encyclopedia & Action Waste Guide ("Kamus Sampah & Panduan Pilah").
 * Features:
 * - 32 waste items across 4 categories (8 Organik, 8 Daur Ulang, 8 B3, 8 Residu).
 * - Full-surface responsive buttons (fixed hitArea geometry offset on all centered containers).
 * - Multi-tab 3D Inspection Modal with non-leaking click events (modal never closes accidentally when clicked inside).
 * - Interactive modal dual-view tabs: [FAKTA ILMIAH & RISIKO] and [AKSI NYATA LINGKUNGAN (3R)].
 * - Jitter-free card hover scaling and neon glow.
 * - School context badges ([KANTIN], [KELAS], [UKS], [HALAMAN], [RUMAH], [KANTOR]).
 * - Audio SFX feedback and keyboard ESC / arrow keys navigation.
 */
import { GAME_CONFIG } from '../config.js';
import { WASTE_ITEMS, WASTE_CATEGORIES } from '../data/wasteDatabase.js';
import { sounds } from '../audio/SoundManager.js';

export class CatalogScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CatalogScene' });
  }

  create() {
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    sounds.init();

    this.currentFilter = 'ALL';
    this.currentPage = 0;
    this.itemsPerPage = 6;
    this.activeModal = null;

    // 1. Blueprint Grid Background
    this.add.rectangle(w / 2, h / 2, w, h, 0x090f14);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x13222e, 0.45);
    for (let x = 0; x < w; x += 32) {
      grid.lineBetween(x, 0, x, h);
    }
    for (let y = 0; y < h; y += 32) {
      grid.lineBetween(0, y, w, y);
    }

    // Top Header Gradient Scrim
    const topScrim = this.add.graphics();
    topScrim.fillGradientStyle(0x0f172a, 0x0f172a, 0x090f14, 0x090f14, 0.95, 0.95, 0.3, 0.3);
    topScrim.fillRect(0, 0, w, 140);

    // 2. Top Header Bar
    const headerBg = this.add.graphics();
    headerBg.fillStyle(0x0f172a, 0.95);
    headerBg.fillRect(0, 0, w, 70);
    headerBg.lineStyle(2, 0x1e293b, 1);
    headerBg.strokeRect(0, 0, w, 70);

    // Title & Subtitle
    this.add.text(w / 2, 23, 'KAMUS SAMPAH & PANDUAN PILAH', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '26px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    this.add.text(w / 2, 50, `PELAJARI ${WASTE_ITEMS.length} JENIS SAMPAH • WAKTU TERURAI • AKSI NYATA LINGKUNGAN (3R)`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#38BDF8',
      letterSpacing: 1
    }).setOrigin(0.5);

    // 3. Category Filter Tabs with Item Counters
    this.categoryTabs = [
      { key: 'ALL', label: 'SEMUA', count: WASTE_ITEMS.length, color: 0x334155, activeColor: 0x475569 },
      { key: WASTE_CATEGORIES.ORGANIC, label: 'ORGANIK', count: WASTE_ITEMS.filter(i => i.category === WASTE_CATEGORIES.ORGANIC).length, color: 0x166534, activeColor: 0x16a34a },
      { key: WASTE_CATEGORIES.RECYCLE, label: 'DAUR ULANG', count: WASTE_ITEMS.filter(i => i.category === WASTE_CATEGORIES.RECYCLE).length, color: 0x9a3412, activeColor: 0xea580c },
      { key: WASTE_CATEGORIES.HAZARD, label: 'B3 (BAHAYA)', count: WASTE_ITEMS.filter(i => i.category === WASTE_CATEGORIES.HAZARD).length, color: 0x991b1b, activeColor: 0xdc2626 },
      { key: WASTE_CATEGORIES.RESIDUAL, label: 'RESIDU', count: WASTE_ITEMS.filter(i => i.category === WASTE_CATEGORIES.RESIDUAL).length, color: 0x334155, activeColor: 0x64748b }
    ];

    this.tabButtons = [];
    this.createCategoryTabs();

    // 4. Grid Container for Cards
    this.itemsContainer = this.add.container(0, 0);

    // 5. Footer & Navigation Bar
    this.createFooter(w, h);

    // Initial render
    this.renderCatalogGrid();

    // Keyboard navigation
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.activeModal) {
        this.closeInspectionModal();
      } else {
        this.scene.start('MenuScene');
      }
    });

    this.input.keyboard.on('keydown-LEFT', () => {
      if (!this.activeModal && this.currentPage > 0) {
        sounds.playClick();
        this.currentPage--;
        this.renderCatalogGrid();
      }
    });

    this.input.keyboard.on('keydown-RIGHT', () => {
      if (!this.activeModal) {
        const filtered = this.getFilteredItems();
        const maxPages = Math.ceil(filtered.length / this.itemsPerPage);
        if (this.currentPage < maxPages - 1) {
          sounds.playClick();
          this.currentPage++;
          this.renderCatalogGrid();
        }
      }
    });
  }

  createCategoryTabs() {
    const startX = 100;
    const tabY = 98;
    const tabW = 205;
    const tabH = 36;
    const gap = 14;

    this.categoryTabs.forEach((tab, index) => {
      const tabX = startX + index * (tabW + gap) + tabW / 2;
      const tabBtn = this.add.container(tabX, tabY);

      const bg = this.add.graphics();
      tabBtn.add(bg);

      const label = this.add.text(0, 0, `${tab.label} (${tab.count})`, {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#FFFFFF'
      }).setOrigin(0.5);
      tabBtn.add(label);

      // Dedicated Rectangle HitZone (Centered 0, 0)
      const tabHit = this.add.rectangle(0, 0, tabW, tabH, 0x000000, 0.001);
      tabHit.setInteractive({ useHandCursor: true });
      tabBtn.add(tabHit);

      tabHit.on('pointerdown', () => {
        if (this.currentFilter !== tab.key) {
          sounds.playClick();
          this.currentFilter = tab.key;
          this.currentPage = 0;
          this.updateTabStyles();
          this.renderCatalogGrid();
        }
      });

      tabHit.on('pointerover', () => {
        if (this.currentFilter !== tab.key) {
          tabBtn.setScale(1.03);
        }
      });

      tabHit.on('pointerout', () => {
        tabBtn.setScale(1.0);
      });

      this.tabButtons.push({ container: tabBtn, bg, label, data: tab });
    });

    this.updateTabStyles();
  }

  updateTabStyles() {
    const tabW = 205;
    const tabH = 36;

    this.tabButtons.forEach(btn => {
      btn.bg.clear();
      const isActive = this.currentFilter === btn.data.key;

      if (isActive) {
        btn.bg.fillStyle(btn.data.activeColor, 1);
        btn.bg.fillRoundedRect(-tabW / 2, -tabH / 2, tabW, tabH, 8);
        btn.bg.lineStyle(2, 0xffffff, 0.9);
        btn.bg.strokeRoundedRect(-tabW / 2, -tabH / 2, tabW, tabH, 8);

        // Active bottom indicator pip
        btn.bg.fillStyle(0xffffff, 1);
        btn.bg.fillRoundedRect(-18, tabH / 2 - 3, 36, 3, 2);

        btn.label.setColor('#FFFFFF');
        btn.label.setFontSize('12.5px');
      } else {
        btn.bg.fillStyle(0x131f2e, 0.9);
        btn.bg.fillRoundedRect(-tabW / 2, -tabH / 2, tabW, tabH, 8);
        btn.bg.lineStyle(1.5, btn.data.color, 0.6);
        btn.bg.strokeRoundedRect(-tabW / 2, -tabH / 2, tabW, tabH, 8);

        btn.label.setColor('#94A3B8');
        btn.label.setFontSize('12px');
      }
    });
  }

  getFilteredItems() {
    if (this.currentFilter === 'ALL') {
      return WASTE_ITEMS;
    }
    return WASTE_ITEMS.filter(item => item.category === this.currentFilter);
  }

  renderCatalogGrid() {
    this.itemsContainer.removeAll(true);

    const filtered = this.getFilteredItems();
    const maxPages = Math.max(1, Math.ceil(filtered.length / this.itemsPerPage));
    if (this.currentPage >= maxPages) this.currentPage = maxPages - 1;

    // Update pagination status
    if (this.pageText) {
      this.pageText.setText(`HALAMAN ${this.currentPage + 1} / ${maxPages} • TOTAL ${filtered.length} SAMPAH`);
    }

    const startIndex = this.currentPage * this.itemsPerPage;
    const pageItems = filtered.slice(startIndex, startIndex + this.itemsPerPage);

    // Grid coordinates: 3 columns x 2 rows
    const startX = 90;
    const startY = 145;
    const cardW = 350;
    const cardH = 210;
    const gapX = 25;
    const gapY = 20;
    const cols = 3;

    pageItems.forEach((item, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      const card = this.createItemCard(x, y, cardW, cardH, item);
      this.itemsContainer.add(card);
    });
  }

  createItemCard(x, y, cardW, cardH, item) {
    const card = this.add.container(x, y);

    let catColor = 0x22c55e;
    let catHex = '#22C55E';
    let catName = 'ORGANIK';
    let binKey = '[Q]';

    if (item.category === WASTE_CATEGORIES.RECYCLE) {
      catColor = 0xf59e0b;
      catHex = '#F59E0B';
      catName = 'DAUR ULANG';
      binKey = '[W]';
    } else if (item.category === WASTE_CATEGORIES.HAZARD) {
      catColor = 0xef4444;
      catHex = '#EF4444';
      catName = 'B3 (BAHAYA)';
      binKey = '[E]';
    } else if (item.category === WASTE_CATEGORIES.RESIDUAL) {
      catColor = 0x94a3b8;
      catHex = '#94A3B8';
      catName = 'RESIDU';
      binKey = '[R]';
    }

    // 1. Base Chassis
    const bg = this.add.graphics();
    bg.fillStyle(0x0f172a, 0.96);
    bg.fillRoundedRect(0, 0, cardW, cardH, 10);
    bg.lineStyle(1.5, catColor, 0.7);
    bg.strokeRoundedRect(0, 0, cardW, cardH, 10);

    // Left category color indicator stripe
    bg.fillStyle(catColor, 1);
    bg.fillRoundedRect(0, 0, 6, cardH, { tl: 10, bl: 10, tr: 0, br: 0 });

    // 2. Top Header inside card: Category Badge + Location Tag
    const catBadgeBg = this.add.graphics();
    catBadgeBg.fillStyle(catColor, 0.22);
    catBadgeBg.fillRoundedRect(16, 12, 110, 22, 4);
    catBadgeBg.lineStyle(1, catColor, 0.8);
    catBadgeBg.strokeRoundedRect(16, 12, 110, 22, 4);

    const catBadgeText = this.add.text(71, 23, `${catName}`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: catHex
    }).setOrigin(0.5);

    // Location tag (School / Everyday context)
    const locTag = item.locationTag || 'SEKOLAH';
    const locText = this.add.text(cardW - 14, 23, `[ ${locTag} ]`, {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '12.5px',
      fontStyle: 'bold',
      color: '#38BDF8'
    }).setOrigin(1, 0.5);

    // 3. Center Section: Sprite Box + Details
    const spriteBox = this.add.graphics();
    spriteBox.fillStyle(0x020617, 1);
    spriteBox.fillRoundedRect(16, 42, 70, 70, 8);
    spriteBox.lineStyle(1.5, 0x1e293b, 1);
    spriteBox.strokeRoundedRect(16, 42, 70, 70, 8);

    // Sprite icon
    const sprite = this.add.image(51, 77, item.texture).setDisplaySize(60, 60);

    // Item Name
    const nameText = this.add.text(96, 42, item.name, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    });

    // Decomposition time
    const decompText = this.add.text(96, 68, `Waktu Urai: ${item.decomposeTime}`, {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#FBBF24',
      wordWrap: { width: 238 }
    });

    // Snippet of fact (cleanly truncated)
    const rawFact = item.fact || '';
    const factSnippet = rawFact.length > 70 ? rawFact.substring(0, 68) + '...' : rawFact;
    const factY = Math.max(88, decompText.y + decompText.height + 4);
    const factText = this.add.text(96, factY, factSnippet, {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '11.5px',
      color: '#94A3B8',
      wordWrap: { width: 238 },
      lineSpacing: 2
    });

    // 4. Bottom Interactive Cue Button Bar
    const actionBg = this.add.graphics();
    actionBg.fillStyle(0x131f2e, 0.9);
    actionBg.fillRoundedRect(16, 168, cardW - 32, 30, 6);
    actionBg.lineStyle(1, 0x334155, 0.8);
    actionBg.strokeRoundedRect(16, 168, cardW - 32, 30, 6);

    const actionText = this.add.text(cardW / 2, 183, `KLIK UNTUK INSPEKSI DETAIL ▶`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#38BDF8',
      letterSpacing: 0.5
    }).setOrigin(0.5);

    // Precise HitZone Rectangle inside the card (centered at cardW / 2, cardH / 2)
    // Eliminates Phaser 3 Container displayOrigin offset bug completely!
    const cardHit = this.add.rectangle(cardW / 2, cardH / 2, cardW, cardH, 0x000000, 0.0001);
    cardHit.setInteractive({ useHandCursor: true });

    card.add([
      bg,
      catBadgeBg,
      catBadgeText,
      locText,
      spriteBox,
      sprite,
      nameText,
      decompText,
      factText,
      actionBg,
      actionText,
      cardHit
    ]);

    // Smooth Jitter-Free Hover Effect
    cardHit.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(0x131f2e, 1);
      bg.fillRoundedRect(0, 0, cardW, cardH, 10);
      bg.lineStyle(2.5, catColor, 1);
      bg.strokeRoundedRect(0, 0, cardW, cardH, 10);
      bg.fillStyle(catColor, 1);
      bg.fillRoundedRect(0, 0, 6, cardH, { tl: 10, bl: 10, tr: 0, br: 0 });

      actionBg.clear();
      actionBg.fillStyle(catColor, 0.28);
      actionBg.fillRoundedRect(16, 168, cardW - 32, 30, 6);
      actionBg.lineStyle(1.5, catColor, 1);
      actionBg.strokeRoundedRect(16, 168, cardW - 32, 30, 6);
      actionText.setColor('#FFFFFF');
    });

    cardHit.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x0f172a, 0.96);
      bg.fillRoundedRect(0, 0, cardW, cardH, 10);
      bg.lineStyle(1.5, catColor, 0.7);
      bg.strokeRoundedRect(0, 0, cardW, cardH, 10);
      bg.fillStyle(catColor, 1);
      bg.fillRoundedRect(0, 0, 6, cardH, { tl: 10, bl: 10, tr: 0, br: 0 });

      actionBg.clear();
      actionBg.fillStyle(0x131f2e, 0.9);
      actionBg.fillRoundedRect(16, 168, cardW - 32, 30, 6);
      actionBg.lineStyle(1, 0x334155, 0.8);
      actionBg.strokeRoundedRect(16, 168, cardW - 32, 30, 6);
      actionText.setColor('#38BDF8');
    });

    cardHit.on('pointerdown', () => {
      sounds.playClick();
      this.openInspectionModal(item);
    });

    return card;
  }

  openInspectionModal(item) {
    if (this.activeModal) {
      this.closeInspectionModal();
    }

    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    let catColor = 0x22c55e;
    let catHex = '#22C55E';
    let catName = 'ORGANIK';
    let binTitle = 'TONG HIJAU (ORGANIK)';
    let binKey = 'TOMBOL [ Q ]';

    if (item.category === WASTE_CATEGORIES.RECYCLE) {
      catColor = 0xf59e0b;
      catHex = '#F59E0B';
      catName = 'DAUR ULANG';
      binTitle = 'TONG KUNING (DAUR ULANG)';
      binKey = 'TOMBOL [ W ]';
    } else if (item.category === WASTE_CATEGORIES.HAZARD) {
      catColor = 0xef4444;
      catHex = '#EF4444';
      catName = 'B3 (BAHAYA)';
      binTitle = 'TONG MERAH (B3 BAHAYA)';
      binKey = 'TOMBOL [ E ]';
    } else if (item.category === WASTE_CATEGORIES.RESIDUAL) {
      catColor = 0x94a3b8;
      catHex = '#94A3B8';
      catName = 'RESIDU';
      binTitle = 'TONG ABU-ABU (RESIDU)';
      binKey = 'TOMBOL [ R ]';
    }

    const modalContainer = this.add.container(0, 0).setDepth(2000);

    // 1. Fullscreen Dark Dimmer Backdrop
    const backdrop = this.add.graphics();
    backdrop.fillStyle(0x020617, 0.85);
    backdrop.fillRect(0, 0, w, h);
    backdrop.setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains);
    backdrop.on('pointerdown', () => this.closeInspectionModal());
    modalContainer.add(backdrop);

    // 2. Main Dialog Box Chassis
    const modalW = 920;
    const modalH = 550;
    const modalX = (w - modalW) / 2;
    const modalY = (h - modalH) / 2;

    const dialog = this.add.container(modalX, modalY);
    modalContainer.add(dialog);

    // Precise Blocker: Absorbs clicks inside modal so they NEVER fall through to backdrop!
    const dialogBlocker = this.add.rectangle(modalW / 2, modalH / 2, modalW, modalH, 0x000000, 0.0001);
    dialogBlocker.setInteractive();
    dialog.add(dialogBlocker);

    const dialogBg = this.add.graphics();
    // Shadow
    dialogBg.fillStyle(0x000000, 0.65);
    dialogBg.fillRoundedRect(8, 8, modalW, modalH, 14);

    // Body
    dialogBg.fillStyle(0x0d1520, 0.98);
    dialogBg.fillRoundedRect(0, 0, modalW, modalH, 14);

    // Dual neon border
    dialogBg.lineStyle(2.5, catColor, 1);
    dialogBg.strokeRoundedRect(0, 0, modalW, modalH, 14);
    dialogBg.lineStyle(1, 0x334155, 0.5);
    dialogBg.strokeRoundedRect(4, 4, modalW - 8, modalH - 8, 12);

    // Top Header Banner
    const topBar = this.add.graphics();
    topBar.fillStyle(0x131f2e, 1);
    topBar.fillRoundedRect(0, 0, modalW, 60, { tl: 14, tr: 14, bl: 0, br: 0 });
    topBar.lineStyle(1.5, catColor, 0.6);
    topBar.lineBetween(0, 60, modalW, 60);

    const modalHeaderTag = this.add.text(24, 22, `[ INSPEKSI SAMPAH ] • KATEGORI: ${catName}`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: catHex
    });

    const modalSubTag = this.add.text(24, 39, `EDUKASI EKOLOGI LINGKUNGAN: GAYA HIDUP BERKELANJUTAN 3R`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '10.5px',
      fontStyle: 'bold',
      color: '#94A3B8'
    });

    // Close button (X) with FULL-SURFACE CENTERED HIT AREA
    const closeBtn = this.add.container(modalW - 40, 30);
    const closeBg = this.add.graphics();
    closeBg.fillStyle(0xdc2626, 0.9);
    closeBg.fillRoundedRect(-18, -14, 36, 28, 6);
    closeBg.lineStyle(1, 0xffffff, 0.85);
    closeBg.strokeRoundedRect(-18, -14, 36, 28, 6);

    const closeTxt = this.add.text(0, 0, '✕', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    closeBtn.add([closeBg, closeTxt]);
    const closeHit = this.add.rectangle(0, 0, 36, 28, 0x000000, 0.001);
    closeHit.setInteractive({ useHandCursor: true });
    closeBtn.add(closeHit);
    closeHit.on('pointerdown', () => this.closeInspectionModal());
    closeHit.on('pointerover', () => closeBtn.setScale(1.1));
    closeHit.on('pointerout', () => closeBtn.setScale(1.0));

    dialog.add([dialogBg, topBar, modalHeaderTag, modalSubTag, closeBtn]);

    // -----------------------------------------------------------------
    // 3. LEFT COLUMN: 3D Holographic Pedestal & Animated Sprite (width: 310)
    // -----------------------------------------------------------------
    const leftCol = this.add.container(24, 80);

    // Pedestal Base
    const pedBg = this.add.graphics();
    pedBg.fillStyle(0x060c14, 1);
    pedBg.fillRoundedRect(0, 0, 290, 435, 10);
    pedBg.lineStyle(1.5, 0x1e293b, 1);
    pedBg.strokeRoundedRect(0, 0, 290, 435, 10);

    // Pedestal Platform Ellipse
    const pedestalRing = this.add.graphics();
    pedestalRing.fillStyle(catColor, 0.18);
    pedestalRing.fillEllipse(145, 120, 170, 44);
    pedestalRing.lineStyle(2, catColor, 0.8);
    pedestalRing.strokeEllipse(145, 120, 170, 44);

    // Large Animated Floating Sprite
    const bigSprite = this.add.image(145, 75, item.texture).setDisplaySize(96, 96);
    this.tweens.add({
      targets: bigSprite,
      y: 67,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Item Title
    const bigTitle = this.add.text(145, 150, item.name, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    // Location Tag Badge
    const locTagText = this.add.text(145, 178, `LOKASI: ${item.locationTag || 'LINGKUNGAN SEKOLAH'}`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#38BDF8'
    }).setOrigin(0.5);

    // Decompose Meter Box
    const decompBox = this.add.graphics();
    decompBox.fillStyle(0x111c2a, 1);
    decompBox.fillRoundedRect(16, 202, 258, 88, 8);
    decompBox.lineStyle(1, 0x334155, 0.8);
    decompBox.strokeRoundedRect(16, 202, 258, 88, 8);

    const decompLabel = this.add.text(26, 212, 'WAKTU TERURAI DI ALAM:', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#CBD5E1'
    });

    const decompVal = this.add.text(26, 230, item.decomposeTime, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FBBF24'
    });

    // Decomposition visual indicator bar
    const barBg = this.add.graphics();
    barBg.fillStyle(0x0a1017, 1);
    barBg.fillRoundedRect(26, 260, 238, 12, 6);

    let progressRatio = 0.08;
    if (item.category === WASTE_CATEGORIES.ORGANIC) progressRatio = 0.08;
    if (item.category === WASTE_CATEGORIES.RECYCLE) progressRatio = 0.45;
    if (item.category === WASTE_CATEGORIES.HAZARD) progressRatio = 0.95;
    if (item.category === WASTE_CATEGORIES.RESIDUAL) progressRatio = 0.88;

    barBg.fillStyle(catColor, 1);
    barBg.fillRoundedRect(26, 260, Math.max(16, 238 * progressRatio), 12, 6);

    // Target Bin in Game Box
    const binTargetBox = this.add.graphics();
    binTargetBox.fillStyle(catColor, 0.18);
    binTargetBox.fillRoundedRect(16, 305, 258, 110, 8);
    binTargetBox.lineStyle(1.5, catColor, 0.9);
    binTargetBox.strokeRoundedRect(16, 305, 258, 110, 8);

    const binHeading = this.add.text(145, 320, 'TUJUAN PEMILAHAN:', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const binTitleText = this.add.text(145, 344, binTitle, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '15px',
      fontStyle: 'bold',
      color: catHex
    }).setOrigin(0.5);

    const binKeyText = this.add.text(145, 372, `Pintas Konveyor: ${binKey}`, {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    const binHint = this.add.text(145, 396, 'Seret ke tong atau tekan hotkey', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '10.5px',
      color: '#CBD5E1'
    }).setOrigin(0.5);

    leftCol.add([
      pedBg,
      pedestalRing,
      bigSprite,
      bigTitle,
      locTagText,
      decompBox,
      decompLabel,
      decompVal,
      barBg,
      binTargetBox,
      binHeading,
      binTitleText,
      binKeyText,
      binHint
    ]);
    dialog.add(leftCol);

    // -----------------------------------------------------------------
    // 4. RIGHT COLUMN: Interactive Dual-Tab Educational Intel (width: 550)
    // -----------------------------------------------------------------
    const rightCol = this.add.container(340, 80);

    // Tab Buttons inside Modal with Precise Centered Rectangle HitZones
    let activeModalTab = 'FACTS'; // 'FACTS' | 'ACTION'
    const tabFactsBtn = this.add.container(130, 16);
    const tabActionBtn = this.add.container(400, 16);

    const tabFactsBg = this.add.graphics();
    const tabFactsTxt = this.add.text(0, 0, '🔬 FAKTA & BAHAYA LINGKUNGAN', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    const tabFactsHit = this.add.rectangle(0, 0, 250, 32, 0x000000, 0.0001);
    tabFactsHit.setInteractive({ useHandCursor: true });
    tabFactsBtn.add([tabFactsBg, tabFactsTxt, tabFactsHit]);

    const tabActionBg = this.add.graphics();
    const tabActionTxt = this.add.text(0, 0, '🌱 AKSI NYATA LINGKUNGAN (3R)', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    const tabActionHit = this.add.rectangle(0, 0, 250, 32, 0x000000, 0.0001);
    tabActionHit.setInteractive({ useHandCursor: true });
    tabActionBtn.add([tabActionBg, tabActionTxt, tabActionHit]);

    // Content container for switching tabs
    const tabContentContainer = this.add.container(0, 48);

    const renderModalTabContent = () => {
      tabContentContainer.removeAll(true);

      // Update Tab Styles
      tabFactsBg.clear();
      tabActionBg.clear();

      if (activeModalTab === 'FACTS') {
        tabFactsBg.fillStyle(0x0284c7, 1);
        tabFactsBg.fillRoundedRect(-125, -16, 250, 32, 6);
        tabFactsBg.lineStyle(1.5, 0xffffff, 0.9);
        tabFactsBg.strokeRoundedRect(-125, -16, 250, 32, 6);
        tabFactsTxt.setColor('#FFFFFF');

        tabActionBg.fillStyle(0x131f2e, 0.9);
        tabActionBg.fillRoundedRect(-125, -16, 250, 32, 6);
        tabActionBg.lineStyle(1, 0x334155, 0.8);
        tabActionBg.strokeRoundedRect(-125, -16, 250, 32, 6);
        tabActionTxt.setColor('#94A3B8');

        // Card 1: Dampak & Fakta Lingkungan
        const c1 = this.add.graphics();
        c1.fillStyle(0x0f1c2d, 1);
        c1.fillRoundedRect(0, 0, 550, 160, 8);
        c1.lineStyle(1.5, 0x1e3a5f, 1);
        c1.strokeRoundedRect(0, 0, 550, 160, 8);

        const t1 = this.add.text(16, 14, 'DAMPAK EKOLOGIS & KARAKTERISTIK BAHAN', {
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: '13.5px',
          fontStyle: 'bold',
          color: '#38BDF8'
        });

        const b1 = this.add.text(16, 42, item.fact, {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '13.5px',
          color: '#ECEFF1',
          lineSpacing: 4,
          wordWrap: { width: 518 }
        });

        // Card 2: Risiko Jika Salah Dibuang
        const c2 = this.add.graphics();
        c2.fillStyle(0x1a1215, 1);
        c2.fillRoundedRect(0, 172, 550, 145, 8);
        c2.lineStyle(1.5, 0x991b1b, 0.8);
        c2.strokeRoundedRect(0, 172, 550, 145, 8);

        const t2 = this.add.text(16, 186, 'RISIKO JIKA SALAH DIBUANG ATAU DICAMPUR', {
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: '13.5px',
          fontStyle: 'bold',
          color: '#F87171'
        });

        const b2 = this.add.text(16, 214, item.funFact || 'Memilah sampah dari awal mencegah pencemaran tanah dan sumber air minum.', {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '13px',
          color: '#FECDD3',
          lineSpacing: 4,
          wordWrap: { width: 518 }
        });

        tabContentContainer.add([c1, t1, b1, c2, t2, b2]);
      } else {
        tabFactsBg.fillStyle(0x131f2e, 0.9);
        tabFactsBg.fillRoundedRect(-125, -16, 250, 32, 6);
        tabFactsBg.lineStyle(1, 0x334155, 0.8);
        tabFactsBg.strokeRoundedRect(-125, -16, 250, 32, 6);
        tabFactsTxt.setColor('#94A3B8');

        tabActionBg.fillStyle(0x16a34a, 1);
        tabActionBg.fillRoundedRect(-125, -16, 250, 32, 6);
        tabActionBg.lineStyle(1.5, 0xffffff, 0.9);
        tabActionBg.strokeRoundedRect(-125, -16, 250, 32, 6);
        tabActionTxt.setColor('#FFFFFF');

        // Card 1: Aksi Nyata Lingkungan Hidup (3R)
        const c1 = this.add.graphics();
        c1.fillStyle(0x0a221a, 1);
        c1.fillRoundedRect(0, 0, 550, 160, 8);
        c1.lineStyle(1.5, 0x16a34a, 0.9);
        c1.strokeRoundedRect(0, 0, 550, 160, 8);

        const t1 = this.add.text(16, 14, 'AKSI NYATA LINGKUNGAN HIDUP (3R)', {
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: '13.5px',
          fontStyle: 'bold',
          color: '#4ADE80'
        });

        const b1 = this.add.text(16, 42, item.ecoAction || 'Pilah sampah langsung di kelas dan manfaatkan bank sampah sekolah untuk daur ulang.', {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '13.5px',
          color: '#E2E8F0',
          lineSpacing: 4,
          wordWrap: { width: 518 }
        });

        // Card 2: Panduan Kolaborasi Kelas & Sekolah
        const c2 = this.add.graphics();
        c2.fillStyle(0x131f2e, 1);
        c2.fillRoundedRect(0, 172, 550, 145, 8);
        c2.lineStyle(1.5, 0x38bdf8, 0.8);
        c2.strokeRoundedRect(0, 172, 550, 145, 8);

        const t2 = this.add.text(16, 186, 'PERAN DALAM PELESTARIAN LINGKUNGAN HIDUP (3R)', {
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: '13.5px',
          fontStyle: 'bold',
          color: '#38BDF8'
        });

        const b2 = this.add.text(16, 214, 'Jadilah Duta Kebersihan! Edukasi teman-teman untuk memisahkan sampah organik sisa makanan ke komposter, dan sampah daur ulang ke Bank Sampah.', {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '13px',
          color: '#E0F2FE',
          lineSpacing: 4,
          wordWrap: { width: 518 }
        });

        tabContentContainer.add([c1, t1, b1, c2, t2, b2]);
      }
    };

    tabFactsHit.on('pointerdown', () => {
      if (activeModalTab !== 'FACTS') {
        sounds.playClick();
        activeModalTab = 'FACTS';
        renderModalTabContent();
      }
    });

    tabActionHit.on('pointerdown', () => {
      if (activeModalTab !== 'ACTION') {
        sounds.playClick();
        activeModalTab = 'ACTION';
        renderModalTabContent();
      }
    });

    renderModalTabContent();

    // Bottom Modal Action Button with FULL-SURFACE CENTERED HIT AREA
    const doneBtn = this.add.container(275, 410);
    const doneBg = this.add.graphics();
    doneBg.fillStyle(0x1e293b, 1);
    doneBg.fillRoundedRect(-160, -18, 320, 36, 6);
    doneBg.lineStyle(1.5, 0x64748b, 1);
    doneBg.strokeRoundedRect(-160, -18, 320, 36, 6);

    const doneText = this.add.text(0, 0, 'SELESAI MEMBACA INFO ✕', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    doneBtn.add([doneBg, doneText]);
    const doneHit = this.add.rectangle(0, 0, 320, 36, 0x000000, 0.001);
    doneHit.setInteractive({ useHandCursor: true });
    doneBtn.add(doneHit);
    doneHit.on('pointerdown', () => this.closeInspectionModal());
    doneHit.on('pointerover', () => doneBtn.setScale(1.04));
    doneHit.on('pointerout', () => doneBtn.setScale(1.0));

    rightCol.add([tabFactsBtn, tabActionBtn, tabContentContainer, doneBtn]);
    dialog.add(rightCol);

    this.activeModal = modalContainer;
  }

  closeInspectionModal() {
    if (this.activeModal) {
      sounds.playClick();
      this.activeModal.destroy();
      this.activeModal = null;
    }
  }

  createFooter(w, h) {
    const footY = h - 38;
    const footBg = this.add.graphics();
    footBg.fillStyle(0x0f172a, 0.98);
    footBg.fillRect(0, footY - 18, w, 56);
    footBg.lineStyle(2, 0x1e293b, 1);
    footBg.strokeRect(0, footY - 18, w, 56);

    // Page indicator
    this.pageText = this.add.text(w / 2 - 120, footY + 8, 'HALAMAN 1 / 6 • TOTAL 32 SAMPAH', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#94A3B8'
    }).setOrigin(0.5);

    // Prev Button with FULL-SURFACE CENTERED HIT AREA
    this.createNavButton(w / 2 - 310, footY + 8, '◀ SEBELUMNYA', () => {
      if (this.currentPage > 0) {
        sounds.playClick();
        this.currentPage--;
        this.renderCatalogGrid();
      }
    });

    // Next Button with FULL-SURFACE CENTERED HIT AREA
    this.createNavButton(w / 2 + 70, footY + 8, 'BERIKUTNYA ▶', () => {
      const filtered = this.getFilteredItems();
      const maxPages = Math.ceil(filtered.length / this.itemsPerPage);
      if (this.currentPage < maxPages - 1) {
        sounds.playClick();
        this.currentPage++;
        this.renderCatalogGrid();
      }
    });

    // Back to Menu Button with FULL-SURFACE CENTERED HIT AREA
    const backBtn = this.add.container(w - 150, footY + 8);
    const backBg = this.add.graphics();
    backBg.fillStyle(0x1e293b, 1);
    backBg.fillRoundedRect(-110, -18, 220, 36, 6);
    backBg.lineStyle(2, 0x475569, 1);
    backBg.strokeRoundedRect(-110, -18, 220, 36, 6);

    const backLabel = this.add.text(0, 0, '◀ KEMBALI KE MENU', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    backBtn.add([backBg, backLabel]);
    const backHit = this.add.rectangle(0, 0, 220, 36, 0x000000, 0.001);
    backHit.setInteractive({ useHandCursor: true });
    backBtn.add(backHit);

    backHit.on('pointerdown', () => {
      sounds.playClick();
      this.scene.start('MenuScene');
    });
    backHit.on('pointerover', () => backBtn.setScale(1.04));
    backHit.on('pointerout', () => backBtn.setScale(1.0));
  }

  createNavButton(x, y, text, onClick) {
    const btn = this.add.container(x, y);
    const bg = this.add.graphics();
    bg.fillStyle(0x1e293b, 1);
    bg.fillRoundedRect(-55, -16, 110, 32, 6);
    bg.lineStyle(1.5, 0x475569, 1);
    bg.strokeRoundedRect(-55, -16, 110, 32, 6);

    const lbl = this.add.text(0, 0, text, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    btn.add([bg, lbl]);
    const navHit = this.add.rectangle(0, 0, 110, 32, 0x000000, 0.001);
    navHit.setInteractive({ useHandCursor: true });
    btn.add(navHit);

    navHit.on('pointerdown', onClick);
    navHit.on('pointerover', () => btn.setScale(1.05));
    navHit.on('pointerout', () => btn.setScale(1.0));
    return btn;
  }
}
