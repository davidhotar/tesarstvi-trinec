'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IconPhone } from '@tabler/icons-react'

const faqs = [
  {
    q: 'Kolik stojí pergola?',
    a: 'Cena závisí na velikosti, materiálu a typu střechy. Klasická pergola 4×4 m z modřínu vychází orientačně na 80–120 tisíc. Přesnou nabídku zdarma do 5 dnů od zaměření.',
  },
  {
    q: 'Postavíte i v zimě?',
    a: 'Ano, pracujeme celoročně. V zimě se zaměřujeme na konstrukce, které lze stavět i v mrazu.',
  },
  {
    q: 'Jaké dřevo doporučujete?',
    a: 'Pro venkovní konstrukce doporučujeme modřín nebo dub. Pro zastřešené stavby je vhodný i smrk.',
  },
  {
    q: 'Potřebuji ohlášku nebo stavební povolení?',
    a: 'Stavby do 25 m² a 5 m výšky zpravidla nevyžadují ohlášku. Poradíme vám s konkrétním případem.',
  },
  {
    q: 'Jak dlouho trvá realizace?',
    a: 'Pergola typicky 5–10 dní, přístřešek 2–3 týdny, dřevostavba 4–8 týdnů. Závisí na rozsahu a počasí.',
  },
  {
    q: 'Děláte i ve svahu?',
    a: 'Ano, máme zkušenosti se stavbami v náročném terénu. Svah vyžaduje speciální základy, které řešíme.',
  },
]

export function FAQSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Než se zeptáte.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Nenašli jste odpověď? Zavolejte — rádi poradíme i bez závazku.
            </p>
            <Button variant="outline" className="mt-6 gap-2 rounded-lg">
              <IconPhone className="size-4" />
              Zavolat
            </Button>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-heading font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
