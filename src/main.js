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
    antialias: true
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

window.addEventListener('DOMContentLoaded', () => {
  new Phaser.Game(config);
});

