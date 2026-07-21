# Tesařství Třinec

Marketing website and CMS for [Tesařství Třinec](https://tesarstvi-trinec.cz) — carpentry, roofing, timber structures, and custom builds in Třinec and the surrounding region.

Built on [Payload CMS](https://payloadcms.com) v3 and [Next.js](https://nextjs.org) App Router. The public site and admin panel run from a single Next.js app.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| CMS | Payload 3.82 |
| Database | PostgreSQL (`@payloadcms/db-postgres`) |
| Media | S3-compatible storage (e.g. Cloudflare R2) when `S3_*` env vars are set |
| Email | Resend (`info@tesarstvi-trinec.cz`) |
| UI | Tailwind CSS 4, shadcn/ui |
| Rich text | Lexical |
| Analytics | Vercel Analytics / Speed Insights, optional GTM |

## Features

- **Pages** — layout-builder pages (home, services, about, contact, …)
- **Portfolio** — project case studies with gallery, categories, drafts, and live preview
- **Layout blocks** — Hero, Services, Portfolio, Testimonials, FAQ, Region, Timeline, Contact form, CTA, and more
- **Draft & live preview** — preview unpublished content before going live
- **On-demand revalidation** — content changes refresh the frontend via Next.js ISR hooks
- **SEO** — Payload SEO plugin, sitemaps (`pages` + `portfolio`), Open Graph, structured data
- **Redirects** — Payload redirects plugin for URL migrations
- **Forms** — form builder for contact and inquiry flows
- **Google reviews** — Featurable widget / rating badge
- **Scheduled publish** — jobs queue for publish/unpublish at a set time

## Project structure

```
src/
├── app/
│   ├── (frontend)/     # Public routes (/, /sluzby, /o-nas, /portfolio, …)
│   └── (payload)/      # Admin (/admin) and API (/api)
├── components/         # Frontend React components and block renderers
├── constants/          # Site name, description, locale
├── payload/
│   ├── collections/    # Pages, Portfolio, Media, Categories, Users
│   ├── blocks/         # Block field configs
│   ├── globals/        # Header, Footer, PortfolioPage
│   ├── plugins/        # Redirects, nested docs, SEO, forms
│   └── migrations/     # Postgres migrations
└── utilities/          # Shared helpers (meta, media URLs, redirects, …)
```

## Quick start

### Requirements

- Node.js 18.20+, 20.9+, or 22
- pnpm 9 or 10
- PostgreSQL (local, Docker, or remote)

### Setup

```bash
# Optional: local Postgres via Docker
docker compose up -d
# Connection string for the compose service:
# DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/tesarstvi-trinec

# Install dependencies
pnpm install

# Environment
cp .env.example .env
# Set DATABASE_URL, PAYLOAD_SECRET, PREVIEW_SECRET, CRON_SECRET

# Dev server (uses portless → https://tesarstvi-trinec.localhost when available)
pnpm dev

# Or plain Next.js on http://localhost:3000
pnpm dev:next
```

Open the app, create the first admin user when prompted, then use `/admin` to manage content.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Encrypts JWT tokens |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Public site URL (no trailing slash) |
| `PREVIEW_SECRET` | Yes | Secures draft preview routes |
| `CRON_SECRET` | For jobs | Auth for scheduled publish / cron |
| `RESEND_API_KEY` | For email | Transactional email via Resend |
| `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT`, `S3_REGION` | Optional | Media uploads to S3/R2 |
| `FEATURABLE_WIDGET_ID` | Optional | Google reviews widget |
| `NEXT_PUBLIC_GTM_ID` | Optional | Google Tag Manager |

See `.env.example` for the full list.

## Scripts

```bash
pnpm dev                 # Dev server (portless)
pnpm dev:next            # Dev server without portless
pnpm build               # Production build + sitemap
pnpm start               # Serve production build
pnpm lint / lint:fix     # ESLint
pnpm test                # Integration + e2e
pnpm test:int            # Vitest (tests/int)
pnpm test:e2e            # Playwright (tests/e2e)
pnpm generate:types      # Regenerate payload-types.ts after schema changes
pnpm generate:importmap  # Regenerate admin import map after component changes
pnpm payload migrate:create   # Create a DB migration
pnpm payload migrate          # Run pending migrations
```

## Database (Postgres)

In development, the adapter uses `push: true` so schema changes apply without migrations. Pointing a dev DB at production is unsafe — set `push` off for production and use migrations.

```bash
# Create a migration after schema changes
pnpm payload migrate:create

# Run migrations (e.g. on deploy, before start)
pnpm payload migrate
```

Large schema changes can drop data if you rely on push alone. Prefer explicit migrations for anything non-trivial.

## Collections & globals

| Type | Slug | Notes |
| --- | --- | --- |
| Collection | `pages` | Layout builder, drafts, SEO |
| Collection | `portfolio` | Project case studies, categories, drafts |
| Collection | `media` | Uploads (local or S3/R2) |
| Collection | `categories` | Nested taxonomy for portfolio |
| Collection | `users` | Auth / admin access |
| Global | `header` | Nav links |
| Global | `footer` | Footer content / contact |
| Global | `portfolio-page` | Portfolio listing page settings |

**Access control (summary):** authenticated users manage content in admin; the public can only read published documents.

## Layout blocks

Blocks live under `src/payload/blocks/` (config) and `src/components/blocks/` (UI). Includes:

HeroSection, ProfileHeroSection, ServiceHero, ServicesSection, ServiceDeepDive, PortfolioSection, TestimonialsSection, FAQSection, RegionSection, TimelineSection, NumberedCardGrid, ContactHeroSection, ContactFormSection, CtaBanner, Content, Media, CallToAction, Form, Archive, Banner, Code, GoogleReviewsBadge

## Production

```bash
pnpm build
pnpm start
```

On deploy with Postgres, run migrations before starting the app:

```bash
pnpm payload migrate && pnpm start
```

Deploy as any Node/Next.js app (Vercel, VPS, Coolify, etc.). For media in production, configure S3-compatible storage via the `S3_*` env vars.

Payload production notes: [Deployment docs](https://payloadcms.com/docs/production/deployment).

## Seed

A seed route exists at `/next/seed` (admin panel link when available). Seeding is **destructive** — it resets content to the seed template. Only use on empty or disposable databases.

## Development notes

- After collection/global schema changes: `pnpm generate:types`
- After adding or changing admin components: `pnpm generate:importmap`
- Typecheck: `npx tsc --noEmit`
- Project conventions for agents: `AGENTS.md` / `CLAUDE.md`
- Design history and implementation plans: `docs/superpowers/`

## License

MIT
