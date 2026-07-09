import type { PortfolioPage } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Phone, Star } from 'lucide-react'
import Link from 'next/link'

export async function CtaBanner() {
  const data: PortfolioPage = await getCachedGlobal('portfolio-page', 1)()

  const title = data?.ctaTitle || 'Máte představu, ale nevíte, kde začít?'
  const description = data?.ctaDescription || 'Zavolejte — rádi vám poradíme.'
  const ctaLabel = data?.ctaLabel || 'Zavolat Petrovi'
  const ctaLink = data?.ctaLink || 'tel:+420737136848'
  const ratingText = data?.ctaRatingText

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container flex flex-col items-center justify-between gap-8 py-20 md:py-24 lg:flex-row">
        <div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
          {description && <p className="mt-2 text-primary-foreground/70">{description}</p>}
        </div>
        <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" className="rounded-full" asChild>
            <Link href={ctaLink}>
              <Phone data-icon="inline-start" />
              {ctaLabel}
            </Link>
          </Button>
          {ratingText && (
            <div className="flex items-center gap-1.5 text-sm text-primary-foreground/60">
              <Star className="size-3.5 fill-current" />
              {ratingText}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
