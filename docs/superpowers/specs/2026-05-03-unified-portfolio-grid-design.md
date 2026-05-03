# Unified PortfolioGrid Component

## Problem

Two separate client components render portfolio items with category filtering:

- `PortfolioGrid` (`src/components/PortfolioGrid/index.tsx`) — used on `/portfolio` page, shows all items per category, URL-driven initial category, no "Vše" tab
- `PortfolioSectionClient` (`src/components/homepage/PortfolioSectionClient.tsx`) — used on homepage, shows max 5 items, has "Vše" tab, heading, and "show more" link

They share ~90% of their logic (category filtering, card grid rendering, animation delays) but have drifted in styling and behavior.

## Solution

Replace both with a single `PortfolioGrid` client component that accepts props to control the behavioral differences.

### Props

```ts
type PortfolioGridProps = {
  posts: CardPortfolioData[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
  limit?: number              // undefined = show all, number = cap items per category
  heading?: string            // optional heading above the grid
  showAllTab?: boolean        // whether to show a "Vše" (all) tab, defaults to false
  initialCategorySlug?: string // pre-select category by slug (e.g. from URL param)
}
```

### Behavior Matrix

| Feature | Homepage | Portfolio page |
|---|---|---|
| `limit` | `5` | omitted (all items) |
| `heading` | `"Každý projekt je jiný."` | omitted |
| `showAllTab` | `true` | `false` |
| `initialCategorySlug` | omitted | from `searchParams.category` |
| "Show more" link | shown when limit set and more items exist | hidden |
| Grid layout | `md:grid-cols-3 md:grid-rows-2` (featured first) | `sm:grid-cols-2 lg:grid-cols-3` (featured every 7th) |
| Empty state | not needed (always has items with "Vše") | "Žádné realizace v této kategorii" |

### Visual Style

- Category tabs use shadcn `Button` component with `rounded-full` pill style (from homepage design)
- Active tab uses `variant="default"`, inactive uses `variant="ghost"`
- Consistent `portfolio-scale-in` animation on cards

### Grid Layout Logic

- When `limit` is set: `md:grid-cols-3 md:grid-rows-2` with first item as featured (`md:row-span-2`)
- When no limit: `sm:grid-cols-2 lg:grid-cols-3` with every 7th item featured (`sm:col-span-2 lg:col-span-2`)

### "Show More" Link

Only rendered when `limit` is set. Links to:
- `/portfolio` when "Vše" is active
- `/portfolio?category={slug}` when a specific category is active

### Server Components

Data fetching stays in the respective server components since they have different page-level concerns:
- `PortfolioSection.tsx` — homepage section wrapper with `<section className="py-24">`
- `portfolio/page.tsx` — full page with hero, metadata, PageClient for header theme

Both pass fetched data into the shared `PortfolioGrid`.

## Files Changed

1. **`src/components/PortfolioGrid/index.tsx`** — rewrite with unified logic
2. **`src/components/homepage/PortfolioSection.tsx`** — use new `PortfolioGrid` with homepage props
3. **`src/app/(frontend)/portfolio/page.tsx`** — use new `PortfolioGrid` with portfolio page props
4. **`src/components/homepage/PortfolioSectionClient.tsx`** — delete (absorbed into PortfolioGrid)
