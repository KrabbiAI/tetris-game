import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export function Overlay() {
  const status = useGameStore(s => s.status);
  const score = useGameStore(s => s.score);
  const level = useGameStore(s => s.level);
  const lines = useGameStore(s => s.lines);
  const ghostEnabled = useGameStore(s => s.ghostEnabled);
  const musicEnabled = useGameStore(s => s.musicEnabled);
  const startGame = useGameStore(s => s.startGame);
  const resumeGame = useGameStore(s => s.resumeGame);
  const setGhostEnabled = useGameStore(s => s.setGhostEnabled);
  const setMusicEnabled = useGameStore(s => s.setMusicEnabled);
  const reset = useGameStore(s => s.reset);

  const isHighScore = score > parseInt(localStorage.getItem('tetris-highscore') || '0');
  if (isHighScore && status === 'gameover') {
    localStorage.setItem('tetris-highscore', score.toString());
  }

  return (
    <AnimatePresence>
      {status === 'idle' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2"
          >
            TETRIS
          </motion.h1>
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-2"
          >
            Krabbi Edition 🦀
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-xs mb-2 max-w-xs px-4 text-center"
          >
            Developed by Krabbi AI for Sascha — built with React, TypeScript & caffeine
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 text-xs mb-6 max-w-xs px-4 text-center"
          >
            📱 Mobile-optimiert — am besten auf dem Handy spielen!
          </motion.p>

          <div className="flex flex-col gap-3 mb-8 w-64">
            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg text-white shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:scale-105 transition-transform"
            >
              START GAME
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setGhostEnabled(!ghostEnabled)}
                className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                  ghostEnabled 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Ghost {ghostEnabled ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className={`flex-1 py-2 rounded-lg font-medium text-sm transition-colors ${
                  musicEnabled 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Music {musicEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="text-gray-500 text-sm text-center">
            <p className="mb-2">Mobile: Tap buttons to move • Rotate buttons to spin</p>
            <p>Desktop: ← → ↓ move • ↑/Space hard drop • Z/X rotate • P pause</p>
          </div>

          {localStorage.getItem('tetris-highscore') && (
            <p className="text-gray-600 mt-4 text-sm">
              High Score: {localStorage.getItem('tetris-highscore')}
            </p>
          )}
        </motion.div>
      )}

      {status === 'paused' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50"
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-8">PAUSED</h2>
          
          <div className="flex flex-col gap-3 w-64">
            <button
              onClick={resumeGame}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg text-white"
            >
              RESUME
            </button>
            <button
              onClick={() => {
                reset();
                startGame();
              }}
              className="w-full py-4 bg-gray-700 rounded-xl font-bold text-lg text-white"
            >
              RESTART
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setGhostEnabled(!ghostEnabled)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                ghostEnabled 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              Ghost {ghostEnabled ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setMusicEnabled(!musicEnabled)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                musicEnabled 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              Music {musicEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </motion.div>
      )}

      {status === 'gameover' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
        >
          <motion.h2
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold text-red-500 mb-4"
          >
            GAME OVER
          </motion.h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-700"
          >
            {isHighScore && (
              <p className="text-yellow-400 font-bold text-center mb-3 text-lg">
                ★ NEW HIGH SCORE ★
              </p>
            )}
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-gray-400 text-sm">Score</p>
                <p className="text-2xl font-bold text-white">{score}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Level</p>
                <p className="text-2xl font-bold text-white">{level}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Lines</p>
                <p className="text-2xl font-bold text-white">{lines}</p>
              </div>
            </div>
          </motion.div>

          <button
            onClick={() => {
              reset();
              startGame();
            }}
            className="w-64 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-lg text-white"
          >
            PLAY AGAIN
          </button>
        </motion.div>
      )}

      {status === 'won' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 overflow-hidden"
        >
          {/* Confetti */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: -20,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
                rotate: Math.random() * 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut',
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f', '#ff8800'][Math.floor(Math.random() * 7)],
              }}
            />
          ))}

          {/* Victory text */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="z-10 text-center px-4"
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🎉 SIEG! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl text-cyan-400 font-bold mb-2"
            >
              1 LINIE GESCHAFFT!
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 text-sm mb-4"
            >
              Das ist nur eine Demo — gebaut mit ein paar Chat-Nachrichten 🤖
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-gray-400 mb-6"
            >
              Krabbi AI kann das — und noch viel mehr 🦀
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              onClick={() => {
                reset();
                startGame();
              }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-xl text-white shadow-lg hover:scale-105 transition-transform"
            >
              NOCHMAL SPIELEN
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
