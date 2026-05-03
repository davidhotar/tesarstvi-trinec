# Unified CTA Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing CtaBanner with a unified neighborly-tone CTA strip and add it to the portfolio page.

**Architecture:** Rewrite `CtaBanner.tsx` in place (keep export name), then import it in the portfolio page. Two files touched, no new files.

**Tech Stack:** React, Next.js, Tailwind CSS, @tabler/icons-react, existing Button component.

**Spec:** `docs/superpowers/specs/2026-05-03-unified-cta-strip-design.md`

---

### Task 1: Rewrite CtaBanner component

**Files:**
- Modify: `src/components/about/CtaBanner.tsx`

- [ ] **Step 1: Rewrite CtaBanner with new copy and layout**

Replace the entire contents of `src/components/about/CtaBanner.tsx` with:

```tsx
import { Button } from '@/components/ui/button'
import { IconPhone, IconStarFilled } from '@tabler/icons-react'

export function CtaBanner() {
  return (
    <section className="bg-foreground text-background">
      <div className="container flex flex-col items-center justify-between gap-6 py-16 lg:flex-row">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Stavíme v Třinci a okolí. Zavolejte sousedovi.
          </h2>
          <p className="mt-2 text-background/70">
            Poradíme, řekneme cenu, domluvíme se. Bez závazku.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full">
            <IconPhone className="size-4" />
            Zavolat Petrovi
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-background/50">
            <IconStarFilled className="size-3.5 text-amber-400" />
            4.9 · 87 hodnocení na Google
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the about page still renders**

Run: `pnpm dev` and check `/o-nas` — the CtaBanner at the bottom should show the new copy.

- [ ] **Step 3: Commit**

```bash
git add src/components/about/CtaBanner.tsx
git commit -m "feat: rewrite CtaBanner with neighborly tone and Google rating"
```

---

### Task 2: Add CtaBanner to portfolio page

**Files:**
- Modify: `src/app/(frontend)/portfolio/page.tsx`

- [ ] **Step 1: Import CtaBanner and add it after PortfolioGrid**

In `src/app/(frontend)/portfolio/page.tsx`, add the import at the top:

```tsx
import { CtaBanner } from '@/components/about'
```

Then place `<CtaBanner />` after the `<Suspense>` block wrapping PortfolioGrid, before the closing `</div>`:

```tsx
      <Suspense>
        <PortfolioGrid
          posts={posts.docs}
          categories={categories}
          initialCategorySlug={category}
        />
      </Suspense>

      <CtaBanner />
    </div>
```

- [ ] **Step 2: Verify the portfolio page renders with CTA**

Run: `pnpm dev` and check `/portfolio` — the CTA strip should appear at the bottom after the grid.

- [ ] **Step 3: Commit**

```bash
git add src/app/(frontend)/portfolio/page.tsx
git commit -m "feat: add CtaBanner to portfolio page"
```
