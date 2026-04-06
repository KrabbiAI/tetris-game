import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export function useKeyboard() {
  const {
    status,
    moveLeft,
    moveRight,
    moveDown,
    hardDrop,
    rotate,
    pauseGame,
    resumeGame,
    startGame,
  } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Start game on any key if idle
      if (status === 'idle' || status === 'gameover') {
        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '].includes(e.key)) {
          startGame();
        }
        return;
      }

      // Pause controls
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        if (status === 'playing') {
          pauseGame();
        } else if (status === 'paused') {
          resumeGame();
        }
        return;
      }

      if (status !== 'playing') return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'z':
        case 'Z':
          rotate(-1);
          break;
        case 'x':
        case 'X':
          rotate(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, moveLeft, moveRight, moveDown, hardDrop, rotate, pauseGame, resumeGame, startGame]);
}
