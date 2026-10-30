/**
 * SplashScene.js
 * Clean Panoramic Game Cover & Single Unified Loading Scene for "Pilah Sampah".
 * Features:
 * - 100% pristine cover artwork without any black flash or dark scrim.
 * - Artwork's native 3D title "PILAH SAMPAH" is fully visible and unobstructed.
 * - Single smooth ~2.0s loading bar dock at bottom (y: 625).
 * - Rock-solid start button with real Rectangle hitZone + fullscreen click & Space/Enter listeners.
 * - Safe timer transition to MenuScene that never hangs.
 */
import { GAME_CONFIG } from '../config.js';
import { sounds } from '../audio/SoundManager.js';

export class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SplashScene' });
  }

  create() {
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    // 1. Pristine Cover Art Backdrop (100% Clarity, Zero Dark Scrim)
    if (this.textures.exists('bg_cover_splash')) {
      this.add.image(w / 2, h / 2, 'bg_cover_splash')
        .setDisplaySize(w, h);
    } else {
      this.add.rectangle(w / 2, h / 2, w, h, 0x0f172a);
    }

    // 2. Subtle Bottom Ambient Shadow (Only at bottom y: 580..720 for UI text contrast)
    const bottomGlow = this.add.graphics();
    bottomGlow.fillGradientStyle(0x02060f, 0x02060f, 0x02060f, 0x02060f, 0, 0, 0.65, 0.65);
    bottomGlow.fillRect(0, h - 140, w, 140);

    // 3. Bottom Interactive Dock: Loading Sequence or Start Button
    const alreadyLoaded = this.registry.get('hasCompletedInitialLoad') === true;

    if (alreadyLoaded) {
      // Returning player: show start button immediately
      this.showStartButton(w, h);
    } else {
      // First launch: show single smooth 2.0s loading sequence
      this.runLoadingSequence(w, h);
    }
  }

  runLoadingSequence(w, h) {
    const dockY = 625;
    const loadContainer = this.add.container(w / 2, dockY);

    const barW = 460;
    const barH = 20;

    // Loading Track Chassis (Glassmorphism dark capsule)
    const trackBg = this.add.graphics();
    trackBg.fillStyle(0x09101d, 0.88);
    trackBg.fillRoundedRect(-barW / 2, -barH / 2, barW, barH, 10);
    trackBg.lineStyle(2, 0x334155, 0.9);
    trackBg.strokeRoundedRect(-barW / 2, -barH / 2, barW, barH, 10);

    // Dynamic Progress Fill
    const fillBar = this.add.graphics();

    // Progress Percentage Text
    const percentText = this.add.text(barW / 2 + 16, 0, '0%', {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#4ADE80'
    }).setOrigin(0, 0.5);

    // Educational Status Message
    const statusText = this.add.text(0, 26, 'Menyiapkan fasilitas sirkular kota...', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '12.5px',
      fontStyle: 'bold',
      color: '#E2E8F0',
      stroke: '#050a12',
      strokeThickness: 3
    }).setOrigin(0.5);

    loadContainer.add([trackBg, fillBar, percentText, statusText]);

    // Footer Hint
    const footHint = this.add.text(w / 2, h - 22, 'MEMUAT SISTEM & DATA SAMPAH SEKOLAH... MOHON TUNGGU SEBENTAR', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#CBD5E1',
      stroke: '#050a12',
      strokeThickness: 3
    }).setOrigin(0.5);

    // Progress Tween over 2000ms
    const progressObj = { value: 0 };
    this.loadingTween = this.tweens.add({
      targets: progressObj,
      value: 1,
      duration: 2000,
      ease: 'Cubic.easeInOut',
      onUpdate: () => {
        const val = progressObj.value;
        const currentPct = Math.round(val * 100);

        fillBar.clear();
        fillBar.fillStyle(0x22c55e, 1);
        fillBar.fillRoundedRect(-barW / 2 + 2, -barH / 2 + 2, Math.max(10, (barW - 4) * val), barH - 4, 8);

        // Bright neon tip
        fillBar.fillStyle(0x86efac, 0.95);
        fillBar.fillCircle(-barW / 2 + (barW - 4) * val - 2, 0, 4);

        percentText.setText(`${currentPct}%`);

        // Cycling status messages
        if (currentPct < 30) {
          statusText.setText('Menyiapkan fasilitas sirkular kota...');
        } else if (currentPct < 60) {
          statusText.setText('Memuat 48 database sampah sekolah dan perkotaan...');
        } else if (currentPct < 90) {
          statusText.setText('Mengalibrasi konveyor 4 jalur (Organik, Daur Ulang, B3, Residu)...');
        } else {
          statusText.setText('Sistem siap beroperasi! Pahlawan Kebersihan siap bertugas.');
        }
      },
      onComplete: () => {
        this.registry.set('hasCompletedInitialLoad', true);

        // Fade out loading dock and smoothly display start button
        this.tweens.add({
          targets: [loadContainer, footHint],
          alpha: 0,
          duration: 250,
          onComplete: () => {
            loadContainer.destroy();
            footHint.destroy();
            this.showStartButton(w, h);
          }
        });
      }
    });

    // Allow user to click anywhere or press SPACE to instantly complete loading if desired
    const skipLoading = () => {
      if (this.loadingTween && this.loadingTween.isPlaying()) {
        this.loadingTween.stop();
        this.registry.set('hasCompletedInitialLoad', true);
        loadContainer.destroy();
        footHint.destroy();
        this.showStartButton(w, h);
      }
    };
    this.input.once('pointerdown', skipLoading);
    this.input.keyboard.once('keydown-SPACE', skipLoading);
  }

  showStartButton(w, h) {
    const btnY = 625;
    const btnW = 380;
    const btnH = 52;
    const radius = 26;

    const btnContainer = this.add.container(w / 2, btnY);

    const btnBg = this.add.graphics();
    // Drop shadow
    btnBg.fillStyle(0x020406, 0.6);
    btnBg.fillRoundedRect(-btnW / 2 + 3, -btnH / 2 + 4, btnW, btnH, radius);

    // Glowing Pill Body
    btnBg.fillStyle(0x16a34a, 1);
    btnBg.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, radius);
    btnBg.lineStyle(2.5, 0xffffff, 0.95);
    btnBg.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, radius);

    const btnText = this.add.text(0, 0, 'KLIK MULAI PERMAINAN ▶', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF',
      stroke: '#0F172A',
      strokeThickness: 4
    }).setOrigin(0.5);

    btnContainer.add([btnBg, btnText]);

    // ROCK-SOLID HIT TARGET: Real interactive Rectangle GameObject on top of container
    const hitZone = this.add.rectangle(w / 2, btnY, btnW, btnH, 0x000000, 0.001);
    hitZone.setInteractive({ useHandCursor: true });

    // Gentle Pulse Animation
    this.tweens.add({
      targets: [btnContainer, hitZone],
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 750,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Sub-Hint Text
    this.add.text(w / 2, h - 22, 'KLIK TOMBOL DI ATAS / TEKAN SPASI UNTUK MULAI PERMAINAN', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13.5px',
      fontStyle: 'bold',
      color: '#F8FAFC',
      stroke: '#050a12',
      strokeThickness: 3
    }).setOrigin(0.5);

    // Reliable Scene Transition Handler
    let hasStarted = false;
    const startGame = () => {
      if (hasStarted) return;
      hasStarted = true;

      sounds.init();
      sounds.playClick();

      this.cameras.main.fadeOut(200, 10, 15, 23);

      // Safe timeout guarantees transition even if browser delays camera event
      this.time.delayedCall(200, () => {
        this.scene.start('MenuScene');
      });
    };

    // 1. Click directly on button hitZone
    hitZone.on('pointerdown', startGame);

    // 2. Click anywhere on screen
    this.time.delayedCall(50, () => {
      this.input.once('pointerdown', startGame);
    });

    // 3. Keyboard shortcuts
    this.input.keyboard.once('keydown-SPACE', startGame);
    this.input.keyboard.once('keydown-ENTER', startGame);
  }
}
