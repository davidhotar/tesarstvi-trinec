import React from 'react'
import type { TestimonialsSectionBlock as TestimonialsSectionBlockProps } from '@/payload-types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { Marquee } from '@/components/ui/marquee'
import { GoogleRatingBadge, GoogleGLogo } from '@/components/GoogleRatingBadge'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
  }
  return (parts[0]?.[0] ?? '').toUpperCase()
}

export const TestimonialsSectionBlock = ({
  title,
  testimonials,
}: TestimonialsSectionBlockProps) => {
  return (
    <section className="bg-muted/50 space-y-12 py-24 sm:space-y-16">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <Badge variant="outline" className="text-sm font-normal">
          <GoogleGLogo className="mr-1.5 size-3.5" />
          Google recenze
        </Badge>
        <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </div>

      <div className="w-full">
        <Marquee pauseOnHover duration={40} gap={1.5} className="*:items-end">
          {testimonials?.map((review, index) => (
            <Card key={index} className="h-fit max-w-sm border-none">
              <CardContent className="pb-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &bdquo;{review.text}&ldquo;
                </p>
              </CardContent>
              <CardFooter className="justify-between gap-4 pt-4 max-sm:flex-col max-sm:items-stretch">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="text-xs">
                      {getInitials(review.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">
                      {review.name}
                    </p>
                    {review.location && (
                      <p className="text-xs text-muted-foreground">
                        {review.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Rating
                    readOnly
                    variant="yellow"
                    size={18}
                    value={review.rating ?? 5}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <GoogleRatingBadge />
      </div>
    </section>
  )
}
