import { useGameStore } from '../store/gameStore';

export function Controls() {
  const status = useGameStore(s => s.status);
  const moveLeft = useGameStore(s => s.moveLeft);
  const moveRight = useGameStore(s => s.moveRight);
  const moveDown = useGameStore(s => s.moveDown);
  const rotate = useGameStore(s => s.rotate);

  if (status !== 'playing') return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4 px-4 z-30">
      {/* Left button */}
      <button
        className="w-16 h-16 bg-gray-800/90 border-2 border-cyan-500/50 rounded-xl text-2xl text-cyan-400 active:bg-cyan-500 active:text-black shadow-lg"
        onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); moveLeft(); }}
        onClick={(e) => { e.stopPropagation(); moveLeft(); }}
      >
        ◀
      </button>

      {/* Down button */}
      <button
        className="w-16 h-16 bg-gray-800/90 border-2 border-cyan-500/50 rounded-xl text-2xl text-cyan-400 active:bg-cyan-500 active:text-black shadow-lg"
        onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); moveDown(); }}
        onClick={(e) => { e.stopPropagation(); moveDown(); }}
      >
        ▼
      </button>

      {/* Right button */}
      <button
        className="w-16 h-16 bg-gray-800/90 border-2 border-cyan-500/50 rounded-xl text-2xl text-cyan-400 active:bg-cyan-500 active:text-black shadow-lg"
        onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); moveRight(); }}
        onClick={(e) => { e.stopPropagation(); moveRight(); }}
      >
        ▶
      </button>

      {/* Rotate button - right side */}
      <button
        className="w-16 h-16 bg-purple-700/90 border-2 border-purple-500/50 rounded-xl text-2xl text-purple-300 active:bg-purple-500 active:text-white shadow-lg"
        onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); rotate(-1); }}
        onClick={(e) => { e.stopPropagation(); rotate(-1); }}
      >
        ↺
      </button>
    </div>
  );
}
