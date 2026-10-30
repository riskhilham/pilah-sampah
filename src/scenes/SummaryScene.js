/**
 * SummaryScene.js
 * Friendly Level Summary & Inspection Tablet.
 * Displays level results, star ratings, accuracy metrics, educational tips,
 * and navigation buttons.
 */
import { GAME_CONFIG } from '../config.js';
import { sounds } from '../audio/SoundManager.js';
import { Storage } from '../utils/Storage.js';

export class SummaryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SummaryScene' });
  }

  create(data) {
    const { level, isWin, purity, score, correctCount, wrongCount, hazardMisses, customMessage, levelConfig } = data;
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    // Environmental Dim Background
    this.add.rectangle(w / 2, h / 2, w, h, 0x05080c, 0.85);

    // --- TABLET CHASSIS ---
    const panelWidth = 780;
    const panelHeight = 570;
    const panelX = w / 2;
    const panelY = h / 2;
    const halfW = panelWidth / 2;
    const halfH = panelHeight / 2;

    const tabletBg = this.add.graphics();
    tabletBg.fillStyle(0x020406, 0.85);
    tabletBg.fillRoundedRect(panelX - halfW + 8, panelY - halfH + 10, panelWidth, panelHeight, 20);

    tabletBg.fillStyle(0x0f172a, 1);
    tabletBg.fillRoundedRect(panelX - halfW, panelY - halfH, panelWidth, panelHeight, 20);
    tabletBg.lineStyle(3, 0x334155, 1);
    tabletBg.strokeRoundedRect(panelX - halfW, panelY - halfH, panelWidth, panelHeight, 20);

    // Corner Bolts
    const hexBolts = [
      { hx: panelX - halfW + 16, hy: panelY - halfH + 16 },
      { hx: panelX + halfW - 16, hy: panelY - halfH + 16 },
      { hx: panelX - halfW + 16, hy: panelY + halfH - 16 },
      { hx: panelX + halfW - 16, hy: panelY + halfH - 16 }
    ];
    tabletBg.fillStyle(0x64748b, 1);
    hexBolts.forEach(hb => tabletBg.fillCircle(hb.hx, hb.hy, 4.5));
    tabletBg.fillStyle(0xffffff, 0.7);
    hexBolts.forEach(hb => tabletBg.fillCircle(hb.hx - 1, hb.hy - 1, 1.5));

    // Internal Screen Bezel
    const screenW = panelWidth - 36;
    const screenH = panelHeight - 36;
    tabletBg.fillStyle(0x0c131a, 0.98);
    tabletBg.fillRoundedRect(panelX - screenW / 2, panelY - screenH / 2, screenW, screenH, 10);
    tabletBg.lineStyle(2, 0x1e293b, 1);
    tabletBg.strokeRoundedRect(panelX - screenW / 2, panelY - screenH / 2, screenW, screenH, 10);

    // Subtle Scanlines
    tabletBg.lineStyle(1, 0x15222e, 0.6);
    for (let sy = panelY - screenH / 2 + 15; sy < panelY + screenH / 2 - 15; sy += 12) {
      tabletBg.lineBetween(panelX - screenW / 2 + 10, sy, panelX + screenW / 2 - 10, sy);
    }

    // --- HEADER: STATUS ---
    const headerTitle = isWin ? 'HEBAT! LEVEL SELESAI' : 'YAH, COBA LAGI YA!';
    const headerColor = isWin ? '#4ADE80' : '#F87171';

    this.add.text(panelX, panelY - 225, headerTitle, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '28px',
      fontStyle: 'bold',
      color: headerColor
    }).setOrigin(0.5);

    this.add.text(panelX, panelY - 192, levelConfig.title.toUpperCase(), {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#94A3B8'
    }).setOrigin(0.5);

    // --- STAMP GRAPHIC ---
    const stampContainer = this.add.container(panelX + 220, panelY - 140);
    const stampG = this.add.graphics();

    if (isWin) {
      stampG.lineStyle(3.5, 0x22c55e, 0.85);
      stampG.strokeCircle(0, 0, 48);
      stampG.strokeCircle(0, 0, 43);

      const stampLabel1 = this.add.text(0, -12, 'BERHASIL', {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '15px',
        fontStyle: 'bold',
        color: '#22C55E'
      }).setOrigin(0.5);

      const stampLabel2 = this.add.text(0, 10, 'LULUS LEVEL', {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '12px',
        fontStyle: 'bold',
        color: '#22C55E'
      }).setOrigin(0.5);

      stampContainer.add([stampG, stampLabel1, stampLabel2]);
      stampContainer.setAngle(-12);
    } else {
      stampG.lineStyle(3.5, 0xef4444, 0.9);
      stampG.strokeRect(-65, -24, 130, 48);

      const stampLabel = this.add.text(0, 0, 'BELUM LULUS', {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '14px',
        fontStyle: 'bold',
        color: '#EF4444'
      }).setOrigin(0.5);

      stampContainer.add([stampG, stampLabel]);
      stampContainer.setAngle(8);
    }

    // Stars Rating Display
    let starsCount = 0;
    if (isWin) {
      starsCount = 1;
      if (purity >= levelConfig.starThresholds[2]) starsCount = 3;
      else if (purity >= levelConfig.starThresholds[1]) starsCount = 2;

      Storage.saveShiftProgress(level, starsCount, score);

      const starStr = '★'.repeat(starsCount) + '☆'.repeat(3 - starsCount);
      this.add.text(panelX - 70, panelY - 140, starStr, {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '44px',
        color: '#FBBF24'
      }).setOrigin(0.5);
    } else {
      this.add.text(panelX - 70, panelY - 140, customMessage || 'Akurasi pilah masih di bawah target minimal.', {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '15px',
        fontStyle: 'bold',
        color: '#EF4444'
      }).setOrigin(0.5);
    }

    // --- METRICS GRID (4 CARDS) ---
    const statY = panelY - 60;
    const col1X = panelX - 180;
    const col2X = panelX + 180;

    this.createStatCard(col1X, statY, 'AKURASI AKHIR', `${Math.round(purity * 100)}%`, purity >= 0.85 ? '#22C55E' : '#F59E0B');
    this.createStatCard(col2X, statY, 'SKOR AKHIR', `★ ${score}`, '#FBBF24');
    this.createStatCard(col1X, statY + 76, 'SAMPAH BENAR', `${correctCount} Item`, '#22C55E');
    this.createStatCard(col2X, statY + 76, 'KESALAHAN B3', `${hazardMisses}x / ${wrongCount} salah`, hazardMisses > 0 ? '#EF4444' : '#94A3B8');

    // --- EDUCATIONAL TIP BOX ---
    const noteY = panelY + 130;
    const noteBox = this.add.graphics();
    noteBox.fillStyle(0x0f172a, 0.95);
    noteBox.fillRoundedRect(panelX - 330, noteY - 38, 660, 76, 8);
    noteBox.lineStyle(2, 0x1e293b, 1);
    noteBox.strokeRoundedRect(panelX - 330, noteY - 38, 660, 76, 8);

    this.add.text(panelX - 310, noteY - 24, '[ TAHUKAH KAMU? ]', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FBBF24'
    });

    this.add.text(panelX - 310, noteY - 2, levelConfig.factsTip, {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13px',
      color: '#E2E8F0',
      wordWrap: { width: 620 }
    });

    // --- ACTION BUTTONS ---
    const btnY = panelY + 220;
    const btnW = 200;

    if (isWin && level < 6) {
      this.createTabletButton(panelX - 220, btnY, btnW, 'LEVEL BERIKUT ▶', 0x16a34a, () => {
        sounds.playClick();
        this.scene.start('GameScene', { level: level + 1 });
      });
    } else {
      this.createTabletButton(panelX - 220, btnY, btnW, 'ULANGI LEVEL ↺', 0xd97706, () => {
        sounds.playClick();
        this.scene.start('GameScene', { level: level });
      });
    }

    this.createTabletButton(panelX, btnY, btnW, 'PETA LEVEL', 0x2563eb, () => {
      sounds.playClick();
      this.scene.start('ShiftSelectScene');
    });

    this.createTabletButton(panelX + 220, btnY, btnW, 'MENU UTAMA', 0x334155, () => {
      sounds.playClick();
      this.scene.start('MenuScene');
    });
  }

  createStatCard(x, y, label, val, color) {
    const card = this.add.graphics();
    card.fillStyle(0x0f172a, 0.95);
    card.fillRoundedRect(x - 145, y - 28, 290, 60, 6);
    card.lineStyle(2, 0x1e293b, 1);
    card.strokeRoundedRect(x - 145, y - 28, 290, 60, 6);

    this.add.text(x, y - 14, label, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#94A3B8'
    }).setOrigin(0.5);

    this.add.text(x, y + 10, val, {
      fontFamily: "'Chakra Petch', monospace",
      fontSize: '20px',
      fontStyle: 'bold',
      color: color
    }).setOrigin(0.5);
  }

  createTabletButton(x, y, width, text, color, onClick) {
    const btn = this.add.container(x, y);
    const halfW = width / 2;

    const bg = this.add.graphics();
    bg.fillStyle(color, 1);
    bg.fillRoundedRect(-halfW, -24, width, 48, 8);
    bg.lineStyle(2, 0xffffff, 0.4);
    bg.strokeRoundedRect(-halfW, -24, width, 48, 8);

    const label = this.add.text(0, 0, text, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '15px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    btn.add([bg, label]);
    const hitZone = this.add.rectangle(0, 0, width, 48, 0x000000, 0.001);
    hitZone.setInteractive({ useHandCursor: true });
    btn.add(hitZone);

    hitZone.on('pointerdown', onClick);
    hitZone.on('pointerover', () => btn.setScale(1.04));
    hitZone.on('pointerout', () => btn.setScale(1.0));
  }
}
