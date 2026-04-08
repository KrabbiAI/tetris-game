# Krabbi's Tetris

**Fully playable React 19 Tetris with touch controls, 8-bit music, and level progression.**

**Live:** https://guileless-cascaron-a46017.netlify.app
**GitHub:** https://github.com/KrabbiAI/tetris-game

## Was Es Macht

Touch-friendly Tetris mit ghost pieces, scoring, level system, und win screen nach 1 line clear. Built mit React + TypeScript + Zustand + Framer Motion.

## Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI |
| typescript | ~5.9 | Type safety |
| zustand | ^5.0.12 | Game state |
| framer-motion | ^12.38 | Animations |
| tailwindcss | ^4.2.2 | Styling |
| vite | ^8.0.1 | Build tool |
| howler | ^2.2.4 | 8-bit audio |

## Restore from Scratch

### 1. System Requirements

```bash
node --version  # must be >= 18
npm --version
```

### 2. Dependencies

```bash
cd /home/dobby/tetris-game
npm install
```

### 3. Environment Variables

Keine Environment Variables benötigt.

## Local Development

```bash
cd /home/dobby/tetris-game
npm run dev      # Dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Deploy to Netlify

```bash
# Netlify CLI
npm install -g netlify-cli

# Deploy
cd /home/dobby/tetris-game
netlify deploy --prod
```

**Oder:** GitHub repo mit Netlify verbinden für automatic deploys:
```
https://github.com/KrabbiAI/tetris-game
```

## Game Rules

- **Board:** 10×20 grid
- **Pieces:** 7 tetrominoes (I, O, T, S, Z, J, L)
- **Ghost piece:** Shows landing position
- **Win condition:** Clear 1 line
- **Speed:** Level increases every 10 lines

## Scoring

| Clear | Points |
|-------|--------|
| Single | 100 |
| Double | 300 |
| Triple | 500 |
| Tetris | 800 |

## Controls

| Action | Keyboard | Touch |
|--------|----------|-------|
| Move left | ← | Swipe left |
| Move right | → | Swipe right |
| Rotate | ↑ | Swipe up |
| Soft drop | ↓ | Swipe down |
| Hard drop | Space | Tap |
| Pause | Escape | Tap pause |

## Projekt Struktur

```
tetris-game/
├── src/
│   ├── App.tsx            # Game screens (start/play/win)
│   ├── components/
│   │   ├── Board.tsx      # 10x20 grid rendering
│   │   ├── Controls.tsx   # Touch/keyboard controls
│   │   ├── ScorePanel.tsx # Score + level display
│   │   └── NextQueue.tsx  # Next pieces preview
│   ├── hooks/
│   │   ├── useGameLoop.ts # RAF game loop
│   │   ├── useKeyboard.ts # Keyboard input
│   │   └── useTouch.ts    # Touch/swipe input
│   ├── store/
│   │   └── gameStore.ts   # Zustand state
│   └── lib/
│       ├── tetrominos.ts   # Piece definitions
│       ├── board.ts        # Grid logic
│       ├── scoring.ts      # Points + levels
│       └── audio.ts        # Howler audio
└── public/
    └── tetris-theme.mp3    # 8-bit background music
```

## State Management (Zustand)

```typescript
interface GameState {
  board: (string | null)[][];
  currentPiece: Piece;
  nextPieces: Piece[];
  score: number;
  level: number;
  lines: number;
  gameStatus: 'idle' | 'playing' | 'paused' | 'won';
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  drop: () => void;
  // ...
}
```

## Audio

- Background music via `howler.js` (tetris-theme.mp3)
- Sound effects für piece lock, line clear, etc.
- Audio wird geladen beim ersten user interaction (Browser policy)

## Troubleshooting

**Touch controls funktionieren nicht:**
- `onTouchStart`/`onTouchEnd` statt `onClick` für mobile
- `preventDefault()` bei touch events für scroll prevention

**Game läuft nicht smooth:**
- `requestAnimationFrame` für game loop
- React 19 mit concurrent features kann rendering optimieren

**Audio startet nicht:**
- Browser policy: Audio braucht user interaction
- AudioContext resume() nach interaction

## Verify Installation

```bash
npm run build  # Muss ohne errors
npm run lint   # Keine TypeScript errors
```

## API Endpoints

Keine Backend API — reines frontend.

## Deployment

Netlify automatic deploys via GitHub integration.
