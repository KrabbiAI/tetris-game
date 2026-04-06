import type { Piece, PieceType } from './tetrominos';
import { TETROMINOES, PIECE_COLORS } from './tetrominos';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export interface Cell { 
  filled: boolean; 
  color?: string; 
  pieceType?: PieceType 
}

export type Board = Cell[][];

export function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ filled: false }))
  );
}

export function getPieceShape(piece: Piece): number[][] {
  return TETROMINOES[piece.type][piece.rotation];
}

export function isValidPosition(board: Board, piece: Piece, offsetX = 0, offsetY = 0): boolean {
  const shape = getPieceShape(piece);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = piece.x + x + offsetX;
        const newY = piece.y + y + offsetY;
        if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
          return false;
        }
        if (newY >= 0 && board[newY][newX].filled) {
          return false;
        }
      }
    }
  }
  return true;
}

export function lockPiece(board: Board, piece: Piece): Board {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const shape = getPieceShape(piece);
  const color = PIECE_COLORS[piece.type];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = { filled: true, color, pieceType: piece.type };
        }
      }
    }
  }
  return newBoard;
}

export function clearLines(board: Board): { newBoard: Board; linesCleared: number[] } {
  const linesToClear: number[] = [];
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (board[y].every(cell => cell.filled)) {
      linesToClear.push(y);
    }
  }
  
  if (linesToClear.length === 0) {
    return { newBoard: board, linesCleared: [] };
  }

  // Create new board - rows above cleared lines fall down
  const newBoard: Board = [];
  let clearedCount = 0;
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (linesToClear.includes(y)) {
      clearedCount++;
    } else {
      // This row stays, but moves down by clearedCount positions
      newBoard.unshift([...board[y]]);
    }
  }
  
  // Add empty rows at top
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array.from({ length: BOARD_WIDTH }, () => ({ filled: false })));
  }

  return { newBoard, linesCleared: linesToClear };
}

export function getGhostPosition(board: Board, piece: Piece): number {
  let ghostY = piece.y;
  while (isValidPosition(board, { ...piece, y: ghostY + 1 })) {
    ghostY++;
  }
  return ghostY;
}
