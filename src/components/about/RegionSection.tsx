import { Badge } from '@/components/ui/badge'
import { ImagePlaceholder } from '@/components/homepage/ImagePlaceholder'
import { IconMapPin } from '@tabler/icons-react'

const locations = [
  'Třinec',
  'Bystřice n. Olší',
  'Návsí',
  'Mosty u J.',
  'Jablunkov',
  'Český Těšín',
  'Karviná',
  'Frýdek-Místek',
  'Havířov',
  'Ostrava (po dohodě)',
]

export function RegionSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Kde stavíme
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Třinec a 40 km kolem.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Doma je doma. Stavíme tam, kde známe pily, řemeslníky a klienty.
              Když je projekt zajímavý, dojedeme i dál — ale bez slibování
              zázraků.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {locations.map((loc) => (
                <Badge key={loc} variant="outline" className="gap-1">
                  <IconMapPin className="size-3" />
                  {loc}
                </Badge>
              ))}
            </div>
          </div>
          <ImagePlaceholder
            label="MAPA — Beskydy / okolí Třince s pinem dílny + 40 km okruh"
            className="h-[320px] rounded-xl lg:h-[380px]"
          />
        </div>
      </div>
    </section>
  )
}
