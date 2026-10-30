/**
 * Storage.js
 * Manages player progression, star ratings, and high scores across sessions.
 */

const STORAGE_KEYS = {
  STARS_PREFIX: 'ecosort_stars_level_',
  SCORE_PREFIX: 'ecosort_score_level_',
  LAST_SHIFT: 'ecosort_last_selected_shift'
};

export const Storage = {
  getShiftProgress(level) {
    try {
      const stars = parseInt(localStorage.getItem(STORAGE_KEYS.STARS_PREFIX + level) || '0', 10);
      const score = parseInt(localStorage.getItem(STORAGE_KEYS.SCORE_PREFIX + level) || '0', 10);
      return {
        stars: Math.max(0, Math.min(3, stars)),
        score: score,
        isCompleted: stars > 0
      };
    } catch (e) {
      return { stars: 0, score: 0, isCompleted: false };
    }
  },

  saveShiftProgress(level, stars, score) {
    try {
      const current = this.getShiftProgress(level);
      if (stars > current.stars) {
        localStorage.setItem(STORAGE_KEYS.STARS_PREFIX + level, stars.toString());
      }
      if (score > current.score) {
        localStorage.setItem(STORAGE_KEYS.SCORE_PREFIX + level, score.toString());
      }
      this.setLastSelectedShift(level);
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  getLastSelectedShift() {
    try {
      const val = parseInt(localStorage.getItem(STORAGE_KEYS.LAST_SHIFT) || '1', 10);
      return Math.max(1, Math.min(6, val));
    } catch (e) {
      return 1;
    }
  },

  setLastSelectedShift(level) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SHIFT, level.toString());
    } catch (e) {}
  }
};

