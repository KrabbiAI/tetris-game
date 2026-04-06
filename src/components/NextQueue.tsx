import type { PieceType } from '../lib/tetrominos';
import { TETROMINOES, PIECE_COLORS } from '../lib/tetrominos';
import { useGameStore } from '../store/gameStore';

export function NextQueue() {
  const nextPieces = useGameStore(s => s.nextPieces);

  const renderMiniPiece = (type: PieceType, size: number = 4) => {
    const shape = TETROMINOES[type][0];
    const color = PIECE_COLORS[type];
    const cellSize = size / Math.max(shape.length, shape[0].length);

    return (
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {shape.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`${y}-${x}`}
                className="absolute"
                style={{
                  left: `calc(50% - ${(shape[0].length * cellSize) / 2}px + ${x * cellSize}px)`,
                  top: `calc(50% - ${(shape.length * cellSize) / 2}px + ${y * cellSize}px)`,
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: color,
                  boxShadow: `inset 0 0 4px ${color}`,
                }}
              />
            ) : null
          )
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg p-3 border border-cyan-500/30">
      <div className="text-xs text-cyan-400 mb-2 font-bold">NEXT</div>
      <div className="flex flex-col gap-2">
        {nextPieces.slice(0, 3).map((piece, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{ height: 50, width: 50 }}
          >
            {renderMiniPiece(piece, 40)}
          </div>
        ))}
      </div>
    </div>
  );
}
