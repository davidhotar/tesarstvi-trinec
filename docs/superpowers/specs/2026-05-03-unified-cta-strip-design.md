# Unified CTA Strip

## Overview

Replace the existing `CtaBanner` component with a unified CTA strip using a neighborly/local tone. Add it to the portfolio page (which currently has no conversion element) and keep it on the about page.

## Problem

The portfolio page is the only major page with zero conversion path. Visitors browse impressive work, reach the end, and have no prompt to take action. Meanwhile, the about page has `CtaBanner` with a workshop tone that doesn't match the rest of the brand's local identity.

## Design Decisions

- **One CTA, one tone** — a single component used across pages, not per-page variants
- **Neighborly/local tone** chosen over workshop or professional tones — leverages Unity Principle (shared identity, "sousedovi") and Liking/Similarity Bias
- **Phone call as primary action** — lowest friction, matches the user's stated goal
- **Google rating included** — social proof at the decision point (Availability Heuristic, Bandwagon Effect)
- **Single button** — removed the second "Domluvit návštěvu dílny" button to reduce choice (Hick's Law)

## Copy

- **Headline:** Stavíme v Třinci a okolí. Zavolejte sousedovi.
- **Subtext:** Poradíme, řekneme cenu, domluvíme se. Bez závazku.
- **Button:** Zavolat Petrovi (with phone icon)
- **Rating badge:** ★ 4.9 · 87 hodnocení na Google

## Visual Design

- Full-width dark band: `bg-foreground text-background` (same as current `CtaBanner`)
- Layout: left side = headline + subtext, right side = phone button + Google rating
- Responsive: stacks vertically on mobile (text → button + rating)
- No new visual patterns — reuses the existing CtaBanner structure

## Component Changes

### Modify: `src/components/about/CtaBanner.tsx`

Rewrite in place. Keep the export name `CtaBanner` to avoid changing the barrel export in `src/components/about/index.ts`.

Changes:
- New headline and subtext copy
- Remove second button ("Domluvit návštěvu dílny")
- Add Google rating badge (static text with star icon, muted styling)
- Keep `IconPhone` import, drop `IconMapPin`

### Modify: `src/app/(frontend)/portfolio/page.tsx`

- Import `CtaBanner` from `@/components/about`
- Place `<CtaBanner />` after `<PortfolioGrid />`, inside the wrapper div

### No changes needed:

- `src/app/(frontend)/o-nas/page.tsx` — already imports and renders `CtaBanner`
- `src/components/about/index.ts` — already exports `CtaBanner`

## Dependencies

- `@tabler/icons-react` — `IconPhone`, `IconStarFilled`
- `@/components/ui/button` — existing `Button` component
- No new packages, no data fetching, fully static content
