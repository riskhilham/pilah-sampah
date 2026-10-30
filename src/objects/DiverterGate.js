/**
 * DiverterGate.js
 * Industrial sorting chute component with animated spring-piston feedback,
 * glowing indicator badges, and click interaction.
 */

export class DiverterGate extends Phaser.GameObjects.Container {
  constructor(scene, x, y, category, keyLabel, textureKey, onTrigger) {
    super(scene, x, y);
    this.scene = scene;
    this.category = category;
    this.keyLabel = keyLabel;
    this.textureKey = textureKey;
    this.onTrigger = onTrigger;

    // Sprite image of the chute
    this.chuteSprite = scene.add.image(0, 0, textureKey);
    this.chuteSprite.setInteractive({ useHandCursor: true });
    this.add(this.chuteSprite);

    // Glowing rim border for activation flash
    this.glowGraphics = scene.add.graphics();
    this.add(this.glowGraphics);

    // Setup click event
    this.chuteSprite.on('pointerdown', () => {
      this.activate();
      if (this.onTrigger) this.onTrigger(this.category);
    });

    this.chuteSprite.on('pointerover', () => {
      scene.tweens.add({
        targets: this,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100
      });
    });

    this.chuteSprite.on('pointerout', () => {
      scene.tweens.add({
        targets: this,
        scaleX: 1.0,
        scaleY: 1.0,
        duration: 100
      });
    });

    scene.add.existing(this);
  }

  activate() {
    // Mechanical bounce tween
    this.scene.tweens.add({
      targets: this.chuteSprite,
      scaleX: 0.9,
      scaleY: 0.9,
      yoyo: true,
      duration: 80,
      ease: 'Back.easeOut'
    });

    // Flash glow border
    const g = this.glowGraphics;
    g.clear();
    g.lineStyle(6, 0xffffff, 0.9);
    g.strokeRoundedRect(-80, -80, 160, 160, 16);

    this.scene.tweens.add({
      targets: this.glowGraphics,
      alpha: { from: 1, to: 0 },
      duration: 250,
      onComplete: () => {
        g.clear();
      }
    });
  }
}

