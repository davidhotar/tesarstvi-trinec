// src/components/NumberedCardGrid/index.tsx
import type { ComponentType, ReactNode } from 'react'
import { cn } from '@/utilities/ui'
import { Card, CardContent } from '@/components/ui/card'

type NumberedCardGridItem = {
  number: string
  title: string
  description: string
  icon?: ComponentType<{ className?: string }>
}

type NumberedCardGridProps = {
  title: string | ReactNode
  subtitle?: string
  sideDescription?: string
  items: NumberedCardGridItem[]
  className?: string
  showConnector?: boolean
}

export function NumberedCardGrid({
  title,
  subtitle,
  sideDescription,
  items,
  className,
  showConnector,
}: NumberedCardGridProps) {
  const hasRichHeader = subtitle || sideDescription

  return (
    <section className={cn('py-24', className)}>
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
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.number}>
                <CardContent className="flex flex-col gap-3">
                  {Icon && (
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                  )}
                  <span className="font-heading text-5xl font-bold text-primary/20">
                    {item.number}
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
