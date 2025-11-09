# Game2EZ

NBA player data visualization and management application with unique features built with Next.js 15.

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **State:** Redux Toolkit
- **Database:** Prisma with PostgreSQL
- **UI Components:** shadcn/ui
- **Data Source:** @balldontlie/sdk (NBA API)

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   DATABASE_URL="postgresql://..."
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## Features

- NBA teams, players, and game statistics
- Dark/light theme with persistence
- Server-side rendering with React Server Components
- Responsive design with mobile-first approach
- Optimized data fetching with caching

## Project Structure

```
app/
├── (pages)/           # Route groups (favorites, teams, profile)
├── api/               # API route handlers
├── layout.tsx         # Root layout with providers
└── page.tsx           # Home page
components/            # Reusable UI components
lib/
├── store/             # Redux Toolkit store and slices
└── hooks/             # Custom typed hooks
prisma/
└── schema.prisma      # Database schema
```

## Database Models

- `teams` - NBA team information
- `players` - Player profiles and team associations
- `games` - Game data with scores and team details
- `stats` - Player statistics per game

## Documentation

See [CLAUDE.md](./CLAUDE.md) for comprehensive development guidelines and architecture details.
