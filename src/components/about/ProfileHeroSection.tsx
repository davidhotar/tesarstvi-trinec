import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ImagePlaceholder } from '@/components/homepage/ImagePlaceholder'
import { IconPhone, IconMedal2, IconHeart } from '@tabler/icons-react'

export function ProfileHeroSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 lg:pt-8">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-primary" />
              <span className="text-sm font-medium tracking-widest text-primary uppercase">
                O nás · od roku 2014
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Dřevo, tradice, a chlap, co se za to{' '}
              <span className="text-primary">podepíše.</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Jsem Petr a tesařině se věnuju přes 25 let. Učil jsem se u starých
              mistrů v Beskydech, dnes vedu malou rodinnou dílnu v Třinci. Stavím
              tak, jak bych chtěl, aby někdo postavil mně doma.
            </p>

            <div className="flex items-center gap-4 border-t border-dashed pt-6">
              <ImagePlaceholder
                label="podpis"
                className="size-14 shrink-0 rounded-full"
              />
              <div className="flex-1">
                <p className="text-lg font-bold">Petr Czempka</p>
                <p className="text-sm text-muted-foreground">
                  Tesař &amp; majitel · Třinec
                </p>
              </div>
              <Button className="ml-auto shrink-0 rounded-full">
                <IconPhone className="size-4" />
                Zavolat Petrovi
              </Button>
            </div>
          </div>

          <div className="relative">
            <ImagePlaceholder
              label="HERO PORTRAIT — Petr v dílně, hoblík v ruce, světlo z okna, piliny ve vzduchu"
              className="h-[420px] rounded-xl lg:h-[520px]"
            />
            <Badge
              variant="outline"
              className="absolute top-4 left-[-12px] gap-1.5 bg-background px-3 py-1.5 text-sm shadow-sm"
            >
              <IconMedal2 className="size-4" />
              25+ let v řemesle
            </Badge>
            <Badge className="absolute right-[-12px] bottom-16 gap-1.5 px-3 py-1.5 text-sm shadow-sm">
              <IconHeart className="size-4" />
              Rodinná dílna
            </Badge>
            <div className="absolute bottom-[-8px] left-8 max-w-[220px] rounded-lg border bg-background p-3 text-sm italic text-muted-foreground shadow-sm">
              „Dělám dřevo, protože mě to baví. Kdyby mě to přestalo bavit, dělám
              něco jiného." — P.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
