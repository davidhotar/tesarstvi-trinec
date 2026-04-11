# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Payload CMS website template (v3.82) using Next.js App Router, PostgreSQL, and TypeScript. The app serves both the Payload admin panel and a public-facing website from a single Next.js instance.

## Commands

```bash
pnpm dev                  # Start dev server (localhost:3000)
pnpm build                # Production build (Next.js + sitemap)
pnpm start                # Serve production build
pnpm lint                 # ESLint
pnpm lint:fix             # ESLint with auto-fix

# Testing
pnpm test:int             # Integration tests (vitest) - tests/int/**/*.int.spec.ts
pnpm test:e2e             # E2E tests (playwright) - tests/e2e/
pnpm test                 # Run both int + e2e

# Payload CLI
pnpm generate:types       # Regenerate payload-types.ts after schema changes
pnpm generate:importmap   # Regenerate import map after adding/modifying admin components
pnpm payload migrate:create  # Create a new DB migration
pnpm payload migrate         # Run pending migrations

# Type checking
npx tsc --noEmit          # Validate TypeScript without emitting
```

## Architecture

### Route Groups
- `src/app/(frontend)/` - Public website routes (pages, portfolio, search, sitemaps)
- `src/app/(payload)/` - Payload admin panel and API routes (`/admin`, `/api`)

### Collections & Globals
- **Collections**: Pages, Portfolio, Media, Categories, Users (`src/collections/`)
- **Globals**: Header, Footer (`src/Header/config.ts`, `src/Footer/config.ts`)
- Config entry point: `src/payload.config.ts`

### Layout Builder
Pages and Portfolio use a block-based layout system. Blocks are defined in `src/blocks/` (each has `config.ts` for schema + `Component.tsx` for rendering). `src/blocks/RenderBlocks.tsx` maps block types to components.

### Hero System
Heroes are defined in `src/heros/config.ts` with variants: HighImpact, MediumImpact, LowImpact, PortfolioHero. `src/heros/RenderHero.tsx` dispatches to the correct component.

### Plugins
Configured in `src/plugins/index.ts`: redirects, nested-docs, SEO, form-builder, search.

### Database
PostgreSQL via `@payloadcms/db-postgres`. In dev, `push: true` auto-syncs schema. For production, use migrations.

### Key Patterns
- **Access control**: `src/access/` - `anyone`, `authenticated`, `authenticatedOrPublished`
- **Revalidation hooks**: Collections/globals have `afterChange` hooks that call `revalidatePath`/`revalidateTag` for Next.js ISR
- **Draft preview**: Portfolio and Pages support drafts with preview routes at `src/app/(frontend)/next/preview/`
- **Type imports**: Use `@/payload-types` for generated types (path alias `@/` maps to `src/`)

## Payload CMS Rules

- Always pass `req` to nested operations in hooks (transaction safety)
- Set `overrideAccess: false` when passing `user` to Local API calls
- Run `pnpm generate:types` after any collection/global schema change
- Run `pnpm generate:importmap` after creating or modifying admin components
- Use `context` flags to prevent infinite hook loops
- Admin components use file path strings (not direct imports) in config
- All admin components are Server Components by default; use `'use client'` directive for client components
