# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Game2EZ is a Next.js 15 application for NBA data visualization and management. It uses React 19 with Server Components, TypeScript, Tailwind CSS, Redux Toolkit for state management, and Prisma with PostgreSQL for database access.

## Development Commands

### Essential Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production (runs type checking and linting)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler without emitting files

### Database Commands

- Prisma client is generated to `app/generated/prisma`
- Database connection: PostgreSQL via `DATABASE_URL` environment variable

## Architecture

### React Server/Client Component Pattern

The application strictly follows Next.js 15 Server Components architecture:

**Server Components (default):**

- No `"use client"` directive
- Can be async functions
- Direct database/API access
- Zero JavaScript shipped to client
- Cannot use hooks or event handlers

**Client Components:**

- Must have `"use client"` directive at top of file
- Required for: interactivity, React hooks, browser APIs, event handlers
- Examples: forms, counters, interactive UI elements

**Decision rule:** Default to Server Components. Only add `"use client"` when you need hooks, state, or browser interactivity.

### State Management

**Redux Toolkit Setup:**

- Store factory pattern: `makeStore()` creates new store instances (Next.js App Router requirement)
- Provider: `StoreProvider` wraps the app in `app/layout.tsx`
- Typed hooks: Use `useAppDispatch`, `useAppSelector`, `useAppStore` from `@/lib/hooks`
- Current slices: `themeSlice` for theme management (light/dark mode with localStorage persistence)

**Adding new state:**

1. Create slice in `lib/store/features/[feature]/[feature]Slice.ts`
2. Add reducer to `lib/store/store.ts`
3. Use typed hooks from `@/lib/hooks` in client components

### Database Schema

**Prisma models:**

- `games` - NBA game data with home/visitor teams, scores, quarters
- `players` - Player information with team associations
- `teams` - Team details (conference, division, city, abbreviation)
- `stats` - Player statistics per game (comprehensive stats: pts, reb, ast, fg%, etc.)

**Key relationships:**

- Games include denormalized team data (home*team*_, visitor*team*_)
- Stats include denormalized player and game data
- All models have indexed fields for common queries

## File Structure

### Path Aliases (tsconfig.json)

- `@/*` - Root directory
- `@/components/*` - Reusable components
- `@/lib/*` - Utilities, store, hooks
- `@/types/*` - TypeScript type definitions

### Directory Layout

```
app/
├── (pages)/          # Route groups for pages (favorites, teams, profile)
├── api/              # API route handlers
├── layout.tsx        # Root layout with StoreProvider, ThemeProvider, Header, Footer
├── page.tsx          # Home page
└── StoreProvider.tsx # Redux store provider wrapper

components/
├── ui/               # shadcn/ui components (button, card, avatar, sheet)
├── Header.tsx        # Site header with navigation
├── Footer.tsx        # Site footer
└── ThemeProvider.tsx # Theme provider for dark/light mode

lib/
├── store/            # Redux store configuration
│   ├── store.ts      # Store factory and types
│   └── features/     # Redux slices
├── hooks/            # Custom typed hooks (useAppDispatch, etc.)
└── utils.ts          # Utility functions

types/
└── index.ts          # Global TypeScript types (User, Team, Player)

prisma/
└── schema.prisma     # Database schema
```

## Technology Stack

**Core:**

- Next.js 15.1.8 (App Router)
- React 19.0.0
- TypeScript 5
- Node.js 18+

**Styling:**

- Tailwind CSS 3.4.1
- @tailwindcss/typography
- tailwindcss-animate
- class-variance-authority (CVA)
- lucide-react (icons)

**State & Data:**

- Redux Toolkit 2.9.2
- Prisma 6.18.0 with @prisma/extension-accelerate
- PostgreSQL database

**UI Components:**

- shadcn/ui (Radix UI primitives)
- next-themes for theme management

**External APIs:**

- @balldontlie/sdk for NBA data

## Best Practices

### Coding Style

- Use tabs for indentation
- Use single quotes for strings (except to avoid escaping)
- Omit semicolons (unless required for disambiguation)
- Eliminate unused variables
- Add space after keywords
- Add space before function declaration parentheses
- Always use strict equality (===) instead of loose equality (==)
- Space infix operators
- Add space after commas
- Keep else statements on the same line as closing curly braces
- Use curly braces for multi-line if statements
- Always handle error parameters in callbacks
- Limit line length to 80 characters
- Use trailing commas in multiline object/array literals
- Use optional chaining when accessing properties of an object
- Use nullish coalescing when accessing properties of an object
- Use logical operators to simplify conditional statements
- Use template literals for string concatenation
- Use arrow functions for anonymous functions
- Use const for variables that are not reassigned
- Use let for variables that are reassigned
- Use var for variables that are reassigned

### TypeScript

- Use strict mode (enabled in tsconfig.json)
- Define interfaces for all component props
- Avoid `any` - use explicit types
- Leverage path aliases for cleaner imports

### Components

- Default to Server Components
- Keep Client Components small and focused
- Extract reusable logic into custom hooks
- Use proper prop destructuring with TypeScript interfaces

### API Routes

- Use Next.js Route Handlers (app/api)
- Implement proper error handling with try/catch
- Return appropriate HTTP status codes
- Validate input data

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CVA for component variants
- Maintain consistent spacing and typography

### Performance

- Leverage Server Components for static content
- Implement loading states and error boundaries
- Use Next.js Image component for images
- Avoid unnecessary re-renders in Client Components
- Cache static external API data using `unstable_cache` to prevent rate limiting

### Search & Filtering Pattern

**Client-Side Search (recommended for <10K items):**

1. Server Component fetches and caches data
2. Pass data as props to Client Component
3. Implement debounced search in Client Component:
   - Use `useState` for immediate search query
   - Use `useEffect` with setTimeout for debounced state (300-500ms)
   - Use `useMemo` to memoize filtered results
4. No additional API calls needed

**Example pattern:**

```typescript
// Server Component
async function getTeamsData() {
  const teams = await fetchTeams(); // cached with unstable_cache
  return <TeamsSearch teams={teams} />; // pass data as prop
}

// Client Component
("use client");
export function TeamsSearch({ teams }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredTeams = useMemo(() => {
    if (!debouncedQuery.trim()) return teams;
    const query = debouncedQuery.toLowerCase();
    return teams.filter((t) => t.name.toLowerCase().includes(query));
  }, [teams, debouncedQuery]);

  return <>{/* render filteredTeams */}</>;
}
```

**Debounce delay recommendations:**

- 200ms: Responsive, real-time search (small datasets)
- 300ms: Default, balanced (most use cases)
- 500ms+: Large datasets, expensive operations

**Key hooks:**

- `useEffect`: Implement debounce logic with cleanup
- `useMemo`: Memoize filtered results to prevent recalculation
- `useState`: Track search query and debounced query separately

See `documentations/client-search-debouncing.md` for full implementation details and customization guide.

### Caching Strategy

**Frontend Caching with `unstable_cache`:**

- Use for static/rarely-changing data (e.g., NBA teams, divisions)
- Import from `next/cache`: `import { unstable_cache } from "next/cache"`
- Basic pattern: wrap async functions with cache key, revalidation time, and tags
- Example: Teams API is cached for 3600 seconds (1 hour) with `["nba-teams"]` key
- Configure revalidation time based on data freshness needs:
  - Static data (teams): 3600+ seconds
  - Semi-static data (player rosters): 1800 seconds
  - Dynamic data (scores): avoid caching or use shorter intervals
- Tag-based invalidation: use `revalidateTag()` to manually clear specific caches
- See `documentations/api-teams-caching.md` for full implementation details

## Important Notes

- **Strict mode enabled:** TypeScript and ESLint errors will fail builds
- **Prisma output:** Generated client is in `app/generated/prisma`, not default location
- **Theme persistence:** Theme state is synced to localStorage via Redux middleware
- **Server/Client boundary:** Client Components cannot import Server Components (only receive as children)
- **Commenting and Code Generation:** Don't use emojis when generating code, commenting a code block, and generating documentations md file
