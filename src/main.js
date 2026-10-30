/**
 * main.js
 * Entry point for EcoSort: Fasilitas Sirkular.
 * Configures the Phaser 3 game instance, viewport scaling, and scene stack.
 */
import Phaser from 'phaser';
import { GAME_CONFIG } from './config.js';
import { BootScene } from './scenes/BootScene.js';
import { SplashScene } from './scenes/SplashScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { HUDScene } from './scenes/HUDScene.js';
import { SummaryScene } from './scenes/SummaryScene.js';
import { CatalogScene } from './scenes/CatalogScene.js';
import { ShiftSelectScene } from './scenes/ShiftSelectScene.js';

// Ensure crystal-clear text on High-DPI, Retina, and Fullscreen displays
try {
  const dpr = typeof window !== 'undefined' ? Math.max(2, Math.min(window.devicePixelRatio || 2, 3)) : 2;
  const originalSetStyle = Phaser.GameObjects.TextStyle.prototype.setStyle;
  Phaser.GameObjects.TextStyle.prototype.setStyle = function(style, updateText, setDefaults) {
    if (style) {
      if (style.resolution === undefined) style.resolution = dpr;
      if (!style.padding) style.padding = { x: 4, y: 3 };
    }
    return originalSetStyle.call(this, style, updateText, setDefaults);
  };
} catch (e) {
  console.warn('Text resolution enhancement fallback:', e);
}

const config = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.WIDTH,
  height: GAME_CONFIG.HEIGHT,
  parent: GAME_CONFIG.PARENT,
  backgroundColor: '#0d1317',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  render: {
    pixelArt: false,
    antialias: true,
    antialiasGL: true,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    roundPixels: false,
    powerPreference: 'high-performance'
  },
  scene: [
    BootScene,
    SplashScene,
    MenuScene,
    ShiftSelectScene,
    GameScene,
    HUDScene,
    SummaryScene,
    CatalogScene
  ]
};

const initGame = () => {
  new Phaser.Game(config);
};

const startApp = async () => {
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn('Font loading ready check bypassed:', e);
    }
  }
  initGame();
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

