# NumberedCardGrid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `ProcessSection` and `ValuesSection` with a single reusable `NumberedCardGrid` component.

**Architecture:** One new component at `src/components/NumberedCardGrid/index.tsx` that accepts items, title, optional subtitle/sideDescription, optional icons, and optional connector line. Both old components are deleted; their data moves inline into the respective page files.

**Tech Stack:** React, TypeScript, Tailwind CSS, shadcn Card/CardContent, @tabler/icons-react (for homepage icons)

---

### Task 1: Create the NumberedCardGrid component

**Files:**
- Create: `src/components/NumberedCardGrid/index.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// src/components/NumberedCardGrid/index.tsx
import type { ComponentType, ReactNode } from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'

type NumberedCardGridItem = {
  number: string
  title: string
  description: string
  icon?: ComponentType<{ className?: string }>
}

type NumberedCardGridProps = {
  title: string | ReactNode
  subtitle?: string
  sideDescription?: string
  items: NumberedCardGridItem[]
  className?: string
  showConnector?: boolean
}

export function NumberedCardGrid({
  title,
  subtitle,
  sideDescription,
  items,
  className,
  showConnector,
}: NumberedCardGridProps) {
  const hasRichHeader = subtitle || sideDescription

  return (
    <section className={cn('py-24', className)}>
      <div className="container">
        {hasRichHeader ? (
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              {subtitle && (
                <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                  {subtitle}
                </span>
              )}
              <h2 className={cn('font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl', subtitle && 'mt-2')}>
                {title}
              </h2>
            </div>
            {sideDescription && (
              <p className="max-w-xs text-sm text-muted-foreground">
                {sideDescription}
              </p>
            )}
          </div>
        ) : (
          <div className="mb-20 flex flex-col items-center gap-2 text-center">
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        )}

        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {showConnector && (
            <div
              aria-hidden
              className="absolute top-10 right-8 left-8 hidden h-px bg-border/50 lg:block"
            />
          )}
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.number}>
                <CardContent className="flex flex-col gap-3">
                  {Icon && (
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                  )}
                  <span className="font-heading text-5xl font-bold text-primary/20">
                    {item.number}
                  </span>
                  <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to NumberedCardGrid

- [ ] **Step 3: Commit**

```bash
git add src/components/NumberedCardGrid/index.tsx
git commit -m "feat: add NumberedCardGrid reusable component"
```

---

### Task 2: Replace ProcessSection in homepage

**Files:**
- Modify: `src/app/(frontend)/page.tsx` — replace ProcessSection import with NumberedCardGrid + inline data
- Modify: `src/components/homepage/index.ts:4` — remove ProcessSection export
- Delete: `src/components/homepage/ProcessSection.tsx`

- [ ] **Step 1: Update page.tsx — replace import and usage**

In `src/app/(frontend)/page.tsx`, replace the ProcessSection import with NumberedCardGrid and the icon imports. Change the import block from:

```tsx
import {
  HeroSection,
  PortfolioSection,
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
} from '@/components/homepage'
```

to:

```tsx
import {
  HeroSection,
  PortfolioSection,
  ServicesSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
} from '@/components/homepage'
import { NumberedCardGrid } from '@/components/NumberedCardGrid'
import {
  IconPhone,
  IconMapPin,
  IconFileDescription,
  IconHammer,
} from '@tabler/icons-react'
```

Then add the data array before the component function (after imports):

```tsx
const processSteps = [
  {
    number: '01',
    icon: IconPhone,
    title: 'Zavoláte / napíšete',
    description: 'Krátký telefonát, zjistíme co potřebujete.',
  },
  {
    number: '02',
    icon: IconMapPin,
    title: 'Přijedeme se podívat',
    description: 'Zaměření a poradenství u vás zdarma.',
  },
  {
    number: '03',
    icon: IconFileDescription,
    title: 'Návrh + cenová nabídka',
    description: 'Do 5 dnů. Bez závazku, bez skrytých nákladů.',
  },
  {
    number: '04',
    icon: IconHammer,
    title: 'Postavíme',
    description: 'Termín dodržíme. Vždy.',
  },
]
```

In the JSX, replace `<ProcessSection />` with:

```tsx
<NumberedCardGrid
  title="Bez stresu, bez překvapení."
  items={processSteps}
  showConnector
/>
```

- [ ] **Step 2: Remove ProcessSection export from barrel**

In `src/components/homepage/index.ts`, remove line 4:

```ts
export { ProcessSection } from './ProcessSection'
```

- [ ] **Step 3: Delete ProcessSection.tsx**

```bash
rm src/components/homepage/ProcessSection.tsx
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/page.tsx src/components/homepage/index.ts
git rm src/components/homepage/ProcessSection.tsx
git commit -m "refactor: replace ProcessSection with NumberedCardGrid on homepage"
```

---

### Task 3: Replace ValuesSection in about page

**Files:**
- Modify: `src/app/(frontend)/o-nas/page.tsx` — replace ValuesSection import with NumberedCardGrid + inline data
- Modify: `src/components/about/index.ts:3` — remove ValuesSection export
- Delete: `src/components/about/ValuesSection.tsx`

- [ ] **Step 1: Update o-nas/page.tsx — replace import and usage**

In `src/app/(frontend)/o-nas/page.tsx`, change the import block from:

```tsx
import {
  ProfileHeroSection,
  TimelineSection,
  ValuesSection,
  RegionSection,
  CtaBanner,
} from '@/components/about'
```

to:

```tsx
import {
  ProfileHeroSection,
  TimelineSection,
  RegionSection,
  CtaBanner,
} from '@/components/about'
import { NumberedCardGrid } from '@/components/NumberedCardGrid'
```

Then add the data array before the component function (after imports):

```tsx
const values = [
  {
    number: '01',
    title: 'Poctivý materiál',
    description:
      'Modřín, dub, smrk z Beskyd. Žádný brak, žádný eko-import. Vidíte fakturu z pily, kdykoli chcete.',
  },
  {
    number: '02',
    title: 'Tesařské spoje',
    description:
      'Tradiční vazby — čep, kampovka, rybinový spoj. Šroub až tam, kde má smysl. Konstrukce drží 80 let.',
  },
  {
    number: '03',
    title: 'Dimenze, ne zubní párátka',
    description:
      'Sloupy 14×14 cm minimum, krokve 8×16 cm. Pergola není tyčový plot — postavíme tak, aby unesla sníh.',
  },
  {
    number: '04',
    title: 'Základ jako u baráku',
    description:
      'Šroubovací piloty nebo betonové patky pod hladinu mrazu. Bez ulehčování. Bez „však ono to udrží".',
  },
]
```

In the JSX, replace `<ValuesSection />` with:

```tsx
<NumberedCardGrid
  title={
    <>
      Čtyři věci, na kterých
      <br />
      nehnu ani o píď.
    </>
  }
  subtitle="Naše hodnoty"
  sideDescription="Nejsou to slogany na zeď. Je to to, podle čeho denně rozhodujeme."
  items={values}
  className="bg-muted/50"
/>
```

- [ ] **Step 2: Remove ValuesSection export from barrel**

In `src/components/about/index.ts`, remove line 3:

```ts
export { ValuesSection } from './ValuesSection'
```

- [ ] **Step 3: Delete ValuesSection.tsx**

```bash
rm src/components/about/ValuesSection.tsx
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/app/\(frontend\)/o-nas/page.tsx src/components/about/index.ts
git rm src/components/about/ValuesSection.tsx
git commit -m "refactor: replace ValuesSection with NumberedCardGrid on about page"
```

---

### Task 4: Visual verification

- [ ] **Step 1: Start dev server**

Run: `pnpm dev`

- [ ] **Step 2: Check homepage process section**

Open `http://localhost:3000` and scroll to the "Bez stresu, bez překvapení" section. Verify:
- 4 cards with icons, numbers, titles, descriptions
- Decorative connector line visible on large screens
- Responsive grid: 1 col on mobile, 2 on sm, 4 on lg

- [ ] **Step 3: Check about page values section**

Open `http://localhost:3000/o-nas` and scroll to the "Naše hodnoty" section. Verify:
- Subtitle "NAŠE HODNOTY" visible above heading
- Side description paragraph on the right
- 4 cards with numbers, titles, descriptions (no icons)
- Muted background

- [ ] **Step 4: Run lint**

Run: `pnpm lint`
Expected: No errors in changed files
