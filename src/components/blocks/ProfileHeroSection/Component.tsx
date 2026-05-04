import React from 'react'
import type { ProfileHeroSectionBlock as ProfileHeroSectionBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Media } from '@/components/Media'
import { IconPhone, IconMedal2, IconHeart } from '@tabler/icons-react'
import Link from 'next/link'
import RichText from '@/components/RichText'

const badgePositionClasses: Record<string, string> = {
  'top-left': 'absolute top-4 left-[-12px]',
  'top-right': 'absolute top-4 right-[-12px]',
  'bottom-left': 'absolute bottom-16 left-[-12px]',
  'bottom-right': 'absolute bottom-16 right-[-12px]',
}

const badgeIcons: Record<number, React.ComponentType<{ className?: string }>> = {
  0: IconMedal2,
  1: IconHeart,
}

export const ProfileHeroSectionBlock: React.FC<ProfileHeroSectionBlockProps> = ({
  tagline,
  richText,
  personName,
  personTitle,
  personImage,
  heroImage,
  quote,
  ctaLabel,
  ctaLink,
  badges,
  stats,
}) => {
  return (
    <section className="hero-glow flex min-h-[100svh] flex-col pt-[88px]">
      <div className="container flex flex-1 items-center py-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 lg:pt-8">
            {tagline && (
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-primary" />
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  {tagline}
                </span>
              </div>
            )}

            {richText && (
              <RichText
                className="mb-0 [&_h1]:mb-4 [&_h1]:font-heading [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:leading-[1.05] [&_h1]:tracking-tight [&_h1]:sm:text-5xl [&_h1]:lg:text-6xl [&_h1_strong]:font-bold [&_h1_strong]:text-primary [&_p]:max-w-lg [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-muted-foreground"
                data={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}

            <div className="flex items-center gap-4 border-t border-dashed pt-6">
              {personImage && typeof personImage === 'object' ? (
                <Media
                  resource={personImage}
                  imgClassName="size-14 shrink-0 rounded-full object-cover"
                  preferredSize="thumbnail"
                />
              ) : (
                <div className="size-14 shrink-0 rounded-full border border-dashed bg-muted" />
              )}
              <div className="flex-1">
                <p className="text-lg font-bold">{personName}</p>
                <p className="text-sm text-muted-foreground">{personTitle}</p>
              </div>
              {ctaLabel && ctaLink && (
                <Button className="ml-auto shrink-0 rounded-full" asChild>
                  <Link href={ctaLink}>
                    <IconPhone className="size-4" />
                    {ctaLabel}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            {heroImage && typeof heroImage === 'object' ? (
              <Media
                resource={heroImage}
                imgClassName="h-[420px] w-full rounded-xl object-cover lg:h-[520px]"
                preferredSize="xlarge"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed bg-muted text-xs text-muted-foreground lg:h-[520px]">
                Hero image
              </div>
            )}

            {Array.isArray(badges) &&
              badges.map((badge, i) => {
                const Icon = badgeIcons[i]
                const posClass = badgePositionClasses[badge.position || 'top-left'] || ''
                const isFirst = i === 0
                return (
                  <Badge
                    key={i}
                    variant={isFirst ? 'outline' : 'default'}
                    className={`${posClass} gap-1.5 px-3 py-1.5 text-sm shadow-sm ${isFirst ? 'bg-background' : ''}`}
                  >
                    {Icon && <Icon className="size-4" />}
                    {badge.label}
                  </Badge>
                )
              })}

            {quote && (
              <div className="absolute bottom-[-8px] left-8 max-w-[220px] rounded-lg border bg-background p-3 text-sm italic text-muted-foreground shadow-sm">
                {quote}
              </div>
            )}
          </div>
        </div>
      </div>

      {Array.isArray(stats) && stats.length > 0 && (
        <>
          <Separator />
          <div className="container flex flex-wrap items-center justify-around gap-x-8 gap-y-5 py-10 lg:py-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
          <Separator />
        </>
      )}
    </section>
  )
}
