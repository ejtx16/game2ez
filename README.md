# Game2EZ Next.js Boilerplate

A modern Next.js 15 boilerplate built with React 19, TypeScript, and Server Components. Provides both frontend and backend capabilities with a clean, scalable architecture.

## Features

- Next.js 15 with App Router
- React 19 with Server Components
- TypeScript for type safety
- Tailwind CSS for styling
- API Routes for backend functionality
- ESLint for code quality
- Responsive design with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## API Endpoints

### Health Check

- `GET /api/health` - System health status

### User Management

- `GET /api/users` - Get all users (supports `limit` and `role` query params)
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

## Project Structure

```
Game2EZ/
├── app/                    # App Router directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── ARCHITECTURE.md        # Component architecture documentation
```

## Architecture

This project uses React Server Components (RSC) architecture:

- **Server Components** (default) - Render on server, zero JavaScript to client
  - `PostFeed.tsx`, `UserStats.tsx`, `WelcomeSection.tsx`
- **Client Components** ("use client") - Interactive components with hooks and event handlers
  - `ApiTester.tsx`, `InteractiveCounter.tsx`, `UserManagement.tsx`

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed component architecture documentation.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build: `npm run build`
2. Start: `npm run start`
3. Ensure Node.js 18+ is available

## License

This project is open source and available under the MIT License.
