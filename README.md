# Krabbi's Tetris

**Fully playable React 19 Tetris with touch controls, 8-bit music, and level progression.**

## What This Does

Touch-friendly Tetris with ghost pieces, scoring, level system, and a win screen after clearing 1 line. Built with React + TypeScript + Zustand + Framer Motion.

**Live:** https://guileless-cascaron-a46017.netlify.app

## Restore from Scratch

```bash
# Requires: Node.js 18+
node --version  # must be >= 18

cd /home/dobby/tetris-game

# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
```

## Deploy to Netlify

```bash
# Netlify CLI
npm install -g netlify-cli

# Deploy (from tetris-game directory)
netlify deploy --prod
```

Or connect the GitHub repo to Netlify for automatic deploys:
```
https://github.com/KrabbiAI/tetris-game
```

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

## Project Structure

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

## Controls

| Action | Keyboard | Touch |
|--------|----------|-------|
| Move | ← → | Swipe |
| Rotate | ↑ | Swipe up |
| Soft Drop | ↓ | Swipe down |
| Hard Drop | Space | Tap |
| Pause | Escape | Tap pause |

## Game Rules

- 10×20 board, 7 tetrominoes
- Ghost piece shows landing position
- Win condition: clear 1 line
- Level increases speed every 10 lines
- Score: single=100, double=300, triple=500, tetris=800
