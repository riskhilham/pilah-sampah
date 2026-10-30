/**
 * WasteItem.js
 * Physics, animations, and dual interaction (Drag & Drop + Click to Pick)
 * for waste items traveling along the conveyor.
 * Expanded with dynamic traits:
 * - Weight-based speed variance (lightweight vs. heavy).
 * - Special traits: GOLDEN recyclable (x2 score) and CRITICAL_HAZMAT (urgent alarm).
 */
import { WASTE_CATEGORIES } from '../data/wasteDatabase.js';

export class WasteItem extends Phaser.GameObjects.Container {
  constructor(scene, x, y, itemData, trait = 'NORMAL') {
    super(scene, x, y);
    this.scene = scene;
    this.itemData = itemData;
    this.trait = trait; // 'NORMAL', 'GOLDEN', 'CRITICAL_HAZMAT'

    this.isSorted = false;
    this.isDragging = false;
    this.isSelected = false;
    this.originalY = y;

    // 1. Calculate weight speed multiplier based on item characteristics
    this.speedMult = 1.0;
    const lightItems = [
      'item_dry_leaves', 'item_plastic_straw', 'item_snack_wrapper',
      'item_plastic_bag', 'item_bubble_wrap', 'item_school_paper',
      'item_tea_bag', 'item_dirty_tissue'
    ];
    const heavyItems = [
      'item_glass_bottle', 'item_glass_jar', 'item_metal_can_food',
      'item_aluminum_can', 'item_battery_aa', 'item_paint_can',
      'item_corn_cob', 'item_chicken_bone', 'item_broken_ceramic'
    ];

    if (lightItems.includes(itemData.id)) {
      this.speedMult = 1.16; // Moves faster, fluttering along conveyor
    } else if (heavyItems.includes(itemData.id)) {
      this.speedMult = 0.88; // Moves slower, dense/heavy weight
    }

    this.speed = 100 * this.speedMult;

    // 2. Trait Effects (Golden Shimmer / Critical Hazmat Beacon)
    if (this.trait === 'GOLDEN') {
      this.goldGlow = scene.add.graphics();
      this.goldGlow.fillStyle(0xfacc15, 0.4);
      this.goldGlow.fillCircle(0, 0, 48);
      this.goldGlow.lineStyle(3, 0xfef08a, 0.9);
      this.goldGlow.strokeCircle(0, 0, 48);
      this.add(this.goldGlow);

      scene.tweens.add({
        targets: this.goldGlow,
        scaleX: 1.25,
        scaleY: 1.25,
        alpha: 0.2,
        duration: 450,
        yoyo: true,
        repeat: -1
      });
    } else if (this.trait === 'CRITICAL_HAZMAT') {
      this.hazardGlow = scene.add.graphics();
      this.hazardGlow.lineStyle(4, 0xff0033, 0.95);
      this.hazardGlow.strokeCircle(0, 0, 52);
      this.add(this.hazardGlow);

      scene.tweens.add({
        targets: this.hazardGlow,
        scaleX: 1.35,
        scaleY: 1.35,
        alpha: 0.15,
        duration: 350,
        yoyo: true,
        repeat: -1
      });
    }

    // 3. Main Item Sprite Image (Large, Crisp, & Recognizable)
    this.sprite = scene.add.image(0, 0, itemData.texture);
    this.sprite.setDisplaySize(96, 96);
    this.add(this.sprite);

    // 4. Selection Halo (Visible when clicked to pick)
    this.selectionHalo = scene.add.graphics();
    this.selectionHalo.lineStyle(3.5, 0x00e5ff, 1);
    this.selectionHalo.strokeCircle(0, 0, 54);
    this.selectionHalo.setVisible(false);
    this.add(this.selectionHalo);

    // 5. Item Name Label (Shows WHAT object it is, without revealing category or hotkey)
    const displayName = (this.trait === 'GOLDEN') ? `★ ${itemData.name}` : itemData.name;
    this.nameLabel = scene.add.text(0, 56, displayName, {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '11px',
      fontStyle: 'bold',
      color: (this.trait === 'GOLDEN') ? '#FBBF24' : '#F8FAFC',
      backgroundColor: '#090d16',
      padding: { x: 7, y: 3 }
    }).setOrigin(0.5);
    this.add(this.nameLabel);

    // Setup Interactive & Draggable (Covers sprite and name label)
    this.setSize(96, 120);
    this.setInteractive({ draggable: true, useHandCursor: true });

    // Drag Events
    this.on('dragstart', (pointer) => {
      if (this.isSorted) return;
      this.isDragging = true;
      this.setSelected(true);
      this.scene.children.bringToTop(this);

      this.scene.tweens.add({
        targets: this,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 80
      });
    });

    this.on('drag', (pointer, dragX, dragY) => {
      if (this.isSorted) return;
      this.x = dragX;
      this.y = dragY;

      // Check hover over any bin
      this.scene.checkBinHover(this.x, this.y);
    });

    this.on('dragend', (pointer) => {
      if (this.isSorted) return;
      this.isDragging = false;

      this.scene.tweens.add({
        targets: this,
        scaleX: 1.0,
        scaleY: 1.0,
        duration: 80
      });

      // Attempt drop into bin
      const targetBin = this.scene.findBinAt(this.x, this.y);
      if (targetBin) {
        this.scene.handleItemDroppedIntoBin(this, targetBin);
      } else {
        // Snap back to conveyor
        this.snapBackToConveyor();
      }
    });

    // Click to Select Event
    this.on('pointerdown', (pointer) => {
      if (this.isSorted || this.isDragging) return;
      this.scene.selectItem(this);
    });

    scene.add.existing(this);
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setSelected(selected) {
    this.isSelected = selected;
    this.selectionHalo.setVisible(selected);
    if (selected) {
      this.scene.tweens.add({
        targets: this.sprite,
        y: -10,
        duration: 100
      });
    } else {
      this.sprite.y = 0;
    }
  }

  update(delta) {
    if (this.isSorted || this.isDragging) return;

    // Move along conveyor horizontally
    this.x += this.speed * (delta / 1000);
  }

  snapBackToConveyor() {
    this.scene.tweens.add({
      targets: this,
      y: this.originalY,
      duration: 180,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.setSelected(false);
      }
    });
  }

  // Animation when successfully dropped into a bin
  divertTo(targetX, targetY, onComplete) {
    this.isSorted = true;
    this.setSelected(false);

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      scaleX: 0.15,
      scaleY: 0.15,
      angle: 180,
      alpha: 0,
      duration: 250,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        if (onComplete) onComplete();
        this.destroy();
      }
    });
  }

  // Animation when item falls off at the end of conveyor
  fallOff(onComplete) {
    this.isSorted = true;
    this.scene.tweens.add({
      targets: this,
      y: this.y + 160,
      angle: 90,
      alpha: 0,
      duration: 350,
      ease: 'Quad.easeIn',
      onComplete: () => {
        if (onComplete) onComplete();
        this.destroy();
      }
    });
  }
}
