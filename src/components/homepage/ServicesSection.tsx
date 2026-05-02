import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  IconArrowRight,
  IconFence,
  IconCarGarage,
  IconHomePlus,
  IconCheck,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'

const services: {
  number: string
  icon: ComponentType<{ className?: string }>
  title: string
  desc: string
  items: string[]
}[] = [
  {
    number: '01',
    icon: IconFence,
    title: 'Pergoly & terasy',
    desc: 'Klasické i posuvné. Modřín, dub, smrk — podle vašeho vkusu i rozpočtu.',
    items: [
      'Návrh a vizualizace zdarma',
      'Modřín / dub / smrk',
      'Včetně základů a montáže',
    ],
  },
  {
    number: '02',
    icon: IconCarGarage,
    title: 'Přístřešky & garáže',
    desc: 'Auta, dřevo, technika. Funkční stavby s charakterem, ne plechové škatule.',
    items: [
      'Pro 1–4 auta',
      'Plechová nebo šindelová střecha',
      'Záruka 5 let',
    ],
  },
  {
    number: '03',
    icon: IconHomePlus,
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
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-20 flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Tři věci, které děláme nejlépe
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="group relative transition-colors duration-200 hover:ring-primary/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <span className="font-heading text-3xl font-bold text-border/60">
                      {service.number}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="mt-auto px-6 pb-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1">
                    Více o službě
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
