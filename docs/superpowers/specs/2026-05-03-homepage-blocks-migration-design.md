# Homepage Blocks Migration — Design Spec

**Date:** 2026-05-03
**Goal:** Move 5 static homepage sections into Payload CMS as editable blocks and prefill seed data with current content.

## Overview

The homepage currently renders 5 hardcoded sections (ServicesSection, NumberedCardGrid, TestimonialsSection, ContactSection, FAQSection). This migration converts them into 4 new Payload CMS blocks plus the existing FormBlock, making all content editable from the admin panel.

## New Blocks

### 1. `servicesSection`

**Slug:** `servicesSection`
**Interface:** `ServicesSectionBlock`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | yes | Section heading |
| `services` | array (min 1, max 6) | yes | Service cards |
| `services.icon` | select | yes | Curated Tabler icon set (~25 options) |
| `services.title` | text | yes | Card title |
| `services.description` | text | yes | Card description |
| `services.items` | array (min 1) | yes | Checklist feature items |
| `services.items.text` | text | yes | Checklist item text |
| `services.linkLabel` | text | no | CTA text per card, defaults to "Více o službě" |

**Icon select options (curated Tabler set):**
`fence`, `car-garage`, `home-plus`, `hammer`, `tool`, `brush`, `ruler`, `wood`, `tree`, `building`, `door`, `window`, `roof`, `stairs`, `bolt`, `paint`, `crane`, `shovel`, `axe`, `saw`, `drill`, `screw`, `nail`, `home`, `garden-cart`

**Component behavior:**
- Card number auto-generated from array index (01, 02, 03...)
- Uses shadcn Card components
- Icon resolved from select value to Tabler React component via lookup map
- Each card has icon, number, title, description, checklist with check icons, and CTA link

### 2. `numberedCardGrid`

**Slug:** `numberedCardGrid`
**Interface:** `NumberedCardGridBlock`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | yes | Section heading |
| `subtitle` | text | no | Small uppercase label above title |
| `sideDescription` | text | no | Short text on right side of header |
| `showConnector` | checkbox | no | Horizontal line connecting cards (default false) |
| `items` | array (min 1, max 8) | yes | Numbered cards |
| `items.icon` | select | no | Same curated Tabler icon set |
| `items.title` | text | yes | Card title |
| `items.description` | text | yes | Card description |

**Component behavior:**
- Number auto-generated from array index (01, 02, 03...)
- 4-column grid on large screens, 2 on medium, 1 on mobile
- Optional connector line between cards
- Optional icons with primary-colored background
- Large faded number display per card

### 3. `testimonialsSection`

**Slug:** `testimonialsSection`
**Interface:** `TestimonialsSectionBlock`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | yes | Section heading |
| `sourceLabel` | text | no | e.g. "napřímo z Google reviews" |
| `testimonials` | array (min 1, max 6) | yes | Review cards |
| `testimonials.name` | text | yes | Reviewer name |
| `testimonials.location` | text | no | Reviewer location |
| `testimonials.text` | textarea | yes | Review text |
| `testimonials.rating` | number (min 1, max 5) | no | Star count, default 5 |

**Component behavior:**
- Initials auto-generated from name (first letter of first + last name)
- Star rating rendered as filled star icons
- Google icon shown next to sourceLabel
- 3-column card grid with quoted text, avatar initials, name/location

### 4. `faqSection`

**Slug:** `faqSection`
**Interface:** `FAQSectionBlock`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | text | yes | Section heading |
| `description` | text | no | Subtitle text |
| `ctaLabel` | text | no | Button text |
| `ctaLink` | text | no | Button URL or tel: link |
| `faqs` | array (min 1, max 20) | yes | FAQ items |
| `faqs.question` | text | yes | Question |
| `faqs.answer` | textarea | yes | Answer |

**Component behavior:**
- Client component (`'use client'`) for accordion interactivity
- Two-column layout: left (heading, description, CTA button), right (accordion)
- Uses shadcn Accordion components

## Contact Section

Uses the existing `formBlock` — no new block needed. The seed data creates a contact form via Payload's form-builder plugin and references it in a `formBlock` entry in the layout.

## Homepage Integration

### `page.tsx` changes
- Remove static section imports: `ServicesSection`, `TestimonialsSection`, `ContactSection`, `FAQSection`, `NumberedCardGrid`
- Remove hardcoded `processSteps` data and Tabler icon imports
- Remove static section rendering — all content now comes from `RenderBlocks(page.layout)`
- Keep `PortfolioSection` with `<Suspense>` (dynamic fetch, not a block)
- The page renders: `RenderBlocks(page.layout)` → `PortfolioSection` → done. The old conditional hero fallback (`hasPayloadHero ? RenderBlocks : HeroSection`) is no longer needed since the hero is already a block in the layout. If `page.layout` is empty/missing, the page simply renders nothing before PortfolioSection (seed data ensures this doesn't happen in practice).

### Registration
- Add 4 new block configs to `Pages` collection `layout.blocks` array in `src/payload/collections/Pages/index.ts`
- Add 4 new block components to `RenderBlocks` mapper in `src/components/blocks/RenderBlocks.tsx`
- Run `pnpm generate:types` after schema changes
- Run `pnpm generate:importmap` after adding admin components

### Seed Data (`home.ts`)
Add block entries to the layout array (after existing hero block):

1. `servicesSection` — 3 services with current Czech content (Pergoly & terasy, Přístřešky & garáže, Dřevostavby) including all checklist items
2. `numberedCardGrid` — 4 process steps (Zavoláte/napíšete, Přijedeme se podívat, Návrh + cenová nabídka, Postavíme)
3. `testimonialsSection` — 3 reviews (Petr Krzystek, Anna Sikorová, Jakub Heczko) with current text
4. `formBlock` — referencing the seeded contact form
5. `faqSection` — 6 FAQ items with current Czech Q&A content

## File Structure

### New files
```
src/payload/blocks/ServicesSection/config.ts
src/components/blocks/ServicesSection/Component.tsx
src/payload/blocks/NumberedCardGrid/config.ts
src/components/blocks/NumberedCardGrid/Component.tsx
src/payload/blocks/TestimonialsSection/config.ts
src/components/blocks/TestimonialsSection/Component.tsx
src/payload/blocks/FAQSection/config.ts
src/components/blocks/FAQSection/Component.tsx
```

### Files to delete
```
src/components/homepage/ServicesSection.tsx
src/components/homepage/TestimonialsSection.tsx
src/components/homepage/ContactSection.tsx
src/components/homepage/FAQSection.tsx
src/components/NumberedCardGrid/index.tsx
```

### Files to modify
```
src/app/(frontend)/page.tsx — remove static sections
src/payload/collections/Pages/index.ts — register new blocks
src/components/blocks/RenderBlocks.tsx — add new block components
src/payload/endpoints/seed/home.ts — add seed data for new blocks
src/payload/endpoints/seed/index.ts — seed contact form for formBlock
src/components/homepage/index.ts — remove deleted exports
```

## Shared Icon Map

Both `servicesSection` and `numberedCardGrid` use the same icon select field. Extract a shared icon options array and a shared icon lookup map (icon name → Tabler React component) to avoid duplication. Place in a shared location like `src/payload/blocks/shared/icons.ts` for config options and `src/components/blocks/shared/icons.ts` for the component lookup map.
