# Homepage Wireframe Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the V1 "portfolio-first" homepage as 8 static block components using existing shadcn/ui primitives with hardcoded Czech copy.

**Architecture:** Each wireframe section becomes a block component in `src/components/homepage/`. A barrel `index.ts` re-exports all blocks. The homepage `page.tsx` is replaced with a simple composition of these blocks. All blocks are React Server Components except FAQSection (uses client-side Accordion).

**Tech Stack:** Next.js App Router, React Server Components, shadcn/ui (Button, Card, Badge, Input, Label, Textarea, Separator, Accordion), Tailwind CSS, Tabler Icons

**Spec:** `docs/superpowers/specs/2026-05-02-homepage-wireframe-design.md`

---

## File Structure

```
src/components/homepage/
  HeroSection.tsx        — hero with headline, CTAs, image placeholder, social proof
  TrustStrip.tsx         — 5 stat counters in a horizontal row
  PortfolioSection.tsx   — category pills + grid of image placeholders
  ServicesSection.tsx    — 3 service cards with bullet lists
  ProcessSection.tsx     — 4-step numbered process
  TestimonialsSection.tsx — 3 Google review cards
  ContactSection.tsx     — quote form + map placeholder
  FAQSection.tsx         — accordion with 6 questions ('use client')
  ImagePlaceholder.tsx   — reusable placeholder box for images
  index.ts               — barrel re-exports
src/app/(frontend)/page.tsx — replaced to render homepage blocks directly
```

---

### Task 1: ImagePlaceholder utility component

A small reusable component used by every section that needs an image placeholder. Build this first so all subsequent tasks can use it.

**Files:**
- Create: `src/components/homepage/ImagePlaceholder.tsx`

- [ ] **Step 1: Create ImagePlaceholder component**

```tsx
// src/components/homepage/ImagePlaceholder.tsx
import { cn } from '@/utilities/ui'

export function ImagePlaceholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md border border-dashed bg-muted p-4 text-center text-xs text-muted-foreground',
        className,
      )}
    >
      {label}
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `ImagePlaceholder.tsx`

---

### Task 2: HeroSection block

Two-column layout. Left: eyebrow, h1, description, two buttons, star rating. Right: image placeholder.

**Files:**
- Create: `src/components/homepage/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection component**

```tsx
// src/components/homepage/HeroSection.tsx
import { Button } from '@/components/ui/button'
import { ImagePlaceholder } from './ImagePlaceholder'

export function HeroSection() {
  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5 pt-8">
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Realizace č. 142 · Bystřice n. Olší
          </p>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Dřevo, které přežije generace.
          </h1>
          <p className="text-lg text-muted-foreground">
            Rodinné tesařství v srdci Beskyd. 10 let stavíme pergoly, přístřešky
            a dřevostavby — každý kus si nejdřív projdeme rukama.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Prohlédnout realizace</Button>
            <Button variant="outline" size="lg">
              Volat
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg text-yellow-500">★★★★★</span>
            <span className="text-sm text-muted-foreground">
              4.9 · 87 hodnocení Google
            </span>
          </div>
        </div>

        <ImagePlaceholder
          label="HERO IMAGE — pergola in Beskydy mountains, golden hour"
          className="h-[400px] lg:h-[460px]"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `HeroSection.tsx`

---

### Task 3: TrustStrip block

Horizontal row of 5 stats separated from surrounding content.

**Files:**
- Create: `src/components/homepage/TrustStrip.tsx`

- [ ] **Step 1: Create TrustStrip component**

```tsx
// src/components/homepage/TrustStrip.tsx
import { Separator } from '@/components/ui/separator'

const stats = [
  { value: '10 let', label: 'rodinná firma' },
  { value: '142+', label: 'realizací v kraji' },
  { value: '4.9★', label: 'Google reviews' },
  { value: '24h', label: 'odezva na poptávku' },
  { value: '5 let', label: 'záruka na konstrukci' },
]

export function TrustStrip() {
  return (
    <section>
      <Separator />
      <div className="container flex flex-wrap items-center justify-around gap-6 py-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
      <Separator />
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `TrustStrip.tsx`

---

### Task 4: PortfolioSection block

Category pills + asymmetric grid of image placeholders + "show all" button.

**Files:**
- Create: `src/components/homepage/PortfolioSection.tsx`

- [ ] **Step 1: Create PortfolioSection component**

```tsx
// src/components/homepage/PortfolioSection.tsx
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImagePlaceholder } from './ImagePlaceholder'

const categories = ['Vše', 'Pergoly', 'Přístřešky', 'Dřevostavby', 'Terasy']

const projects = [
  { label: 'Pergola Mosty u Jablunkova — modřín, 36 m²', span: true },
  { label: 'Přístřešek na auta — Český Těšín', span: false },
  { label: 'Dřevostavba zahradní — Návsí', span: false },
  { label: 'Terasa s pergolou — Třinec', span: false },
  { label: 'Garážové stání 2 auta — Bystřice', span: false },
]

export function PortfolioSection() {
  return (
    <section className="container py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Naše realizace
          </p>
          <h2 className="mt-1 text-3xl font-bold">Každý projekt je jiný.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <Badge key={cat} variant={i === 0 ? 'default' : 'outline'}>
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
        {projects.map((project) => (
          <ImagePlaceholder
            key={project.label}
            label={project.label}
            className={project.span ? 'h-[180px] md:row-span-2 md:h-full' : 'h-[180px]'}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline">Zobrazit všech 142 realizací</Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `PortfolioSection.tsx`

---

### Task 5: ServicesSection block

3-column grid of service cards with icon placeholder, title, description, bullet list, and footer link.

**Files:**
- Create: `src/components/homepage/ServicesSection.tsx`

- [ ] **Step 1: Create ServicesSection component**

```tsx
// src/components/homepage/ServicesSection.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { IconArrowRight } from '@tabler/icons-react'

const services = [
  {
    title: 'Pergoly & terasy',
    desc: 'Klasické i posuvné. Modřín, dub, smrk — podle vašeho vkusu i rozpočtu.',
    items: [
      'Návrh a vizualizace zdarma',
      'Modřín / dub / smrk',
      'Včetně základů a montáže',
    ],
  },
  {
    title: 'Přístřešky & garáže',
    desc: 'Auta, dřevo, technika. Funkční stavby s charakterem, ne plechové škatule.',
    items: [
      'Pro 1–4 auta',
      'Plechová nebo šindelová střecha',
      'Záruka 5 let',
    ],
  },
  {
    title: 'Dřevostavby',
    desc: 'Zahradní domky, sklady, drobné stavby. Od skici po klíč v ruce.',
    items: [
      'Klasický roubený styl i moderna',
      'Bez ohlášky do 25 m²',
      'Hotovo za 4–8 týdnů',
    ],
  },
]

export function ServicesSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Co umíme
          </p>
          <h2 className="text-3xl font-bold">Tři věci, které děláme nejlépe</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-full border text-muted-foreground">
                  ◆
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <span className="flex items-center gap-1 text-sm font-medium text-primary">
                  Více o službě <IconArrowRight className="size-4" />
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `ServicesSection.tsx`

---

### Task 6: ProcessSection block

4-column grid with large step numbers, titles, and descriptions.

**Files:**
- Create: `src/components/homepage/ProcessSection.tsx`

- [ ] **Step 1: Create ProcessSection component**

```tsx
// src/components/homepage/ProcessSection.tsx
const steps = [
  {
    number: '01',
    title: 'Zavoláte / napíšete',
    desc: 'Krátký telefonát, zjistíme co potřebujete.',
  },
  {
    number: '02',
    title: 'Přijedeme se podívat',
    desc: 'Zaměření a poradenství u vás zdarma.',
  },
  {
    number: '03',
    title: 'Návrh + cenová nabídka',
    desc: 'Do 5 dnů. Bez závazku, bez skrytých nákladů.',
  },
  {
    number: '04',
    title: 'Postavíme',
    desc: 'Termín dodržíme. Vždy.',
  },
]

export function ProcessSection() {
  return (
    <section className="container py-16">
      <div className="mb-10 flex flex-col items-center gap-2 text-center">
        <p className="text-sm tracking-wide text-muted-foreground uppercase">
          Jak to u nás funguje
        </p>
        <h2 className="text-3xl font-bold">Bez stresu, bez překvapení.</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="text-5xl font-bold text-primary">{step.number}</span>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `ProcessSection.tsx`

---

### Task 7: TestimonialsSection block

3-column grid of review cards with stars, quote, avatar placeholder, name, and location.

**Files:**
- Create: `src/components/homepage/TestimonialsSection.tsx`

- [ ] **Step 1: Create TestimonialsSection component**

```tsx
// src/components/homepage/TestimonialsSection.tsx
import { Card, CardContent } from '@/components/ui/card'

const reviews = [
  {
    name: 'Petr Krzystek',
    location: 'Bystřice n. Olší',
    text: 'Pergola jako z časopisu. Klucí byli skvělí — slušní, čistí, dochvilní. Termín do dne.',
  },
  {
    name: 'Anna Sikorová',
    location: 'Třinec, Konská',
    text: 'Měli jsme strach, že to bude drahé. Cena fér, řemeslo perfektní. Doporučuji všem v okolí.',
  },
  {
    name: 'Jakub Heczko',
    location: 'Návsí',
    text: 'Postavili nám zahradní domek. 6 týdnů, žádné zdržení, žádné navyšování. Tohle dnes neumí každý.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm tracking-wide text-muted-foreground uppercase">
              Co říkají sousedé
            </p>
            <h2 className="mt-1 text-3xl font-bold">
              87 lidí v okolí už nám věří.
            </h2>
          </div>
          <span className="text-sm text-muted-foreground">
            napřímo z Google reviews
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name}>
              <CardContent className="flex flex-col gap-4">
                <span className="text-lg text-yellow-500">★★★★★</span>
                <p className="italic text-muted-foreground">„{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
                    foto
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.location}
                    </p>
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

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `TestimonialsSection.tsx`

---

### Task 8: ContactSection block

Two-column layout. Left: text + map placeholder + phone. Right: quote form with inputs and submit button.

**Files:**
- Create: `src/components/homepage/ContactSection.tsx`

- [ ] **Step 1: Create ContactSection component**

```tsx
// src/components/homepage/ContactSection.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ImagePlaceholder } from './ImagePlaceholder'
import { IconPhone } from '@tabler/icons-react'

const serviceOptions = ['Pergola', 'Přístřešek', 'Dřevostavba', 'Terasa', 'Jiné']

export function ContactSection() {
  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-sm tracking-wide text-muted-foreground uppercase">
            Pojďme se potkat
          </p>
          <h2 className="text-3xl font-bold">
            Řekněte, co plánujete.
            <br />
            Zbytek je na nás.
          </h2>
          <p className="text-muted-foreground">
            Stavíme v okruhu 40 km od Třince — Bystřice, Návsí, Mosty, Jablunkov,
            Český Těšín, Vendryně, Hrádek a okolí.
          </p>
          <ImagePlaceholder
            label="MAPA — service area pin map, Třinec center, 40km radius"
            className="h-[260px]"
          />
          <div className="flex items-center gap-3">
            <IconPhone className="size-5" />
            <div>
              <p className="text-sm text-muted-foreground">
                Volejte (Po–Pá 7–17)
              </p>
              <p className="text-2xl font-bold">+420 605 ___ ___</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <p className="text-sm tracking-wide text-muted-foreground uppercase">
              Nezávazná poptávka
            </p>
            <h3 className="text-xl font-semibold">Ozveme se do 24 hodin</h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Jméno</Label>
                <Input placeholder="Jan Novák" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Telefon</Label>
                <Input placeholder="+420 ___ ___ ___" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>E-mail</Label>
              <Input placeholder="vas@email.cz" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>O co máte zájem?</Label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((opt) => (
                  <Badge key={opt} variant="outline">
                    {opt}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Zpráva</Label>
              <Textarea placeholder="Stručně popište, co plánujete..." />
            </div>
            <Button size="lg" className="w-full">
              Odeslat poptávku
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              🔒 Vaše údaje jsou v bezpečí · GDPR
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `ContactSection.tsx`

---

### Task 9: FAQSection block

Two-column layout: left sidebar text, right accordion with 6 questions. This is a client component because the Accordion primitive requires client-side interactivity.

**Files:**
- Create: `src/components/homepage/FAQSection.tsx`

- [ ] **Step 1: Create FAQSection component**

```tsx
// src/components/homepage/FAQSection.tsx
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Kolik stojí pergola?',
    a: 'Cena závisí na velikosti, materiálu a typu střechy. Klasická pergola 4×4 m z modřínu vychází orientačně na 80–120 tisíc. Přesnou nabídku zdarma do 5 dnů od zaměření.',
  },
  { q: 'Postavíte i v zimě?', a: 'Ano, pracujeme celoročně. V zimě se zaměřujeme na konstrukce, které lze stavět i v mrazu.' },
  { q: 'Jaké dřevo doporučujete?', a: 'Pro venkovní konstrukce doporučujeme modřín nebo dub. Pro zastřešené stavby je vhodný i smrk.' },
  { q: 'Potřebuji ohlášku nebo stavební povolení?', a: 'Stavby do 25 m² a 5 m výšky zpravidla nevyžadují ohlášku. Poradíme vám s konkrétním případem.' },
  { q: 'Jak dlouho trvá realizace?', a: 'Pergola typicky 5–10 dní, přístřešek 2–3 týdny, dřevostavba 4–8 týdnů. Závisí na rozsahu a počasí.' },
  { q: 'Děláte i ve svahu?', a: 'Ano, máme zkušenosti se stavbami v náročném terénu. Svah vyžaduje speciální základy, které řešíme.' },
]

export function FAQSection() {
  return (
    <section className="bg-muted/50 py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm tracking-wide text-muted-foreground uppercase">
              Časté otázky
            </p>
            <h2 className="mt-2 text-3xl font-bold">Než se zeptáte.</h2>
            <p className="mt-4 text-muted-foreground">
              Nenašli jste odpověď? Zavolejte — rádi poradíme i bez závazku.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors related to `FAQSection.tsx`

---

### Task 10: Barrel export and homepage page

Create the barrel `index.ts` and replace the homepage `page.tsx` to render all blocks.

**Files:**
- Create: `src/components/homepage/index.ts`
- Modify: `src/app/(frontend)/page.tsx`

- [ ] **Step 1: Create barrel export**

```tsx
// src/components/homepage/index.ts
export { HeroSection } from './HeroSection'
export { TrustStrip } from './TrustStrip'
export { PortfolioSection } from './PortfolioSection'
export { ServicesSection } from './ServicesSection'
export { ProcessSection } from './ProcessSection'
export { TestimonialsSection } from './TestimonialsSection'
export { ContactSection } from './ContactSection'
export { FAQSection } from './FAQSection'
```

- [ ] **Step 2: Replace homepage page.tsx**

Replace `src/app/(frontend)/page.tsx` with:

```tsx
// src/app/(frontend)/page.tsx
import {
  HeroSection,
  TrustStrip,
  PortfolioSection,
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
} from '@/components/homepage'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <PortfolioSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
    </>
  )
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors

- [ ] **Step 4: Start dev server and verify in browser**

Run: `pnpm dev`
Open: `http://localhost:3000`
Expected: All 8 sections render top to bottom with plain shadcn styling, image placeholders visible, accordion functional, form inputs visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/homepage/ src/app/\(frontend\)/page.tsx
git commit -m "feat: add homepage wireframe with 8 block components"
```
