'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-(--admin-bar-height,0px) z-20 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="shrink-0">
          <Logo priority={true} />
        </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <HeaderNav data={data} />
        </div>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          {data.phone && (
            <Button variant="outline" size="lg" asChild className="rounded-full">
              <a href={`tel:${data.phone.replace(/\s/g, '')}`}>
                <Phone className="h-4 w-4" />
                {data.phone}
              </a>
            </Button>
          )}
          <Button size="lg" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            <Link href="/kontakt#poptavka">Poptávka</Link>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label={mobileOpen ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="container flex flex-col gap-4 py-6">
            <HeaderNav data={data} />
            <div className="flex flex-col gap-3 pt-2 border-t border-border/30">
              {data.phone && (
                <Button variant="outline" size="lg" asChild className="rounded-full w-full">
                  <a href={`tel:${data.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-4 w-4" />
                    {data.phone}
                  </a>
                </Button>
              )}
              <Button size="lg" asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium w-full">
                <Link href="/kontakt#poptavka" onClick={() => setMobileOpen(false)}>
                  Poptávka
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
