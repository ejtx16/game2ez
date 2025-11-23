# Architecture

Next.js 15 application using React Server Components (RSC). Components are either Server (default) or Client (interactive).

## Server Components (Default)

**No "use client" directive needed**

**Can:**

- Be async functions
- Access databases/APIs directly
- Render static content
- Zero JavaScript to client

**Cannot:**

- Use React hooks (useState, useEffect, etc.)
- Use event handlers (onClick, onChange)
- Access browser APIs

**Example:**

```typescript
// No "use client" directive
async function getPosts() {
  const posts = await db.posts.findMany();
  return posts;
}

export async function PostFeed() {
  const posts = await getPosts();
  return <div>{posts.map(...)}</div>;
}
```

## Client Components

**Requires "use client" at top of file**

**Can:**

- Use React hooks (useState, useEffect, useContext)
- Handle events (onClick, onChange, onSubmit)
- Access browser APIs (window, localStorage)
- Manage client-side state

**Example:**

```typescript
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## When to Use

**Server Components** (default choice):

- Fetching data from databases/APIs
- Static content rendering
- SEO-critical content
- No user interaction needed

**Client Components** (only when needed):

- Forms and user input
- Interactive UI elements
- Browser APIs required
- Client-side state management

## Import Rules

Server can import Server
Server can import Client
Client can import Client
Client CANNOT import Server (use children props instead)

## Best Practices

1. **Default to Server Components** - Only add "use client" when necessary
2. **Keep Client Components Small** - Minimal interactive boundaries
3. **Data Fetching** - Fetch in Server Components, pass to Client as props
4. **Composition** - Wrap Client Components with Server Components
5. **Suspense** - Use React Suspense for loading states

## Performance Benefits

**Server Components:**

- Reduced bundle size
- Faster initial load
- Automatic code splitting
- Better SEO

**Client Components:**

- Rich interactivity
- Real-time updates
- Dynamic experiences
