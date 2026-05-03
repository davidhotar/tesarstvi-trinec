# Homepage Blocks Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert 5 static homepage sections into 4 Payload CMS blocks + existing FormBlock, with seed data prefilling current Czech content.

**Architecture:** Each block follows the existing pattern: config file in `src/payload/blocks/<Name>/config.ts` (Payload Block schema) and component file in `src/components/blocks/<Name>/Component.tsx` (React rendering). A shared icon map avoids duplication between ServicesSection and NumberedCardGrid blocks.

**Tech Stack:** Payload CMS v3 blocks, Next.js App Router, React Server Components, shadcn/ui, @tabler/icons-react

---

### Task 1: Shared Icon Map

**Files:**
- Create: `src/payload/blocks/shared/iconOptions.ts`
- Create: `src/components/blocks/shared/iconMap.ts`

- [ ] **Step 1: Create the Payload icon select options**

```ts
// src/payload/blocks/shared/iconOptions.ts
import type { SelectField } from 'payload'

export const iconOptions: SelectField['options'] = [
  { label: 'Fence', value: 'fence' },
  { label: 'Car Garage', value: 'car-garage' },
  { label: 'Home Plus', value: 'home-plus' },
  { label: 'Hammer', value: 'hammer' },
  { label: 'Tool', value: 'tool' },
  { label: 'Brush', value: 'brush' },
  { label: 'Ruler', value: 'ruler' },
  { label: 'Wood', value: 'wood' },
  { label: 'Tree', value: 'tree' },
  { label: 'Building', value: 'building' },
  { label: 'Door', value: 'door' },
  { label: 'Window', value: 'window' },
  { label: 'Stairs', value: 'stairs' },
  { label: 'Bolt', value: 'bolt' },
  { label: 'Paint', value: 'paint' },
  { label: 'Crane', value: 'crane' },
  { label: 'Shovel', value: 'shovel' },
  { label: 'Axe', value: 'axe' },
  { label: 'Saw', value: 'saw' },
  { label: 'Drill', value: 'drill' },
  { label: 'Home', value: 'home' },
  { label: 'Phone', value: 'phone' },
  { label: 'Map Pin', value: 'map-pin' },
  { label: 'File Description', value: 'file-description' },
  { label: 'Garden Cart', value: 'garden-cart' },
]
```

- [ ] **Step 2: Create the React icon lookup map**

```tsx
// src/components/blocks/shared/iconMap.ts
import type { ComponentType } from 'react'
import {
  IconFence,
  IconCarGarage,
  IconHomePlus,
  IconHammer,
  IconTool,
  IconBrush,
  IconRuler,
  IconWood,
  IconTree,
  IconBuilding,
  IconDoor,
  IconWindow,
  IconStairs,
  IconBolt,
  IconPaint,
  IconCrane,
  IconShovel,
  IconAxe,
  IconSaw,
  IconDrill,
  IconHome,
  IconPhone,
  IconMapPin,
  IconFileDescription,
  IconGardenCart,
} from '@tabler/icons-react'

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  'fence': IconFence,
  'car-garage': IconCarGarage,
  'home-plus': IconHomePlus,
  'hammer': IconHammer,
  'tool': IconTool,
  'brush': IconBrush,
  'ruler': IconRuler,
  'wood': IconWood,
  'tree': IconTree,
  'building': IconBuilding,
  'door': IconDoor,
  'window': IconWindow,
  'stairs': IconStairs,
  'bolt': IconBolt,
  'paint': IconPaint,
  'crane': IconCrane,
  'shovel': IconShovel,
  'axe': IconAxe,
  'saw': IconSaw,
  'drill': IconDrill,
  'home': IconHome,
  'phone': IconPhone,
  'map-pin': IconMapPin,
  'file-description': IconFileDescription,
  'garden-cart': IconGardenCart,
}
```

- [ ] **Step 3: Commit**

```bash
git add src/payload/blocks/shared/iconOptions.ts src/components/blocks/shared/iconMap.ts
git commit -m "feat: add shared icon options and icon map for CMS blocks"
```

---

### Task 2: ServicesSection Block Config

**Files:**
- Create: `src/payload/blocks/ServicesSection/config.ts`

- [ ] **Step 1: Create the block config**

```ts
// src/payload/blocks/ServicesSection/config.ts
import type { Block } from 'payload'
import { iconOptions } from '../shared/iconOptions'

export const ServicesSection: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          required: true,
        },
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
          name: 'items',
          type: 'array',
          minRows: 1,
          required: true,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'linkLabel',
          type: 'text',
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/blocks/ServicesSection/config.ts
git commit -m "feat: add ServicesSection block config"
```

---

### Task 3: ServicesSection Block Component

**Files:**
- Create: `src/components/blocks/ServicesSection/Component.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/blocks/ServicesSection/Component.tsx
import React from 'react'
import type { ServicesSectionBlock as ServicesSectionBlockProps } from '@/payload-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { iconMap } from '@/components/blocks/shared/iconMap'

export const ServicesSectionBlock: React.FC<ServicesSectionBlockProps> = ({
  title,
  services,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-20 flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {services?.map((service, index) => {
            const Icon = iconMap[service.icon]
            const number = String(index + 1).padStart(2, '0')
            return (
              <Card
                key={index}
                className="group relative transition-colors duration-200 hover:ring-primary/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon && <Icon className="size-5" />}
                    </div>
                    <span className="font-heading text-3xl font-bold text-border/60">
                      {number}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {service.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="mt-auto px-6 pb-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1">
                    {service.linkLabel || 'Více o službě'}
                    <IconArrowRight className="size-4" />
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/ServicesSection/Component.tsx
git commit -m "feat: add ServicesSection block component"
```

---

### Task 4: NumberedCardGrid Block Config

**Files:**
- Create: `src/payload/blocks/NumberedCardGrid/config.ts`

- [ ] **Step 1: Create the block config**

```ts
// src/payload/blocks/NumberedCardGrid/config.ts
import type { Block } from 'payload'
import { iconOptions } from '../shared/iconOptions'

export const NumberedCardGrid: Block = {
  slug: 'numberedCardGrid',
  interfaceName: 'NumberedCardGridBlock',
  labels: {
    singular: 'Numbered Card Grid',
    plural: 'Numbered Card Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'sideDescription',
      type: 'text',
    },
    {
      name: 'showConnector',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
        },
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
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/blocks/NumberedCardGrid/config.ts
git commit -m "feat: add NumberedCardGrid block config"
```

---

### Task 5: NumberedCardGrid Block Component

**Files:**
- Create: `src/components/blocks/NumberedCardGrid/Component.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/blocks/NumberedCardGrid/Component.tsx
import React from 'react'
import type { NumberedCardGridBlock as NumberedCardGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { iconMap } from '@/components/blocks/shared/iconMap'

export const NumberedCardGridBlock: React.FC<NumberedCardGridBlockProps> = ({
  title,
  subtitle,
  sideDescription,
  showConnector,
  items,
}) => {
  const hasRichHeader = subtitle || sideDescription

  return (
    <section className="py-24">
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
          {items?.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : undefined
            const number = String(index + 1).padStart(2, '0')
            return (
              <Card key={index}>
                <CardContent className="flex flex-col gap-3">
                  {Icon && (
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                  )}
                  <span className="font-heading text-5xl font-bold text-primary/20">
                    {number}
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

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/NumberedCardGrid/Component.tsx
git commit -m "feat: add NumberedCardGrid block component"
```

---

### Task 6: TestimonialsSection Block Config

**Files:**
- Create: `src/payload/blocks/TestimonialsSection/config.ts`

- [ ] **Step 1: Create the block config**

```ts
// src/payload/blocks/TestimonialsSection/config.ts
import type { Block } from 'payload'

export const TestimonialsSection: Block = {
  slug: 'testimonialsSection',
  interfaceName: 'TestimonialsSectionBlock',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'sourceLabel',
      type: 'text',
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/blocks/TestimonialsSection/config.ts
git commit -m "feat: add TestimonialsSection block config"
```

---

### Task 7: TestimonialsSection Block Component

**Files:**
- Create: `src/components/blocks/TestimonialsSection/Component.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/blocks/TestimonialsSection/Component.tsx
import React from 'react'
import type { TestimonialsSectionBlock as TestimonialsSectionBlockProps } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { IconStarFilled, IconBrandGoogle } from '@tabler/icons-react'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
  }
  return (parts[0]?.[0] ?? '').toUpperCase()
}

export const TestimonialsSectionBlock: React.FC<TestimonialsSectionBlockProps> = ({
  title,
  sourceLabel,
  testimonials,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          {sourceLabel && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IconBrandGoogle className="size-4" />
              {sourceLabel}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {testimonials?.map((review, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
                    <IconStarFilled key={i} className="size-4" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &bdquo;{review.text}&ldquo;
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    {review.location && (
                      <p className="text-xs text-muted-foreground">
                        {review.location}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/TestimonialsSection/Component.tsx
git commit -m "feat: add TestimonialsSection block component"
```

---

### Task 8: FAQSection Block Config

**Files:**
- Create: `src/payload/blocks/FAQSection/config.ts`

- [ ] **Step 1: Create the block config**

```ts
// src/payload/blocks/FAQSection/config.ts
import type { Block } from 'payload'

export const FAQSection: Block = {
  slug: 'faqSection',
  interfaceName: 'FAQSectionBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
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
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },
    {
      name: 'faqs',
      type: 'array',
      minRows: 1,
      maxRows: 20,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/blocks/FAQSection/config.ts
git commit -m "feat: add FAQSection block config"
```

---

### Task 9: FAQSection Block Component

**Files:**
- Create: `src/components/blocks/FAQSection/Component.tsx`

- [ ] **Step 1: Create the component**

The FAQSection uses an accordion which requires client-side interactivity. Create it as a client component.

```tsx
// src/components/blocks/FAQSection/Component.tsx
'use client'

import React from 'react'
import type { FAQSectionBlock as FAQSectionBlockProps } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IconPhone } from '@tabler/icons-react'

export const FAQSectionBlock: React.FC<FAQSectionBlockProps> = ({
  title,
  description,
  ctaLabel,
  ctaLink,
  faqs,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {ctaLabel && (
              <Button
                variant="outline"
                className="mt-6 gap-2 rounded-lg"
                {...(ctaLink ? { asChild: true } : {})}
              >
                {ctaLink ? (
                  <a href={ctaLink}>
                    <IconPhone className="size-4" />
                    {ctaLabel}
                  </a>
                ) : (
                  <>
                    <IconPhone className="size-4" />
                    {ctaLabel}
                  </>
                )}
              </Button>
            )}
          </div>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs?.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-heading font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/FAQSection/Component.tsx
git commit -m "feat: add FAQSection block component"
```

---

### Task 10: Register Blocks in Pages Collection

**Files:**
- Modify: `src/payload/collections/Pages/index.ts`

- [ ] **Step 1: Add block imports and register in layout**

Add these imports at the top of the file, after the existing block imports:

```ts
import { ServicesSection } from '@/payload/blocks/ServicesSection/config'
import { NumberedCardGrid } from '@/payload/blocks/NumberedCardGrid/config'
import { TestimonialsSection } from '@/payload/blocks/TestimonialsSection/config'
import { FAQSection } from '@/payload/blocks/FAQSection/config'
```

Then update the `blocks` array in the layout field from:

```ts
blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, HeroSection],
```

To:

```ts
blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, HeroSection, ServicesSection, NumberedCardGrid, TestimonialsSection, FAQSection],
```

- [ ] **Step 2: Commit**

```bash
git add src/payload/collections/Pages/index.ts
git commit -m "feat: register 4 new blocks in Pages collection"
```

---

### Task 11: Register Blocks in RenderBlocks

**Files:**
- Modify: `src/components/blocks/RenderBlocks.tsx`

- [ ] **Step 1: Add block component imports and register in mapper**

Add these imports after the existing block imports:

```ts
import { ServicesSectionBlock } from '@/components/blocks/ServicesSection/Component'
import { NumberedCardGridBlock } from '@/components/blocks/NumberedCardGrid/Component'
import { TestimonialsSectionBlock } from '@/components/blocks/TestimonialsSection/Component'
import { FAQSectionBlock } from '@/components/blocks/FAQSection/Component'
```

Then add the new entries to the `blockComponents` map:

```ts
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroSection: HeroSectionBlock,
  mediaBlock: MediaBlock,
  servicesSection: ServicesSectionBlock,
  numberedCardGrid: NumberedCardGridBlock,
  testimonialsSection: TestimonialsSectionBlock,
  faqSection: FAQSectionBlock,
}
```

Also update the `isFullBleed` check to include the new full-bleed sections:

```ts
const isFullBleed = ['heroSection', 'servicesSection', 'numberedCardGrid', 'testimonialsSection', 'faqSection'].includes(blockType)
```

These blocks manage their own `<section>` wrapper with padding, background, and container — they should NOT get the default `my-16` wrapper div that non-full-bleed blocks receive.

- [ ] **Step 2: Commit**

```bash
git add src/components/blocks/RenderBlocks.tsx
git commit -m "feat: register 4 new block components in RenderBlocks"
```

---

### Task 12: Update Seed Data

**Files:**
- Modify: `src/payload/endpoints/seed/home.ts`
- Modify: `src/payload/endpoints/seed/index.ts`

- [ ] **Step 1: Update `home.ts` — update function signature and add new blocks to layout**

Update the `HomeArgs` type and function signature to accept a contact form ID:

```ts
import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
  contactForm: Form
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
  contactForm,
}) => {
```

Then replace everything in the `layout` array after the hero block (remove the old content, mediaBlock, archive, and CTA blocks) with the 5 new block entries. The full layout array should be:

```ts
layout: [
  // ... keep existing hero block (blockType: 'heroSection') as-is ...
  {
    blockName: 'Services',
    blockType: 'servicesSection',
    title: 'Tři věci, které děláme nejlépe',
    services: [
      {
        icon: 'fence',
        title: 'Pergoly & terasy',
        description: 'Klasické i posuvné. Modřín, dub, smrk — podle vašeho vkusu i rozpočtu.',
        items: [
          { text: 'Návrh a vizualizace zdarma' },
          { text: 'Modřín / dub / smrk' },
          { text: 'Včetně základů a montáže' },
        ],
      },
      {
        icon: 'car-garage',
        title: 'Přístřešky & garáže',
        description: 'Auta, dřevo, technika. Funkční stavby s charakterem, ne plechové škatule.',
        items: [
          { text: 'Pro 1–4 auta' },
          { text: 'Plechová nebo šindelová střecha' },
          { text: 'Záruka 5 let' },
        ],
      },
      {
        icon: 'home-plus',
        title: 'Dřevostavby',
        description: 'Zahradní domky, sklady, drobné stavby. Od skici po klíč v ruce.',
        items: [
          { text: 'Klasický roubený styl i moderna' },
          { text: 'Bez ohlášky do 25 m²' },
          { text: 'Hotovo za 4–8 týdnů' },
        ],
      },
    ],
  },
  {
    blockName: 'Process',
    blockType: 'numberedCardGrid',
    title: 'Bez stresu, bez překvapení.',
    items: [
      {
        icon: 'phone',
        title: 'Zavoláte / napíšete',
        description: 'Krátký telefonát, zjistíme co potřebujete.',
      },
      {
        icon: 'map-pin',
        title: 'Přijedeme se podívat',
        description: 'Zaměření a poradenství u vás zdarma.',
      },
      {
        icon: 'file-description',
        title: 'Návrh + cenová nabídka',
        description: 'Do 5 dnů. Bez závazku, bez skrytých nákladů.',
      },
      {
        icon: 'hammer',
        title: 'Postavíme',
        description: 'Termín dodržíme. Vždy.',
      },
    ],
  },
  {
    blockName: 'Testimonials',
    blockType: 'testimonialsSection',
    title: '87 lidí v okolí už nám věří.',
    sourceLabel: 'napřímo z Google reviews',
    testimonials: [
      {
        name: 'Petr Krzystek',
        location: 'Bystřice n. Olší',
        text: 'Pergola jako z časopisu. Klucí byli skvělí — slušní, čistí, dochvilní. Termín do dne.',
        rating: 5,
      },
      {
        name: 'Anna Sikorová',
        location: 'Třinec, Konská',
        text: 'Měli jsme strach, že to bude drahé. Cena fér, řemeslo perfektní. Doporučuji všem v okolí.',
        rating: 5,
      },
      {
        name: 'Jakub Heczko',
        location: 'Návsí',
        text: 'Postavili nám zahradní domek. 6 týdnů, žádné zdržení, žádné navyšování. Tohle dnes neumí každý.',
        rating: 5,
      },
    ],
  },
  {
    blockName: 'Contact Form',
    blockType: 'formBlock',
    form: contactForm.id,
    enableIntro: true,
    introContent: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Řekněte, co plánujete.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Stavíme v okruhu 40 km od Třince — Bystřice, Návsí, Mosty, Jablunkov a okolí.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  {
    blockName: 'FAQ',
    blockType: 'faqSection',
    title: 'Než se zeptáte.',
    description: 'Nenašli jste odpověď? Zavolejte — rádi poradíme i bez závazku.',
    ctaLabel: 'Zavolat',
    ctaLink: 'tel:+420737136848',
    faqs: [
      {
        question: 'Kolik stojí pergola?',
        answer: 'Cena závisí na velikosti, materiálu a typu střechy. Klasická pergola 4×4 m z modřínu vychází orientačně na 80–120 tisíc. Přesnou nabídku zdarma do 5 dnů od zaměření.',
      },
      {
        question: 'Postavíte i v zimě?',
        answer: 'Ano, pracujeme celoročně. V zimě se zaměřujeme na konstrukce, které lze stavět i v mrazu.',
      },
      {
        question: 'Jaké dřevo doporučujete?',
        answer: 'Pro venkovní konstrukce doporučujeme modřín nebo dub. Pro zastřešené stavby je vhodný i smrk.',
      },
      {
        question: 'Potřebuji ohlášku nebo stavební povolení?',
        answer: 'Stavby do 25 m² a 5 m výšky zpravidla nevyžadují ohlášku. Poradíme vám s konkrétním případem.',
      },
      {
        question: 'Jak dlouho trvá realizace?',
        answer: 'Pergola typicky 5–10 dní, přístřešek 2–3 týdny, dřevostavba 4–8 týdnů. Závisí na rozsahu a počasí.',
      },
      {
        question: 'Děláte i ve svahu?',
        answer: 'Ano, máme zkušenosti se stavbami v náročném terénu. Svah vyžaduje speciální základy, které řešíme.',
      },
    ],
  },
],
```

- [ ] **Step 2: Update `index.ts` — pass contactForm to home()**

In `src/payload/endpoints/seed/index.ts`, change the home page creation call from:

```ts
payload.create({
  collection: 'pages',
  depth: 0,
  data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
}),
```

To:

```ts
payload.create({
  collection: 'pages',
  depth: 0,
  data: home({ heroImage: imageHomeDoc, metaImage: image2Doc, contactForm }),
}),
```

**Important:** The `contactForm` is created before the pages are seeded (line 181), so it's already available. But the home page creation is inside a `Promise.all` alongside the contact page. Since `contactForm` is already resolved at that point, no ordering change is needed.

- [ ] **Step 3: Commit**

```bash
git add src/payload/endpoints/seed/home.ts src/payload/endpoints/seed/index.ts
git commit -m "feat: add seed data for new homepage blocks"
```

---

### Task 13: Update Homepage and Clean Up Static Components

**Files:**
- Modify: `src/app/(frontend)/page.tsx`
- Modify: `src/components/homepage/index.ts`
- Delete: `src/components/homepage/ServicesSection.tsx`
- Delete: `src/components/homepage/TestimonialsSection.tsx`
- Delete: `src/components/homepage/ContactSection.tsx`
- Delete: `src/components/homepage/FAQSection.tsx`
- Delete: `src/components/NumberedCardGrid/index.tsx`

- [ ] **Step 1: Simplify the homepage**

Replace `src/app/(frontend)/page.tsx` with:

```tsx
import { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PortfolioSection } from '@/components/homepage'

export default async function HomePage() {
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
        equals: 'home',
      },
    },
  })

  const page = result.docs?.[0] || null

  return (
    <>
      {page?.layout && <RenderBlocks blocks={page.layout} />}
      <Suspense>
        <PortfolioSection />
      </Suspense>
    </>
  )
}
```

- [ ] **Step 2: Update the homepage barrel export**

Replace `src/components/homepage/index.ts` with:

```ts
export { HeroSection } from './HeroSection'
export { PortfolioSection } from './PortfolioSection'
```

- [ ] **Step 3: Delete old static component files**

```bash
rm src/components/homepage/ServicesSection.tsx
rm src/components/homepage/TestimonialsSection.tsx
rm src/components/homepage/ContactSection.tsx
rm src/components/homepage/FAQSection.tsx
rm -rf src/components/NumberedCardGrid/
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: replace static homepage sections with CMS blocks"
```

---

### Task 14: Generate Types and Import Map, Verify Build

**Files:**
- Regenerate: `src/payload-types.ts`
- Regenerate: `src/app/(payload)/admin/importMap.js`

- [ ] **Step 1: Generate Payload types**

```bash
pnpm generate:types
```

Expected: `src/payload-types.ts` updated with `ServicesSectionBlock`, `NumberedCardGridBlock`, `TestimonialsSectionBlock`, `FAQSectionBlock` interfaces.

- [ ] **Step 2: Generate import map**

```bash
pnpm generate:importmap
```

Expected: `src/app/(payload)/admin/importMap.js` updated.

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 4: Commit generated files**

```bash
git add src/payload-types.ts src/app/\(payload\)/admin/importMap.js
git commit -m "chore: regenerate payload types and import map"
```

---

### Task 15: Manual Verification

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Seed the database**

Visit `http://localhost:3000/api/seed` in the browser (or run `curl http://localhost:3000/api/seed`). This re-seeds all data including the new blocks.

- [ ] **Step 3: Verify the homepage**

Visit `http://localhost:3000`. All 5 sections should render:
1. Hero (existing block)
2. Services — 3 cards with icons, titles, descriptions, checklists
3. Process steps — 4 numbered cards with icons
4. Testimonials — 3 review cards with stars and initials
5. Contact form — form block with intro content
6. FAQ — accordion with 6 items

- [ ] **Step 4: Verify admin editing**

Visit `http://localhost:3000/admin/collections/pages`. Open the Home page. All new blocks should appear in the layout. Edit a field (e.g., change the services section title), save, and verify it updates on the frontend.
