# Image & Performance Optimization Design

## Problem

Images load slowly because the frontend always serves the original full-size upload URL (`resource.url`) with `quality={100}`. Payload already generates 7 optimized sizes (300w-1920w) and stores them in Cloudflare R2, but the `ImageMedia` component ignores them entirely. The Next.js image config also lacks modern format support (AVIF/WebP) and custom size hints.

## Decisions

- **Quality**: `quality={80}` — invisible difference for photography, ~50-60% smaller files
- **Formats**: AVIF + WebP via `formats: ['image/avif', 'image/webp']`
- **Size selection**: Context-aware — each block passes a preferred Payload size based on its layout role
- **Scope**: Image delivery + bundle optimization only. No data fetching, Suspense, font, or component architecture changes.

---

## 1. Image Optimization

### 1a. Next.js Image Config (`next.config.ts`)

Add format, size, and cache settings to the existing `images` block:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 900, 1200, 1920],
  imageSizes: [300, 500, 600],
  minimumCacheTTL: 31536000, // 1 year
  // ...existing localPatterns, remotePatterns unchanged
}
```

- `deviceSizes` aligned with CSS breakpoints and Payload's `medium`/`large`/`xlarge` sizes
- `imageSizes` aligned with Payload's `thumbnail`/`square`/`small` sizes
- 1-year cache TTL since images are content-addressed (new upload = new URL)

### 1b. ImageMedia Component (`src/components/Media/ImageMedia/index.tsx`)

**New `preferredSize` prop**: Accepts a Payload image size name (`'thumbnail' | 'small' | 'medium' | 'large' | 'xlarge'`). When provided and the resource has that size available, use that size's URL/width/height instead of the original.

**Fallback chain**: If the preferred size doesn't exist on the resource (e.g., non-image uploads, missing sizes), fall back to the original `resource.url`.

**Quality change**: `quality={100}` → `quality={80}`.

Logic:
```
1. If preferredSize provided AND resource.sizes[preferredSize] exists:
   - Use resource.sizes[preferredSize].url as src
   - Use resource.sizes[preferredSize].width/height for dimensions
2. Else: use resource.url (current behavior)
3. Always set quality={80}
```

### 1c. Media Component Types (`src/components/Media/types.ts`)

Add `preferredSize` to the `Props` type, typed as an optional union of Payload image size names.

### 1d. Block-Level Size Hints

Each block that renders `<Media>` passes `preferredSize` based on its layout context:

| Context | preferredSize | Rationale |
|---------|--------------|-----------|
| `HeroSection`, `ServiceHero`, `PortfolioHero`, `ContactHeroSection`, `ProfileHeroSection` | `xlarge` (1920w) | Full-width hero images |
| `MediaBlock` (full-width) | `xlarge` | Full-bleed media |
| `MediaBlock` (contained) | `large` (1400w) | Contained but still wide |
| `Card`, `ArchiveBlock`, `PortfolioGrid`, `PortfolioSection` | `medium` (900w) | Grid cards, typically ~300-450px displayed |
| `ServiceDeepDive` images | `medium` | Inline images within content |
| Thumbnails, small previews | `small` (600w) | Small display contexts |

The `Media` wrapper component (`src/components/Media/index.tsx`) passes `preferredSize` through to `ImageMedia`.

---

## 2. Logo Component (`src/components/Logo/Logo.tsx`)

Convert from raw `<img>` to `next/image`:
- Static import of `/images/logo.png` for automatic size detection
- Keep `priority` behavior — eager in header, lazy elsewhere
- Gains automatic AVIF/WebP conversion

---

## 3. Viewport Export (`src/app/(frontend)/layout.tsx`)

Add explicit viewport export to root layout:
```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}
```

---

## 4. Dynamic Imports for Below-Fold Blocks (`src/components/blocks/RenderBlocks.tsx`)

Convert below-fold block imports from static to `next/dynamic` with `ssr: true`:

**Dynamic (below-fold)**:
- `FAQSectionBlock`
- `TestimonialsSectionBlock`
- `TimelineSectionBlock`
- `RegionSectionBlock`
- `ContactFormSectionBlock`
- `ServiceDeepDiveBlock`

**Static (above-fold, keep as-is)**:
- `HeroSectionBlock`, `ServiceHeroBlock`, `ContactHeroSectionBlock`, `ProfileHeroSectionBlock`
- `ArchiveBlock`, `ContentBlock`, `MediaBlock`, `FormBlock`
- `CallToActionBlock`, `ServicesSectionBlock`, `NumberedCardGridBlock`
- `PortfolioSectionBlock`, `CtaBannerBlock`

---

## 5. CSS `content-visibility` for Below-Fold Blocks (`src/components/blocks/RenderBlocks.tsx`)

Add `content-visibility: auto` to block wrappers for blocks after the first two positions (index >= 2), since the first two blocks are typically above the fold. This defers layout/paint for off-screen sections.

Implementation: Add a CSS class with `content-visibility: auto; contain-intrinsic-size: auto 500px;` to blocks at index >= 2 in the render loop. The `contain-intrinsic-size` gives the browser a height estimate for scroll calculations.

---

## Files Changed

| File | Change |
|------|--------|
| `next.config.ts` | Add formats, deviceSizes, imageSizes, minimumCacheTTL |
| `src/components/Media/ImageMedia/index.tsx` | Add preferredSize logic, change quality to 80 |
| `src/components/Media/types.ts` | Add preferredSize to Props type |
| `src/components/Media/index.tsx` | Pass preferredSize through |
| `src/components/Logo/Logo.tsx` | Convert to next/image |
| `src/app/(frontend)/layout.tsx` | Add viewport export |
| `src/components/blocks/RenderBlocks.tsx` | Dynamic imports, content-visibility |
| `src/app/(frontend)/globals.css` | Add content-visibility utility class |
| `src/components/blocks/HeroSection/Component.tsx` | Add `preferredSize="xlarge"` to Media |
| `src/components/blocks/ContactHeroSection/Component.tsx` | Add `preferredSize="xlarge"` to Media |
| `src/components/blocks/ProfileHeroSection/Component.tsx` | Add `preferredSize="xlarge"` to Media |
| `src/components/blocks/MediaBlock/Component.tsx` | Add `preferredSize="xlarge"` or `"large"` to Media |
| `src/components/blocks/ServiceDeepDive/Component.tsx` | Add `preferredSize="medium"` to Media |
| `src/components/blocks/RegionSection/Component.tsx` | Add `preferredSize="medium"` to Media |
| `src/components/blocks/ContactFormSection/Component.tsx` | Add `preferredSize="medium"` to Media |
| `src/components/Card/index.tsx` | Add `preferredSize="medium"` to Media |
| `src/components/heros/PortfolioHero/index.tsx` | Add `preferredSize="xlarge"` to Media |

## Expected Impact

- **Image file sizes**: ~60-80% reduction (quality 100→80 + AVIF + right-sized source)
- **Initial page load**: Faster LCP from smaller hero images and code-split blocks
- **Scroll performance**: `content-visibility` skips layout work for off-screen blocks
- **Cache efficiency**: 1-year TTL means repeat visits serve from CDN/browser cache
