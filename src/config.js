/**
 * Global Configuration & Color Tokens for EcoSort
 */
export const GAME_CONFIG = {
  WIDTH: 1280,
  HEIGHT: 720,
  PARENT: 'game-container',
  
  // Color Tokens according to ART_DIRECTION.md
  COLORS: {
    ORGANIC: {
      PRIMARY: 0x27ae60,
      ACCENT: 0x2ecc71,
      HEX: '#27ae60',
      LIGHT_HEX: '#2ecc71',
      LABEL: 'ORGANIK',
      ICON: '🌿',
      KEY: 'Q'
    },
    RECYCLE: {
      PRIMARY: 0xe67e22,
      ACCENT: 0xf1c40f,
      HEX: '#e67e22',
      LIGHT_HEX: '#f1c40f',
      LABEL: 'DAUR ULANG',
      ICON: '♻️',
      KEY: 'W'
    },
    HAZARD: {
      PRIMARY: 0xc0392b,
      ACCENT: 0xe74c3c,
      HEX: '#c0392b',
      LIGHT_HEX: '#e74c3c',
      LABEL: 'B3 (BAHAYA)',
      ICON: '⚠️',
      KEY: 'E'
    },
    RESIDUAL: {
      PRIMARY: 0x34495e,
      ACCENT: 0x7f8c8d,
      HEX: '#34495e',
      LIGHT_HEX: '#7f8c8d',
      LABEL: 'RESIDU',
      ICON: '🗑️',
      KEY: 'R'
    },
    FACILITY: {
      STEEL: 0x2c3e50,
      DARK_RUBBER: 0x1e272c,
      CLEAN_WHITE: 0xeceff1,
      WARNING_YELLOW: 0xf39c12
    }
  },

  // Audio parameters
  AUDIO: {
    MASTER_VOLUME: 0.8,
    SFX_VOLUME: 0.9,
    MUSIC_VOLUME: 0.5
  }
};

