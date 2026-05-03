import React from 'react'
import type { CtaBannerBlock as CtaBannerBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { IconPhone, IconStarFilled } from '@tabler/icons-react'
import Link from 'next/link'

export const CtaBannerBlock: React.FC<CtaBannerBlockProps> = ({
  title,
  description,
  ctaLabel,
  ctaLink,
  ratingText,
}) => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-between gap-8 py-20 md:py-24 lg:flex-row">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
          {description && <p className="mt-2 text-primary-foreground/70">{description}</p>}
        </div>
        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
          {ctaLabel && ctaLink && (
            <Button size="lg" variant="secondary" className="rounded-full" asChild>
              <Link href={ctaLink}>
                <IconPhone data-icon="inline-start" />
                {ctaLabel}
              </Link>
            </Button>
          )}
          {ratingText && (
            <div className="flex items-center gap-1.5 text-sm text-primary-foreground/60">
              <IconStarFilled className="size-3.5" />
              {ratingText}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
