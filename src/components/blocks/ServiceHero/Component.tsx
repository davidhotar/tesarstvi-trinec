import React from 'react'
import Link from 'next/link'
import type { ServiceHeroBlock as ServiceHeroBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export const ServiceHeroBlock: React.FC<ServiceHeroBlockProps> = ({
  eyebrow,
  heading,
  note,
  ctaLabel,
  ctaLink,
}) => {
  return (
    <section className="hero-glow bg-background pt-40 pb-16 lg:pt-48 lg:pb-20">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h1>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            {note && (
              <span className="text-sm text-muted-foreground">{note}</span>
            )}
            {ctaLabel && ctaLink && (
              <Button size="lg" className="rounded-full" asChild>
                <Link href={ctaLink}>
                  <Phone data-icon="inline-start" />
                  {ctaLabel}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
