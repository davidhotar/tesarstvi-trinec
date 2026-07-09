import Link from 'next/link'
import { cacheLife } from 'next/cache'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Logo } from '@/components/Logo/Logo'
import { GoogleRatingBadge } from '@/components/GoogleRatingBadge'
import { Separator } from '@/components/ui/separator'
import { FeaturableWidget } from '@/components/FeaturableWidget/FeaturableWidget'
import { getFeaturableWidgetId } from '@/utilities/getGoogleReviews'

async function getCopyrightYear() {
  'use cache'
  cacheLife('days')
  return new Date().getFullYear()
}

export async function Footer() {
  const footer: FooterType = await getCachedGlobal('footer', 1)
  const year = await getCopyrightYear()

  const phone = footer?.phone || '+420 737 136 848'
  const email = footer?.email || 'info@tesarstvi-trinec.cz'
  const address = footer?.address || 'Přátelství 959\n739 61 Třinec'
  const addressLink = footer?.addressLink || 'https://maps.app.goo.gl/XGrhpUEEtSBhm175A'
  const businessInfo = footer?.businessInfo || 'Petr Czempka · IČO 06977138 · Po-Pá 7:00-17:00'
  const copyright = footer?.copyright || 'Tesařství Třinec'

  const addressLines = address.split('\n').filter(Boolean)
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <footer className="mt-auto bg-card text-card-foreground">
      <Separator />

      <div className="container py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Logo className="max-w-[11rem]" />
            </Link>
            <GoogleRatingBadge className="self-start" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Telefon
            </span>
            <a
              href={phoneHref}
              className="font-display text-lg font-bold transition-colors hover:text-primary"
            >
              {phone}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              E-mail
            </span>
            <a
              href={`mailto:${email}`}
              className="font-display text-lg font-bold transition-colors hover:text-primary"
            >
              {email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Adresa
            </span>
            <a
              href={addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-lg font-bold transition-colors hover:text-primary"
            >
              {addressLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </a>
          </div>
        </div>

        {footer?.showGoogleReviews && (
          <div className="mt-12">
            <FeaturableWidget widgetId={getFeaturableWidgetId()} />
          </div>
        )}

        <div className="my-8 border-t border-dashed border-border" />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>{businessInfo}</p>
          <p>
            © {year} · {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
