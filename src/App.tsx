import { Board } from './components/Board';
import { NextQueue } from './components/NextQueue';
import { Controls } from './components/Controls';
import { Overlay } from './components/Overlay';
import { useGameStore } from './store/gameStore';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyboard } from './hooks/useKeyboard';

function App() {
  const level = useGameStore(s => s.level);
  const lines = useGameStore(s => s.lines);
  const score = useGameStore(s => s.score);
  const musicEnabled = useGameStore(s => s.musicEnabled);
  const setMusicEnabled = useGameStore(s => s.setMusicEnabled);
  
  useGameLoop();
  useKeyboard();

  return (
    <div className="w-screen h-screen h-[100dvh] bg-[#0a0a0f] flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="absolute top-2 left-0 right-0 z-20 flex justify-center items-center gap-2 px-4">
        {/* Music toggle */}
        <button
          onClick={() => setMusicEnabled(!musicEnabled)}
          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
            musicEnabled 
              ? 'bg-purple-600/80 border-purple-500/50 text-white' 
              : 'bg-gray-800/80 border-gray-600/50 text-gray-400'
          }`}
        >
          {musicEnabled ? '♪ ON' : '♪ OFF'}
        </button>
        
        {/* Score */}
        <div className="bg-gray-900/90 rounded-lg px-4 py-1 border border-cyan-500/30">
          <span className="text-cyan-400 font-bold text-xs sm:text-sm">SCORE </span>
          <span className="text-white font-bold text-lg sm:text-xl tabular-nums">{score.toString().padStart(6, '0')}</span>
        </div>
      </div>

      {/* Main game area - takes most of screen */}
      <div className="flex-1 flex items-center justify-center gap-2 p-2 w-full max-w-full">
        {/* Game board - larger */}
        <div className="flex-1 flex items-center justify-center">
          <Board />
        </div>

        {/* Next pieces - right side */}
        <div className="flex flex-col gap-2">
          <NextQueue />
          
          {/* Stats */}
          <div className="bg-gray-900/90 rounded-lg px-3 py-2 border border-cyan-500/30 text-center">
            <div className="text-xs text-cyan-400 font-bold">LEVEL</div>
            <div className="text-lg font-bold text-white">{level}</div>
          </div>
          <div className="bg-gray-900/90 rounded-lg px-3 py-2 border border-cyan-500/30 text-center">
            <div className="text-xs text-cyan-400 font-bold">LINES</div>
            <div className="text-lg font-bold text-white">{lines}</div>
          </div>
        </div>
      </div>

      {/* Mobile controls */}
      <Controls />

      {/* Overlay screens */}
      <Overlay />
    </div>
  );
}

export default App;
