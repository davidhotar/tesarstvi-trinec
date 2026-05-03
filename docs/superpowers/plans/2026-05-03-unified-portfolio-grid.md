# Unified PortfolioGrid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace two duplicate portfolio components (`PortfolioGrid` and `PortfolioSectionClient`) with a single unified `PortfolioGrid` that serves both the portfolio page and the homepage section.

**Architecture:** One `'use client'` component with props (`limit`, `heading`, `showAllTab`, `initialCategorySlug`) that controls behavioral differences between the homepage preview (5 items, heading, "Vše" tab, "show more" link) and the full portfolio page (all items, no heading, no "Vše" tab, URL-driven initial category). Server components remain separate since they wrap different page contexts.

**Tech Stack:** React 19, Next.js App Router, shadcn/ui Button, TypeScript, Tailwind CSS

---

### Task 1: Rewrite unified PortfolioGrid component

**Files:**
- Modify: `src/components/PortfolioGrid/index.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire contents of `src/components/PortfolioGrid/index.tsx`**

```tsx
'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Card, CardPortfolioData } from '@/components/Card'
import Link from 'next/link'
import type { Category } from '@/payload-types'

export type PortfolioGridProps = {
  posts: CardPortfolioData[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
  limit?: number
  heading?: string
  showAllTab?: boolean
  initialCategorySlug?: string
}

export function PortfolioGrid({
  posts,
  categories,
  limit,
  heading,
  showAllTab = false,
  initialCategorySlug,
}: PortfolioGridProps) {
  const categoriesWithCounts = useMemo(() => {
    return categories
      .map((cat) => {
        const count = posts.filter((post) =>
          post.categories?.some((c) => (typeof c === 'object' ? c.id : c) === cat.id),
        ).length
        return { ...cat, count }
      })
      .filter((cat) => cat.count > 0)
      .sort((a, b) => (a.title ?? '').localeCompare(b.title ?? '', 'cs'))
  }, [categories, posts])

  const initialCategoryId = useMemo(() => {
    if (showAllTab) return null
    if (initialCategorySlug) {
      const match = categoriesWithCounts.find((c) => c.slug === initialCategorySlug)
      if (match) return match.id
    }
    return categoriesWithCounts[0]?.id ?? null
  }, [showAllTab, initialCategorySlug, categoriesWithCounts])

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId)

  const filteredPosts = useMemo(() => {
    let filtered = posts
    if (activeCategoryId !== null) {
      filtered = posts.filter((post) =>
        post.categories?.some(
          (c) => (typeof c === 'object' ? c.id : c) === activeCategoryId,
        ),
      )
    }
    return limit ? filtered.slice(0, limit) : filtered
  }, [posts, activeCategoryId, limit])

  const activeCategory = categoriesWithCounts.find((c) => c.id === activeCategoryId)
  const totalForActive = activeCategoryId === null
    ? posts.length
    : activeCategory?.count ?? 0
  const showMoreHref = activeCategoryId === null
    ? '/portfolio'
    : `/portfolio?category=${activeCategory?.slug ?? ''}`
  const isLimited = !!limit

  return (
    <div>
      <div className="container">
        <div className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-4">
          {heading && (
            <div>
              <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            </div>
          )}
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Filtrovat kategorie"
          >
            {showAllTab && (
              <Button
                variant={activeCategoryId === null ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
                role="tab"
                aria-selected={activeCategoryId === null}
                onClick={() => setActiveCategoryId(null)}
              >
                Vše
              </Button>
            )}
            {categoriesWithCounts.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategoryId === cat.id ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
                role="tab"
                aria-selected={activeCategoryId === cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={cn(
            'grid grid-cols-1 gap-3',
            isLimited
              ? filteredPosts.length >= 3
                ? 'md:grid-cols-3 md:grid-rows-2'
                : 'md:grid-cols-2'
              : 'sm:grid-cols-2 lg:grid-cols-3 md:gap-4',
          )}
        >
          {filteredPosts.map((post, index) => {
            const isFeatured = isLimited
              ? index === 0 && filteredPosts.length >= 3
              : index % 7 === 0
            return (
              <div
                key={post.slug}
                className={cn(
                  'portfolio-scale-in',
                  isFeatured && (isLimited ? 'md:row-span-2' : 'sm:col-span-2 lg:col-span-2'),
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Card
                  className={cn(
                    'h-full',
                    isLimited && 'rounded-xl',
                    isLimited && (isFeatured ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'),
                  )}
                  doc={post}
                  relationTo="portfolio"
                  showCategories
                  featured={isFeatured}
                />
              </div>
            )
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-sm uppercase tracking-widest">Žádné realizace v této kategorii</p>
          </div>
        )}
      </div>

      {isLimited && (
        <div className="container mt-6 flex justify-center">
          <Button variant="ghost" className="rounded-lg" asChild>
            <Link href={showMoreHref}>
              {totalForActive > limit
                ? `Zobrazit všech ${totalForActive} realizací →`
                : `Zobrazit portfolio →`}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: No errors related to PortfolioGrid

- [ ] **Step 3: Commit**

```bash
git add src/components/PortfolioGrid/index.tsx
git commit -m "refactor: rewrite PortfolioGrid as unified component with limit/heading/showAllTab props"
```

---

### Task 2: Update homepage PortfolioSection to use unified PortfolioGrid

**Files:**
- Modify: `src/components/homepage/PortfolioSection.tsx`

- [ ] **Step 1: Replace the contents of `src/components/homepage/PortfolioSection.tsx`**

```tsx
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PortfolioGrid } from '@/components/PortfolioGrid'

export async function PortfolioSection() {
  const payload = await getPayload({ config: configPromise })

  const [postsResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: 0,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
        meta: true,
        location: true,
        year: true,
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    }),
  ])

  const categories = categoriesResult.docs.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  return (
    <section className="py-24">
      <PortfolioGrid
        posts={postsResult.docs}
        categories={categories}
        limit={5}
        heading="Každý projekt je jiný."
        showAllTab
      />
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage/PortfolioSection.tsx
git commit -m "refactor: update PortfolioSection to use unified PortfolioGrid"
```

---

### Task 3: Update portfolio page to use unified PortfolioGrid with new props

**Files:**
- Modify: `src/app/(frontend)/portfolio/page.tsx`

- [ ] **Step 1: Replace the contents of `src/app/(frontend)/portfolio/page.tsx`**

```tsx
import type { Metadata } from 'next/types'

import { PortfolioGrid } from '@/components/PortfolioGrid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  searchParams: Promise<{ category?: string }>
}

export default async function Page({ searchParams }: Args) {
  const { category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const [posts, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: 0,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
        meta: true,
        location: true,
        year: true,
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    }),
  ])

  const categories = categoriesResult.docs.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  return (
    <div className="pb-24">
      <PageClient />

      {/* Hero header */}
      <div className="relative overflow-hidden bg-black text-white dark:bg-background dark:text-foreground pt-40 pb-20 md:pt-48 md:pb-24 mb-12 md:mb-16">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="container relative">
          <div className="portfolio-fade-up">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-portfolio-accent font-medium mb-6">
              Naše realizace
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              Portfolio
            </h1>
            <div className="portfolio-line-reveal h-[2px] bg-portfolio-accent w-24 mt-8" style={{ animationDelay: '300ms' }} />
          </div>

          <div className="portfolio-fade-up mt-8" style={{ animationDelay: '200ms' }}>
            <p className="text-sm text-white/50 dark:text-foreground/50">
              Celkem {posts.totalDocs} realizací
            </p>
          </div>
        </div>
      </div>

      <Suspense>
        <PortfolioGrid
          posts={posts.docs}
          categories={categories}
          initialCategorySlug={category}
        />
      </Suspense>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Portfolio | Tesařství Třinec`,
  }
}
```

Note: The portfolio page now reads `searchParams.category` at the server level and passes it as `initialCategorySlug`, removing the need for the client-side `useSearchParams` hook that was in the old `PortfolioGrid`.

- [ ] **Step 2: Update the paginated portfolio page similarly**

Modify `src/app/(frontend)/portfolio/page/[pageNumber]/page.tsx` — the only change is the `PortfolioGrid` usage (no new props needed since it doesn't support category filtering via URL on paginated pages):

The existing import and usage (`<PortfolioGrid posts={posts.docs} categories={categories} />`) already works with the new component — no `limit`, no `heading`, no `showAllTab`, no `initialCategorySlug`. No changes needed.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/app/(frontend)/portfolio/page.tsx
git commit -m "refactor: update portfolio page to pass initialCategorySlug to unified PortfolioGrid"
```

---

### Task 4: Delete PortfolioSectionClient

**Files:**
- Delete: `src/components/homepage/PortfolioSectionClient.tsx`

- [ ] **Step 1: Delete the file**

```bash
rm src/components/homepage/PortfolioSectionClient.tsx
```

- [ ] **Step 2: Verify no remaining imports**

```bash
grep -rn 'PortfolioSectionClient' src/
```

Expected: No output (no remaining references)

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add -u src/components/homepage/PortfolioSectionClient.tsx
git commit -m "refactor: delete PortfolioSectionClient, absorbed into unified PortfolioGrid"
```

---

### Task 5: Visual verification

- [ ] **Step 1: Start dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Verify homepage portfolio section**

Open `http://localhost:3000` in browser. Scroll to portfolio section. Verify:
- Heading "Každý projekt je jiný." renders
- "Vše" tab is shown and active by default
- Category pill tabs render with shadcn Button styling
- Max 5 cards shown
- "Zobrazit všech X realizací →" or "Zobrazit portfolio →" link appears
- Clicking a category filters the cards
- Cards animate in with `portfolio-scale-in`

- [ ] **Step 3: Verify portfolio page**

Open `http://localhost:3000/portfolio` in browser. Verify:
- Hero header still renders with "Portfolio" title
- No heading above the grid
- No "Vše" tab — first category is selected by default
- Category tabs use same shadcn Button pill style as homepage
- All items in selected category are shown (no limit)
- No "show more" link
- Empty state message shows for categories with no items
- Clicking `?category=slug` in URL pre-selects that category

- [ ] **Step 4: Verify paginated portfolio page**

Open `http://localhost:3000/portfolio/page/1` in browser. Verify:
- Grid renders without errors
- Category tabs work
- Pagination still functions

- [ ] **Step 5: Run lint**

```bash
pnpm lint
```

Expected: No errors related to changed files
