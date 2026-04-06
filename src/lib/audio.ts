// Audio system using Web Audio API for procedural sound effects + HTML5 Audio for music

class AudioSystem {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private musicAudio: HTMLAudioElement | null = null;
  private _musicEnabled = true;
  private _sfxEnabled = true;
  private musicLoop: boolean = true;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.connect(this.ctx.destination);
      this.sfxGain.gain.value = 0.5;
      
      this.musicGain = this.ctx.createGain();
      this.musicGain.connect(this.ctx.destination);
      this.musicGain.gain.value = 0.3;
    }
    return this.ctx;
  }

  set musicEnabled(enabled: boolean) {
    this._musicEnabled = enabled;
    if (this.musicAudio) {
      if (enabled) {
        this.musicAudio.play().catch(() => {});
      } else {
        this.musicAudio.pause();
      }
    }
  }

  get musicEnabled(): boolean {
    return this._musicEnabled;
  }

  set sfxEnabled(enabled: boolean) {
    this._sfxEnabled = enabled;
  }

  get sfxEnabled(): boolean {
    return this._sfxEnabled;
  }

  initMusic() {
    if (this.musicAudio) return;
    
    this.musicAudio = new Audio('/tetris-theme.mp3');
    this.musicAudio.loop = this.musicLoop;
    this.musicAudio.volume = 0.3;
    
    if (this._musicEnabled) {
      this.musicAudio.play().catch(() => {});
    }
  }

  stopMusic() {
    if (this.musicAudio) {
      this.musicAudio.pause();
      this.musicAudio.currentTime = 0;
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square', gain = 0.3) {
    if (!this._sfxEnabled) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.value = frequency;
      
      gainNode.gain.setValueAtTime(gain, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(this.sfxGain!);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not available
    }
  }

  move() {
    this.playTone(200, 0.05, 'square', 0.1);
  }

  rotate() {
    this.playTone(400, 0.08, 'sine', 0.2);
  }

  drop() {
    this.playTone(150, 0.1, 'triangle', 0.3);
  }

  hardDrop() {
    this.playTone(100, 0.15, 'sawtooth', 0.4);
  }

  lineClear(lines: number) {
    const baseFreq = 300;
    const increment = lines * 100;
    for (let i = 0; i < lines + 1; i++) {
      setTimeout(() => {
        this.playTone(baseFreq + i * increment, 0.15, 'square', 0.3);
      }, i * 80);
    }
  }

  tetris() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'square', 0.4);
      }, i * 100);
    });
  }

  levelUp() {
    const notes = [523, 659, 784, 880, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.15, 'sine', 0.3);
      }, i * 100);
    });
  }

  gameOver() {
    const notes = [400, 350, 300, 250, 200];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.3, 'sawtooth', 0.3);
      }, i * 150);
    });
    setTimeout(() => this.stopMusic(), 2000);
  }

  lock() {
    this.playTone(300, 0.05, 'square', 0.2);
  }
}

export const audio = new AudioSystem();
