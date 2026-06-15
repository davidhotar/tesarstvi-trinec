import * as React from 'react'

import { cn } from '@/utilities/ui'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const numWidth = typeof width === 'string' ? parseInt(width, 10) : width
  const isPartial = Boolean(numWidth && numWidth < 100)

  return (
    <div
      // Full width on mobile; only honor the configured percentage from `sm` up
      // so partial-width fields don't crowd into columns on small screens.
      className={cn('w-full', isPartial && 'sm:flex-[0_0_var(--field-basis)]', className)}
      style={
        isPartial
          ? ({ '--field-basis': `calc(${numWidth}% - 0.5rem)` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  )
}
