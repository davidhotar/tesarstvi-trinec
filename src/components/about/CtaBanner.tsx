import { Button } from '@/components/ui/button'
import { IconPhone, IconStarFilled } from '@tabler/icons-react'

export function CtaBanner() {
  return (
    <section className="bg-foreground text-background">
      <div className="container flex flex-col items-center justify-between gap-6 py-16 lg:flex-row">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Stavíme v Třinci a okolí. Zavolejte sousedovi.
          </h2>
          <p className="mt-2 text-background/70">
            Poradíme, řekneme cenu, domluvíme se. Bez závazku.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full">
            <IconPhone className="size-4" />
            Zavolat Petrovi
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-background/50">
            <IconStarFilled className="size-3.5 text-amber-400" />
            4.9 · 87 hodnocení na Google
          </div>
        </div>
      </div>
    </section>
  )
}
