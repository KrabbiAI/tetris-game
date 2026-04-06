import { useGameStore } from '../store/gameStore';

export function ScorePanel() {
  const score = useGameStore(s => s.score);
  const level = useGameStore(s => s.level);
  const lines = useGameStore(s => s.lines);

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-gray-900 rounded-lg p-3 border border-cyan-500/30">
        <div className="text-xs text-cyan-400 mb-1 font-bold">SCORE</div>
        <div className="text-2xl font-bold text-white tabular-nums">
          {score.toString().padStart(6, '0')}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3 border border-cyan-500/30">
        <div className="text-xs text-cyan-400 mb-1 font-bold">LEVEL</div>
        <div className="text-2xl font-bold text-white">
          {level}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3 border border-cyan-500/30">
        <div className="text-xs text-cyan-400 mb-1 font-bold">LINES</div>
        <div className="text-2xl font-bold text-white">
          {lines}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-3 border border-purple-500/30">
        <div className="text-xs text-purple-400 mb-1 font-bold">HIGH SCORE</div>
        <div className="text-lg font-bold text-white tabular-nums">
          {localStorage.getItem('tetris-highscore') || '000000'}
        </div>
      </div>
    </div>
  );
}
