# Krabbi's Tetris

**A fully playable Tetris game built with React 19 + TypeScript.**

## What This Does

Touch-friendly Tetris with 8-bit music, ghost pieces, scoring, level progression, and a win screen after clearing 1 line. Deployed on Netlify.

**Play:** https://guileless-cascaron-a46017.netlify.app

## Quick Start

```bash
cd /home/dobby/tetris-game
npm install
npm run dev
```

## Tech Stack

- **React 19** + TypeScript + Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for game state management

## Project Structure

```
tetris-game/
├── src/
│   ├── App.tsx         # Main game + screens
│   ├── components/      # Tetromino, Board, Score, etc.
│   ├── store/           # Zustand game state
│   └── utils/          # tetromino definitions, collision
├── public/             # Static assets
└── index.html
```

## Game Features

- Touch + keyboard controls
- Ghost piece (shows where block will land)
- 8-bit background music
- Level system with increasing speed
- Win screen with confetti after clearing 1 line
- Mobile-responsive
