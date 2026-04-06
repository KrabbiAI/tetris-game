export interface ScoringResult {
  points: number;
  isTSpin: boolean;
  isMiniTSpin: boolean;
  lineCount: number;
}

const LINE_SCORES: Record<number, number> = {
  0: 0,
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

export function calculateScore(
  lineCount: number,
  level: number,
  isTSpin = false,
  isMiniTSpin = false
): ScoringResult {
  const result: ScoringResult = {
    points: 0,
    isTSpin,
    isMiniTSpin,
    lineCount,
  };

  if (isTSpin) {
    if (lineCount === 0) {
      result.points = 100 * level;
    } else if (lineCount === 1) {
      result.points = 800 * level;
    } else if (lineCount === 2) {
      result.points = 1200 * level;
    } else if (lineCount === 3) {
      result.points = 1600 * level;
    }
    return result;
  }

  if (isMiniTSpin) {
    if (lineCount === 0) {
      result.points = 50 * level;
    } else if (lineCount === 1) {
      result.points = 200 * level;
    } else if (lineCount === 2) {
      result.points = 400 * level;
    }
    return result;
  }

  result.points = (LINE_SCORES[lineCount] || 0) * level;
  return result;
}

export function calculateLevel(linesCleared: number): number {
  return Math.floor(linesCleared / 10) + 1;
}

export function getDropSpeed(level: number): number {
  const baseSpeed = 1000;
  const minSpeed = 50;
  const speed = baseSpeed * Math.pow(0.9, level - 1);
  return Math.max(speed, minSpeed);
}

export function getLockDelay(level: number): number {
  return Math.max(500, 2000 - (level - 1) * 100);
}
