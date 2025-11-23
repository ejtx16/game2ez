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

2. Set up environment variables (optional):

   ```bash
   DATABASE_URL="postgresql://..."
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

<!-- ## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking -->

## Features

- NBA teams, players, and game statistics
- Favorites feature to highlight your favs
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

<!-- ## Database Models (not official)

- `teams` - NBA team information
- `players` - Player profiles and team associations
- `games` - Game data with scores and team details
- `stats` - Player statistics per game -->

## Coming Soon...

**"My Bag"** feature that act like your personal piggy bank tracker

## Documentation

See [architecture.md](./architecture.md) for comprehensive development guidelines and architecture details.
Also you can check redux architecture [redux-architecture.md](./redux-architecture.md) guide for more information how it works in this project.

## Other Docs

Please visit thes two documents:

- PRD - https://docs.google.com/document/d/1BCzyvLONlg9AdEeKNwB4O54u4xm3XKAXvWLgTL6rpLo/edit?usp=sharing
- Design Docs - https://docs.google.com/document/d/1gNH5rnTRJN0F1KowQ3aF8Hs2FZxVYNZCx2QNKKLb8Jg/edit?usp=sharing

## License

Game2EZ is free software licensed under the [GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)](LICENSE).

This means you have the freedom to:
- Use the software for any purpose
- Study how it works and modify it
- Redistribute copies
- Distribute modified versions

**Important:** If you run a modified version of this software on a server and let others interact with it there, you must make the modified source code available to those users. This ensures that everyone who uses the software over a network has access to its source code.

For more details, see the [LICENSE](LICENSE) file or visit https://www.gnu.org/licenses/agpl-3.0.html.

### Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.
