import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { BOARD_WIDTH, BOARD_HEIGHT, getGhostPosition } from '../lib/board';
import { TETROMINOES, PIECE_COLORS } from '../lib/tetrominos';

const CELL_SIZE = 'min(6.5vw, 5vh, 32px)'; // Responsive cell size with max

export function Board() {
  const board = useGameStore(s => s.board);
  const currentPiece = useGameStore(s => s.currentPiece);
  const status = useGameStore(s => s.status);
  const ghostEnabled = useGameStore(s => s.ghostEnabled);
  const clearingLines = useGameStore(s => s.clearingLines);

  const boardWidth = `calc(${CELL_SIZE} * ${BOARD_WIDTH})`;
  const boardHeight = `calc(${CELL_SIZE} * ${BOARD_HEIGHT})`;
  const cellSize = CELL_SIZE;

  const renderCell = (y: number, x: number, cell: typeof board[0][0]) => {
    const isClearing = clearingLines.includes(y);
    
    return (
      <motion.div
        key={`${y}-${x}`}
        style={{
          width: cellSize,
          height: cellSize,
          backgroundColor: cell.filled ? cell.color : 'transparent',
          boxShadow: cell.filled ? `inset 0 0 6px ${cell.color}, 0 0 3px ${cell.color}` : '',
          border: cell.filled ? 'none' : '1px solid #1a1a2e',
        }}
        animate={isClearing ? {
          scale: [1, 1.5, 0],
          opacity: [1, 1, 0],
          transition: { duration: 0.3 },
        } : {}}
      />
    );
  };

  const renderGhostPiece = () => {
    if (!currentPiece || !ghostEnabled || status !== 'playing') return null;
    
    const ghostY = getGhostPosition(board, currentPiece);
    const shape = TETROMINOES[currentPiece.type][currentPiece.rotation];
    const color = PIECE_COLORS[currentPiece.type];

    return (
      <div className="absolute inset-0 pointer-events-none" style={{ width: boardWidth, height: boardHeight }}>
        {shape.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`ghost-${y}-${x}`}
                className="absolute border"
                style={{
                  left: `calc(${cellSize} * ${currentPiece.x + x})`,
                  top: `calc(${cellSize} * ${ghostY + y})`,
                  width: cellSize,
                  height: cellSize,
                  borderColor: color,
                  opacity: 0.4,
                }}
              />
            ) : null
          )
        )}
      </div>
    );
  };

  const renderCurrentPiece = () => {
    if (!currentPiece || status !== 'playing') return null;
    
    const shape = TETROMINOES[currentPiece.type][currentPiece.rotation];
    const color = PIECE_COLORS[currentPiece.type];

    return (
      <div className="absolute inset-0 pointer-events-none" style={{ width: boardWidth, height: boardHeight }}>
        {shape.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`piece-${y}-${x}`}
                className="absolute"
                style={{
                  left: `calc(${cellSize} * ${currentPiece.x + x})`,
                  top: `calc(${cellSize} * ${currentPiece.y + y})`,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: color,
                  boxShadow: `inset 0 0 8px ${color}, 0 0 4px ${color}`,
                }}
              />
            ) : null
          )
        )}
      </div>
    );
  };

  return (
    <div 
      className="relative bg-gray-950 rounded-lg overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      style={{ width: boardWidth, height: boardHeight }}
    >
      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
      
      {/* Grid */}
      <div 
        className="grid relative"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${cellSize})`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${cellSize})`,
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => renderCell(y, x, cell))
        )}
        {renderGhostPiece()}
        {renderCurrentPiece()}
      </div>
    </div>
  );
}
