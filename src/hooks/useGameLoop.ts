import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { getDropSpeed } from '../lib/scoring';

export function useGameLoop() {
  const status = useGameStore(s => s.status);
  const level = useGameStore(s => s.level);
  const tick = useGameStore(s => s.tick);
  const lastTickRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  const gameLoop = useCallback((timestamp: number) => {
    if (status !== 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const dropSpeed = getDropSpeed(level);

    if (timestamp - lastTickRef.current >= dropSpeed) {
      tick();
      lastTickRef.current = timestamp;
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [status, level, tick]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);
}
