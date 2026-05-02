# Homepage Wireframe — V1 Portfolio-First Layout

## Goal

Recreate the V1 wireframe homepage as static, presentation-only React components using existing shadcn/ui primitives. No Payload CMS integration, no business logic, no custom styling beyond Tailwind utility classes. Czech copy from the wireframe is hardcoded.

## Page Structure

The homepage (`src/app/(frontend)/page.tsx`) renders 8 block components in order. The existing Header and Footer from the layout remain unchanged.

## Blocks

All blocks live in `src/components/homepage/`. Each is a React Server Component. An `index.ts` barrel file re-exports all blocks.

### 1. HeroSection

Two-column layout. Left: eyebrow label, h1 headline, description paragraph, two Buttons (primary CTA + secondary), star rating with review count. Right: gray image placeholder box with a label. Content from wireframe:

- Eyebrow: "Realizace č. 142 · Bystřice n. Olší"
- H1: "Dřevo, které přežije generace."
- Description: "Rodinné tesařství v srdci Beskyd. 10 let stavíme pergoly, přístřešky a dřevostavby — každý kus si nejdřív projdeme rukama."
- Primary CTA: "Prohlédnout realizace"
- Secondary CTA: "Volat"
- Rating: "4.9 · 87 hodnocení Google"
- Image placeholder: "HERO IMAGE — pergola in Beskydy mountains"

**shadcn:** Button

### 2. TrustStrip

Horizontal row of 5 stat items, centered. Each has a large number and a small label. Separated from content above/below with Separator.

Stats: `10 let / rodinná firma`, `142+ / realizací v kraji`, `4.9★ / Google reviews`, `24h / odezva na poptávku`, `5 let / záruka na konstrukci`

**shadcn:** Separator

### 3. PortfolioSection

Header row with eyebrow + h2 on left, category filter pills (Badge) on right. Below: CSS Grid gallery (2fr 1fr 1fr layout) with 5 image placeholder boxes. Below grid: centered "Zobrazit všech 142 realizací" Button.

Categories: Vše (active), Pergoly, Přístřešky, Dřevostavby, Terasy

Image labels: "Pergola Mosty u Jablunkova — modřín, 36 m²" (large, spans 2 rows), "Přístřešek na auta — Český Těšín", "Dřevostavba zahradní — Návsí", "Terasa s pergolou — Třinec", "Garážové stání 2 auta — Bystřice"

**shadcn:** Button, Badge

### 4. ServicesSection

Centered eyebrow + h2 header. 3-column grid of Cards. Each card has: icon area (placeholder circle), title, description, bullet list with checkmarks, "Více o službě →" link.

Cards:
1. **Pergoly & terasy** — "Klasické i posuvné. Modřín, dub, smrk — podle vašeho vkusu i rozpočtu." Items: Návrh a vizualizace zdarma, Modřín / dub / smrk, Včetně základů a montáže
2. **Přístřešky & garáže** — "Auta, dřevo, technika. Funkční stavby s charakterem, ne plechové škatule." Items: Pro 1–4 auta, Plechová nebo šindelová střecha, Záruka 5 let
3. **Dřevostavby** — "Zahradní domky, sklady, drobné stavby. Od skici po klíč v ruce." Items: Klasický roubený styl i moderna, Bez ohlášky do 25 m², Hotovo za 4–8 týdnů

**shadcn:** Card (CardHeader, CardContent, CardFooter)

### 5. ProcessSection

Centered eyebrow + h2 header. 4-column grid. Each step: large step number, title, short description.

Steps:
1. 01 — Zavoláte / napíšete — "Krátký telefonát, zjistíme co potřebujete."
2. 02 — Přijedeme se podívat — "Zaměření a poradenství u vás zdarma."
3. 03 — Návrh + cenová nabídka — "Do 5 dnů. Bez závazku, bez skrytých nákladů."
4. 04 — Postavíme — "Termín dodržíme. Vždy."

**shadcn:** Card

### 6. TestimonialsSection

Header row with eyebrow + h2 on left, "napřímo z Google reviews" annotation on right. 3-column grid of Cards. Each card: 5 stars, italic quote text, avatar placeholder + name + location.

Reviews:
1. **Petr Krzystek** (Bystřice n. Olší) — "Pergola jako z časopisu. Klucí byli skvělí — slušní, čistí, dochvilní. Termín do dne."
2. **Anna Sikorová** (Třinec, Konská) — "Měli jsme strach, že to bude drahé. Cena fér, řemeslo perfektní. Doporučuji všem v okolí."
3. **Jakub Heczko** (Návsí) — "Postavili nám zahradní domek. 6 týdnů, žádné zdržení, žádné navyšování. Tohle dnes neumí každý."

**shadcn:** Card (CardContent)

### 7. ContactSection

Two-column grid. Left: eyebrow + h2, description text about service area (40 km radius), map image placeholder, phone number. Right: quote form Card with fields — Jméno (Input), Telefon (Input), E-mail (Input), service interest pills (Badge), Zpráva (Textarea), submit Button, GDPR note.

**shadcn:** Card, Input, Label, Textarea, Button, Badge

### 8. FAQSection

Two-column grid (1fr 2fr). Left: eyebrow + h2 + helper text. Right: Accordion with 6 items.

Questions:
1. "Kolik stojí pergola?" (open by default, with answer text)
2. "Postavíte i v zimě?"
3. "Jaké dřevo doporučujete?"
4. "Potřebuji ohlášku nebo stavební povolení?"
5. "Jak dlouho trvá realizace?"
6. "Děláte i ve svahu?"

Answer for Q1: "Cena závisí na velikosti, materiálu a typu střechy. Klasická pergola 4×4 m z modřínu vychází orientačně na 80–120 tisíc. Přesnou nabídku zdarma do 5 dnů od zaměření."

**shadcn:** Accordion (AccordionItem, AccordionTrigger, AccordionContent)

## Image Placeholders

All images use a consistent placeholder pattern: a `div` with `bg-muted border border-dashed rounded-md` and centered label text describing the intended image. This makes it easy to swap for real images or Payload Media later.

## File Structure

```
src/components/homepage/
  HeroSection.tsx
  TrustStrip.tsx
  PortfolioSection.tsx
  ServicesSection.tsx
  ProcessSection.tsx
  TestimonialsSection.tsx
  ContactSection.tsx
  FAQSection.tsx
  index.ts
```

## What's NOT in scope

- Payload CMS integration (fields, collections, hooks)
- Real images or media uploads
- Mobile responsiveness (wireframe is desktop-only for now)
- Custom fonts or color themes beyond shadcn defaults
- Client-side interactivity (filtering, form submission)
- Header/Footer changes (already exist in layout)
