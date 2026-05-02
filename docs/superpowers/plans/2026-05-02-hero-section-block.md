# HeroSection Block Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a CMS-editable HeroSection Payload block that replaces the static homepage hero, reusable on any Page.

**Architecture:** New Payload block with richText (Lexical), linkGroup, backgroundImage upload, and stats array. Rendered as a full-bleed server component. Registered in Pages collection layout and RenderBlocks. Homepage migrated to fetch from Payload with static fallback.

**Tech Stack:** Payload CMS v3, Next.js App Router, TypeScript, Tailwind CSS, Lexical rich text editor

---

### Task 1: Create the HeroSection block config

**Files:**
- Create: `src/payload/blocks/HeroSection/config.ts`

- [ ] **Step 1: Create the block config file**

Create `src/payload/blocks/HeroSection/config.ts`:

```ts
import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/payload/fields/linkGroup'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Hero Sections',
    singular: 'Hero Section',
  },
}
```

- [ ] **Step 2: Verify the config compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to `src/payload/blocks/HeroSection/config.ts`

- [ ] **Step 3: Commit**

```bash
git add src/payload/blocks/HeroSection/config.ts
git commit -m "feat: add HeroSection Payload block config"
```

---

### Task 2: Register the block in Pages collection

**Files:**
- Modify: `src/payload/collections/Pages/index.ts`

- [ ] **Step 1: Add HeroSection import and register in layout blocks**

In `src/payload/collections/Pages/index.ts`, add the import at the top alongside the other block imports:

```ts
import { HeroSection } from '@/payload/blocks/HeroSection/config'
```

Then add `HeroSection` to the `layout.blocks` array (line 75):

```ts
blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, HeroSection],
```

- [ ] **Step 2: Verify the config compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Run the dev server and verify the block appears in admin**

Run: `pnpm dev`

Open `http://localhost:3000/admin/collections/pages` in the browser. Create or edit a page, go to the Content tab, click "Add Block" — the "Hero Section" block should appear in the list with its fields (richText, links, backgroundImage, stats).

- [ ] **Step 4: Commit**

```bash
git add src/payload/collections/Pages/index.ts
git commit -m "feat: register HeroSection block in Pages collection"
```

---

### Task 3: Generate Payload types

**Files:**
- Modify: `src/payload-types.ts` (auto-generated)

- [ ] **Step 1: Generate types**

Run: `pnpm generate:types`
Expected: `payload-types.ts` updated with a new `HeroSectionBlock` interface containing `richText`, `links`, `backgroundImage`, `stats`, `id`, and `blockType` fields.

- [ ] **Step 2: Generate import map**

Run: `pnpm generate:importmap`
Expected: Import map regenerated successfully.

- [ ] **Step 3: Commit**

```bash
git add src/payload-types.ts src/app/(payload)/importMap.js
git commit -m "chore: regenerate Payload types and import map for HeroSection block"
```

---

### Task 4: Create the HeroSection block component

**Files:**
- Create: `src/components/blocks/HeroSection/Component.tsx`

- [ ] **Step 1: Create the component file**

Create `src/components/blocks/HeroSection/Component.tsx`:

```tsx
import React from 'react'

import type { HeroSectionBlock as HeroSectionBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HeroSectionBlock: React.FC<HeroSectionBlockProps> = ({
  richText,
  links,
  backgroundImage,
  stats,
}) => {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[88px]">
      {backgroundImage && typeof backgroundImage === 'object' && (
        <Media fill imgClassName="object-cover object-center" priority resource={backgroundImage} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      <div className="container relative z-10 flex flex-1 items-center justify-start">
        <div className="flex max-w-2xl flex-col gap-6">
          {richText && (
            <RichText
              className="mb-0 [&_h1]:font-display [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:leading-[1.05] [&_h1]:tracking-[-0.03em] [&_h1]:text-white [&_h1]:sm:text-6xl [&_h1]:lg:text-7xl [&_p]:max-w-lg [&_p]:text-lg [&_p]:leading-[1.6] [&_p]:text-white/80 [&_p]:sm:text-xl"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {links.map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    className={
                      i === 0
                        ? 'rounded-full'
                        : 'rounded-full border-white/30 text-white hover:bg-white/10'
                    }
                    {...link}
                    appearance={i === 0 ? 'default' : 'outline'}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {Array.isArray(stats) && stats.length > 0 && (
        <div className="relative z-10 border-t border-white/10 bg-black/10 backdrop-blur-sm">
          <div className="container flex flex-wrap items-center justify-around gap-x-8 gap-y-5 py-10 lg:py-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Verify the component compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to `src/components/blocks/HeroSection/Component.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/HeroSection/Component.tsx
git commit -m "feat: add HeroSection block rendering component"
```

---

### Task 5: Register the component in RenderBlocks

**Files:**
- Modify: `src/components/blocks/RenderBlocks.tsx`

- [ ] **Step 1: Add import and register in blockComponents map**

In `src/components/blocks/RenderBlocks.tsx`, add the import at the top:

```ts
import { HeroSectionBlock } from '@/components/blocks/HeroSection/Component'
```

Add to the `blockComponents` map:

```ts
const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroSection: HeroSectionBlock,
  mediaBlock: MediaBlock,
}
```

- [ ] **Step 2: Skip the `my-16` wrapper for full-bleed blocks**

Replace the rendering logic inside the `.map()` callback. Change:

```tsx
return (
  <div className="my-16" key={index}>
    {/* @ts-expect-error there may be some mismatch between the expected types here */}
    <Block {...block} disableInnerContainer />
  </div>
)
```

To:

```tsx
const isFullBleed = blockType === 'heroSection'

if (isFullBleed) {
  return (
    <Fragment key={index}>
      {/* @ts-expect-error there may be some mismatch between the expected types here */}
      <Block {...block} />
    </Fragment>
  )
}

return (
  <div className="my-16" key={index}>
    {/* @ts-expect-error there may be some mismatch between the expected types here */}
    <Block {...block} disableInnerContainer />
  </div>
)
```

- [ ] **Step 3: Verify the component compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/blocks/RenderBlocks.tsx
git commit -m "feat: register HeroSection in RenderBlocks with full-bleed support"
```

---

### Task 6: Migrate the homepage to fetch from Payload

**Files:**
- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Update the homepage to fetch Payload data and render blocks**

Replace the contents of `src/app/(frontend)/page.tsx` with:

```tsx
import { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import {
  HeroSection,
  PortfolioSection,
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
} from '@/components/homepage'

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
  const hasPayloadHero = page?.layout && page.layout.length > 0

  return (
    <>
      {hasPayloadHero ? (
        <RenderBlocks blocks={page.layout} />
      ) : (
        <HeroSection />
      )}
      <Suspense>
        <PortfolioSection />
      </Suspense>
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
    </>
  )
}
```

This approach:
- Fetches the `home` page from Payload
- If the page has layout blocks, renders them via `RenderBlocks` (which will include the HeroSection block)
- Falls back to the static `<HeroSection />` if no Payload page exists or has no blocks
- Keeps all other static sections unchanged

- [ ] **Step 2: Verify the page compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/(frontend)/page.tsx
git commit -m "feat: migrate homepage to fetch hero from Payload with static fallback"
```

---

### Task 7: End-to-end verification

**Files:** None (testing only)

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`
Expected: Server starts without errors on `http://localhost:3000`

- [ ] **Step 2: Verify static fallback works**

Open `http://localhost:3000` in the browser. If no `home` page exists in Payload yet (or it has no layout blocks), the static HeroSection should render as before — full-viewport hero with "Dřevo, které přežije generace" heading, buttons, and stats strip.

- [ ] **Step 3: Create a home page with HeroSection block in admin**

1. Go to `http://localhost:3000/admin/collections/pages`
2. Create a new page with title "Home" and slug "home"
3. In the Hero tab, set type to "None" (we're using the block instead)
4. In the Content tab, add a "Hero Section" block
5. Fill in:
   - richText: Add an H1 heading and a paragraph
   - links: Add 1-2 links with labels
   - backgroundImage: Upload an image
   - stats: Add 2-3 stat items with value and label
6. Save/publish the page

- [ ] **Step 4: Verify the CMS-driven hero renders**

Open `http://localhost:3000` — the hero should now render from Payload data instead of the static fallback. Verify:
- Background image displays full-viewport
- RichText heading and paragraph render with correct white text styling
- CTA buttons render with correct primary/outline styling
- Stats strip renders at the bottom with correct layout

- [ ] **Step 5: Verify on other pages**

Edit any other page in Payload admin, add a HeroSection block to its layout, and verify it renders correctly on that page's URL.

- [ ] **Step 6: Commit any remaining fixes**

If any styling adjustments were needed during testing, commit them:

```bash
git add -A
git commit -m "fix: HeroSection block styling adjustments from testing"
```
