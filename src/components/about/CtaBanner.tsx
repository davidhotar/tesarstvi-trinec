import { Button } from '@/components/ui/button'
import { IconPhone, IconStarFilled } from '@tabler/icons-react'

export function CtaBanner() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-between gap-8 py-20 md:py-24 lg:flex-row">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Stavíme v Třinci a okolí. Zavolejte sousedovi.
          </h2>
          <p className="mt-2 text-primary-foreground/70">
            Poradíme, řekneme cenu, domluvíme se. Bez závazku.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" className="rounded-full">
            <IconPhone data-icon="inline-start" />
            Zavolat Petrovi
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-primary-foreground/60">
            <IconStarFilled className="size-3.5" />
            4.9 · 87 hodnocení na Google
          </div>
        </div>
      </div>
    </section>
  )
}
