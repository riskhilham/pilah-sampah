/**
 * SortingBin.js
 * Charming 2D Cel-Shaded Cartoon Wheelie Sorting Bins for "Pilah Sampah".
 * Features:
 * - High-definition cel-shaded cartoon wheelie bin sprites matching the game cover & map.
 * - Dynamic glowing intake aura that illuminates on hover and item proximity.
 * - Squash & stretch lid bounce on correct sort, rapid wobble on error.
 * - Clear category title plaque and high-contrast hotkey badge ([Q], [W], [E], [R]).
 * - Rock-solid rectangular hitZone for effortless drag-and-drop & click-to-pick.
 */

export class SortingBin extends Phaser.GameObjects.Container {
  constructor(scene, x, y, category, config) {
    super(scene, x, y);
    this.scene = scene;
    this.category = category;
    this.config = config; // { color, accentColor, title, subtitle, icon, textureKey, hotkey }

    this.binWidth = 190;
    this.binHeight = 175;

    // 1. Soft Floor Ambient Drop Shadow
    this.shadowG = scene.add.graphics();
    this.shadowG.fillStyle(0x060a0f, 0.6);
    this.shadowG.fillEllipse(0, 68, 150, 22);
    this.add(this.shadowG);

    // 2. Interactive Proximity / Hover Glowing Aura Halo
    this.auraG = scene.add.graphics();
    this.add(this.auraG);

    // 3. Main 2D Cel-Shaded Cartoon Wheelie Bin Sprite
    const texKey = config.textureKey || `bin_${category.toLowerCase()}`;
    if (scene.textures.exists(texKey)) {
      this.binSprite = scene.add.image(0, 0, texKey).setDisplaySize(168, 168);
      this.add(this.binSprite);
    } else {
      // Procedural fallback
      this.binSprite = scene.add.rectangle(0, 0, 150, 150, config.color);
      this.add(this.binSprite);
    }

    // 4. Floating Header Category Plaque (Top of Bin)
    const plaqueW = 160;
    const plaqueH = 28;
    const plaqueY = -76;

    this.plaqueG = scene.add.graphics();
    this.plaqueG.fillStyle(0x0f172a, 0.94);
    this.plaqueG.fillRoundedRect(-plaqueW / 2, plaqueY - plaqueH / 2, plaqueW, plaqueH, 8);
    this.plaqueG.lineStyle(2.5, config.color, 1);
    this.plaqueG.strokeRoundedRect(-plaqueW / 2, plaqueY - plaqueH / 2, plaqueW, plaqueH, 8);
    this.add(this.plaqueG);

    // Clean Category Title Text
    const cleanTitle = (config.title || '').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\u2705|\u274C|\u26A0/g, '').trim();
    this.titleText = scene.add.text(-6, plaqueY, cleanTitle, {
      fontFamily: "'Fredoka', sans-serif",
      fontSize: '15.5px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    this.add(this.titleText);

    // 5. Stamped Round Hotkey Pill Badge (Aligned Vertically With Plaque)
    const badgeX = plaqueW / 2 - 2;
    const badgeY = plaqueY;

    this.badgeG = scene.add.graphics();
    this.badgeG.fillStyle(config.color, 1);
    this.badgeG.fillCircle(badgeX, badgeY, 13);
    this.badgeG.lineStyle(2, 0xffffff, 0.95);
    this.badgeG.strokeCircle(badgeX, badgeY, 13);
    this.add(this.badgeG);

    this.hotkeyText = scene.add.text(badgeX, badgeY, config.hotkey || '', {
      fontFamily: "'Chakra Petch', sans-serif",
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    this.add(this.hotkeyText);

    // 6. Subtitle / Example items pill (Bottom of Bin)
    const subY = 82;
    const subW = 188;
    const subH = 20;

    this.subG = scene.add.graphics();
    this.subG.fillStyle(0x070c12, 0.88);
    this.subG.fillRoundedRect(-subW / 2, subY - subH / 2, subW, subH, 6);
    this.subG.lineStyle(1.5, 0x334155, 0.8);
    this.subG.strokeRoundedRect(-subW / 2, subY - subH / 2, subW, subH, 6);
    this.add(this.subG);

    this.subText = scene.add.text(0, subY, config.subtitle || '', {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#CBD5E1',
      align: 'center'
    }).setOrigin(0.5);
    this.add(this.subText);

    // Initial render of aura
    this.drawAura(false);

    // 7. Rock-Solid HitZone for drag-and-drop & clicks
    this.setSize(this.binWidth, this.binHeight + 15);
    this.setInteractive({ useHandCursor: true });

    this.on('pointerover', () => this.highlightHover());
    this.on('pointerout', () => this.drawNormalState());

    scene.add.existing(this);
  }

  drawAura(isHovered = false) {
    this.auraG.clear();
    if (isHovered) {
      // Bright neon glowing aura behind bin
      this.auraG.fillStyle(this.config.color, 0.35);
      this.auraG.fillEllipse(0, 8, 175, 175);
      this.auraG.lineStyle(3, this.config.color, 0.9);
      this.auraG.strokeEllipse(0, 8, 175, 175);

      if (this.binSprite) {
        this.binSprite.setScale(1.06);
      }
    } else {
      if (this.binSprite) {
        this.binSprite.setScale(1.0);
      }
    }
  }

  highlightHover() {
    this.drawAura(true);
  }

  drawNormalState() {
    this.drawAura(false);
  }

  triggerSuccessBounce() {
    // Satisfying Squash & Stretch bounce with lid celebration
    this.scene.tweens.add({
      targets: this.binSprite,
      scaleX: 1.15,
      scaleY: 0.88,
      duration: 100,
      yoyo: true,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.scene.tweens.add({
          targets: this.binSprite,
          scaleX: 0.95,
          scaleY: 1.08,
          duration: 90,
          yoyo: true,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            this.binSprite.setScale(1.0);
          }
        });
      }
    });

    // Flash glowing aura
    this.auraG.clear();
    this.auraG.fillStyle(this.config.color, 0.6);
    this.auraG.fillEllipse(0, 8, 195, 195);

    this.scene.time.delayedCall(240, () => {
      this.drawAura(false);
    });
  }

  triggerErrorShake() {
    const origX = this.x;
    this.scene.tweens.add({
      targets: this,
      x: origX + 9,
      yoyo: true,
      repeat: 4,
      duration: 40,
      onComplete: () => {
        this.x = origX;
      }
    });
  }
}
