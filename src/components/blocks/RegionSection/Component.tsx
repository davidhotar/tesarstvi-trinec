import React from 'react'
import type { RegionSectionBlock as RegionSectionBlockProps } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import { MapPin } from 'lucide-react'

export const RegionSectionBlock: React.FC<RegionSectionBlockProps> = ({
  subtitle,
  title,
  description,
  mapImage,
  locations,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            {subtitle && (
              <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {subtitle}
              </span>
            )}
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
            )}
            {Array.isArray(locations) && locations.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {locations.map((loc, i) => (
                  <Badge key={i} variant="outline" className="gap-1">
                    <MapPin className="size-3" />
                    {loc.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {mapImage && typeof mapImage === 'object' ? (
            <Media
              resource={mapImage}
              imgClassName="h-[320px] w-full rounded-xl object-cover lg:h-[380px]"
              preferredSize="medium"
            />
          ) : (
            <div className="flex h-[320px] items-center justify-center rounded-xl border border-dashed bg-muted text-xs text-muted-foreground lg:h-[380px]">
              Map image
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
