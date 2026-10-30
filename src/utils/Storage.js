/**
 * Storage.js
 * Manages player progression, star ratings, and high scores across sessions.
 * Implements a resilient Multi-Tier Storage Architecture:
 * 1. Runtime In-Memory Store (Guaranteeing 100% session progression even inside cross-origin iframes)
 * 2. SessionStorage Fallback
 * 3. LocalStorage Primary Persistent Store
 */

const STORAGE_KEYS = {
  STARS_PREFIX: 'ecosort_stars_level_',
  SCORE_PREFIX: 'ecosort_score_level_',
  LAST_SHIFT: 'ecosort_last_selected_shift'
};

// Resilient In-Memory Session Cache
const memoryStore = {
  progress: {},
  lastShift: 1
};

function safeGetItem(storageType, key) {
  try {
    if (typeof window !== 'undefined' && window[storageType]) {
      return window[storageType].getItem(key);
    }
  } catch (e) {
    // Cross-origin iframe or browser security restriction
  }
  return null;
}

function safeSetItem(storageType, key, val) {
  try {
    if (typeof window !== 'undefined' && window[storageType]) {
      window[storageType].setItem(key, val);
      return true;
    }
  } catch (e) {
    // Cross-origin iframe or browser security restriction
  }
  return false;
}

export const Storage = {
  getShiftProgress(level) {
    const lvlKey = parseInt(level, 10) || 1;
    
    // Check in-memory store first
    const mem = memoryStore.progress[lvlKey] || { stars: 0, score: 0 };

    // Try reading from sessionStorage
    const sessionStars = parseInt(safeGetItem('sessionStorage', STORAGE_KEYS.STARS_PREFIX + lvlKey) || '0', 10);
    const sessionScore = parseInt(safeGetItem('sessionStorage', STORAGE_KEYS.SCORE_PREFIX + lvlKey) || '0', 10);

    // Try reading from localStorage
    const localStars = parseInt(safeGetItem('localStorage', STORAGE_KEYS.STARS_PREFIX + lvlKey) || '0', 10);
    const localScore = parseInt(safeGetItem('localStorage', STORAGE_KEYS.SCORE_PREFIX + lvlKey) || '0', 10);

    // Merge highest values across all available tiers
    const finalStars = Math.max(0, Math.min(3, Math.max(mem.stars || 0, sessionStars || 0, localStars || 0)));
    const finalScore = Math.max(0, Math.max(mem.score || 0, sessionScore || 0, localScore || 0));

    const result = {
      stars: finalStars,
      score: finalScore,
      highScore: finalScore,
      isCompleted: finalStars > 0 || finalScore > 0
    };

    // Cache merged result back into memory
    memoryStore.progress[lvlKey] = result;

    return result;
  },

  saveShiftProgress(level, stars, score) {
    const lvlKey = parseInt(level, 10) || 1;
    const current = this.getShiftProgress(lvlKey);

    const inputStars = parseInt(stars, 10) || 0;
    const inputScore = parseInt(score, 10) || 0;

    const newStars = Math.max(0, Math.min(3, Math.max(inputStars, current.stars)));
    const newScore = Math.max(0, Math.max(inputScore, current.score));

    const updatedData = {
      stars: newStars,
      score: newScore,
      highScore: newScore,
      isCompleted: newStars > 0 || newScore > 0
    };

    // 1. In-Memory Store (Guaranteed success)
    memoryStore.progress[lvlKey] = updatedData;

    // 2. SessionStorage
    safeSetItem('sessionStorage', STORAGE_KEYS.STARS_PREFIX + lvlKey, newStars.toString());
    safeSetItem('sessionStorage', STORAGE_KEYS.SCORE_PREFIX + lvlKey, newScore.toString());

    // 3. LocalStorage
    safeSetItem('localStorage', STORAGE_KEYS.STARS_PREFIX + lvlKey, newStars.toString());
    safeSetItem('localStorage', STORAGE_KEYS.SCORE_PREFIX + lvlKey, newScore.toString());

    this.setLastSelectedShift(lvlKey);
    return updatedData;
  },

  getLastSelectedShift() {
    let val = memoryStore.lastShift || 1;

    const sessionVal = parseInt(safeGetItem('sessionStorage', STORAGE_KEYS.LAST_SHIFT) || '0', 10);
    if (sessionVal > 0) val = sessionVal;

    const localVal = parseInt(safeGetItem('localStorage', STORAGE_KEYS.LAST_SHIFT) || '0', 10);
    if (localVal > 0) val = localVal;

    return Math.max(1, Math.min(6, val));
  },

  setLastSelectedShift(level) {
    const lvlKey = Math.max(1, Math.min(6, parseInt(level, 10) || 1));
    memoryStore.lastShift = lvlKey;
    safeSetItem('sessionStorage', STORAGE_KEYS.LAST_SHIFT, lvlKey.toString());
    safeSetItem('localStorage', STORAGE_KEYS.LAST_SHIFT, lvlKey.toString());
  }
};
