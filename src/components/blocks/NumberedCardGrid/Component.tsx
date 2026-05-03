import React from 'react'
import type { NumberedCardGridBlock as NumberedCardGridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { iconMap } from '@/components/blocks/shared/iconMap'

const glowClasses: Record<string, string> = {
  top: 'hero-glow',
  bottom: 'hero-glow-bottom',
}

export const NumberedCardGridBlock: React.FC<NumberedCardGridBlockProps> = ({
  title,
  subtitle,
  sideDescription,
  showConnector,
  glowEffect,
  items,
}) => {
  const hasRichHeader = subtitle || sideDescription

  return (
    <section className={cn('py-24', glowEffect && glowClasses[glowEffect])}>
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
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon && <Icon className="size-5" />}
                    </div>
                    <span className="font-heading text-3xl font-bold text-border/60">
                      {number}
                    </span>
                  </div>
                  <CardTitle className="mt-4 font-heading text-xl font-bold">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
