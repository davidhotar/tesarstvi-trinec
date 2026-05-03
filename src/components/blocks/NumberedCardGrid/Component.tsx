import React from 'react'
import type { NumberedCardGridBlock as NumberedCardGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'
import { iconMap } from '@/components/blocks/shared/iconMap'

export const NumberedCardGridBlock: React.FC<NumberedCardGridBlockProps> = ({
  title,
  subtitle,
  sideDescription,
  showConnector,
  items,
}) => {
  const hasRichHeader = subtitle || sideDescription

  return (
    <section className="py-24">
      <div className="container">
        {hasRichHeader ? (
          <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
            <div>
              {subtitle && (
                <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                  {subtitle}
                </span>
              )}
              <h2 className={cn('font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl', subtitle && 'mt-2')}>
                {title}
              </h2>
            </div>
            {sideDescription && (
              <p className="max-w-xs text-sm text-muted-foreground">
                {sideDescription}
              </p>
            )}
          </div>
        ) : (
          <div className="mb-20 flex flex-col items-center gap-2 text-center">
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        )}

        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {showConnector && (
            <div
              aria-hidden
              className="absolute top-10 right-8 left-8 hidden h-px bg-border/50 lg:block"
            />
          )}
          {items?.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] : undefined
            const number = String(index + 1).padStart(2, '0')
            return (
              <Card key={index}>
                <CardContent className="flex flex-col gap-3">
                  {Icon && (
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                  )}
                  <span className="font-heading text-5xl font-bold text-primary/20">
                    {number}
                  </span>
                  <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
