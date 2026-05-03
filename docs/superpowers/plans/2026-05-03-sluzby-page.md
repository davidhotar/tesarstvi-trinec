# Služby Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a CMS-driven `/sluzby` page with a compact hero, anchor navigation, and deep-dive service blocks (two layout variants) using Payload CMS blocks.

**Architecture:** Two new Payload blocks (ServiceHero, ServiceDeepDive) with configs and React components, plus a client-side anchor nav component. The page route fetches CMS data and splits the block array to insert the anchor nav between hero and service sections. Reuses existing CtaBanner and FAQSection blocks.

**Tech Stack:** Payload CMS v3, Next.js App Router (RSC), Tailwind CSS v4, shadcn/ui (radix-luma), Tabler Icons

**Spec:** `docs/superpowers/specs/2026-05-03-sluzby-page-design.md`

---

## File Map

### Create
| File | Responsibility |
|------|---------------|
| `src/payload/blocks/ServiceHero/config.ts` | Payload block schema for compact hero strip |
| `src/components/blocks/ServiceHero/Component.tsx` | React component rendering the hero |
| `src/payload/blocks/ServiceDeepDive/config.ts` | Payload block schema for deep-dive service section |
| `src/components/blocks/ServiceDeepDive/Component.tsx` | React component with showcase/gallery variants |
| `src/components/ServiceAnchorNav.tsx` | Client component with sticky anchor links |
| `src/app/(frontend)/sluzby/page.tsx` | Page route fetching CMS data |

### Modify
| File | Change |
|------|--------|
| `src/collections/Pages/index.ts` | Import and add both new blocks to `layout.blocks` array |
| `src/components/blocks/RenderBlocks.tsx` | Import and register both new block components |

---

### Task 1: ServiceHero block config

**Files:**
- Create: `src/payload/blocks/ServiceHero/config.ts`

- [ ] **Step 1: Create the block config**

```ts
// src/payload/blocks/ServiceHero/config.ts
import type { Block } from 'payload'

export const ServiceHero: Block = {
  slug: 'serviceHero',
  interfaceName: 'ServiceHeroBlock',
  labels: {
    singular: 'Service Hero',
    plural: 'Service Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Small uppercase label above the heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'text',
      admin: {
        description: 'Stats or trust line displayed on the right (e.g. "10 let · 142 realizací")',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Konzultace zdarma',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/kontakt',
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/blocks/ServiceHero/config.ts
git commit -m "feat: add ServiceHero block config"
```

---

### Task 2: ServiceDeepDive block config

**Files:**
- Create: `src/payload/blocks/ServiceDeepDive/config.ts`

- [ ] **Step 1: Create the block config**

```ts
// src/payload/blocks/ServiceDeepDive/config.ts
import type { Block } from 'payload'

export const ServiceDeepDive: Block = {
  slug: 'serviceDeepDive',
  interfaceName: 'ServiceDeepDiveBlock',
  labels: {
    singular: 'Service Deep Dive',
    plural: 'Service Deep Dives',
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        description: 'Display number (e.g. "01", "02", "03")',
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Label pill (e.g. "Bestseller · 60 % naší práce")',
      },
    },
    {
      name: 'badgeVariant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Accent', value: 'accent' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      options: [
        { label: 'Showcase (cards + image/checklist)', value: 'showcase' },
        { label: 'Gallery (checklist + image grid)', value: 'gallery' },
      ],
    },
    {
      name: 'subServices',
      type: 'array',
      admin: {
        initCollapsed: true,
        condition: (_, siblingData) => siblingData?.variant === 'showcase',
        description: 'Sub-service cards (showcase variant)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'checklist',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'V ceně vždy:',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'tip',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'gallery',
        description: 'Optional tip callout (gallery variant)',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Chci nezávaznou nabídku',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/kontakt',
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Muted', value: 'muted' },
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/blocks/ServiceDeepDive/config.ts
git commit -m "feat: add ServiceDeepDive block config"
```

---

### Task 3: Register blocks in Pages collection

**Files:**
- Modify: `src/collections/Pages/index.ts`

- [ ] **Step 1: Add imports for both new blocks**

Add these imports alongside the existing block imports:

```ts
import { ServiceHero } from '@/payload/blocks/ServiceHero/config'
import { ServiceDeepDive } from '@/payload/blocks/ServiceDeepDive/config'
```

- [ ] **Step 2: Add blocks to the layout field's `blocks` array**

In the `layout` field's `blocks` array, add `ServiceHero` and `ServiceDeepDive` alongside the existing entries:

```ts
blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, HeroSection, ServicesSection, NumberedCardGrid, TestimonialsSection, FAQSection, PortfolioSection, ProfileHeroSection, TimelineSection, RegionSection, CtaBanner, ContactHeroSection, ServiceHero, ServiceDeepDive],
```

- [ ] **Step 3: Commit**

```bash
git add src/collections/Pages/index.ts
git commit -m "feat: register ServiceHero and ServiceDeepDive in Pages collection"
```

---

### Task 4: Generate types

- [ ] **Step 1: Run type generation**

```bash
pnpm generate:types
```

Expected: `src/payload-types.ts` is updated with `ServiceHeroBlock` and `ServiceDeepDiveBlock` interfaces.

- [ ] **Step 2: Verify the generated types exist**

```bash
grep -n 'ServiceHeroBlock\|ServiceDeepDiveBlock' src/payload-types.ts | head -10
```

Expected: Lines defining both interfaces appear in the output.

- [ ] **Step 3: Commit generated types**

```bash
git add src/payload-types.ts
git commit -m "chore: regenerate types for ServiceHero and ServiceDeepDive blocks"
```

---

### Task 5: ServiceHero component

**Files:**
- Create: `src/components/blocks/ServiceHero/Component.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/blocks/ServiceHero/Component.tsx
import React from 'react'
import Link from 'next/link'
import type { ServiceHeroBlock as ServiceHeroBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { IconPhone } from '@tabler/icons-react'

export const ServiceHeroBlock: React.FC<ServiceHeroBlockProps> = ({
  eyebrow,
  heading,
  note,
  ctaLabel,
  ctaLink,
}) => {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {eyebrow && (
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-2 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            {note && (
              <span className="text-sm text-muted-foreground">{note}</span>
            )}
            {ctaLabel && ctaLink && (
              <Button size="lg" className="rounded-full" asChild>
                <Link href={ctaLink}>
                  <IconPhone data-icon="inline-start" />
                  {ctaLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/ServiceHero/Component.tsx
git commit -m "feat: add ServiceHero component"
```

---

### Task 6: ServiceDeepDive component

**Files:**
- Create: `src/components/blocks/ServiceDeepDive/Component.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/blocks/ServiceDeepDive/Component.tsx
import React from 'react'
import Link from 'next/link'
import type { ServiceDeepDiveBlock as ServiceDeepDiveBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { IconCheck } from '@tabler/icons-react'

const Checklist: React.FC<{
  heading?: string | null
  items?: Array<{ text: string; id?: string | null }> | null
}> = ({ heading, items }) => {
  if (!items?.length) return null
  return (
    <div>
      {heading && (
        <h3 className="font-heading text-lg font-semibold">{heading}</h3>
      )}
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

const ShowcaseContent: React.FC<Pick<ServiceDeepDiveBlockProps, 'subServices' | 'images' | 'checklist'>> = ({
  subServices,
  images,
  checklist,
}) => {
  return (
    <>
      {subServices && subServices.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {subServices.map((sub, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold">
                  {sub.title}
                </CardTitle>
                <CardDescription>{sub.description}</CardDescription>
              </CardHeader>
              {sub.tags && sub.tags.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sub.tags.map((t, j) => (
                      <Badge key={j} variant="outline">
                        {t.tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {(images?.length || checklist?.items?.length) && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          {images?.[0] && typeof images[0].image === 'object' && (
            <div className="overflow-hidden rounded-xl">
              <Media
                resource={images[0].image}
                imgClassName="w-full object-cover"
              />
              {images[0].caption && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {images[0].caption}
                </p>
              )}
            </div>
          )}
          <Checklist heading={checklist?.heading} items={checklist?.items} />
        </div>
      )}
    </>
  )
}

const GalleryContent: React.FC<Pick<ServiceDeepDiveBlockProps, 'images' | 'checklist' | 'tip'>> = ({
  images,
  checklist,
  tip,
}) => {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <Checklist heading={checklist?.heading} items={checklist?.items} />
        {images && images.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              typeof img.image === 'object' && (
                <div key={i} className="overflow-hidden rounded-xl">
                  <Media
                    resource={img.image}
                    imgClassName="w-full object-cover"
                  />
                  {img.caption && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {img.caption}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {tip?.text && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border-2 border-dashed border-border p-4">
          <IconCheck className="size-5 shrink-0 text-primary" />
          <p className="text-sm">
            <strong>Tip:</strong> {tip.text}
          </p>
        </div>
      )}
    </>
  )
}

export const ServiceDeepDiveBlock: React.FC<ServiceDeepDiveBlockProps> = ({
  number,
  badge,
  badgeVariant,
  title,
  description,
  variant,
  subServices,
  images,
  checklist,
  tip,
  ctaLabel,
  ctaLink,
  background,
}) => {
  return (
    <section
      id={`service-${number}`}
      className={cn(
        'py-16 lg:py-20',
        background === 'muted' ? 'bg-muted/50' : 'bg-background',
      )}
    >
      <div className="container">
        <div className="flex gap-8 lg:gap-12">
          {/* Numbered sidebar */}
          <div className="hidden shrink-0 flex-col items-center md:flex" style={{ width: 60 }}>
            <span className="font-heading text-5xl font-bold text-primary">
              {number}
            </span>
            <div className="mt-3 w-px flex-1 border-l-2 border-dashed border-border" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Mobile number */}
            <span className="mb-4 block font-heading text-4xl font-bold text-primary md:hidden">
              {number}
            </span>

            {badge && (
              <Badge
                variant={badgeVariant === 'accent' ? 'default' : 'secondary'}
                className="mb-3"
              >
                {badge}
              </Badge>
            )}

            <h2 className="font-heading text-3xl font-bold leading-tight lg:text-5xl">
              {title}
            </h2>

            {description && (
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            {variant === 'showcase' ? (
              <ShowcaseContent
                subServices={subServices}
                images={images}
                checklist={checklist}
              />
            ) : (
              <GalleryContent
                images={images}
                checklist={checklist}
                tip={tip}
              />
            )}

            {ctaLabel && ctaLink && (
              <div className="mt-8">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href={ctaLink}>{ctaLabel}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/ServiceDeepDive/Component.tsx
git commit -m "feat: add ServiceDeepDive component with showcase/gallery variants"
```

---

### Task 7: ServiceAnchorNav client component

**Files:**
- Create: `src/components/ServiceAnchorNav.tsx`

- [ ] **Step 1: Create the client component**

```tsx
// src/components/ServiceAnchorNav.tsx
'use client'

import React from 'react'
import Link from 'next/link'

type ServiceAnchorNavProps = {
  services: Array<{ number: string; title: string }>
}

export const ServiceAnchorNav: React.FC<ServiceAnchorNavProps> = ({ services }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, number: string) => {
    e.preventDefault()
    const el = document.getElementById(`service-${number}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex items-center gap-6 overflow-x-auto py-3 text-sm">
        <span className="shrink-0 text-xs text-muted-foreground">Skok na:</span>
        {services.map((service) => (
          <a
            key={service.number}
            href={`#service-${service.number}`}
            onClick={(e) => handleClick(e, service.number)}
            className="shrink-0 font-medium transition-colors hover:text-primary"
          >
            {service.number} {service.title}
          </a>
        ))}
        <Link
          href="/kontakt"
          className="ml-auto shrink-0 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Nevíte, co potřebujete?{' '}
          <span className="text-primary">→ Poradíme</span>
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ServiceAnchorNav.tsx
git commit -m "feat: add ServiceAnchorNav client component"
```

---

### Task 8: Register components in RenderBlocks

**Files:**
- Modify: `src/components/blocks/RenderBlocks.tsx`

- [ ] **Step 1: Add imports**

Add these imports alongside the existing block component imports:

```ts
import { ServiceHeroBlock } from '@/components/blocks/ServiceHero/Component'
import { ServiceDeepDiveBlock } from '@/components/blocks/ServiceDeepDive/Component'
```

- [ ] **Step 2: Add to blockComponents map**

Add to the `blockComponents` object:

```ts
serviceHero: ServiceHeroBlock,
serviceDeepDive: ServiceDeepDiveBlock,
```

- [ ] **Step 3: Add to isFullBleed array**

Add `'serviceHero'` and `'serviceDeepDive'` to the `isFullBleed` array:

```ts
const isFullBleed = ['heroSection', 'servicesSection', 'numberedCardGrid', 'testimonialsSection', 'faqSection', 'portfolioSection', 'profileHeroSection', 'timelineSection', 'regionSection', 'ctaBanner', 'contactHeroSection', 'serviceHero', 'serviceDeepDive'].includes(blockType)
```

- [ ] **Step 4: Commit**

```bash
git add src/components/blocks/RenderBlocks.tsx
git commit -m "feat: register ServiceHero and ServiceDeepDive in RenderBlocks"
```

---

### Task 9: Create sluzby page route

**Files:**
- Create: `src/app/(frontend)/sluzby/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// src/app/(frontend)/sluzby/page.tsx
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ServiceAnchorNav } from '@/components/ServiceAnchorNav'

export const metadata: Metadata = {
  title: 'Služby',
  description:
    'Pergoly, přístřešky a dřevostavby na míru. Rodinná tesařská firma z Třince s více než 10 lety zkušeností.',
}

export default async function SluzbyPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: 'sluzby',
      },
    },
  })

  const page = result.docs?.[0] || null
  const blocks = page?.layout || []

  const firstServiceIndex = blocks.findIndex(
    (b) => b.blockType === 'serviceDeepDive',
  )
  const heroBlocks = firstServiceIndex > 0 ? blocks.slice(0, firstServiceIndex) : []
  const restBlocks = firstServiceIndex >= 0 ? blocks.slice(firstServiceIndex) : blocks

  const services = blocks
    .filter((b): b is Extract<typeof b, { blockType: 'serviceDeepDive' }> =>
      b.blockType === 'serviceDeepDive',
    )
    .map((b) => ({ number: b.number, title: b.title }))

  return (
    <>
      {heroBlocks.length > 0 && <RenderBlocks blocks={heroBlocks} />}
      {services.length > 0 && <ServiceAnchorNav services={services} />}
      {restBlocks.length > 0 && <RenderBlocks blocks={restBlocks} />}
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(frontend)/sluzby/page.tsx
git commit -m "feat: add sluzby page route with anchor nav integration"
```

---

### Task 10: Generate importmap and verify build

- [ ] **Step 1: Generate importmap**

```bash
pnpm generate:importmap
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No type errors related to the new blocks/components. Fix any issues before proceeding.

- [ ] **Step 3: Run lint**

```bash
pnpm lint
```

Expected: No lint errors in the new files. Fix any issues.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve type and lint issues in sluzby page implementation"
```

(Skip this step if no fixes needed.)

---

### Task 11: Start dev server and verify

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Create the sluzby page in Payload admin**

Navigate to `http://localhost:3000/admin/collections/pages/create` and create a new page with:
- Title: "Služby"
- Slug: "sluzby"

Add these blocks in order:

**Block 1 — Service Hero:**
- Eyebrow: "Naše služby"
- Heading: "Tři věci, které děláme poctivě a celé."
- Note: "10 let · 142 realizací · MS kraj"
- CTA Label: "Konzultace zdarma"
- CTA Link: "/kontakt"

**Block 2 — Service Deep Dive (Pergoly):**
- Number: "01"
- Badge: "Bestseller · 60 % naší práce"
- Badge Variant: Accent
- Title: "Pergoly & terasy"
- Description: "Klasické posezení, posuvná střecha nebo bioklima. Modřín, dub, smrk. Vše s 3D návrhem a poctivými vazbami. Postavíme i na svahu, na terase, na betonu i v zemi."
- Variant: Showcase
- Sub-services:
  1. Title: "Pergoly otevřené", Description: "Klasická konstrukce, šikmá nebo plochá střecha. Ideál pro grilování a posezení.", Tags: Modřín, Dub, Smrk
  2. Title: "Pergoly s posuvnou střechou", Description: "Lamelová nebo posuvná. Stín nebo slunce — vy si vyberete.", Tags: Hliník, Dřevo, Mix
  3. Title: "Terasy & podlahy", Description: "Modřínová prkna, kompozit nebo termodřevo. Včetně podloží.", Tags: 25 m²+, Zábradlí, Schody
- Images: Upload 1 representative pergola photo
- Checklist heading: "V ceně vždy:"
- Checklist items: 3D návrh + vizualizace, Statický posudek, Doprava materiálu, Základy / kotvení, Montáž a úklid, Lazura/olej dle volby, Záruka 5 let na konstrukci
- CTA Label: "Chci nezávaznou nabídku"
- CTA Link: "/kontakt"
- Background: Default

**Block 3 — Service Deep Dive (Přístřešky):**
- Number: "02"
- Badge: "Praktická volba"
- Badge Variant: Default
- Title: "Přístřešky & garáže"
- Description: "Pro auta, dřevo, traktor, chovatelské potřeby. Otevřené přístřešky i uzavřené garáže. Šindel, plech nebo bobrovka — pojďme vybrat."
- Variant: Gallery
- Images: Upload 4 photos (2x2 grid)
- Checklist heading: "Co stavíme:"
- Checklist items: Přístřešek 1 auto, Přístřešek 2 auta (nejčastější), Přístřešek 3–4 auta + dílna, Uzavřená garáž s vraty, Přístřešek na dřevo, Stojan na kola/koloběžky
- Tip text: "Přístřešek na 2 auta s technickou místností (kola, sekačka, dřevo) — to je nejlepší poměr cena/užitek. Mluvte si o ní s námi."
- CTA Label: "Chci nabídku na přístřešek"
- CTA Link: "/kontakt"
- Background: Muted

**Block 4 — Service Deep Dive (Dřevostavby):**
- Number: "03"
- Badge: "Na míru"
- Badge Variant: Default
- Title: "Dřevostavby & domky"
- Description: "Zahradní domky, sklady, sauny, pracovny, hostovské „tiny" domky. Klasický roubený styl i čistý moderní design. Do 25 m² bez ohlášky, větší stavby s naším projektantem."
- Variant: Showcase
- Sub-services:
  1. Title: "Zahradní domek", Description: "Roubený styl nebo moderní design. Od 4×3 m.", Tags: Modřín, Smrk
  2. Title: "Sauna venkovní", Description: "Na 2–4 osoby. Kompletní včetně vybavení.", Tags: Finská, Sudová
  3. Title: "Pracovna v zahradě", Description: "Zateplená, celoroční. Ideální jako home office.", Tags: Zateplená, Elektřina
  4. Title: "Sklad / dílna", Description: "Praktické řešení do 25 m² bez ohlášky.", Tags: Do 25 m², Ohlášení
- Images: Upload 1 representative photo
- Checklist heading: "Součástí každé stavby:"
- Checklist items: Zaměření a projekt, Výběr materiálu, Kompletní realizace, Pomoc s ohláškou/povolením
- CTA Label: "Chci dřevostavbu na míru"
- CTA Link: "/kontakt"
- Background: Default

**Block 5 — CTA Banner (existing):**
- Title: "Nevíte, co potřebujete?"
- Description: "Zavolejte. Pavel vám za 5 minut řekne, co je pro vás nejlepší."
- CTA Label: "Zavolat"
- CTA Link: "tel:+420737136848"

**Block 6 — FAQ Section (existing):**
- Title: "To, co se ptáte."
- Description: "Otázky ke službám"
- FAQs:
  1. Q: "Jaký je rozdíl mezi pergolou a přístřeškem?" A: "Pergola = posezení, často vedle domu, otevřená. Přístřešek = kryje něco konkrétního (auto, dřevo). Konstrukčně jsou si blízko, my je děláme oboje."
  2. Q: "Co všechno je v ceně?" A: "Vždy návrh, materiál, doprava, montáž a finální povrchovou úpravu. Konkrétní rozsah závisí na typu stavby — vše vám upřesníme v nabídce."
  3. Q: "Postavíte i mimo Třinec?" A: "Ano, stavíme po celém Moravskoslezském kraji. Nejčastěji Třinec, Frýdek-Místek, Český Těšín a okolí."
  4. Q: "Můžu si vybrat dřevo přímo na pile?" A: "Samozřejmě. Rádi vás vezmeme na pilu, kde si materiál vyberete osobně."
  5. Q: "Co když chci kombinaci (pergola + přístřešek)?" A: "To děláme běžně. Často je to i výhodnější — ušetříte na společných základech a konstrukci."

Publish the page.

- [ ] **Step 3: Verify the page at http://localhost:3000/sluzby**

Check:
- Hero renders with eyebrow, heading, note, and CTA button
- Anchor nav appears with 3 service links and "Poradíme" link
- Service 01 (Pergoly) shows showcase layout: sub-service cards + image/checklist
- Service 02 (Přístřešky) shows gallery layout: checklist + image grid + tip
- Service 03 (Dřevostavby) shows showcase layout: sub-service cards + image/checklist
- CTA banner renders in dark theme
- FAQ section renders with accordion
- Anchor nav links scroll to correct sections
- Page is responsive at mobile/tablet/desktop breakpoints

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete sluzby page with CMS blocks and content"
```
