import Link from 'next/link'
import React from 'react'
import { ArrowRight, Hammer, Home, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'

const suggestions = [
  { href: '/sluzby', label: 'Naše služby', description: 'Tesařské a pokrývačské práce' },
  { href: '/portfolio', label: 'Reference', description: 'Prohlédněte si naše realizace' },
  { href: '/o-nas', label: 'O nás', description: 'Kdo za tesařstvím stojí' },
  { href: '/kontakt#poptavka', label: 'Poptávka', description: 'Nezávazně nám napište' },
]

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pt-44 pb-28 text-center">
      <div className="flex flex-col items-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Hammer className="size-8" aria-hidden />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Chyba 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Tuhle stránku jsme nenašli
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Stránka byla možná přesunuta, přejmenována nebo už neexistuje. Odsud se dostanete zpátky
          na správné místo.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild className="rounded-full">
            <Link href="/">
              <Home className="size-4" aria-hidden />
              Zpět na úvod
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="rounded-full">
            <Link href="/kontakt#poptavka">
              <Phone className="size-4" aria-hidden />
              Kontaktujte nás
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/50 p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <span>
              <span className="block font-semibold text-foreground">{label}</span>
              <span className="block text-sm text-muted-foreground">{description}</span>
            </span>
            <ArrowRight
              className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
