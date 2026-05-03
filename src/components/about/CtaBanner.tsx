import { Button } from '@/components/ui/button'
import { IconPhone, IconMapPin } from '@tabler/icons-react'

export function CtaBanner() {
  return (
    <section className="bg-foreground text-background">
      <div className="container flex flex-col items-center justify-between gap-6 py-16 lg:flex-row">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Stavíte? Pojďte se stavit.
          </h2>
          <p className="mt-2 text-background/70">
            Káva v dílně, ukážeme vám materiál, řekneme, co a jak. Bez závazku.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button size="lg" className="rounded-full">
            <IconPhone className="size-4" />
            Zavolat Petrovi
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-background/30 text-background hover:bg-background/10"
          >
            <IconMapPin className="size-4" />
            Domluvit návštěvu dílny
          </Button>
        </div>
      </div>
    </section>
  )
}
