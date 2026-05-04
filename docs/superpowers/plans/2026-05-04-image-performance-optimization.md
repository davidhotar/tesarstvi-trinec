# Image & Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce image load times by ~60-80% and improve frontend bundle efficiency through proper image sizing, modern formats, and code splitting.

**Architecture:** Use Payload's pre-generated image sizes as source URLs (instead of originals), enable AVIF/WebP via Next.js config, code-split below-fold blocks with next/dynamic, and add content-visibility CSS for off-screen sections.

**Tech Stack:** Next.js 16, Payload CMS 3.82, next/image, next/dynamic, Cloudflare R2, Tailwind CSS v4

---

### Task 1: Next.js Image Config

**Files:**
- Modify: `next.config.ts:14-42`

- [ ] **Step 1: Add image optimization settings**

In `next.config.ts`, add `formats`, `deviceSizes`, `imageSizes`, and `minimumCacheTTL` to the existing `images` config:

```ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 900, 1200, 1920],
    imageSizes: [300, 500, 600],
    minimumCacheTTL: 31536000,
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
    remotePatterns: [
      {
        hostname: '*.r2.cloudflarestorage.com',
        protocol: 'https',
      },
      {
        hostname: '*.public.blob.vercel-storage.com',
        protocol: 'https',
      },
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
```

- [ ] **Step 2: Verify config is valid**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "perf: add AVIF/WebP formats and optimized image sizes to Next.js config"
```

---

### Task 2: Media Types — Add `preferredSize` Prop

**Files:**
- Modify: `src/components/Media/types.ts:6-22`

- [ ] **Step 1: Add preferredSize to Props type**

In `src/components/Media/types.ts`, add the `preferredSize` property to the `Props` interface:

```ts
import type { StaticImageData } from 'next/image'
import type { ElementType, Ref } from 'react'

import type { Media as MediaType } from '@/payload-types'

export type PreferredImageSize = 'thumbnail' | 'square' | 'small' | 'medium' | 'large' | 'xlarge'

export interface Props {
  alt?: string
  className?: string
  fill?: boolean // for NextImage only
  htmlElement?: ElementType | null
  pictureClassName?: string
  imgClassName?: string
  onClick?: () => void
  onLoad?: () => void
  loading?: 'lazy' | 'eager' // for NextImage only
  preferredSize?: PreferredImageSize
  priority?: boolean // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
  resource?: MediaType | string | number | null // for Payload media
  size?: string // for NextImage only
  src?: StaticImageData // for static media
  videoClassName?: string
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Media/types.ts
git commit -m "feat: add preferredSize type to Media props"
```

---

### Task 3: ImageMedia — Use Payload Sizes + quality={80}

**Files:**
- Modify: `src/components/Media/ImageMedia/index.tsx:48-103`

- [ ] **Step 1: Update ImageMedia to use preferredSize**

Replace the component function in `src/components/Media/ImageMedia/index.tsx` (lines 48-103) with the code below. Note: we rename the responsive `sizes` variable to `responsiveSizes` to avoid shadowing the destructured `sizes` from `resource`:

```tsx
export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    preferredSize,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth, sizes } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const preferred = preferredSize && sizes?.[preferredSize]
    if (preferred?.url) {
      src = getMediaUrl(preferred.url)
      if (preferred.width) width = preferred.width
      if (preferred.height) height = preferred.height
    } else {
      src = getMediaUrl(url)
    }
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  const responsiveSizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder="blur"
        blurDataURL={placeholderBlur}
        priority={priority}
        quality={80}
        loading={loading}
        sizes={responsiveSizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Media/ImageMedia/index.tsx
git commit -m "perf: use Payload pre-generated sizes and quality=80 in ImageMedia"
```

---

### Task 4: Media Wrapper — Pass `preferredSize` Through

**Files:**
- Modify: `src/components/Media/index.tsx:8-25`

- [ ] **Step 1: Pass preferredSize to ImageMedia**

The `Media` wrapper already spreads all props via `{...props}` to both `ImageMedia` and `VideoMedia`, so `preferredSize` is already passed through. No code change needed — verify with a type check.

Run: `npx tsc --noEmit`
Expected: No type errors (since `preferredSize` is already in the shared `Props` type and `{...props}` forwards it)

- [ ] **Step 2: Commit (skip if no changes)**

No code changes needed. This task confirms the passthrough works.

---

### Task 5: Block-Level Size Hints — Hero Blocks (xlarge)

**Files:**
- Modify: `src/components/blocks/HeroSection/Component.tsx:18`
- Modify: `src/components/blocks/ContactHeroSection/Component.tsx:93-96`
- Modify: `src/components/blocks/ProfileHeroSection/Component.tsx:61-63,84-87`
- Modify: `src/components/heros/PortfolioHero/index.tsx:24`

- [ ] **Step 1: HeroSection — add preferredSize="xlarge"**

In `src/components/blocks/HeroSection/Component.tsx`, line 18, change:

```tsx
<Media fill imgClassName="object-cover object-center" priority resource={backgroundImage} />
```

to:

```tsx
<Media fill imgClassName="object-cover object-center" preferredSize="xlarge" priority resource={backgroundImage} />
```

- [ ] **Step 2: ContactHeroSection — add preferredSize="large"**

In `src/components/blocks/ContactHeroSection/Component.tsx`, lines 93-96, change:

```tsx
<Media
  resource={heroImage}
  imgClassName="h-[360px] w-full rounded-xl object-cover lg:h-[440px]"
/>
```

to:

```tsx
<Media
  resource={heroImage}
  imgClassName="h-[360px] w-full rounded-xl object-cover lg:h-[440px]"
  preferredSize="large"
/>
```

- [ ] **Step 3: ProfileHeroSection — add preferredSize**

In `src/components/blocks/ProfileHeroSection/Component.tsx`, lines 61-63, change the person image:

```tsx
<Media
  resource={personImage}
  imgClassName="size-14 shrink-0 rounded-full object-cover"
/>
```

to:

```tsx
<Media
  resource={personImage}
  imgClassName="size-14 shrink-0 rounded-full object-cover"
  preferredSize="thumbnail"
/>
```

And lines 85-87, change the hero image:

```tsx
<Media
  resource={heroImage}
  imgClassName="h-[420px] w-full rounded-xl object-cover lg:h-[520px]"
/>
```

to:

```tsx
<Media
  resource={heroImage}
  imgClassName="h-[420px] w-full rounded-xl object-cover lg:h-[520px]"
  preferredSize="xlarge"
/>
```

- [ ] **Step 4: PortfolioHero — add preferredSize="xlarge"**

In `src/components/heros/PortfolioHero/index.tsx`, line 24, change:

```tsx
<Media fill priority imgClassName="object-cover" resource={heroImage} />
```

to:

```tsx
<Media fill priority imgClassName="object-cover" preferredSize="xlarge" resource={heroImage} />
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 6: Commit**

```bash
git add src/components/blocks/HeroSection/Component.tsx src/components/blocks/ContactHeroSection/Component.tsx src/components/blocks/ProfileHeroSection/Component.tsx src/components/heros/PortfolioHero/index.tsx
git commit -m "perf: add preferredSize hints to hero block Media components"
```

---

### Task 6: Block-Level Size Hints — Content Blocks (medium/large)

**Files:**
- Modify: `src/components/blocks/MediaBlock/Component.tsx:46-50`
- Modify: `src/components/blocks/ServiceDeepDive/Component.tsx:70-72,102-104`
- Modify: `src/components/blocks/RegionSection/Component.tsx:43-45`
- Modify: `src/components/blocks/ContactFormSection/Component.tsx:36-38`
- Modify: `src/components/Card/index.tsx:52-56`

- [ ] **Step 1: MediaBlock — add preferredSize="large"**

In `src/components/blocks/MediaBlock/Component.tsx`, lines 46-50, change:

```tsx
<Media
  imgClassName={cn('border border-border rounded-xl', imgClassName)}
  resource={media}
  src={staticImage}
/>
```

to:

```tsx
<Media
  imgClassName={cn('border border-border rounded-xl', imgClassName)}
  preferredSize="large"
  resource={media}
  src={staticImage}
/>
```

- [ ] **Step 2: ServiceDeepDive — add preferredSize="medium" to both image locations**

In `src/components/blocks/ServiceDeepDive/Component.tsx`, the `ShowcaseContent` component, lines 70-72, change:

```tsx
<Media
  resource={images[0].image}
  imgClassName="w-full object-cover"
/>
```

to:

```tsx
<Media
  resource={images[0].image}
  imgClassName="w-full object-cover"
  preferredSize="medium"
/>
```

And in the `GalleryContent` component, lines 102-104, change:

```tsx
<Media
  resource={img.image}
  imgClassName="w-full object-cover"
/>
```

to:

```tsx
<Media
  resource={img.image}
  imgClassName="w-full object-cover"
  preferredSize="medium"
/>
```

- [ ] **Step 3: RegionSection — add preferredSize="medium"**

In `src/components/blocks/RegionSection/Component.tsx`, lines 43-45, change:

```tsx
<Media
  resource={mapImage}
  imgClassName="h-[320px] w-full rounded-xl object-cover lg:h-[380px]"
/>
```

to:

```tsx
<Media
  resource={mapImage}
  imgClassName="h-[320px] w-full rounded-xl object-cover lg:h-[380px]"
  preferredSize="medium"
/>
```

- [ ] **Step 4: ContactFormSection — add preferredSize="medium"**

In `src/components/blocks/ContactFormSection/Component.tsx`, lines 36-38, change:

```tsx
<Media
  resource={mapImage}
  imgClassName="h-[280px] w-full rounded-xl object-cover lg:h-[320px]"
/>
```

to:

```tsx
<Media
  resource={mapImage}
  imgClassName="h-[280px] w-full rounded-xl object-cover lg:h-[320px]"
  preferredSize="medium"
/>
```

- [ ] **Step 5: Card — add preferredSize="medium"**

In `src/components/Card/index.tsx`, lines 52-56, change:

```tsx
<Media
  fill
  imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
  resource={cardImage}
/>
```

to:

```tsx
<Media
  fill
  imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
  preferredSize="medium"
  resource={cardImage}
/>
```

- [ ] **Step 6: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 7: Commit**

```bash
git add src/components/blocks/MediaBlock/Component.tsx src/components/blocks/ServiceDeepDive/Component.tsx src/components/blocks/RegionSection/Component.tsx src/components/blocks/ContactFormSection/Component.tsx src/components/Card/index.tsx
git commit -m "perf: add preferredSize hints to content block Media components"
```

---

### Task 7: Logo Component — Convert to next/image

**Files:**
- Modify: `src/components/Logo/Logo.tsx:1-29`

- [ ] **Step 1: Convert Logo to use next/image**

Replace `src/components/Logo/Logo.tsx` entirely:

```tsx
import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

interface Props {
  className?: string
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { priority, className } = props

  return (
    <NextImage
      alt="TESARSTVI TRINEC"
      width={867}
      height={216}
      priority={priority}
      quality={80}
      className={cn('max-w-[12rem] w-full h-auto', className)}
      src="/images/logo.png"
    />
  )
}
```

- [ ] **Step 2: Check for Logo usages that pass old props**

Run: `grep -rn "Logo" src/components/Header/ src/components/Footer/ --include="*.tsx" | grep -v "import"` to find all Logo usages and verify they don't pass the removed `loading` or old `priority` props.

If any usage passes `loading="eager"` or `priority="high"`, update it to pass `priority={true}` instead.

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/components/Logo/Logo.tsx
git commit -m "perf: convert Logo to next/image for automatic AVIF/WebP"
```

---

### Task 8: Viewport Export in Root Layout

**Files:**
- Modify: `src/app/(frontend)/layout.tsx:1,48-55`

- [ ] **Step 1: Add Viewport import and export**

In `src/app/(frontend)/layout.tsx`, change line 1 from:

```ts
import type { Metadata } from 'next'
```

to:

```ts
import type { Metadata, Viewport } from 'next'
```

Then after the existing `metadata` export (after line 55), add:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/app/(frontend)/layout.tsx
git commit -m "perf: add explicit viewport export to root layout"
```

---

### Task 9: Dynamic Imports for Below-Fold Blocks

**Files:**
- Modify: `src/components/blocks/RenderBlocks.tsx:1-45`

- [ ] **Step 1: Convert below-fold blocks to dynamic imports**

Replace the import section and `blockComponents` map in `src/components/blocks/RenderBlocks.tsx` (lines 1-45):

```tsx
import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/components/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/components/blocks/CallToAction/Component'
import { ContentBlock } from '@/components/blocks/Content/Component'
import { FormBlock } from '@/components/blocks/Form/Component'
import { HeroSectionBlock } from '@/components/blocks/HeroSection/Component'
import { MediaBlock } from '@/components/blocks/MediaBlock/Component'
import { ServicesSectionBlock } from '@/components/blocks/ServicesSection/Component'
import { NumberedCardGridBlock } from '@/components/blocks/NumberedCardGrid/Component'
import { PortfolioSectionBlock } from '@/components/blocks/PortfolioSection/Component'
import { ProfileHeroSectionBlock } from '@/components/blocks/ProfileHeroSection/Component'
import { CtaBannerBlock } from '@/components/blocks/CtaBanner/Component'
import { ContactHeroSectionBlock } from '@/components/blocks/ContactHeroSection/Component'
import { ServiceHeroBlock } from '@/components/blocks/ServiceHero/Component'
import { ContactFormSectionBlock } from '@/components/blocks/ContactFormSection/Component'

const TestimonialsSectionBlock = dynamic(() =>
  import('@/components/blocks/TestimonialsSection/Component').then((m) => m.TestimonialsSectionBlock),
)
const FAQSectionBlock = dynamic(() =>
  import('@/components/blocks/FAQSection/Component').then((m) => m.FAQSectionBlock),
)
const TimelineSectionBlock = dynamic(() =>
  import('@/components/blocks/TimelineSection/Component').then((m) => m.TimelineSectionBlock),
)
const RegionSectionBlock = dynamic(() =>
  import('@/components/blocks/RegionSection/Component').then((m) => m.RegionSectionBlock),
)
const ServiceDeepDiveBlock = dynamic(() =>
  import('@/components/blocks/ServiceDeepDive/Component').then((m) => m.ServiceDeepDiveBlock),
)

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
  portfolioSection: PortfolioSectionBlock,
  profileHeroSection: ProfileHeroSectionBlock,
  timelineSection: TimelineSectionBlock,
  regionSection: RegionSectionBlock,
  ctaBanner: CtaBannerBlock,
  contactHeroSection: ContactHeroSectionBlock,
  serviceHero: ServiceHeroBlock,
  serviceDeepDive: ServiceDeepDiveBlock,
  contactFormSection: ContactFormSectionBlock,
}
```

Note: `ContactFormSectionBlock` stays static because it contains a form that may appear high on contact pages. The 5 dynamic blocks are ones that consistently appear below the fold.

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/RenderBlocks.tsx
git commit -m "perf: dynamic imports for below-fold block components"
```

---

### Task 10: CSS content-visibility for Below-Fold Blocks

**Files:**
- Modify: `src/app/(frontend)/globals.css:57`
- Modify: `src/components/blocks/RenderBlocks.tsx:47-90`

- [ ] **Step 1: Add content-visibility utility class to globals.css**

In `src/app/(frontend)/globals.css`, inside the `@layer utilities` block (after line 57), add:

```css
  .content-deferred {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px;
  }
```

- [ ] **Step 2: Apply content-deferred class to below-fold blocks in RenderBlocks**

In `src/components/blocks/RenderBlocks.tsx`, update the render logic to add the `content-deferred` class to blocks at index >= 2. Change the render function from:

```tsx
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

to:

```tsx
if (isFullBleed) {
  return (
    <div key={index} className={index >= 2 ? 'content-deferred' : undefined}>
      {/* @ts-expect-error there may be some mismatch between the expected types here */}
      <Block {...block} />
    </div>
  )
}

return (
  <div className={index >= 2 ? 'my-16 content-deferred' : 'my-16'} key={index}>
    {/* @ts-expect-error there may be some mismatch between the expected types here */}
    <Block {...block} disableInnerContainer />
  </div>
)
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/app/(frontend)/globals.css src/components/blocks/RenderBlocks.tsx
git commit -m "perf: add content-visibility for below-fold blocks"
```

---

### Task 11: Dev Server Smoke Test

**Files:** None (verification only)

- [ ] **Step 1: Start dev server and verify pages load**

Run: `pnpm dev`

Open in browser:
1. Homepage — verify hero image loads, check DevTools Network tab for image format (should show `avif` or `webp` in response headers)
2. Portfolio listing page — verify grid card images load with medium-sized sources
3. A portfolio detail page — verify hero image loads with xlarge source
4. Contact page — verify hero and map images load

- [ ] **Step 2: Check image sizes in DevTools**

In Chrome DevTools Network tab, filter by "Img":
- Hero images should request from `/_next/image?url=...xlarge...&w=1920&q=80`
- Card images should request from `/_next/image?url=...medium...&w=900&q=80`
- Response content-type should be `image/avif` (or `image/webp` as fallback)

- [ ] **Step 3: Verify no console errors**

Check browser console for:
- No Next.js Image warnings (missing sizes, missing dimensions)
- No 404s for image URLs
- No hydration mismatches

- [ ] **Step 4: Run lint**

Run: `pnpm lint`
Expected: No new lint errors

- [ ] **Step 5: Run type check**

Run: `npx tsc --noEmit`
Expected: No type errors
