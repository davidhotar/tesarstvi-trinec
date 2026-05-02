import {
  IconPhone,
  IconMapPin,
  IconFileDescription,
  IconHammer,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'

const steps: {
  number: string
  icon: ComponentType<{ className?: string }>
  title: string
  desc: string
}[] = [
  {
    number: '01',
    icon: IconPhone,
    title: 'Zavoláte / napíšete',
    desc: 'Krátký telefonát, zjistíme co potřebujete.',
  },
  {
    number: '02',
    icon: IconMapPin,
    title: 'Přijedeme se podívat',
    desc: 'Zaměření a poradenství u vás zdarma.',
  },
  {
    number: '03',
    icon: IconFileDescription,
    title: 'Návrh + cenová nabídka',
    desc: 'Do 5 dnů. Bez závazku, bez skrytých nákladů.',
  },
  {
    number: '04',
    icon: IconHammer,
    title: 'Postavíme',
    desc: 'Termín dodržíme. Vždy.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-20 flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Bez stresu, bez překvapení.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-10 right-8 left-8 hidden h-px bg-border/50 lg:block"
          />
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative z-10 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-heading text-3xl font-bold text-border/60">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
