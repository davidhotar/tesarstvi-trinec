'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex flex-col lg:flex-row gap-1 lg:gap-1 items-start lg:items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="text-foreground/80 hover:text-foreground hover:bg-foreground/5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          />
        )
      })}
    </nav>
  )
}
