# HeroSection Block Design

Connect the static `HeroSection` homepage component to Payload CMS as a reusable layout block.

## Context

The homepage has a hardcoded `HeroSection` component (`src/components/homepage/HeroSection.tsx`) with static Czech text, a background image, CTA buttons, and a stats strip. This needs to become a Payload block so content is CMS-editable and the block can be reused on any Page.

## Block Schema

**Block slug:** `heroSection`

**Config file:** `src/payload/blocks/HeroSection/config.ts`

Fields:

| Field | Type | Config | Purpose |
|-------|------|--------|---------|
| `richText` | richText | Lexical editor with H1-H4, FixedToolbar, InlineToolbar (same as existing hero config) | Heading and subtitle area. Admin uses heading levels to distinguish main heading from subtitle. |
| `links` | linkGroup | Max 2 links via `linkGroup({ overrides: { maxRows: 2 } })` | Primary and secondary CTA buttons |
| `backgroundImage` | upload | `relationTo: 'media'`, required | Full-viewport background image |
| `stats` | array | minRows: 1, maxRows: 8 | Stats strip items |
| `stats.value` | text | required | e.g. "142+", "10 let", "24h" |
| `stats.label` | text | required | e.g. "Dokončených projektů", "rodinná firma" |

The richText field reuses the same Lexical editor configuration as `src/payload/heros/config.ts` for consistency.

## Component

**File:** `src/components/blocks/HeroSection/Component.tsx`

Server component (no `'use client'`). Replicates the visual design of the current static hero:

- Full-viewport section (`min-h-[100svh]`) with `pt-[88px]` for header clearance
- Background image via Next.js `<Image fill priority>` using the project's `Media` component
- Three gradient overlays for text readability (bottom-to-top, top-to-bottom, left-to-right)
- Content area: left-aligned, max-w-2xl
  - RichText rendered via the project's existing `RichText` component (handles H1-H4 with white text styling)
  - Two CTA links via `CMSLink` — first styled as primary (filled, rounded-full), second as outline (rounded-full, white border)
- Stats strip at the bottom: border-top, backdrop-blur, flex-wrap layout with stat value (bold, large) and label (small, muted) per item
- Star rating badge is removed

## Registration

1. **RenderBlocks** (`src/components/blocks/RenderBlocks.tsx`): Add `heroSection: HeroSectionBlock` to the `blockComponents` map. Full-bleed blocks like `heroSection` must not get the default `my-16` wrapper. Update RenderBlocks to conditionally omit the wrapper div for full-bleed block types.

2. **Pages collection** (`src/payload/collections/Pages/index.ts`): Add `HeroSection` config to the `layout.blocks` array alongside existing blocks (CallToAction, Content, MediaBlock, Archive, FormBlock).

## Homepage Migration

Update `src/app/(frontend)/page.tsx`:

- The homepage should fetch its Page document from Payload (the page with slug `home` or `index`) and render blocks via `RenderBlocks`, replacing the static `<HeroSection />` import.
- Other static homepage sections (PortfolioSection, ServicesSection, etc.) remain unchanged for now — they are outside the scope of this task.
- If no Payload page exists yet for the homepage, the static fallback continues to work until content is created in the admin.

## Styling Notes

- White text colors for richText content need to be applied via className overrides on the `RichText` component or a wrapper div.
- CTA button styling: first link gets default Button styling with `rounded-full`, second link gets `variant="outline"` with white border/text.

## Out of Scope

- Converting other homepage sections (PortfolioSection, ServicesSection, etc.) to Payload blocks
- Adding the hero to the Portfolio collection
- Removing the old static `HeroSection` component (keep it until the Payload block is fully working)
- Adding the block to the existing hero type selector (it's a standalone block, not a hero variant)
