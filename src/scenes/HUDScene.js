/**
 * HUDScene.js
 * Overhead Gantry Console.
 * Features industrial steel suspension brackets, rivets, tank pressure gauge,
 * caged hazard beacons, digital LED readouts, and electronic marquee ticker.
 */
import { GAME_CONFIG } from '../config.js';
import { sounds } from '../audio/SoundManager.js';

export class HUDScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HUDScene' });
  }

  create() {
    this.gameScene = this.scene.get('GameScene');

    this.createGantryConsole();

    // Floating feedback alert container
    this.feedbackContainer = this.add.container(640, 245);

    // Pause & Guide Modal State
    this.pauseModal = null;
    this.guideModal = null;
    this.isPaused = false;

    // In-Game Pause Keyboard Hotkey (ESC) and Help Hotkeys (H and P)
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.guideModal) {
        this.closeQuickGuideModal();
      } else {
        this.togglePause();
      }
    });
    this.input.keyboard.on('keydown-H', () => this.toggleQuickGuide());
    this.input.keyboard.on('keydown-P', () => this.toggleQuickGuide());

    // Subscribe to game scene events
    this.gameScene.events.on('updateStats', this.updateStats, this);
    this.gameScene.events.on('showFeedback', this.showFeedback, this);
  }

  createGantryConsole() {
    const w = GAME_CONFIG.WIDTH;

    // 1. Suspension Brackets (Hanging from ceiling)
    const sg = this.add.graphics();
    const hangerPositions = [140, 480, 800, 1140];
    sg.fillStyle(0x0f172a, 1);
    hangerPositions.forEach(hx => {
      // Steel vertical strut
      sg.fillRect(hx - 8, 0, 16, 18);
      sg.fillStyle(0x475569, 1);
      sg.fillRect(hx - 4, 0, 8, 18);
      // Heavy mounting bolt
      sg.fillStyle(0x94a3b8, 1);
      sg.fillCircle(hx, 10, 3.5);
    });

    // 2. Main Overhead Steel Gantry Chassis
    const cg = this.add.graphics();
    const gantryH = 88;

    // Drop shadow under console
    cg.fillStyle(0x05080b, 0.75);
    cg.fillRect(0, gantryH, w, 12);

    // Dark brushed plate
    cg.fillStyle(0x162029, 0.98);
    cg.fillRect(0, 12, w, gantryH);

    // Steel bezel borders
    cg.lineStyle(3, 0x334155, 1);
    cg.strokeRect(0, 12, w, gantryH);
    cg.lineStyle(1.5, 0x64748b, 0.6);
    cg.lineBetween(0, 14, w, 14);

    // Chrome Rivets across top and bottom edges
    cg.fillStyle(0x64748b, 1);
    for (let rx = 20; rx < w; rx += 60) {
      cg.fillCircle(rx, 18, 2.5);
      cg.fillCircle(rx, gantryH + 6, 2.5);
    }
    cg.fillStyle(0xffffff, 0.7);
    for (let rx = 20; rx < w; rx += 60) {
      cg.fillCircle(rx - 0.5, 17.5, 1);
      cg.fillCircle(rx - 0.5, gantryH + 5.5, 1);
    }

    // --- SECTION 1: LEVEL IDENTIFIER & TARGET COUNTER ---
    const sec1Bg = this.add.graphics();
    sec1Bg.fillStyle(0x0c1318, 0.9);
    sec1Bg.fillRoundedRect(16, 22, 280, 68, 6);
    sec1Bg.lineStyle(2, 0x1e293b, 1);
    sec1Bg.strokeRoundedRect(16, 22, 280, 68, 6);

    this.levelText = this.add.text(28, 30, 'LEVEL 1: PERUMAHAN ASRI', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    });

    this.quotaText = this.add.text(28, 58, 'TARGET SAMPAH: 0 / 18', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#38BDF8'
    });

    // --- SECTION 2: SORTING ACCURACY GAUGE ---
    const purityX = 310;
    const sec2Bg = this.add.graphics();
    sec2Bg.fillStyle(0x0c1318, 0.9);
    sec2Bg.fillRoundedRect(purityX, 22, 280, 68, 6);
    sec2Bg.lineStyle(2, 0x1e293b, 1);
    sec2Bg.strokeRoundedRect(purityX, 22, 280, 68, 6);

    this.add.text(purityX + 14, 28, 'AKURASI PILAH', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#94A3B8'
    });

    // Gauge track
    this.purityBarBg = this.add.graphics();
    this.purityBarBg.fillStyle(0x1e293b, 1);
    this.purityBarBg.fillRoundedRect(purityX + 14, 52, 180, 22, 4);
    this.purityBarBg.lineStyle(1, 0x334155, 0.8);
    for (let tx = purityX + 14; tx <= purityX + 194; tx += 20) {
      this.purityBarBg.lineBetween(tx, 52, tx, 74);
    }

    this.purityBarFill = this.add.graphics();
    this.purityText = this.add.text(purityX + 204, 52, '100%', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#2ECC71'
    });

    this.drawPurity(1.0);

    // --- SECTION 3: CAGED HAZARD SIRENS (KESEMPATAN B3) ---
    const hazX = 604;
    const sec3Bg = this.add.graphics();
    sec3Bg.fillStyle(0x0c1318, 0.9);
    sec3Bg.fillRoundedRect(hazX, 22, 175, 68, 6);
    sec3Bg.lineStyle(2, 0x1e293b, 1);
    sec3Bg.strokeRoundedRect(hazX, 22, 175, 68, 6);

    this.add.text(hazX + 12, 28, 'KESEMPATAN B3', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#F87171'
    });

    this.hazardSirens = [];
    for (let i = 0; i < 3; i++) {
      const bx = hazX + 32 + i * 50;
      const by = 62;

      const sirenContainer = this.add.container(bx, by);

      const sBase = this.add.graphics();
      sBase.fillStyle(0x334155, 1);
      sBase.fillRoundedRect(-14, 6, 28, 8, 2);

      const sDome = this.add.graphics();
      sDome.fillStyle(0xe74c3c, 1);
      sDome.fillCircle(0, 0, 11);

      const sCage = this.add.graphics();
      sCage.lineStyle(1.5, 0x0f172a, 0.85);
      sCage.strokeCircle(0, 0, 11);
      sCage.lineBetween(-11, 0, 11, 0);
      sCage.lineBetween(0, -11, 0, 8);

      sirenContainer.add([sBase, sDome, sCage]);
      this.hazardSirens.push({ container: sirenContainer, dome: sDome });
    }

    // --- SECTION 4: DIGITAL LED TIMER & SCORE ---
    const digiX = 794;
    const sec4Bg = this.add.graphics();
    sec4Bg.fillStyle(0x0c1318, 0.9);
    sec4Bg.fillRoundedRect(digiX, 22, 240, 68, 6);
    sec4Bg.lineStyle(2, 0x1e293b, 1);
    sec4Bg.strokeRoundedRect(digiX, 22, 240, 68, 6);

    // Subtle Vertical Divider between Timer & Score
    sec4Bg.lineStyle(1.5, 0x1e293b, 0.9);
    sec4Bg.lineBetween(digiX + 116, 28, digiX + 116, 84);

    // Timer display
    this.add.text(digiX + 14, 28, 'SISA WAKTU', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#94A3B8'
    });

    this.timerText = this.add.text(digiX + 14, 48, '01:30', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FBBF24'
    });

    // Score display (Clean, Dedicated Sub-column with Room for High Scores)
    const scoreSubX = digiX + 128;
    this.add.text(scoreSubX, 28, 'SKOR', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#94A3B8'
    });

    this.scoreText = this.add.text(scoreSubX, 48, '★ 0', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#34D399'
    });

    // --- TOP RIGHT ACTION BUTTONS (Cleanly separated from Score) ---
    // In-Game Quick Guide Button [ [?] PANDUAN ]
    const helpBox = this.add.container(1092, 56);
    const hbg = this.add.graphics();
    hbg.fillStyle(0x0f172a, 0.95);
    hbg.fillRoundedRect(-45, -19, 90, 38, 6);
    hbg.lineStyle(1.5, 0x38bdf8, 0.9);
    hbg.strokeRoundedRect(-45, -19, 90, 38, 6);

    const helpLabel = this.add.text(0, 0, '[?] PANDUAN', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#38BDF8'
    }).setOrigin(0.5);

    helpBox.add([hbg, helpLabel]);
    const helpHit = this.add.rectangle(0, 0, 90, 38, 0x000000, 0.001);
    helpHit.setInteractive({ useHandCursor: true });
    helpBox.add(helpHit);

    helpHit.on('pointerdown', () => {
      sounds.playClick();
      this.toggleQuickGuide();
    });
    helpHit.on('pointerover', () => helpBox.setScale(1.05));
    helpHit.on('pointerout', () => helpBox.setScale(1.0));

    // In-Game Pause Button [ || JEDA ]
    const pauseBox = this.add.container(1176, 56);
    const pbg = this.add.graphics();
    pbg.fillStyle(0x1e293b, 1);
    pbg.fillRoundedRect(-32, -19, 64, 38, 6);
    pbg.lineStyle(1.5, 0x64748b, 1);
    pbg.strokeRoundedRect(-32, -19, 64, 38, 6);

    const pauseLabel = this.add.text(0, 0, '|| JEDA', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    pauseBox.add([pbg, pauseLabel]);
    const pauseHit = this.add.rectangle(0, 0, 64, 38, 0x000000, 0.001);
    pauseHit.setInteractive({ useHandCursor: true });
    pauseBox.add(pauseHit);

    pauseHit.on('pointerdown', () => {
      sounds.playClick();
      this.togglePause();
    });
    pauseHit.on('pointerover', () => pauseBox.setScale(1.05));
    pauseHit.on('pointerout', () => pauseBox.setScale(1.0));

    // Sound Toggle Switch
    const audioBox = this.add.container(1238, 56);
    const abg = this.add.graphics();
    abg.fillStyle(0x1e293b, 1);
    abg.fillRoundedRect(-19, -19, 38, 38, 6);
    abg.lineStyle(2, 0x64748b, 1);
    abg.strokeRoundedRect(-19, -19, 38, 38, 6);

    this.speakerIconG = this.add.graphics();
    this.drawSpeakerIcon(this.speakerIconG, 0, 0, false);

    audioBox.add([abg, this.speakerIconG]);
    const audioHit = this.add.rectangle(0, 0, 38, 38, 0x000000, 0.001);
    audioHit.setInteractive({ useHandCursor: true });
    audioBox.add(audioHit);

    audioHit.on('pointerdown', () => {
      const isMuted = sounds.toggleMute();
      this.drawSpeakerIcon(this.speakerIconG, 0, 0, isMuted);
    });
    audioHit.on('pointerover', () => audioBox.setScale(1.06));
    audioHit.on('pointerout', () => audioBox.setScale(1.0));

    // --- SECTION 5: ELECTRONIC LED MARQUEE TICKER (INSTRUCTIONS) ---
    const tickerY = gantryH + 12;
    const tg = this.add.graphics();

    tg.fillStyle(0x090d12, 0.95);
    tg.fillRect(0, tickerY, w, 32);
    tg.lineStyle(2, 0x1e293b, 1);
    tg.strokeRect(0, tickerY, w, 32);

    tg.fillStyle(0xf1c40f, 0.85);
    for (let zx = 0; zx < 80; zx += 16) {
      tg.fillTriangle(zx, tickerY, zx + 8, tickerY, zx + 16, tickerY + 32);
      tg.fillTriangle(zx + 8, tickerY + 32, zx + 16, tickerY + 32, zx, tickerY);
    }
    for (let zx = w - 80; zx < w; zx += 16) {
      tg.fillTriangle(zx, tickerY, zx + 8, tickerY, zx + 16, tickerY + 32);
      tg.fillTriangle(zx + 8, tickerY + 32, zx + 16, tickerY + 32, zx, tickerY);
    }

    this.guideText = this.add.text(w / 2, tickerY + 16, '[PANDUAN] SERET SAMPAH KE TONG SUDUT • TOMBOL: [Q, W, E, R] • BANTUAN CEPAT: [H / P] • JEDA: [ESC]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);
  }

  drawPurity(ratio) {
    const purityX = 310;
    const g = this.purityBarFill;
    g.clear();

    const clamped = Math.max(0, Math.min(1, ratio));
    const width = 180 * clamped;

    let color = 0x22c55e;
    if (clamped < 0.8) color = 0xeab308;
    if (clamped < 0.6) color = 0xef4444;

    g.fillStyle(color, 1);
    g.fillRoundedRect(purityX + 14, 52, width, 22, 4);

    this.purityText.setText(`${Math.round(clamped * 100)}%`);
    this.purityText.setColor(clamped >= 0.8 ? '#22C55E' : clamped >= 0.6 ? '#EAB308' : '#EF4444');
  }

  updateStats(data) {
    if (data.levelTitle) this.levelText.setText(data.levelTitle.toUpperCase());
    if (data.quotaText) this.quotaText.setText(data.quotaText);
    if (data.purity !== undefined) this.drawPurity(data.purity);
    if (data.score !== undefined) this.scoreText.setText(`★ ${data.score}`);

    if (data.timeRemaining !== undefined) {
      const minutes = Math.floor(data.timeRemaining / 60);
      const seconds = data.timeRemaining % 60;
      const fmt = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      this.timerText.setText(fmt);
    }

    if (data.hazardMisses !== undefined && data.allowedHazardMisses !== undefined) {
      const remainingLives = Math.max(0, data.allowedHazardMisses - data.hazardMisses);
      this.hazardSirens.forEach((siren, idx) => {
        const isLit = idx < remainingLives;
        siren.dome.clear();
        siren.dome.fillStyle(isLit ? 0xef4444 : 0x334155, 1);
        siren.dome.fillCircle(0, 0, 11);
      });
    }
  }

  showFeedback(data) {
    const { text, isSuccess } = data;
    this.feedbackContainer.removeAll(true);

    const bg = this.add.graphics();
    const borderColor = isSuccess ? 0x22c55e : 0xef4444;

    bg.fillStyle(0x0f172a, 0.96);
    bg.fillRoundedRect(-280, -26, 560, 52, 10);
    bg.lineStyle(2.5, borderColor, 1);
    bg.strokeRoundedRect(-280, -26, 560, 52, 10);

    const txt = this.add.text(0, 0, text, {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '15.5px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    this.feedbackContainer.add([bg, txt]);
    this.feedbackContainer.setAlpha(1);
    this.feedbackContainer.setScale(0.88);

    this.tweens.add({
      targets: this.feedbackContainer,
      scaleX: 1.0,
      scaleY: 1.0,
      y: 235,
      duration: 140,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.tweens.add({
          targets: this.feedbackContainer,
          alpha: 0,
          y: 215,
          delay: 1300,
          duration: 280,
          ease: 'Cubic.easeIn'
        });
      }
    });
  }

  drawSpeakerIcon(g, x, y, isMuted) {
    g.clear();
    g.fillStyle(isMuted ? 0x94a3b8 : 0x38bdf8, 1);
    g.fillRect(x - 8, y - 4, 5, 8);

    g.beginPath();
    g.moveTo(x - 3, y - 4);
    g.lineTo(x + 3, y - 9);
    g.lineTo(x + 3, y + 9);
    g.lineTo(x - 3, y + 4);
    g.closePath();
    g.fillPath();

    if (isMuted) {
      g.lineStyle(2.5, 0xef4444, 1);
      g.lineBetween(x - 10, y - 10, x + 10, y + 10);
    } else {
      g.lineStyle(1.8, 0x38bdf8, 0.9);
      g.beginPath();
      g.arc(x + 2, y, 7, -Math.PI * 0.3, Math.PI * 0.3, false);
      g.strokePath();

      g.beginPath();
      g.arc(x + 2, y, 11, -Math.PI * 0.3, Math.PI * 0.3, false);
      g.strokePath();
    }
  }

  togglePause() {
    if (this.pauseModal) {
      this.resumeGame();
    } else {
      this.openPauseModal();
    }
  }

  openPauseModal() {
    this.isPaused = true;
    sounds.stopConveyorHum();
    this.gameScene.scene.pause();

    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const currentLevelTitle = this.gameScene.levelConfig?.title || 'LEVEL PERMAINAN';

    const modal = this.add.container(0, 0);

    // Dark Environmental Dim Scrim
    const scrim = this.add.rectangle(w / 2, h / 2, w, h, 0x03070a, 0.82);
    scrim.setInteractive();
    modal.add(scrim);

    // Console Chassis
    const pW = 540;
    const pH = 400;
    const pX = w / 2;
    const pY = h / 2;

    const bg = this.add.graphics();
    bg.fillStyle(0x020406, 0.95);
    bg.fillRoundedRect(pX - pW / 2 + 8, pY - pH / 2 + 10, pW, pH, 16);

    bg.fillStyle(0x0f172a, 0.98);
    bg.fillRoundedRect(pX - pW / 2, pY - pH / 2, pW, pH, 16);
    bg.lineStyle(3, 0xf59e0b, 1);
    bg.strokeRoundedRect(pX - pW / 2, pY - pH / 2, pW, pH, 16);

    bg.fillStyle(0xf1c40f, 0.85);
    for (let hx = pX - pW / 2 + 20; hx < pX + pW / 2 - 20; hx += 24) {
      bg.fillTriangle(hx, pY - pH / 2 + 6, hx + 10, pY - pH / 2 + 6, hx + 16, pY - pH / 2 + 18);
    }

    modal.add(bg);

    // Header Badge
    const badge = this.add.text(pX, pY - pH / 2 + 42, '[ PERMAINAN DIJEDA ]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    // Title
    const title = this.add.text(pX, pY - pH / 2 + 76, 'MENU JEDA // PAUSE', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const subtitle = this.add.text(pX, pY - pH / 2 + 104, currentLevelTitle.toUpperCase(), {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      color: '#94A3B8'
    }).setOrigin(0.5);

    modal.add([badge, title, subtitle]);

    // 4 Action Buttons
    const btnConfigs = [
      {
        text: 'LANJUTKAN MAIN ▶',
        color: 0x16a34a,
        onClick: () => this.resumeGame()
      },
      {
        text: 'ULANGI LEVEL ↺',
        color: 0xd97706,
        onClick: () => {
          modal.destroy();
          this.pauseModal = null;
          this.scene.stop('HUDScene');
          this.gameScene.scene.restart();
        }
      },
      {
        text: 'PETA LEVEL (KOTA)',
        color: 0x0284c7,
        onClick: () => {
          modal.destroy();
          this.pauseModal = null;
          this.scene.stop('HUDScene');
          this.gameScene.scene.stop();
          this.scene.start('ShiftSelectScene');
        }
      },
      {
        text: 'MENU UTAMA',
        color: 0x334155,
        onClick: () => {
          modal.destroy();
          this.pauseModal = null;
          this.scene.stop('HUDScene');
          this.gameScene.scene.stop();
          this.scene.start('MenuScene');
        }
      }
    ];

    btnConfigs.forEach((cfg, idx) => {
      const by = pY - pH / 2 + 148 + idx * 54;
      const btn = this.add.container(pX, by);

      const bbg = this.add.graphics();
      bbg.fillStyle(cfg.color, 1);
      bbg.fillRoundedRect(-170, -20, 340, 42, 8);
      bbg.lineStyle(1.5, 0xffffff, 0.4);
      bbg.strokeRoundedRect(-170, -20, 340, 42, 8);

      const btxt = this.add.text(0, 0, cfg.text, {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '15px',
        fontStyle: 'bold',
        color: '#FFFFFF'
      }).setOrigin(0.5);

      btn.add([bbg, btxt]);
      btn.setSize(340, 42);
      btn.setInteractive({ useHandCursor: true });

      btn.on('pointerdown', () => {
        sounds.playClick();
        cfg.onClick();
      });
      btn.on('pointerover', () => btn.setScale(1.04));
      btn.on('pointerout', () => btn.setScale(1.0));

      modal.add(btn);
    });

    this.pauseModal = modal;
  }

  resumeGame() {
    if (this.pauseModal) {
      this.pauseModal.destroy();
      this.pauseModal = null;
    }
    this.isPaused = false;
    this.gameScene.scene.resume();
    sounds.startConveyorHum();
  }

  toggleQuickGuide() {
    if (this.guideModal) {
      this.closeQuickGuideModal();
    } else {
      this.openQuickGuideModal();
    }
  }

  openQuickGuideModal() {
    if (this.pauseModal) {
      this.pauseModal.destroy();
      this.pauseModal = null;
    }

    // Pause the game scene
    this.isPaused = true;
    this.gameScene.scene.pause();
    sounds.stopConveyorHum();

    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    const modal = this.add.container(0, 0).setDepth(3000);

    // Dim backdrop
    const backdrop = this.add.rectangle(w / 2, h / 2, w, h, 0x02060e, 0.85);
    backdrop.setInteractive();
    backdrop.on('pointerdown', () => this.closeQuickGuideModal());
    modal.add(backdrop);

    // Dialog Box
    const mWidth = 960;
    const mHeight = 540;
    const mX = w / 2;
    const mY = h / 2;

    const blocker = this.add.rectangle(mX, mY, mWidth, mHeight, 0x000000, 0.001);
    blocker.setInteractive();
    modal.add(blocker);

    const bg = this.add.graphics();
    bg.fillStyle(0x0a1017, 0.98);
    bg.fillRoundedRect(mX - mWidth / 2, mY - mHeight / 2, mWidth, mHeight, 14);
    bg.lineStyle(2.5, 0x38bdf8, 1);
    bg.strokeRoundedRect(mX - mWidth / 2, mY - mHeight / 2, mWidth, mHeight, 14);

    // Top Header Banner
    bg.fillStyle(0x0f172a, 1);
    bg.fillRoundedRect(mX - mWidth / 2, mY - mHeight / 2, mWidth, 58, { tl: 14, tr: 14, bl: 0, br: 0 });
    bg.lineStyle(1.5, 0x1e293b, 1);
    bg.lineBetween(mX - mWidth / 2, mY - mHeight / 2 + 58, mX + mWidth / 2, mY - mHeight / 2 + 58);
    modal.add(bg);

    // Title & Subtitle
    const title = this.add.text(mX - mWidth / 2 + 24, mY - mHeight / 2 + 20, 'PANDUAN CEPAT MEMILAH SAMPAH KOTA', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    });

    const sub = this.add.text(mX - mWidth / 2 + 24, mY - mHeight / 2 + 40, 'PELAJARI CIRI SAMPAH, WARNA TONG, DAN TOMBOL PINTAS KONVEYOR [Q, W, E, R]', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#38BDF8'
    });

    // Close button (X)
    const closeBtn = this.add.text(mX + mWidth / 2 - 28, mY - mHeight / 2 + 28, '✕', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => this.closeQuickGuideModal());

    modal.add([title, sub, closeBtn]);

    // 4 Columns for the 4 Categories
    const categories = [
      {
        name: 'ORGANIK',
        key: '[ Q ]',
        bin: 'TONG HIJAU',
        color: 0x166534,
        border: 0x22c55e,
        hex: '#4ADE80',
        trait: 'Limbah basah & sisa makanan mudah terurai alami.',
        examples: 'Sisa Apel, Daun Kering, Semangka Kantin, Kulit Jeruk, Tulang Ayam, Tulang Ikan, Kulit Pisang, Kulit Telur.',
        destination: 'Komposter Sekolah, Lubang Biopori, Pakan Maggot BSF.'
      },
      {
        name: 'DAUR ULANG',
        key: '[ W ]',
        bin: 'TONG KUNING',
        color: 0x9a3412,
        border: 0xf59e0b,
        hex: '#FBBF24',
        trait: 'Anorganik bersih bernilai jual yang bisa didaur ulang.',
        examples: 'Buku Tulis Bekas, Kotak Susu UHT, Botol Plastik, Kardus, Gelas Plastik, Kaleng Soda, Botol Kaca, Koran.',
        destination: 'Bank Sampah Sekolah & Sentra Daur Ulang.'
      },
      {
        name: 'B3 (BAHAYA)',
        key: '[ E ]',
        bin: 'TONG MERAH',
        color: 0x991b1b,
        border: 0xef4444,
        hex: '#F87171',
        trait: 'Bahan Berbahaya & Beracun. Jangan buang sembarangan!',
        examples: 'Baterai Bekas, Spidol Whiteboard, Lampu Neon, Botol Pemutih, Obat Kedaluwarsa, Termometer Raksa, Pestisida, Antiseptik.',
        destination: 'TPS B3 Khusus Berizin untuk dimusnahkan aman.'
      },
      {
        name: 'RESIDU',
        key: '[ R ]',
        bin: 'TONG ABU-ABU',
        color: 0x334155,
        border: 0x94a3b8,
        hex: '#CBD5E1',
        trait: 'Sampah kotor / sulit didaur ulang pabrik biasa.',
        examples: 'Popok/Pembalut, Sachet Bumbu & Kopi, Sedotan Plastik, Puntung Rokok, Tisu Kotor, Styrofoam Kotor.',
        destination: 'Bahan bakar RDF industri semen / Residu Akhir TPA.'
      }
    ];

    const colW = 214;
    const colH = 345;
    const startColX = mX - mWidth / 2 + 24 + colW / 2;
    const colY = mY - mHeight / 2 + 75 + colH / 2;

    categories.forEach((cat, idx) => {
      const cx = startColX + idx * (colW + 14);

      const colContainer = this.add.container(cx, colY);
      const cbg = this.add.graphics();

      // Column chassis
      cbg.fillStyle(0x0f172a, 0.95);
      cbg.fillRoundedRect(-colW / 2, -colH / 2, colW, colH, 8);
      cbg.lineStyle(1.5, cat.border, 0.85);
      cbg.strokeRoundedRect(-colW / 2, -colH / 2, colW, colH, 8);

      // Category Top Header
      cbg.fillStyle(cat.color, 1);
      cbg.fillRoundedRect(-colW / 2, -colH / 2, colW, 46, { tl: 8, tr: 8, bl: 0, br: 0 });

      const cTitle = this.add.text(0, -colH / 2 + 15, `${cat.name} ${cat.key}`, {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '15.5px',
        fontStyle: 'bold',
        color: '#FFFFFF'
      }).setOrigin(0.5);

      const cBin = this.add.text(0, -colH / 2 + 33, cat.bin, {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '11px',
        fontStyle: 'bold',
        color: cat.hex
      }).setOrigin(0.5);

      // Content blocks
      const t1 = this.add.text(0, -colH / 2 + 62, 'CIRI UTAMA:', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#94A3B8'
      }).setOrigin(0.5);

      const b1 = this.add.text(0, -colH / 2 + 88, cat.trait, {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '12px',
        color: '#ECEFF1',
        align: 'center',
        wordWrap: { width: colW - 20 }
      }).setOrigin(0.5);

      const t2 = this.add.text(0, -colH / 2 + 130, 'CONTOH DI SEKOLAH / RUMAH:', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '11px',
        fontStyle: 'bold',
        color: cat.hex
      }).setOrigin(0.5);

      const b2 = this.add.text(0, -colH / 2 + 185, cat.examples, {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '11.5px',
        color: '#CBD5E1',
        align: 'center',
        lineSpacing: 2,
        wordWrap: { width: colW - 20 }
      }).setOrigin(0.5);

      const t3 = this.add.text(0, -colH / 2 + 250, 'TUJUAN PENGOLAHAN:', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#38BDF8'
      }).setOrigin(0.5);

      const b3 = this.add.text(0, -colH / 2 + 288, cat.destination, {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '11.5px',
        color: '#93C5FD',
        align: 'center',
        lineSpacing: 2,
        wordWrap: { width: colW - 20 }
      }).setOrigin(0.5);

      colContainer.add([cbg, cTitle, cBin, t1, b1, t2, b2, t3, b3]);
      modal.add(colContainer);
    });

    // Bottom Control Guide Bar & Resume Button
    const botY = mY + mHeight / 2 - 42;
    const botBg = this.add.graphics();
    botBg.fillStyle(0x131f2e, 0.95);
    botBg.fillRoundedRect(mX - mWidth / 2 + 24, botY - 20, mWidth - 360, 40, 8);
    botBg.lineStyle(1, 0x334155, 1);
    botBg.strokeRoundedRect(mX - mWidth / 2 + 24, botY - 20, mWidth - 360, 40, 8);
    modal.add(botBg);

    const controlHint = this.add.text(mX - mWidth / 2 + 38, botY, 'CARA KONTROL: Seret sampah ke tong sudut ATAU tekan hotkey keyboard [Q, W, E, R] saat sampah melintas!', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11.5px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0, 0.5);
    modal.add(controlHint);

    // Resume button
    const resBtn = this.add.container(mX + mWidth / 2 - 140, botY);
    const rbg = this.add.graphics();
    rbg.fillStyle(0x16a34a, 1);
    rbg.fillRoundedRect(-110, -20, 220, 40, 8);
    rbg.lineStyle(2, 0xffffff, 0.85);
    rbg.strokeRoundedRect(-110, -20, 220, 40, 8);

    const rtxt = this.add.text(0, 0, 'LANJUTKAN MAIN ▶', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    resBtn.add([rbg, rtxt]);
    const resHit = this.add.rectangle(0, 0, 220, 40, 0x000000, 0.001);
    resHit.setInteractive({ useHandCursor: true });
    resBtn.add(resHit);

    resHit.on('pointerdown', () => this.closeQuickGuideModal());
    resHit.on('pointerover', () => resBtn.setScale(1.04));
    resHit.on('pointerout', () => resBtn.setScale(1.0));

    modal.add(resBtn);

    this.guideModal = modal;
  }

  closeQuickGuideModal() {
    if (this.guideModal) {
      sounds.playClick();
      this.guideModal.destroy();
      this.guideModal = null;
    }
    this.isPaused = false;
    this.gameScene.scene.resume();
    sounds.startConveyorHum();
  }
}
