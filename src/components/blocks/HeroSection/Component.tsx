import React from 'react'

import type { HeroSectionBlock as HeroSectionBlockProps } from '@/payload-types'

import { Star } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import { GoogleRatingBadge } from '@/components/GoogleRatingBadge'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  formatGoogleStatValue,
  getGoogleReviews,
  statsUseGoogle,
} from '@/utilities/getGoogleReviews'

export const HeroSectionBlock = async ({
  richText,
  links,
  backgroundImage,
  stats,
}: HeroSectionBlockProps) => {
  const google = statsUseGoogle(stats) ? await getGoogleReviews() : null

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[88px]">
      {backgroundImage && typeof backgroundImage === 'object' && (
        <Media fill imgClassName="object-cover object-center" preferredSize="xlarge" priority resource={backgroundImage} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      <div className="container relative z-10 flex flex-1 items-center justify-start">
        <div className="flex max-w-2xl flex-col gap-6">
          {richText && (
            <RichText
              className="mb-0 [&_h1]:mb-6 [&_h1]:font-display [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:leading-[1.05] [&_h1]:tracking-[-0.03em] [&_h1]:text-white [&_h1]:sm:text-6xl [&_h1]:lg:text-7xl [&_p]:max-w-lg [&_p]:text-lg [&_p]:leading-[1.6] [&_p]:text-white/80 [&_p]:sm:text-xl"
              data={richText}
              enableGutter={false}
              enableProse={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {links.map(({ link }, i) => {
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    className={
                      i === 0
                        ? 'rounded-full'
                        : 'rounded-full border-white/30 text-white hover:bg-white/10'
                    }
                    {...link}
                    appearance={i === 0 ? 'default' : 'outline'}
                  />
                )
              })}
            </div>
          )}

          <GoogleRatingBadge className="mt-2 self-start" variant="onDark" />
        </div>
      </div>

      {Array.isArray(stats) && stats.length > 0 && (
        <div className="relative z-10 border-t border-white/10 bg-black/10 backdrop-blur-sm">
          <div className="container flex flex-wrap items-center justify-around gap-x-8 gap-y-5 py-10 lg:py-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <span className="flex items-center gap-2 text-3xl font-bold text-white sm:text-4xl">
                  {(stat.source === 'googleRating' || stat.source === 'googleReviewCount') && (
                    <Star className="size-6 fill-primary text-primary sm:size-7" />
                  )}
                  {formatGoogleStatValue(stat.source, stat.value, google)}
                </span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
