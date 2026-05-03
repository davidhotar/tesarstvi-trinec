import React from 'react'
import type { TestimonialsSectionBlock as TestimonialsSectionBlockProps } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { IconStarFilled, IconBrandGoogle } from '@tabler/icons-react'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
  }
  return (parts[0]?.[0] ?? '').toUpperCase()
}

export const TestimonialsSectionBlock: React.FC<TestimonialsSectionBlockProps> = ({
  title,
  sourceLabel,
  testimonials,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
          {sourceLabel && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IconBrandGoogle className="size-4" />
              {sourceLabel}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {testimonials?.map((review, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col gap-4">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: review.rating ?? 5 }).map((_, i) => (
                    <IconStarFilled key={i} className="size-4" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &bdquo;{review.text}&ldquo;
                </p>
                <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    {review.location && (
                      <p className="text-xs text-muted-foreground">
                        {review.location}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
