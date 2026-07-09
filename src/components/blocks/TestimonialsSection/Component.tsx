import React from 'react'
import type { TestimonialsSectionBlock as TestimonialsSectionBlockProps } from '@/payload-types'
import { ExternalLinkIcon, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { Marquee } from '@/components/ui/marquee'
import { getGoogleReviews } from '@/utilities/getGoogleReviews'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase()
  }
  return (parts[0]?.[0] ?? '').toUpperCase()
}

export const TestimonialsSectionBlock = async ({
  title,
  sourceLabel,
  reviewsUrl,
  reviewsButtonLabel,
  testimonials,
}: TestimonialsSectionBlockProps) => {
  // The testimonial cards above stay manually curated; the summary numbers below
  // (average rating + review count) come live from Google Business Profile.
  const google = await getGoogleReviews()

  const computedAvg =
    testimonials && testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + (t.rating ?? 5), 0) / testimonials.length
      : 5

  const avgRating = google.reviewCount > 0 ? google.rating : computedAvg
  const reviewCount = google.reviewCount > 0 ? google.reviewCount : (testimonials?.length ?? 0)
  const allReviewsUrl = reviewsUrl || google.profileUrl || undefined

  return (
    <section className="bg-muted/50 space-y-12 py-24 sm:space-y-16">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        {sourceLabel && (
          <Badge variant="outline" className="text-sm font-normal">
            <Star className="mr-1.5 size-3.5" />
            {sourceLabel}
          </Badge>
        )}
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

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-11">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-2xl font-semibold">{avgRating.toFixed(1)}</p>
              <Rating readOnly variant="yellow" size={24} value={Math.round(avgRating)} />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              průměrné hodnocení
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold">{reviewCount}+</p>
            <p className="text-sm font-medium text-muted-foreground">
              spokojených zákazníků
            </p>
          </div>
          {allReviewsUrl && (
            <Button size="lg" asChild className="rounded-full">
              <a href={allReviewsUrl} target="_blank" rel="noopener noreferrer">
                {reviewsButtonLabel || 'Všechny recenze'}
                <ExternalLinkIcon className="ml-1.5 size-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
