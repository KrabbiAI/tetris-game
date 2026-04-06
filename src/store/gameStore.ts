import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Board } from '../lib/board';
import type { Piece, PieceType } from '../lib/tetrominos';
import { createEmptyBoard, isValidPosition, lockPiece, clearLines, getGhostPosition } from '../lib/board';
import { getRandomPiece, createPiece } from '../lib/tetrominos';
import { calculateScore, calculateLevel } from '../lib/scoring';
import { audio } from '../lib/audio';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameover' | 'won';

interface GameState {
  board: Board;
  currentPiece: Piece | null;
  nextPieces: PieceType[];
  score: number;
  level: number;
  lines: number;
  status: GameStatus;
  ghostEnabled: boolean;
  musicEnabled: boolean;
  clearingLines: number[];
  lastClearedLines: number;
  lastMoveTime: number;
  
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  hardDrop: () => void;
  rotate: (direction: 1 | -1) => void;
  tick: () => void;
  lockPiece: () => void;
  setGhostEnabled: (enabled: boolean) => void;
  setMusicEnabled: (enabled: boolean) => void;
  reset: () => void;
}

const initialState = {
  board: createEmptyBoard(),
  currentPiece: null,
  nextPieces: [] as PieceType[],
  score: 0,
  level: 1,
  lines: 0,
  status: 'idle' as GameStatus,
  ghostEnabled: true,
  musicEnabled: true,
  clearingLines: [] as number[],
  lastClearedLines: 0,
  lastMoveTime: 0,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      startGame: () => {
        audio.initMusic();
        const nextPieces = [getRandomPiece(), getRandomPiece(), getRandomPiece()];
        const firstPiece = createPiece(nextPieces.shift()!);
        set({
          ...initialState,
          status: 'playing',
          currentPiece: firstPiece,
          nextPieces,
          ghostEnabled: get().ghostEnabled,
          musicEnabled: get().musicEnabled,
        });
      },

      pauseGame: () => {
        if (get().status === 'playing') {
          set({ status: 'paused' });
        }
      },

      resumeGame: () => {
        if (get().status === 'paused') {
          set({ status: 'playing' });
        }
      },

      moveLeft: () => {
        const { currentPiece, board, status, lastMoveTime } = get();
        if (status !== 'playing' || !currentPiece) return;
        if (Date.now() - lastMoveTime < 120) return; // 120ms cooldown
        if (isValidPosition(board, currentPiece, -1, 0)) {
          set({ currentPiece: { ...currentPiece, x: currentPiece.x - 1 }, lastMoveTime: Date.now() });
          audio.move();
        }
      },

      moveRight: () => {
        const { currentPiece, board, status, lastMoveTime } = get();
        if (status !== 'playing' || !currentPiece) return;
        if (Date.now() - lastMoveTime < 120) return; // 120ms cooldown
        if (isValidPosition(board, currentPiece, 1, 0)) {
          set({ currentPiece: { ...currentPiece, x: currentPiece.x + 1 }, lastMoveTime: Date.now() });
          audio.move();
        }
      },

      moveDown: () => {
        const { currentPiece, board, status, lastMoveTime } = get();
        if (status !== 'playing' || !currentPiece) return;
        if (Date.now() - lastMoveTime < 40) return; // 40ms cooldown for down
        if (isValidPosition(board, currentPiece, 0, 1)) {
          set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 }, lastMoveTime: Date.now() });
        }
      },

      hardDrop: () => {
        const { currentPiece, board, status } = get();
        if (status !== 'playing' || !currentPiece) return;
        const ghostY = getGhostPosition(board, currentPiece);
        audio.hardDrop();
        set({ currentPiece: { ...currentPiece, y: ghostY } });
        get().lockPiece();
      },

      rotate: (direction: 1 | -1) => {
        const { currentPiece, board, status, lastMoveTime } = get();
        if (status !== 'playing' || !currentPiece) return;
        if (Date.now() - lastMoveTime < 150) return; // 150ms cooldown for rotate
        
        const newRotation = ((currentPiece.rotation + direction) % 4 + 4) % 4 as 0 | 1 | 2 | 3;
        const rotatedPiece = { ...currentPiece, rotation: newRotation };
        
        if (isValidPosition(board, rotatedPiece)) {
          set({ currentPiece: rotatedPiece, lastMoveTime: Date.now() });
          audio.rotate();
          return;
        }
        
        audio.rotate();
      },

      tick: () => {
        const { currentPiece, board, status } = get();
        if (status !== 'playing' || !currentPiece) return;
        
        if (isValidPosition(board, currentPiece, 0, 1)) {
          set({ currentPiece: { ...currentPiece, y: currentPiece.y + 1 } });
        } else {
          get().lockPiece();
        }
      },

      lockPiece: () => {
        const { currentPiece, board, lines, nextPieces, status } = get();
        if (status !== 'playing' || !currentPiece) return;
        
        const newBoard = lockPiece(board, currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        
        const newLines = lines + linesCleared.length;
        const newLevel = calculateLevel(newLines);
        const scoreResult = calculateScore(linesCleared.length, newLevel);
        
        if (linesCleared.length === 4) {
          audio.tetris();
        } else if (linesCleared.length > 0) {
          audio.lineClear(linesCleared.length);
        }
        
        if (newLevel > get().level) {
          audio.levelUp();
        }
        
        let newCurrent = createPiece(nextPieces.shift()!);
        nextPieces.push(getRandomPiece());
        
        if (!isValidPosition(clearedBoard, newCurrent)) {
          audio.gameOver();
          set({
            board: clearedBoard,
            status: 'gameover',
            lines: newLines,
            level: newLevel,
            score: get().score + scoreResult.points,
            lastClearedLines: linesCleared.length,
          });
          return;
        }
        
        set({
          board: clearedBoard,
          currentPiece: newCurrent,
          nextPieces,
          lines: newLines,
          level: newLevel,
          score: get().score + scoreResult.points,
          clearingLines: linesCleared,
          lastClearedLines: linesCleared.length,
        });
        
        // Check for 1 line cleared = win!
        if (newLines >= 1 && get().status === 'playing') {
          setTimeout(() => {
            set({ status: 'won' });
          }, 500);
        }
        
        setTimeout(() => {
          set({ clearingLines: [] });
        }, 300);
      },

      setGhostEnabled: (enabled: boolean) => set({ ghostEnabled: enabled }),
      setMusicEnabled: (enabled: boolean) => {
        audio.musicEnabled = enabled;
        set({ musicEnabled: enabled });
      },

      reset: () => set(initialState),
    }),
    {
      name: 'tetris-settings',
      partialize: (state) => ({
        ghostEnabled: state.ghostEnabled,
        musicEnabled: state.musicEnabled,
      }),
    }
  )
);
