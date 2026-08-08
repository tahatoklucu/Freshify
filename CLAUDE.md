@AGENTS.md

# Freshify Development Guidelines

## Tech Stack
- Next.js 16 (App Router)
- TypeScript (Strict Mode)
- Prisma ORM + Neon PostgreSQL
- Tailwind CSS & Shadcn/UI

## Data Fetching & Caching Strategy
- Prioritize Incremental Static Regeneration (ISR).
- Always use `next: { tags: [...] }` for data fetching to allow granular revalidation.
- Use `revalidateTag` for cache invalidation. Avoid `revalidatePath` unless a global refresh is absolutely necessary.
- Avoid `cache: 'no-store'` unless the data is highly sensitive or user-specific (e.g., private user profile).
- Prefer `fetch` over direct database calls in Server Components to leverage the Next.js Data Cache.

## Architecture & Code Structure
- **Actions:** Keep all Server Actions in `app/actions/`.
- **Components:** 
    - Use `components/ui/` for primitive Shadcn components.
    - Use `components/features/` for complex, business-logic-heavy components.
    - Follow the Composition Pattern: Keep Client Components at the "leaves" of the component tree and keep Server Components as the "nodes".
- **Services:** Extract complex Prisma queries into `lib/services/` to keep Server Actions clean.

## Security & Validation
- **Validation:** All form inputs and API payloads must be validated using `zod`.
- **Authorization:** Every Server Action must call `requireAuth()` or `requireAdmin()` from `lib/require-auth.ts` at the start.
- **Sensitive Data:** Never pass raw database models directly to Client Components if they contain sensitive fields (use DTOs or manual mapping).

## Coding Standards
- Use functional programming patterns where applicable.
- Keep components small and focused on a single responsibility.
- Add meaningful JSDoc comments for complex logic.
- Ensure type safety; avoid `any` at all costs. Use interfaces or types for all props and data structures.