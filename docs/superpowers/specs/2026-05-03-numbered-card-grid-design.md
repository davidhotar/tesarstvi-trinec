# NumberedCardGrid — Unified Component Design

## Problem

`ProcessSection` (homepage) and `ValuesSection` (about page) share the same structure — a section heading above a 4-item numbered grid — but are implemented as two separate components with diverging markup. This spec unifies them into a single reusable `NumberedCardGrid` component.

## Design Decisions

- **Card-based with optional icons** — every item uses `<Card>/<CardContent>` from the existing UI library. Icons render when provided.
- **Flexible header** — when only `title` is passed the header centers naturally. When `subtitle` or `sideDescription` are also passed, the header spreads into the `justify-between` layout currently used by ValuesSection.
- **No variant prop** — all visual differences are expressed through data/props, not mode switches.

## Props

```ts
import type { ComponentType, ReactNode } from 'react'

type NumberedCardGridItem = {
  number: string              // "01", "02", etc.
  title: string
  description: string
  icon?: ComponentType<{ className?: string }>
}

type NumberedCardGridProps = {
  title: string | ReactNode   // supports JSX (e.g. <br/> in ValuesSection title)
  subtitle?: string           // uppercase label above title
  sideDescription?: string    // paragraph rendered beside the title
  items: NumberedCardGridItem[]
  className?: string          // applied to <section> for background overrides
  showConnector?: boolean     // decorative horizontal line on lg screens
}
```

## Layout

### Section

```
<section className={cn("py-24", className)}>
  <div className="container">
    {header}
    {grid}
  </div>
</section>
```

### Header

- **Simple** (only `title`): centered `<h2>` with `mb-20 text-center`.
- **Rich** (`subtitle` and/or `sideDescription` present): `flex flex-wrap items-end justify-between gap-4 mb-16`. Subtitle renders as uppercase small text above `<h2>`; sideDescription renders as a `max-w-xs` paragraph on the right.

### Grid

```
grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4
```

With optional connector: an absolute `h-px bg-border/50` line spanning the grid on `lg:` screens, shown only when `showConnector` is true.

### Item Card

```
<Card>
  <CardContent className="flex flex-col gap-3">
    {icon && <icon badge>}
    <span className="font-heading text-5xl font-bold text-primary/20">{number}</span>
    <h3 className="font-heading text-lg font-bold">{title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
  </CardContent>
</Card>
```

When an icon is present, it renders in a `size-11 rounded-lg bg-primary text-primary-foreground` badge above the number.

## Usage Examples

### Homepage (replaces ProcessSection)

```tsx
<NumberedCardGrid
  title="Bez stresu, bez překvapení."
  items={processSteps}
  showConnector
/>
```

### About page (replaces ValuesSection)

```tsx
<NumberedCardGrid
  title={<>Čtyři věci, na kterých<br />nehnu ani o píď.</>}
  subtitle="Naše hodnoty"
  sideDescription="Nejsou to slogany na zeď. Je to to, podle čeho denně rozhodujeme."
  items={values}
  className="bg-muted/50"
/>
```

## File Structure

- **New**: `src/components/NumberedCardGrid/index.tsx`
- **Delete**: `src/components/about/ValuesSection.tsx` (no longer needed)
- **Update**: `src/components/homepage/ProcessSection.tsx` — replace implementation with `NumberedCardGrid` usage, or inline directly in `page.tsx` and delete
- **Update**: `src/app/(frontend)/page.tsx` — use `NumberedCardGrid` directly or keep thin ProcessSection wrapper
- **Update**: `src/app/(frontend)/o-nas/page.tsx` — use `NumberedCardGrid` directly instead of ValuesSection
- **Update**: `src/components/about/index.ts` — remove ValuesSection export

## Dependencies

- `@/components/ui/card` (Card, CardContent) — already in use
- `cn` utility — already in use
- `@tabler/icons-react` — already installed, used only by consumers passing icon data
