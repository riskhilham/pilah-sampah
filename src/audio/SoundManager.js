/**
 * SoundManager.js
 * Studio-Grade Organic Acoustic Audio Engine.
 * Features:
 * - Natural harmonic marimba, glockenspiel, and woodblock physical modeling synthesis.
 * - Resonant BiquadFiltering (eliminates harsh electronic/sawtooth buzz).
 * - Gentle, encouraging feedback sounds designed specifically for educational games.
 * - Ambient cheerful acoustic background music generator (soft marimba chord loop).
 * - Zero external file dependencies (100% reliable, zero latency, no CORS/404 issues).
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.motorOsc = null;
    this.motorGain = null;
    this.bgmTimer = null;
    this.isBgmPlaying = false;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.motorGain) {
        this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.stopAmbientBGM();
    } else {
      if (this.motorGain) {
        this.motorGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      }
      this.startAmbientBGM();
    }
    return this.isMuted;
  }

  /**
   * Helper: Plays a warm marimba/acoustic pluck note with natural physical harmonic decay.
   */
  playAcousticPluck(freq, duration = 0.25, gainLevel = 0.22, filterFreq = 2600) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Fundamental oscillator (warm sine)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // 2nd Harmonic (wood bar resonance)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.02, now);

      // Lowpass resonant filter (removes sharp edges, mimics wood bar)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, now);
      filter.frequency.exponentialRampToValueAtTime(filterFreq * 0.4, now + duration);
      filter.Q.setValueAtTime(2.5, now);

      // Fast-attack, natural exponential decay envelope
      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(gainLevel, now + 0.003);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + duration);

      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(gainLevel * 0.4, now + 0.002);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.5);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(filter);
      gain2.connect(filter);
      filter.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration + 0.02);
      osc2.stop(now + duration * 0.5 + 0.02);
    } catch (e) {}
  }

  // --- 1. TACTILE UI SOUNDS ---

  /**
   * Warm wooden block / polished waterdrop pop for buttons and cards.
   */
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      // Pitch drop creates tactile "pop"
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.038);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.042);

      // Wooden body thump sub-resonance
      const sub = this.ctx.createOscillator();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(160, now);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      sub.connect(subGain);
      gain.connect(filter);
      subGain.connect(filter);
      filter.connect(this.ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.05);
      sub.stop(now + 0.05);
    } catch (e) {}
  }

  playGateOpen() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.playAcousticPluck(480, 0.08, 0.16, 1800);
    } catch (e) {}
  }

  // --- 2. GAMEPLAY SORTING SOUNDS (ORGANIC TIMBRES) ---

  /**
   * Cheerful, distinct acoustic chimes per category.
   */
  playSortSuccess(category) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      if (category === 'ORGANIC') {
        // Leafy acoustic marimba triad (C5, G5, C6)
        this.playAcousticPluck(523.25, 0.22, 0.24, 2800);
        setTimeout(() => this.playAcousticPluck(783.99, 0.20, 0.22, 3000), 40);
        setTimeout(() => this.playAcousticPluck(1046.5, 0.24, 0.26, 3200), 80);
      } else if (category === 'RECYCLE') {
        // Bright crystal bell chime (E5, B5, E6)
        this.playAcousticPluck(659.25, 0.25, 0.22, 3600);
        setTimeout(() => this.playAcousticPluck(987.77, 0.22, 0.22, 3800), 40);
        setTimeout(() => this.playAcousticPluck(1318.5, 0.28, 0.25, 4200), 80);
      } else if (category === 'HAZARD') {
        // Crisp, modern tech-safety marimba tone (A5, E6)
        this.playAcousticPluck(880.0, 0.18, 0.24, 2400);
        setTimeout(() => this.playAcousticPluck(1318.5, 0.22, 0.24, 2600), 50);
      } else {
        // Residu: Solid, satisfying acoustic tap (D5, A5)
        this.playAcousticPluck(587.33, 0.18, 0.22, 2000);
        setTimeout(() => this.playAcousticPluck(880.0, 0.16, 0.20, 2200), 50);
      }
    } catch (e) {}
  }

  /**
   * Muted double wooden tap ("tuk-tuk") — gentle and encouraging, not an annoying buzzer.
   */
  playSortError() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      const playKnock = (freq, timeOffset) => {
        const t = now + timeOffset;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.05);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.24, t + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(gain);
        gain.connect(filter);
        filter.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.07);
      };

      playKnock(260, 0.0);
      playKnock(200, 0.07);
    } catch (e) {}
  }

  /**
   * Gentle, modern safety chime (replaces harsh square wave buzzer).
   */
  playHazardAlarm() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.playAcousticPluck(740, 0.14, 0.22, 1800);
      setTimeout(() => this.playAcousticPluck(880, 0.16, 0.24, 2000), 90);
    } catch (e) {}
  }

  // --- 3. REWARD & LEVEL COMPLETION SOUNDS ---

  /**
   * Uplifting celebratory glockenspiel fanfare with natural acoustic shimmer.
   */
  playLevelComplete() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [
        { f: 523.25, delay: 0 },    // C5
        { f: 659.25, delay: 80 },   // E5
        { f: 783.99, delay: 160 },  // G5
        { f: 987.77, delay: 240 },  // B5
        { f: 1046.5, delay: 330 },  // C6
        { f: 1318.5, delay: 420 }   // E6
      ];

      notes.forEach(n => {
        setTimeout(() => {
          this.playAcousticPluck(n.f, 0.45, 0.28, 4000);
        }, n.delay);
      });
    } catch (e) {}
  }

  playStarEarned() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.playAcousticPluck(1046.5, 0.35, 0.26, 4500);
      setTimeout(() => this.playAcousticPluck(1567.98, 0.45, 0.28, 5000), 70);
    } catch (e) {}
  }

  playLevelFailed() {
    if (this.isMuted || !this.ctx) return;
    try {
      // Gentle, consoling descending acoustic notes
      const notes = [659.25, 587.33, 523.25, 440.0];
      notes.forEach((f, idx) => {
        setTimeout(() => {
          this.playAcousticPluck(f, 0.28, 0.18, 1600);
        }, idx * 110);
      });
    } catch (e) {}
  }

  // --- 4. MOTOR / CONVEYOR WHISPER ---

  startConveyorHum() {
    if (this.motorOsc || !this.ctx) return;
    try {
      this.motorOsc = this.ctx.createOscillator();
      this.motorGain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(110, this.ctx.currentTime);

      this.motorOsc.type = 'sine';
      this.motorOsc.frequency.setValueAtTime(58, this.ctx.currentTime);

      this.motorGain.gain.setValueAtTime(this.isMuted ? 0 : 0.02, this.ctx.currentTime);

      this.motorOsc.connect(filter);
      filter.connect(this.motorGain);
      this.motorGain.connect(this.ctx.destination);

      this.motorOsc.start();
    } catch (e) {}
  }

  stopConveyorHum() {
    if (this.motorOsc) {
      try {
        this.motorOsc.stop();
        this.motorOsc.disconnect();
      } catch (e) {}
      this.motorOsc = null;
    }
  }

  // --- 5. GENTLE AMBIENT BGM (ACOUSTIC LOFI MARIMBA) ---

  startAmbientBGM() {
    if (this.isBgmPlaying || this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    this.bgmStep = 0;

    // Cheerful, relaxing 4-bar progression: Cmaj7 - Am7 - Dm7 - G7
    // Plucked gently like a relaxing educational soundtrack
    const chordPattern = [
      // Bar 1: Cmaj7 (C4, E4, G4, B4)
      [261.63, 329.63, 392.00, 493.88],
      // Bar 2: Am7 (A3, C4, E4, G4)
      [220.00, 261.63, 329.63, 392.00],
      // Bar 3: Dm7 (D4, F4, A4, C5)
      [293.66, 349.23, 440.00, 523.25],
      // Bar 4: G7 (G3, B3, D4, F4)
      [196.00, 246.94, 293.66, 349.23]
    ];

    const stepInterval = 420; // ~142 BPM eighth notes (chill relaxing pace)

    const tick = () => {
      if (!this.isBgmPlaying || this.isMuted) return;

      const barIdx = Math.floor((this.bgmStep % 16) / 4);
      const noteIdx = this.bgmStep % 4;
      const currentChord = chordPattern[barIdx];

      // Subtle, warm background arpeggio
      if (currentChord && currentChord[noteIdx]) {
        this.playAcousticPluck(currentChord[noteIdx], 0.32, 0.035, 1800);
      }

      this.bgmStep++;
      this.bgmTimer = setTimeout(tick, stepInterval);
    };

    tick();
  }

  stopAmbientBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const sounds = new SoundManager();
