import { useRef, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

interface TouchState {
  startX: number;
  startY: number;
  startTime: number;
}

export function useTouch() {
  const status = useGameStore(s => s.status);
  const moveLeft = useGameStore(s => s.moveLeft);
  const moveRight = useGameStore(s => s.moveRight);
  const moveDown = useGameStore(s => s.moveDown);
  const hardDrop = useGameStore(s => s.hardDrop);
  const rotate = useGameStore(s => s.rotate);
  const startGame = useGameStore(s => s.startGame);
  const touchState = useRef<TouchState | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (status === 'idle' || status === 'gameover') {
      startGame();
      return;
    }

    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
      };
    }
  }, [status, startGame]);

  const handleTouchMove = useCallback(() => {
    // No-op since we use buttons now
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchState.current || status !== 'playing') {
      touchState.current = null;
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;
    const deltaTime = Date.now() - touchState.current.startTime;

    const minSwipeDistance = 30;
    const maxTapTime = 300;

    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < maxTapTime) {
      const screenWidth = window.innerWidth;
      if (touch.clientX < screenWidth / 2) {
        rotate(-1);
      } else {
        rotate(1);
      }
      touchState.current = null;
      return;
    }

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > absY) {
        if (deltaX > 0) {
          moveRight();
        } else {
          moveLeft();
        }
      } else {
        if (deltaY > 0) {
          moveDown();
        } else {
          hardDrop();
        }
      }
    }

    touchState.current = null;
  }, [status, moveLeft, moveRight, moveDown, hardDrop, rotate]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
