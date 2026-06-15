import React from 'react'
import type { ContactHeroSectionBlock as ContactHeroSectionBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { Phone, Mail, MessageCircle, Clock, Check, Star, Shield, MapPin } from 'lucide-react'
import Link from 'next/link'

const highlightIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  check: Check,
  star: Star,
  shield: Shield,
}

const cardIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  mail: Mail,
  whatsapp: MessageCircle,
  mapPin: MapPin,
}

export const ContactHeroSectionBlock: React.FC<ContactHeroSectionBlockProps> = ({
  tagline,
  heading,
  description,
  highlights,
  heroImage,
  personName,
  personTitle,
  personPhone,
  contactCards,
}) => {
  return (
    <section className="flex min-h-[100svh] flex-col hero-glow pb-16 pt-[88px] lg:pb-24">
      {/* Hero area */}
      <div className="container flex flex-1 items-center py-16">
        <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-6 lg:pt-8">
            {tagline && (
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-primary" />
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  {tagline}
                </span>
              </div>
            )}

            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {heading}
            </h1>

            {description && (
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            {Array.isArray(highlights) && highlights.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
                {highlights.map((item, i) => {
                  const Icon = highlightIcons[item.icon || 'check']
                  return (
                    <React.Fragment key={i}>
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        {Icon && <Icon className="size-4 shrink-0 text-primary" />}
                        {item.label}
                      </span>
                      {i < highlights.length - 1 && (
                        <span className="text-muted-foreground/40">·</span>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right column – hero image */}
          <div className="relative">
            {heroImage && typeof heroImage === 'object' ? (
              <Media
                resource={heroImage}
                imgClassName="h-[360px] w-full rounded-xl object-cover lg:h-[440px]"
                preferredSize="large"
              />
            ) : (
              <div className="flex h-[360px] items-center justify-center rounded-xl border border-dashed bg-muted text-xs text-muted-foreground lg:h-[440px]">
                Hero image
              </div>
            )}

            {personName && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border bg-background px-4 py-2 shadow-sm">
                {personPhone ? (
                  <Link href={personPhone} className="flex items-center gap-2">
                    <Phone className="size-4 text-primary" />
                    <span className="text-sm font-medium italic">
                      {personName}
                      {personTitle && (
                        <span className="font-normal text-muted-foreground">
                          {' '}
                          — {personTitle}
                        </span>
                      )}
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 text-sm font-medium italic">
                    <Phone className="size-4 text-primary" />
                    {personName}
                    {personTitle && (
                      <span className="font-normal text-muted-foreground"> — {personTitle}</span>
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact cards */}
      {Array.isArray(contactCards) && contactCards.length > 0 && (
        <div className="container pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card, i) => {
              const Icon = cardIcons[card.icon || 'phone']
              const variant = (card.ctaVariant || 'default') as 'default' | 'outline' | 'secondary'
              return (
                <Card key={i} className="relative">
                  {card.badge && (
                    <Badge className="absolute top-4 right-4">{card.badge}</Badge>
                  )}
                  <CardContent className="flex flex-col gap-4">
                    {Icon && (
                      <div className="flex size-10 items-center justify-center rounded-full border">
                        <Icon className="size-5 text-foreground" />
                      </div>
                    )}
                    <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                      {card.label}
                    </span>
                    <p className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                      {card.value}
                    </p>
                    {card.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {card.description}
                      </p>
                    )}
                    <Button variant={variant} className="mt-auto w-full rounded-lg" asChild>
                      <Link href={card.ctaLink}>{card.ctaLabel}</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
