'use client'

import React from 'react'
import Link from 'next/link'

type ServiceAnchorNavProps = {
  services: Array<{ number: string; title: string }>
}

export const ServiceAnchorNav: React.FC<ServiceAnchorNavProps> = ({ services }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, number: string) => {
    e.preventDefault()
    const el = document.getElementById(`service-${number}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      aria-label="Přejít na službu"
      className="sticky top-[5rem] z-10 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="container flex items-center gap-6 overflow-x-auto py-3 text-sm">
        <span className="shrink-0 text-xs text-muted-foreground">Skok na:</span>
        {services.map((service) => (
          <a
            key={service.number}
            href={`#service-${service.number}`}
            onClick={(e) => handleClick(e, service.number)}
            className="shrink-0 font-medium transition-colors hover:text-primary"
          >
            {service.number} {service.title}
          </a>
        ))}
        <Link
          href="/kontakt"
          className="ml-auto shrink-0 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Nevíte, co potřebujete?{' '}
          <span className="text-primary">→ Poradíme</span>
        </Link>
      </div>
    </nav>
  )
}
