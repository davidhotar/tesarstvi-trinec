# Služby (Services) Page — Design Spec

## Overview

A dedicated `/sluzby` page for Tesařství Třinec that provides deep-dive information about the three core services: Pergoly & terasy, Přístřešky & garáže, and Dřevostavby & domky. The page is CMS-driven via Payload blocks, following existing project patterns.

The goal is to **explain services, show examples, and build trust** — not to sell with pricing or calculators. Each service block tells a story through sub-service breakdowns, real project images, and checklists of what's included.

## Page Structure (top to bottom)

1. **ServiceHero** block — compact hero strip with eyebrow, heading, note, CTA
2. **ServiceAnchorNav** — client component, jump-links derived from ServiceDeepDive blocks on the page
3. **3x ServiceDeepDive** blocks — alternating backgrounds, numbered sidebar, two layout variants
4. **CtaBanner** block (existing) — dark CTA with phone + WhatsApp
5. **FAQSection** block (existing) — service-specific questions

## New Payload Block: ServiceHero

### Config (`slug: 'serviceHero'`, `interfaceName: 'ServiceHeroBlock'`)

| Field     | Type | Required | Default     | Notes                           |
|-----------|------|----------|-------------|---------------------------------|
| eyebrow   | text | no       |             | Uppercase label above heading   |
| heading   | text | yes      |             | Large display heading           |
| note      | text | no       |             | Stats/trust line (right side)   |
| ctaLabel  | text | no       | "Konzultace zdarma" |                         |
| ctaLink   | text | no       | "/kontakt"  |                                 |

### Component

- Compact section, no background image
- Two-column flex: heading area left, note + CTA button right
- `bg-background` with `py-16 lg:py-20` padding
- Responsive: stacks vertically on mobile (heading full width, CTA below)
- CTA uses existing `Button` component with `IconPhone` from Tabler
- Heading uses `font-heading` at large display size

## New Payload Block: ServiceDeepDive

### Config (`slug: 'serviceDeepDive'`, `interfaceName: 'ServiceDeepDiveBlock'`)

| Field        | Type     | Required | Default                    | Notes                                    |
|--------------|----------|----------|----------------------------|------------------------------------------|
| number       | text     | yes      |                            | Display number ("01", "02", "03")        |
| badge        | text     | no       |                            | Label pill (e.g., "Bestseller")          |
| badgeVariant | select   | no       | "default"                  | Options: "accent", "default"             |
| title        | text     | yes      |                            | Service heading                          |
| description  | textarea | no       |                            | Introductory paragraph                   |
| variant      | select   | yes      |                            | Options: "showcase", "gallery"           |
| subServices  | array    | no       |                            | For showcase variant sub-service cards   |
| → title      | text     | yes      |                            |                                          |
| → description| text     | yes      |                            |                                          |
| → tags       | array    | no       |                            | Tag pills on each sub-service card       |
| →→ tag       | text     | yes      |                            |                                          |
| images       | array    | no       |                            | 1-4 project images                       |
| → image      | upload   | yes      | relationTo: 'media'        |                                          |
| → caption    | text     | no       |                            | Image label/description                  |
| checklist    | group    | no       |                            |                                          |
| → heading    | text     | no       | "V ceně vždy:"            |                                          |
| → items      | array    | no       |                            |                                          |
| →→ text      | text     | yes      |                            |                                          |
| tip          | group    | no       |                            | Optional tip/callout box                 |
| → text       | text     | no       |                            |                                          |
| ctaLabel     | text     | no       | "Chci nezávaznou nabídku"  |                                          |
| ctaLink      | text     | no       | "/kontakt"                 |                                          |
| background   | select   | no       | "default"                  | Options: "default", "muted"              |

### Admin UX

- `subServices` array: `admin.condition` shows only when `variant === 'showcase'`
- `tip` group: `admin.condition` shows only when `variant === 'gallery'`
- `images` and `checklist` are always visible (used by both variants)
- Arrays use `initCollapsed: true` for cleaner admin experience

### Component — Shared Shell

Both variants share:
- **Numbered sidebar**: fixed-width left column with large accent-colored number + dashed vertical connector line
- **Badge pill**: positioned above the heading, uses `Badge` component with variant styling
- **Heading**: large `font-heading` h2
- **Description**: muted paragraph text below heading
- **CTA**: `Button` component at the bottom linking to ctaLink
- **Background**: alternates via `background` field — `bg-background` or `bg-muted/50`

### Component — Variant: "showcase"

Middle content zone:
1. **3-column sub-service card grid**: Each card shows title, description, and tag pills. Cards use `Card` component with `CardHeader`/`CardContent`. Tags use `Badge` component.
2. **2:1 image + checklist row**: Wide image (2/3 width) rendered via Payload `upload` field (optimized Next.js Image under the hood) + checklist (1/3 width) with check icons and items list.

### Component — Variant: "gallery"

Middle content zone:
1. **1:2 checklist + image grid**: Checklist (1/3 width) on left + 2x2 image grid (2/3 width) on right. Images rendered via Payload `upload` fields with captions.
2. **Tip callout** (optional): Dashed-border box with check icon and tip text below the grid.

### Responsive Behavior

- Desktop (lg+): full two-column layout with numbered sidebar
- Tablet (md): sidebar collapses to inline number above content
- Mobile (sm): single column, stacked sections, images stack vertically

## ServiceAnchorNav — Client Component

Not a CMS block. Lives at `src/components/ServiceAnchorNav.tsx`.

**Props:**
- `services: Array<{ number: string; title: string }>` — derived from ServiceDeepDive blocks on the page

**Behavior:**
- Horizontal bar with service jump-links
- Sticky below the header on scroll (`sticky top-[header-height]`)
- Includes "Nevíte, co potřebujete?" link to `/kontakt`
- `'use client'` directive for scroll-to behavior
- Uses `border-b` styling with horizontal layout, `gap-6`

## Page Route

`src/app/(frontend)/sluzby/page.tsx` — same pattern as `o-nas/page.tsx`:
- Fetches page with `slug: 'sluzby'` from Payload
- Renders via `RenderBlocks`
- The anchor nav is rendered by extracting `serviceDeepDive` blocks from the layout array and passing their titles

## Registration

1. Add `ServiceHero` and `ServiceDeepDive` block configs to Pages collection `layout.blocks` array
2. Register both components in `RenderBlocks.tsx` blockComponents map
3. Add both to the `isFullBleed` array in `RenderBlocks.tsx`

## Seed Data

Create seed data for the sluzby page with all blocks populated:

**ServiceHero:**
- eyebrow: "Naše služby"
- heading: "Tři věci, které děláme poctivě a celé."
- note: "10 let · 142 realizací · MS kraj"
- ctaLabel: "Konzultace zdarma"
- ctaLink: "/kontakt"

**ServiceDeepDive #1 — Pergoly & terasy (variant: showcase):**
- number: "01", badge: "Bestseller · 60 % naší práce", badgeVariant: "accent"
- 3 sub-services: Pergoly otevřené, Pergoly s posuvnou střechou, Terasy & podlahy
- 1 wide image + 7-item checklist (3D návrh, Statický posudek, Doprava, Základy, Montáž, Lazura, Záruka)
- background: "default"

**ServiceDeepDive #2 — Přístřešky & garáže (variant: gallery):**
- number: "02", badge: "Praktická volba", badgeVariant: "default"
- 6-item checklist (Přístřešek 1 auto, 2 auta, 3-4 auta + dílna, Garáž, Na dřevo, Stojan)
- 4 images in 2x2 grid
- Tip callout about 2-car carport + utility room
- background: "muted"

**ServiceDeepDive #3 — Dřevostavby & domky (variant: showcase):**
- number: "03", badge: "Na míru", badgeVariant: "default"
- 4 sub-services: Zahradní domek, Sauna, Pracovna, Sklad/dílna
- Images for each sub-service type
- background: "default"

**CtaBanner (existing block):**
- title: "Nevíte, co potřebujete?"
- description: "Zavolejte. Pavel vám za 5 minut řekne, co je pro vás nejlepší."

**FAQSection (existing block):**
- 5 service-specific questions

## Files to Create

1. `src/payload/blocks/ServiceHero/config.ts`
2. `src/components/blocks/ServiceHero/Component.tsx`
3. `src/payload/blocks/ServiceDeepDive/config.ts`
4. `src/components/blocks/ServiceDeepDive/Component.tsx`
5. `src/components/ServiceAnchorNav.tsx`

## Files to Modify

6. `src/components/blocks/RenderBlocks.tsx` — register new blocks
7. `src/collections/Pages/index.ts` — add new blocks to layout
8. `src/app/(frontend)/sluzby/page.tsx` — create page route

## Post-Implementation

- Run `pnpm generate:types` after schema changes
- Run `pnpm generate:importmap` if admin components are added
- Create the "sluzby" page in Payload admin and populate with seed data content
- Test responsive behavior at all breakpoints
