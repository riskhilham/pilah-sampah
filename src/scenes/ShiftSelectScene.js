/**
 * ShiftSelectScene.js
 * Illustrated City Overworld Map & Level Selection Scene.
 * Features:
 * - High-resolution illustrated 2D cartoon city overworld map backdrop.
 * - Accurate node alignment matched to district landmarks in the artwork:
 *   Level 1: (109, 118) - Perumahan Asri
 *   Level 2: (369, 280) - Perkantoran Kota
 *   Level 3: (760, 259) - Kuliner & Mall
 *   Level 4: (304, 480) - Pasar Tradisional
 *   Level 5: (804, 521) - Kota Bersih Metropolis
 * - Clean floating pill header to ensure upper suburb (Level 1) is never obscured.
 * - Soft glowing dotted pathway connecting Level 1 -> 2 -> 3 -> 4 -> 5.
 * - Game-style circular 3D milestone level nodes (1, 2, 3, 4, 5) with star ratings.
 * - Friendly Indonesian terminology (Level, Target Sampah, Akurasi, Skor).
 * - Mission Preview modal with objectives and direct start button.
 */
import { GAME_CONFIG } from '../config.js';
import { LEVEL_CONFIGS } from '../data/levelConfig.js';
import { Storage } from '../utils/Storage.js';
import { sounds } from '../audio/SoundManager.js';

export class ShiftSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ShiftSelectScene' });
  }

  init(data) {
    if (data && data.justCompletedLevel) {
      const lvl = parseInt(data.justCompletedLevel, 10);
      const stars = Math.max(1, parseInt(data.stars, 10) || 1);
      const score = Math.max(0, parseInt(data.score, 10) || 0);
      Storage.saveShiftProgress(lvl, stars, score);
    }
  }

  create() {
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;

    sounds.init();

    // 1. Illustrated City Overworld Map Backdrop
    if (this.textures.exists('map_city_overworld')) {
      this.add.image(w / 2, h / 2, 'map_city_overworld')
        .setDisplaySize(w, h);
    } else {
      this.add.rectangle(w / 2, h / 2, w, h, 0x111e2e);
    }

    // Soft cinematic contrast scrim
    const scrim = this.add.graphics();
    scrim.fillStyle(0x050a10, 0.22);
    scrim.fillRect(0, 0, w, h);

    // 2. District Landmark Coordinates matched PRECISELY to illustrated artwork pins (6 Levels)
    this.districtNodes = [
      {
        level: 1,
        name: 'Perumahan Asri',
        subtitle: 'Kawasan Pemukiman & Taman Hijau',
        x: 110,
        y: 81, // Exact center of green-roof house badge
        color: 0x16a34a,
        highlightColor: 0x22c55e,
        streams: ['ORGANIK', 'DAUR ULANG']
      },
      {
        level: 2,
        name: 'Lingkungan Sekolah',
        subtitle: 'SD Ceria Hijau & Edukasi Pilah Sampah',
        x: 383,
        y: 85, // Exact center of brown-roof school house badge
        color: 0x10b981,
        highlightColor: 0x34d399,
        streams: ['ORGANIK', 'DAUR ULANG', 'SAMPAH SEKOLAH']
      },
      {
        level: 3,
        name: 'Perkantoran Kota',
        subtitle: 'Gedung Menara & Pusat Bisnis',
        x: 357,
        y: 326, // Exact center of office tower badge
        color: 0x0284c7,
        highlightColor: 0x38bdf8,
        streams: ['ORGANIK', 'DAUR ULANG', 'B3']
      },
      {
        level: 4,
        name: 'Kuliner & Mall',
        subtitle: 'Pusat Jajanan & Plaza Kuliner',
        x: 766,
        y: 257, // Exact center of culinary market badge
        color: 0xea580c,
        highlightColor: 0xf97316,
        streams: ['ORGANIK', 'DAUR ULANG', 'B3', 'RESIDU']
      },
      {
        level: 5,
        name: 'Pasar Tradisional',
        subtitle: 'Gudang Logistik & Pasar Sayur',
        x: 307,
        y: 482, // Exact center of warehouse trucks badge
        color: 0xd97706,
        highlightColor: 0xfbbf24,
        streams: ['4 JALUR SAMPAH', 'VOLUME TINGGI']
      },
      {
        level: 6,
        name: 'Kota Bersih Metropolis',
        subtitle: 'Pusat Pengolahan Modern & Energi Bersih',
        x: 818,
        y: 521, // Exact center of coastal clean facility badge
        color: 0x9333ea,
        highlightColor: 0xc084fc,
        streams: ['LEVEL PUNCAK KOTA', 'SIRKULAR PENUH']
      }
    ];

    // 3. Draw Soft Connecting Dotted Trail with Traveling Pulses (1 -> 2 -> 3 -> 4 -> 5 -> 6)
    this.drawOverworldTrail();

    // 4. Render Interactive Level Milestone Nodes (1 to 5)
    this.createLevelNodes();

    // 5. Floating Compact Header Bar (Leaves Top Suburb Open & Clear)
    this.createFloatingHeaderBar();

    // 6. Bottom Navigation Bar
    this.createFooterBar();

    // 7. Modal Mission Preview Container
    this.previewModal = null;
  }

  drawOverworldTrail() {
    const tg = this.add.graphics();
    const pts = this.districtNodes;

    // 1. Soft glowing dotted trail connecting milestones (1 -> 2 -> 3 -> 4 -> 5 -> 6)
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const line = new Phaser.Geom.Line(p1.x, p1.y, p2.x, p2.y);
      const points = Phaser.Geom.Line.BresenhamPoints(line, 16);

      const p1Prog = Storage.getShiftProgress(p1.level);
      const isSegmentCompleted = p1Prog.isCompleted || p1Prog.stars > 0;

      points.forEach((pt, idx) => {
        if (idx % 2 === 0) {
          if (isSegmentCompleted) {
            // Bright glowing emerald green trail for completed routes
            tg.fillStyle(0x0f291e, 0.85);
            tg.fillCircle(pt.x, pt.y, 5);
            tg.fillStyle(0x4ade80, 1);
            tg.fillCircle(pt.x, pt.y, 2.8);
          } else {
            // Outer soft glow for future / locked routes
            tg.fillStyle(0x0f172a, 0.7);
            tg.fillCircle(pt.x, pt.y, 4.5);
            tg.fillStyle(0x64748b, 0.6);
            tg.fillCircle(pt.x, pt.y, 2);
          }
        }
      });

      // 2. Dynamic Traveling Energy Orb along each segment
      const p1Unlocked = (p1.level === 1) || Storage.getShiftProgress(p1.level - 1).isCompleted;
      if (p1Unlocked) {
        const orbColor = isSegmentCompleted ? 0x22c55e : 0xfacc15;
        const orb = this.add.circle(p1.x, p1.y, 4, 0xffffff, 1);
        orb.setStrokeStyle(2, orbColor);

        this.tweens.add({
          targets: orb,
          x: p2.x,
          y: p2.y,
          duration: 1800 + i * 200,
          repeat: -1,
          ease: 'Linear',
          delay: i * 350
        });
      }
    }
  }

  createLevelNodes() {
    let latestUnlockedLevel = 1;

    this.districtNodes.forEach((nodeData, idx) => {
      const level = nodeData.level;
      const progress = Storage.getShiftProgress(level);
      const isCompleted = progress.isCompleted || progress.stars > 0;

      // Level 1 is always unlocked. Level N is unlocked if level N-1 has >= 1 star or completed.
      let isUnlocked = (level === 1);
      if (level > 1) {
        const prevProgress = Storage.getShiftProgress(level - 1);
        const isPrevDone = prevProgress.isCompleted || prevProgress.stars > 0 || (prevProgress.score && prevProgress.score > 0);
        if (isPrevDone) {
          isUnlocked = true;
        }
      }

      if (isUnlocked) {
        latestUnlockedLevel = Math.max(latestUnlockedLevel, level);
      }

      const node = this.add.container(nodeData.x, nodeData.y);

      // 1. Outer Pulsing Wave for unlocked levels
      if (isUnlocked) {
        const pulseColor = isCompleted ? 0x16a34a : nodeData.color;
        const pulseStroke = isCompleted ? 0x4ade80 : nodeData.highlightColor;
        const pulse = this.add.circle(0, 0, 36, pulseColor, 0);
        pulse.setStrokeStyle(3, pulseStroke);
        node.add(pulse);

        this.tweens.add({
          targets: pulse,
          scaleX: 1.8,
          scaleY: 1.8,
          alpha: 0,
          duration: 1500 + idx * 120,
          repeat: -1,
          ease: 'Cubic.easeOut'
        });
      }

      // 2. Heavy 3D Game Level Button (Round Shield)
      const btnRadius = 34;
      const bg = this.add.graphics();

      // Shadow
      bg.fillStyle(0x02060a, 0.75);
      bg.fillCircle(3, 5, btnRadius);

      // Outer Bezel Rim
      const bezelColor = isCompleted ? 0x22c55e : (isUnlocked ? nodeData.highlightColor : 0x475569);
      bg.fillStyle(isUnlocked ? 0x0f172a : 0x1e293b, 1);
      bg.fillCircle(0, 0, btnRadius);
      bg.lineStyle(isCompleted ? 4 : 3.5, bezelColor, 1);
      bg.strokeCircle(0, 0, btnRadius);

      // Inner Core
      const coreColor = isCompleted ? 0x15803d : (isUnlocked ? nodeData.color : 0x334155);
      bg.fillStyle(coreColor, 1);
      bg.fillCircle(0, 0, btnRadius - 5);

      // Glossy highlight arc on top
      if (isUnlocked) {
        bg.fillStyle(0xffffff, isCompleted ? 0.45 : 0.35);
        bg.beginPath();
        bg.arc(0, 0, btnRadius - 7, -Math.PI * 0.85, -Math.PI * 0.15, false);
        bg.closePath();
        bg.fillPath();
      }

      node.add(bg);

      // 3. Number Label or Lock Icon
      if (isUnlocked) {
        const numText = this.add.text(0, -1, `${level}`, {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '32px',
          fontStyle: 'bold',
          color: '#FFFFFF',
          stroke: '#0F172A',
          strokeThickness: 5
        }).setOrigin(0.5);
        node.add(numText);

        // Green Checkmark Badge at top-right corner for COMPLETED level
        if (isCompleted) {
          const chkBox = this.add.container(btnRadius - 6, -btnRadius + 6);
          const chkBg = this.add.graphics();
          chkBg.fillStyle(0x22c55e, 1);
          chkBg.fillCircle(0, 0, 13);
          chkBg.lineStyle(2, 0xffffff, 1);
          chkBg.strokeCircle(0, 0, 13);

          const chkTxt = this.add.text(0, 0, '✓', {
            fontFamily: "'Fredoka', sans-serif",
            fontSize: '15px',
            fontStyle: 'bold',
            color: '#FFFFFF'
          }).setOrigin(0.5);

          chkBox.add([chkBg, chkTxt]);
          node.add(chkBox);
        }
      } else {
        const lockG = this.add.graphics();
        // Shackle
        lockG.lineStyle(3, 0x94a3b8, 1);
        lockG.beginPath();
        lockG.arc(0, -5, 8, Math.PI, 0, false);
        lockG.lineTo(8, 2);
        lockG.moveTo(-8, -5);
        lockG.lineTo(-8, 2);
        lockG.strokePath();
        // Body
        lockG.fillStyle(0x475569, 1);
        lockG.fillRoundedRect(-11, -1, 22, 16, 3);
        lockG.lineStyle(1.5, 0x64748b, 1);
        lockG.strokeRoundedRect(-11, -1, 22, 16, 3);
        // Keyhole
        lockG.fillStyle(0x0f172a, 1);
        lockG.fillCircle(0, 5, 2);
        lockG.fillRect(-1, 5, 2, 4);
        node.add(lockG);
      }

      // 4. District Name Plaque underneath
      const plW = 142;
      const plH = 26;
      const plY = 44;

      const plBg = this.add.graphics();
      plBg.fillStyle(0x0f172a, 0.95);
      plBg.fillRoundedRect(-plW / 2, plY - plH / 2, plW, plH, 6);
      const plaqueBorder = isCompleted ? 0x22c55e : (isUnlocked ? nodeData.highlightColor : 0x475569);
      plBg.lineStyle(1.5, plaqueBorder, 0.9);
      plBg.strokeRoundedRect(-plW / 2, plY - plH / 2, plW, plH, 6);

      const nameTxt = this.add.text(0, plY, isCompleted ? `✓ ${nodeData.name.toUpperCase()}` : nodeData.name.toUpperCase(), {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: isCompleted ? '10.5px' : '11px',
        fontStyle: 'bold',
        color: isCompleted ? '#4ADE80' : (isUnlocked ? '#FFFFFF' : '#94A3B8')
      }).setOrigin(0.5);

      node.add([plBg, nameTxt]);

      // 5. Star Rating Bar (3 Stars)
      const starY = plY + 22;
      const starBg = this.add.graphics();
      starBg.fillStyle(0x091017, 0.95);
      starBg.fillRoundedRect(-44, starY - 11, 88, 22, 11);
      starBg.lineStyle(1, isCompleted ? 0x22c55e : 0x1e293b, 0.8);
      starBg.strokeRoundedRect(-44, starY - 11, 88, 22, 11);
      node.add(starBg);

      for (let s = 1; s <= 3; s++) {
        const sx = -22 + (s - 1) * 22;
        const isEarned = (s <= progress.stars);
        const star = this.add.text(sx, starY, '★', {
          fontFamily: "'Fredoka', sans-serif",
          fontSize: '16px',
          color: isEarned ? '#FBBF24' : '#475569'
        }).setOrigin(0.5);
        node.add(star);
      }

      // Interactive Click Handling with Dedicated Rectangle HitZone (covers badge + plaque + stars)
      const nodeHit = this.add.rectangle(0, 18, plW + 10, 120, 0x000000, 0.001);
      nodeHit.setInteractive({ useHandCursor: isUnlocked });
      node.add(nodeHit);

      nodeHit.on('pointerdown', () => {
        if (isUnlocked) {
          sounds.playClick();
          this.openMissionPreviewModal(nodeData);
        } else {
          sounds.playSortError();
          this.showLockedFeedback(nodeData.x, nodeData.y);
        }
      });

      nodeHit.on('pointerover', () => {
        if (isUnlocked) {
          node.setScale(1.10);
        }
      });

      nodeHit.on('pointerout', () => {
        node.setScale(1.0);
      });
    });

    // 6. Animated "DI SINI!" pointer on the current progression level
    // Finds the earliest unlocked level that hasn't been completed yet, or the highest unlocked
    let targetProgressionLevel = 1;
    for (let l = 1; l <= 6; l++) {
      const p = Storage.getShiftProgress(l);
      if (!p.isCompleted) {
        targetProgressionLevel = l;
        break;
      }
    }
    const activeTargetNode = this.districtNodes.find(d => d.level === targetProgressionLevel) || this.districtNodes.find(d => d.level === latestUnlockedLevel) || this.districtNodes[0];
    this.createActiveLevelIndicator(activeTargetNode.x, activeTargetNode.y);
  }

  createActiveLevelIndicator(x, y) {
    const indicator = this.add.container(x, y - 56);

    const bg = this.add.graphics();
    bg.fillStyle(0x10b981, 1);
    bg.fillRoundedRect(-48, -14, 96, 28, 14);
    bg.lineStyle(2, 0xffffff, 0.95);
    bg.strokeRoundedRect(-48, -14, 96, 28, 14);

    const dot = this.add.circle(-34, 0, 4, 0xffffff, 1);

    const txt = this.add.text(6, 0, 'DI SINI! ▶', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    indicator.add([bg, dot, txt]);

    this.tweens.add({
      targets: indicator,
      y: y - 66,
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  showLockedFeedback(x, y) {
    const tip = this.add.container(x, y - 56);
    const bg = this.add.graphics();
    bg.fillStyle(0xb91c1c, 0.95);
    bg.fillRoundedRect(-130, -15, 260, 30, 6);
    bg.lineStyle(1.5, 0xffffff, 0.8);
    bg.strokeRoundedRect(-130, -15, 260, 30, 6);

    const txt = this.add.text(0, 0, 'SELESAIKAN LEVEL SEBELUMNYA YA!', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    tip.add([bg, txt]);

    this.tweens.add({
      targets: tip,
      y: y - 76,
      alpha: 0,
      duration: 1200,
      ease: 'Quad.easeOut',
      onComplete: () => tip.destroy()
    });
  }

  openMissionPreviewModal(nodeData) {
    if (this.previewModal) {
      this.previewModal.destroy();
    }

    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const levelData = LEVEL_CONFIGS.find(l => l.level === nodeData.level) || LEVEL_CONFIGS[0];
    const progress = Storage.getShiftProgress(nodeData.level);

    const modal = this.add.container(0, 0);

    // Dark backdrop scrim
    const backdrop = this.add.rectangle(w / 2, h / 2, w, h, 0x03070a, 0.75);
    backdrop.setInteractive();
    backdrop.on('pointerdown', () => modal.destroy());
    modal.add(backdrop);

    // Modal Card
    const cardW = 600;
    const cardH = 410;
    const cardX = w / 2;
    const cardY = h / 2;

    // Prevent click-through to backdrop
    const cardHit = this.add.rectangle(cardX, cardY, cardW, cardH, 0x000000, 0.001);
    cardHit.setInteractive();
    modal.add(cardHit);

    const bg = this.add.graphics();
    bg.fillStyle(0x020406, 0.95);
    bg.fillRoundedRect(cardX - cardW / 2 + 8, cardY - cardH / 2 + 10, cardW, cardH, 16);

    bg.fillStyle(0x0f172a, 0.98);
    bg.fillRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 16);
    bg.lineStyle(3, nodeData.highlightColor, 1);
    bg.strokeRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, cardH, 16);

    // Header Ribbon
    bg.fillStyle(nodeData.color, 1);
    bg.fillRoundedRect(cardX - cardW / 2, cardY - cardH / 2, cardW, 64, { tl: 16, tr: 16, bl: 0, br: 0 });

    modal.add(bg);

    // Header Title
    const title = this.add.text(cardX - cardW / 2 + 24, cardY - cardH / 2 + 32, `LEVEL ${nodeData.level}: ${nodeData.name.toUpperCase()}`, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5);

    // Close Button [✕]
    const closeBtn = this.add.text(cardX + cardW / 2 - 24, cardY - cardH / 2 + 32, '✕', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => modal.destroy());
    closeBtn.on('pointerover', () => closeBtn.setScale(1.2));
    closeBtn.on('pointerout', () => closeBtn.setScale(1.0));

    // Completed Status Badge in Header Ribbon
    const isCompleted = progress.isCompleted || progress.stars > 0;
    if (isCompleted) {
      const doneTag = this.add.graphics();
      doneTag.fillStyle(0x166534, 1);
      doneTag.fillRoundedRect(cardX + cardW / 2 - 225, cardY - cardH / 2 + 18, 175, 28, 14);
      doneTag.lineStyle(1.5, 0x4ade80, 1);
      doneTag.strokeRoundedRect(cardX + cardW / 2 - 225, cardY - cardH / 2 + 18, 175, 28, 14);

      const doneTxt = this.add.text(cardX + cardW / 2 - 137, cardY - cardH / 2 + 32, '✓ SUDAH LULUS', {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '13px',
        fontStyle: 'bold',
        color: '#FFFFFF'
      }).setOrigin(0.5);

      modal.add([doneTag, doneTxt]);
    }

    // Description Box
    const storyBox = this.add.graphics();
    storyBox.fillStyle(0x0a1017, 0.9);
    storyBox.fillRoundedRect(cardX - cardW / 2 + 24, cardY - cardH / 2 + 82, cardW - 48, 88, 8);
    storyBox.lineStyle(1.5, 0x1e293b, 1);
    storyBox.strokeRoundedRect(cardX - cardW / 2 + 24, cardY - cardH / 2 + 82, cardW - 48, 88, 8);
    modal.add(storyBox);

    const desc = this.add.text(cardX, cardY - cardH / 2 + 126, levelData.description, {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '15px',
      color: '#E2E8F0',
      lineSpacing: 5,
      align: 'center',
      wordWrap: { width: cardW - 70 }
    }).setOrigin(0.5);

    // Targets Grid Matrix (4 Clean Visual Stat Pills)
    const targetY = cardY + 28;
    const statCols = [
      { label: 'TARGET ITEM', val: `${levelData.targetItems} Sampah`, col: '#38BDF8' },
      { label: 'BATAS WAKTU', val: `${levelData.timeLimitSeconds}s`, col: '#FBBF24' },
      { label: 'MIN. AKURASI', val: `${Math.round(levelData.minPurityForWin * 100)}%`, col: '#4ADE80' },
      { label: 'TOLERANSI B3', val: `Maks ${levelData.allowedHazardMisses}x`, col: '#F87171' }
    ];

    const statBoxW = 128;
    const statBoxH = 48;
    const statStartX = cardX - (statCols.length * statBoxW + (statCols.length - 1) * 8) / 2 + statBoxW / 2;

    statCols.forEach((st, sidx) => {
      const sx = statStartX + sidx * (statBoxW + 8);
      const sbg = this.add.graphics();
      sbg.fillStyle(0x0c1622, 1);
      sbg.fillRoundedRect(sx - statBoxW / 2, targetY - statBoxH / 2, statBoxW, statBoxH, 6);
      sbg.lineStyle(1, 0x1e293b, 0.9);
      sbg.strokeRoundedRect(sx - statBoxW / 2, targetY - statBoxH / 2, statBoxW, statBoxH, 6);
      modal.add(sbg);

      const slbl = this.add.text(sx, targetY - 12, st.label, {
        fontFamily: "'Chakra Petch', sans-serif",
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#94A3B8'
      }).setOrigin(0.5);

      const sval = this.add.text(sx, targetY + 10, st.val, {
        fontFamily: "'Fredoka', sans-serif",
        fontSize: '15.5px',
        fontStyle: 'bold',
        color: st.col
      }).setOrigin(0.5);

      modal.add([slbl, sval]);
    });

    // Active Category Stream Badges
    const streamY = cardY + 76;
    const streamContainer = this.add.container(cardX, streamY);
    modal.add(streamContainer);

    const streamBadges = nodeData.streams || ['ORGANIK', 'DAUR ULANG'];
    let curX = -((streamBadges.length * 108) / 2) + 54;
    streamBadges.forEach(str => {
      const badgeG = this.add.graphics();
      badgeG.fillStyle(0x131f2e, 0.9);
      badgeG.fillRoundedRect(curX - 50, -12, 100, 24, 4);
      badgeG.lineStyle(1, nodeData.highlightColor, 0.6);
      badgeG.strokeRoundedRect(curX - 50, -12, 100, 24, 4);

      const badgeT = this.add.text(curX, 0, str, {
        fontFamily: "'Chakra Petch', monospace",
        fontSize: '11px',
        fontStyle: 'bold',
        color: '#FFFFFF'
      }).setOrigin(0.5);

      streamContainer.add([badgeG, badgeT]);
      curX += 108;
    });

    // Personal Records
    const recY = cardY + 112;
    const starsStr = '★'.repeat(progress.stars) + '☆'.repeat(3 - progress.stars);
    const highestScore = Number.isFinite(progress.score) ? progress.score : (Number.isFinite(progress.highScore) ? progress.highScore : 0);
    const recTxt = this.add.text(cardX, recY, `BINTANG DIRAIH: ${starsStr}   •   SKOR TERTINGGI: ${highestScore}`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    // Primary Action Button: [ MULAI MAIN / MAIN ULANG ]
    const btnY = cardY + cardH / 2 - 44;
    const launchBtn = this.add.container(cardX, btnY);
    const lbg = this.add.graphics();
    lbg.fillStyle(isCompleted ? 0x16a34a : nodeData.color, 1);
    lbg.fillRoundedRect(-195, -23, 390, 46, 8);
    lbg.lineStyle(2, 0xffffff, 0.75);
    lbg.strokeRoundedRect(-195, -23, 390, 46, 8);

    const btnLabel = isCompleted
      ? `MAIN ULANG LEVEL ${nodeData.level} (ASAH SKOR) ↺`
      : `MULAI MAIN LEVEL ${nodeData.level} SEKARANG ▶`;

    const ltxt = this.add.text(0, 0, btnLabel, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: isCompleted ? '15.5px' : '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    launchBtn.add([lbg, ltxt]);
    const launchHit = this.add.rectangle(0, 0, 390, 46, 0x000000, 0.001);
    launchHit.setInteractive({ useHandCursor: true });
    launchBtn.add(launchHit);

    launchHit.on('pointerdown', () => {
      sounds.playClick();
      Storage.setLastSelectedShift(nodeData.level);
      this.scene.start('GameScene', { level: nodeData.level });
    });
    launchHit.on('pointerover', () => launchBtn.setScale(1.03));
    launchHit.on('pointerout', () => launchBtn.setScale(1.0));

    modal.add([title, closeBtn, desc, recTxt, launchBtn]);

    this.previewModal = modal;
  }

  createFloatingHeaderBar() {
    const w = GAME_CONFIG.WIDTH;

    // 1. Center Floating Pill: Title and Subtitle
    const titlePill = this.add.container(w / 2, 32);

    const tBg = this.add.graphics();
    tBg.fillStyle(0x0f172a, 0.94);
    tBg.fillRoundedRect(-210, -20, 420, 42, 21);
    tBg.lineStyle(2, 0x334155, 1);
    tBg.strokeRoundedRect(-210, -20, 420, 42, 21);

    const titleTxt = this.add.text(0, -6, 'PILAH SAMPAH // PILIH LEVEL', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '17px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    const subTxt = this.add.text(0, 11, 'PILIH DISTRIK (LEVEL 1 - 6) UNTUK MULAI MEMILAH', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#38BDF8'
    }).setOrigin(0.5);

    titlePill.add([tBg, titleTxt, subTxt]);

    // 2. Right Floating Pill: Total Stars Counter (18 Stars Max)
    let totalStars = 0;
    for (let i = 1; i <= 6; i++) totalStars += Storage.getShiftProgress(i).stars;

    const starPill = this.add.container(w - 150, 32);

    const sBg = this.add.graphics();
    sBg.fillStyle(0x0f172a, 0.94);
    sBg.fillRoundedRect(-110, -18, 220, 36, 18);
    sBg.lineStyle(2, 0xf59e0b, 0.9);
    sBg.strokeRoundedRect(-110, -18, 220, 36, 18);

    const starTxt = this.add.text(0, 0, `★ ${totalStars} / 18 BINTANG`, {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FBBF24'
    }).setOrigin(0.5);

    starPill.add([sBg, starTxt]);
  }

  createFooterBar() {
    const w = GAME_CONFIG.WIDTH;
    const h = GAME_CONFIG.HEIGHT;
    const footY = h - 34;

    const fg = this.add.graphics();
    fg.fillStyle(0x0f172a, 0.95);
    fg.fillRect(0, footY - 14, w, 48);
    fg.lineStyle(2, 0x334155, 1);
    fg.strokeRect(0, footY - 14, w, 48);

    // Back to Menu Button
    const backBtn = this.add.container(130, footY + 10);
    const bbg = this.add.graphics();
    bbg.fillStyle(0x334155, 1);
    bbg.fillRoundedRect(-100, -16, 200, 32, 6);
    bbg.lineStyle(1.5, 0x64748b, 1);
    bbg.strokeRoundedRect(-100, -16, 200, 32, 6);

    const btxt = this.add.text(0, 0, '◀ KEMBALI KE MENU', {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '13.5px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);

    backBtn.add([bbg, btxt]);
    const backHit = this.add.rectangle(0, 0, 200, 32, 0x000000, 0.001);
    backHit.setInteractive({ useHandCursor: true });
    backBtn.add(backHit);

    backHit.on('pointerdown', () => {
      sounds.playClick();
      this.scene.start('MenuScene');
    });
    backHit.on('pointerover', () => backBtn.setScale(1.04));
    backHit.on('pointerout', () => backBtn.setScale(1.0));

    // Footer Hint
    this.add.text(w / 2 + 60, footY + 10, 'TIPS: DAPATKAN MINIMAL 1 BINTANG UNTUK MEMBUKA LEVEL BERIKUTNYA', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#94A3B8'
    }).setOrigin(0.5);
  }
}
