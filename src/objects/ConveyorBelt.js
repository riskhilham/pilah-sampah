/**
 * ConveyorBelt.js
 * Industrial conveyor system integrated into the factory architecture.
 * Features structural steel support pedestals, floor ambient shadows,
 * inlet feed hopper, overflow exit chute, and synchronized scrolling rubber chevrons.
 */

export class ConveyorBelt extends Phaser.GameObjects.Container {
  constructor(scene, x, y, width, height, speed = 120) {
    super(scene, x, y);
    this.scene = scene;
    this.conveyorWidth = width;
    this.conveyorHeight = height;
    this.speed = speed;
    this.scrollOffset = 0;
    this.isRunning = true;

    // Graphics layers: Structure & Pedestals (behind belt), Belt Surface, and Rails/Housings (on top)
    this.pedestalGraphics = scene.add.graphics();
    this.beltGraphics = scene.add.graphics();
    this.housingGraphics = scene.add.graphics();
    this.add([this.pedestalGraphics, this.beltGraphics, this.housingGraphics]);

    this.drawPedestals();
    this.drawHousings();
    this.drawConveyor();

    scene.add.existing(this);
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  setRunning(running) {
    this.isRunning = running;
  }

  update(time, delta) {
    if (!this.isRunning) return;

    const dt = delta / 1000;
    this.scrollOffset = (this.scrollOffset + this.speed * dt) % 60;
    this.drawConveyor();
  }

  drawPedestals() {
    const pg = this.pedestalGraphics;
    pg.clear();

    const w = this.conveyorWidth;
    const halfH = this.conveyorHeight / 2;
    const legPositions = [220, 480, 800, 1060];
    const floorY = halfH + 80;

    legPositions.forEach(lx => {
      // Floor Ambient Shadow under leg
      pg.fillStyle(0x070c10, 0.6);
      pg.fillEllipse(lx, floorY + 4, 76, 18);

      // Heavy I-Beam Steel Column
      pg.fillStyle(0x1a252f, 1);
      pg.fillRect(lx - 22, halfH, 44, 80);

      // I-Beam Flange Ribs (Inner depth)
      pg.fillStyle(0x2c3e50, 1);
      pg.fillRect(lx - 16, halfH, 32, 75);
      pg.fillStyle(0x34495e, 1);
      pg.fillRect(lx - 6, halfH, 12, 75);

      // Floor Baseplate with Bolts
      pg.fillStyle(0x111920, 1);
      pg.fillRoundedRect(lx - 32, floorY - 10, 64, 16, 4);
      pg.lineStyle(2, 0x475569, 0.8);
      pg.strokeRoundedRect(lx - 32, floorY - 10, 64, 16, 4);

      // Bolts
      pg.fillStyle(0x94a3b8, 1);
      pg.fillCircle(lx - 22, floorY - 2, 3);
      pg.fillCircle(lx + 22, floorY - 2, 3);
    });

    // Continuous floor shadow underneath the entire conveyor span
    pg.fillStyle(0x06090d, 0.45);
    pg.fillEllipse(w / 2, floorY - 40, w - 80, 45);
  }

  drawHousings() {
    const hg = this.housingGraphics;
    hg.clear();

    const halfH = this.conveyorHeight / 2;

    // --- Left Inlet Feed Chute (Where items enter from plant ceiling) ---
    const inletW = 56;
    hg.fillStyle(0x1e293b, 1);
    hg.fillRect(0, -halfH - 80, inletW, 80);
    hg.lineStyle(3, 0x475569, 1);
    hg.strokeRect(0, -halfH - 80, inletW, 80);

    // Inlet Pipe Collar & Warning band
    hg.fillStyle(0xf1c40f, 0.9);
    hg.fillRect(0, -halfH - 30, inletW, 16);
    hg.fillStyle(0x0f172a, 1);
    hg.fillTriangle(0, -halfH - 30, 14, -halfH - 30, 0, -halfH - 14);
    hg.fillTriangle(14, -halfH - 30, 32, -halfH - 30, 18, -halfH - 14);
    hg.fillTriangle(32, -halfH - 30, 50, -halfH - 30, 36, -halfH - 14);

    // --- Right Exit Overflow Chute (Where unsorted items fall) ---
    const exitX = this.conveyorWidth - 56;
    hg.fillStyle(0x1e293b, 1);
    hg.fillRect(exitX, -halfH, 56, this.conveyorHeight + 40);
    hg.lineStyle(3, 0x475569, 1);
    hg.strokeRect(exitX, -halfH, 56, this.conveyorHeight + 40);

    // Overflow hazard stripes
    hg.fillStyle(0xc0392b, 0.9);
    hg.fillRect(exitX, halfH + 8, 56, 16);
    hg.fillStyle(0xffffff, 1);
    hg.fillTriangle(exitX + 4, halfH + 8, exitX + 16, halfH + 8, exitX + 6, halfH + 24);
    hg.fillTriangle(exitX + 22, halfH + 8, exitX + 34, halfH + 8, exitX + 24, halfH + 24);
    hg.fillTriangle(exitX + 40, halfH + 8, exitX + 52, halfH + 8, exitX + 42, halfH + 24);
  }

  drawConveyor() {
    const g = this.beltGraphics;
    g.clear();

    const w = this.conveyorWidth;
    const h = this.conveyorHeight;
    const halfH = h / 2;

    // 1. Bed structure plate (dark metal backing)
    g.fillStyle(0x0f1720, 1);
    g.fillRect(0, -halfH, w, h);

    // 2. High-Traction Rubber Belt Surface
    g.fillStyle(0x19222a, 1);
    g.fillRect(0, -halfH + 6, w, h - 12);

    // Subtle horizontal grooves
    g.lineStyle(1, 0x222e38, 0.7);
    for (let py = -halfH + 18; py < halfH - 10; py += 16) {
      g.lineBetween(0, py, w, py);
    }

    // 3. Directional Yellow Chevron Markings
    const chevronSpacing = 60;
    g.lineStyle(3.5, 0xf39c12, 0.55);

    for (let px = -chevronSpacing + this.scrollOffset; px < w + chevronSpacing; px += chevronSpacing) {
      if (px >= 40 && px <= w - 50) {
        g.beginPath();
        g.moveTo(px - 14, -halfH + 22);
        g.lineTo(px + 12, 0);
        g.lineTo(px - 14, halfH - 22);
        g.strokePath();
      }
    }

    // 4. Heavy Steel Guard Rails (Top & Bottom)
    const railHeight = 16;

    // Top Steel Rail
    g.fillStyle(0x273544, 1);
    g.fillRect(0, -halfH - railHeight, w, railHeight);
    g.fillStyle(0x64748b, 1);
    g.fillRect(0, -halfH - railHeight, w, 3); // Chrome highlight edge

    // Bottom Steel Rail
    g.fillStyle(0x273544, 1);
    g.fillRect(0, halfH, w, railHeight);
    g.fillStyle(0x475569, 1);
    g.fillRect(0, halfH, w, 3);
    g.fillStyle(0x0f172a, 1);
    g.fillRect(0, halfH + railHeight - 3, w, 3);

    // Safety Hazard Stripes on Top Guard Rail
    g.fillStyle(0xf1c40f, 0.7);
    for (let px = 50; px < w - 60; px += 45) {
      g.fillTriangle(px, -halfH - railHeight, px + 14, -halfH - railHeight, px + 22, -halfH);
      g.fillTriangle(px + 8, -halfH, px + 22, -halfH, px, -halfH - railHeight);
    }
  }
}
