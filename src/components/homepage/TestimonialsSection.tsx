import { Card, CardContent } from '@/components/ui/card'
import { IconStarFilled, IconBrandGoogle } from '@tabler/icons-react'

const reviews = [
  {
    name: 'Petr Krzystek',
    location: 'Bystřice n. Olší',
    initials: 'PK',
    text: 'Pergola jako z časopisu. Klucí byli skvělí — slušní, čistí, dochvilní. Termín do dne.',
  },
  {
    name: 'Anna Sikorová',
    location: 'Třinec, Konská',
    initials: 'AS',
    text: 'Měli jsme strach, že to bude drahé. Cena fér, řemeslo perfektní. Doporučuji všem v okolí.',
  },
  {
    name: 'Jakub Heczko',
    location: 'Návsí',
    initials: 'JH',
    text: 'Postavili nám zahradní domek. 6 týdnů, žádné zdržení, žádné navyšování. Tohle dnes neumí každý.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              87 lidí v okolí už nám věří.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IconBrandGoogle className="size-4" />
            napřímo z Google reviews
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.name}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled key={i} className="size-4" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  „{review.text}"
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
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
