# CLAUDE.md

Game2EZ - Next.js 15 NBA data visualization app with React 19, TypeScript, Tailwind CSS, Redux Toolkit, and Prisma/PostgreSQL.

## Commands

- `npm run dev` - Development server (localhost:3000)
- `npm run build` - Production build with type checking and linting
- `npm run lint` - ESLint
- `npm run type-check` - TypeScript validation

**Database**: Prisma client generated to `app/generated/prisma`, PostgreSQL via `DATABASE_URL`

## Architecture

### Server/Client Components

**Server Components (default)**: Async functions, direct DB/API access, no `"use client"`, zero client JS
**Client Components**: `"use client"` required for hooks, state, interactivity, browser APIs

**Rule**: Default to Server Components. Only use Client Components for interactivity.

### State Management

**Redux Toolkit**: Store factory `makeStore()` in `lib/store/store.ts`, provider in `app/layout.tsx`
**Typed hooks**: `useAppDispatch`, `useAppSelector`, `useAppStore` from `@/lib/hooks`
**Slices**: `favoritesSlice` for favorite teams
**Theme**: `next-themes` with dark mode default (not Redux)

**Add state**: Create slice in `lib/store/features/[feature]/[feature]Slice.ts`, add to store, use typed hooks

See: `documentations/redux-toolkit-setup.md`

### Database

**Models**: `games`, `players`, `teams`, `stats` (see `prisma/schema.prisma`)
**Relationships**: Denormalized team data in games, player/game data in stats, indexed fields

See: `prisma/schema.prisma`

## Structure

**Path Aliases**: `@/*` (root), `@/components/*`, `@/lib/*`, `@/types/*`

**Key Directories**:

- `app/(pages)/` - Pages (favorites, teams, profile, players, games)
- `app/api/` - API routes
- `components/` - Reusable UI (Header, Footer, ThemeProvider)
- `components/ui/` - shadcn/ui components
- `lib/store/` - Redux store and slices
- `lib/hooks/` - Typed hooks
- `types/` - Global types
- `context/` - Design system spec
- `documentations/` - Feature docs

**Key Files**:

- `app/layout.tsx` - Root layout with providers
- `lib/store/store.ts` - Redux store factory
- `lib/hooks/hooks.ts` - Custom hooks
- `types/index.ts` - Global types
- `context/design-system-spec.md` - Design system

## Stack

**Core**: Next.js 15.1.8, React 19, TypeScript 5, Node.js 18+
**Styling**: Tailwind CSS 3.4.1, CVA, lucide-react icons
**State**: Redux Toolkit 2.9.2
**Data**: Prisma 6.18.0, PostgreSQL, @balldontlie/sdk (NBA API)
**UI**: shadcn/ui (Radix), next-themes

## Best Practices

### Code Style

**Format**: Tabs, single quotes, no semicolons, 80 char lines, trailing commas
**Modern JS**: Optional chaining, nullish coalescing, template literals, arrow functions, const/let (no var)
**TypeScript**: Strict mode, interfaces for props, avoid `any`, use path aliases
**No emojis**: Don't use emojis in code, comments, or documentation

### Components

- Default to Server Components, use Client only for interactivity
- Keep Client Components small and focused
- Extract logic into custom hooks
- Props with TypeScript interfaces

### API & Performance

- Route Handlers in `app/api/` with try/catch and proper status codes
- Cache static external data with `unstable_cache` (prevent rate limits)
- Server Components for static content, loading states, error boundaries
- Next.js Image component for images

See: `documentations/nextjs-best-practices.md`

### Search & Filtering

**Client-Side Search** (for <10K items):

1. Server Component fetches/caches data
2. Pass data as props to Client Component
3. Client: `useState` for query, `useEffect` for debounce (300ms), `useMemo` for filtered results
4. No additional API calls

**Debounce delays**: 200ms (small datasets), 300ms (default), 500ms+ (large datasets)

See: `documentations/client-search-debouncing.md`

### Caching

**Pattern**: `unstable_cache` from `next/cache` for static/semi-static data
**Revalidation**: Teams (3600s), Rosters (1800s), Scores (avoid or short intervals)
**Invalidation**: `revalidateTag()` for manual cache clearing

See: `documentations/api-teams-caching.md`, `documentations/api-team-details-caching.md`

## Design System

See: `context/design-system-spec.md`

**Colors**: Primary Orange `#FF6B35`, Dark BG `#0a0a0a`/`#1a1a1a`, Card `#1f1f1f`/`#2a2a2a`
**Typography**: H1 `text-4xl`, H2 `text-3xl`, H3 `text-2xl`
**Spacing**: 4px scale (gap-2, gap-4, gap-6, gap-8)
**Components**: Tailwind + shadcn/ui (Button, Card, Form) + Lucide icons

## Key Notes

- **Strict mode**: TypeScript/ESLint errors fail builds
- **Prisma**: Client in `app/generated/prisma` (non-default)
- **Theme**: `next-themes` with localStorage, dark mode default
- **Server/Client boundary**: Client Components cannot import Server Components
