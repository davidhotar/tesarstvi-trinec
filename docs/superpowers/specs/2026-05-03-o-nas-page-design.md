# O nás Page Design

Static "About Us" page at `/o-nas` following the O-V1 wireframe (Příběh & lidé — timeline + tým).

## Route

`src/app/(frontend)/o-nas/page.tsx` — static server component composing all sections. Metadata: title "O nás", description about the company story.

## Sections (top to bottom)

### 1. ProfileHeroSection

**File:** `src/components/about/ProfileHeroSection.tsx`

Two-column layout (text left, image right).

Left column:
- Eyebrow with accent line: "O nás · od roku 2014"
- H1 heading: "Dřevo, tradice, a chlap, co se za to podepíše."
- Description paragraph (founder intro text)
- Signature row (dashed top border): avatar placeholder, name "Petr Czempka", subtitle "Tesař & majitel · Třinec", CTA button "Zavolat Petrovi" with phone icon

Right column:
- Portrait image placeholder (tall, ~520px)
- Two floating badges: "25+ let v řemesle" (top-left offset), "Rodinná dílna" (bottom-right offset, accent bg)
- Quote sticky note at bottom-left

Responsive: stacks vertically on mobile (image first on mobile, text below).

**Dependencies:** Button, ImagePlaceholder, Tabler icons (IconPhone, IconMedal, IconHeart)

### 2. TrustStrip (reuse)

**File:** `src/components/homepage/TrustStrip.tsx` — refactor to accept optional `items` prop.

Current component has hardcoded stats. Add a prop `items?: { value: string; label: string }[]` with current data as default. The o-nas page passes different data:
- 25+ / let s dřevem v ruce
- 180 / hotových realizací
- 4.9★ / průměr Google recenzí
- 0 / reklamací za 3 roky
- 40 km / okruh Třince

### 3. TimelineSection

**File:** `src/components/about/TimelineSection.tsx`

Centered section with eyebrow "Milníky" and heading "Cesta od učedníka k vlastní dílně."

Vertical timeline with dashed center line. 6 milestones alternating left/right:
- Each milestone: year circle (centered on line) + card (on the opposite side)
- Card contains: bold title + description text
- Year circle: bordered circle with year text in accent color

Milestones (from wireframe):
1. 1998 — První hoblík
2. 2003 — Vyučení tesařem
3. 2014 — Vlastní firma
4. 2019 — Dílna v Třinci
5. 2024 — 180. realizace
6. dnes — Tým 4 lidí

Responsive: on mobile, all cards stack to the right of the line (single-column timeline).

**Dependencies:** none (plain Tailwind)

### 4. ValuesSection

**File:** `src/components/about/ValuesSection.tsx`

Section with eyebrow "Naše hodnoty", heading "Čtyři věci, na kterých nehnu ani o píď.", and a right-aligned subtitle note.

4-column grid of value cards. Each card:
- Large accent-colored number (01–04)
- Bold title
- Description paragraph

Uses Card component from shadcn for each value card.

Responsive: 2 columns on tablet, 1 column on mobile.

**Dependencies:** Card

### 5. TeamSection

**File:** `src/components/about/TeamSection.tsx`

Centered eyebrow "Lidi, co k vám přijedou" and heading "Čtyři lidi. Jedna parta."

4-column grid of team member cards. Each card:
- Portrait image placeholder with tag badge (top-left corner, e.g. "Šéf", "Dílna")
- Name (bold)
- Row: role (left) + years in accent (right)
- Italic quote with left accent border

Team members (from wireframe):
1. Petr Czempka — Tesař & majitel, 25 let, "Šéf"
2. Tomáš Czempka — Tesař · syn, 6 let, "Dílna"
3. Marek H. — Pomocný tesař, 4 roky, "Montáž"
4. Jana T. — Kancelář & nabídky, 3 roky, "Komunikace"

Responsive: 2 columns on tablet, 1 column on mobile.

**Dependencies:** Badge, ImagePlaceholder

### 6. RegionSection

**File:** `src/components/about/RegionSection.tsx`

Two-column layout: text left, map image right.

Left column:
- Eyebrow "Kde stavíme"
- Heading "Třinec a 40 km kolem."
- Description paragraph
- Flex-wrap row of location Badge pills with pin icon

Locations: Třinec, Bystřice n. Olší, Návsí, Mosty u J., Jablunkov, Český Těšín, Karviná, Frýdek-Místek, Havířov, Ostrava (po dohodě)

Right column:
- Map image placeholder

Responsive: stacks vertically on mobile.

**Dependencies:** Badge, ImagePlaceholder, IconMapPin

### 7. CtaBanner

**File:** `src/components/about/CtaBanner.tsx`

Full-width dark background section. Flex row: text left, buttons right.

Left: heading "Stavíte? Pojďte se stavit." + subtitle "Káva v dílně, ukážeme vám materiál, řekneme, co a jak. Bez závazku."

Right: two buttons — "Zavolat Petrovi" (accent/primary) and "Domluvit návštěvu dílny" (outline light).

Responsive: stacks vertically centered on mobile.

**Dependencies:** Button, IconPhone, IconMapPin

## File Structure

```
src/
  app/(frontend)/o-nas/
    page.tsx
  components/about/
    ProfileHeroSection.tsx
    TimelineSection.tsx
    ValuesSection.tsx
    TeamSection.tsx
    RegionSection.tsx
    CtaBanner.tsx
    index.ts
  components/homepage/
    TrustStrip.tsx  (modified — add items prop)
```

## Styling Notes

- Follow existing homepage patterns: `container` class for max-width, `py-24` for section spacing
- Use `font-heading` for headings, `text-muted-foreground` for secondary text
- Use existing Tailwind theme tokens (no custom CSS)
- ImagePlaceholder for all images (same as homepage approach)
- Responsive breakpoints: mobile-first, `sm:`, `lg:` for grid changes
