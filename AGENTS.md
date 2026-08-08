# Freshify Agent Guide (Next.js 16)

This project uses **Next.js 16** with the App Router, React 19, and TypeScript strict mode.

## Before you change framework APIs

Read the installed docs under `node_modules/next/dist/docs/` for the current Next.js 16 APIs. Prefer those over older Next.js habits from training data when they conflict.

## Project conventions

- **App Router** only (`app/`). Server Components by default; Client Components only at interaction leaves.
- **Server Actions** live in `app/actions/`. Protect them with `requireAuth()` / `requireAdmin()` from `lib/require-auth.ts`.
- **Auth:** NextAuth v4 (`next-auth`) with JWT sessions. Config in `lib/auth.ts`.
- **Data:** Prisma + Neon PostgreSQL. Prefer tagged `fetch` + `revalidateTag` for cacheable reads.
- **Validation:** Validate Server Action / API inputs with `zod`.
- **UI:** Tailwind CSS + Shadcn in `components/ui/`; feature UI in `components/`.

## Config

- Use typed ESM config in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* options */
};

export default nextConfig;
```

## Auth redirects

Unauthorized access to protected routes (e.g. `/admin`) must redirect to `/login?callbackUrl=<original-path>`, not a generic error page.
