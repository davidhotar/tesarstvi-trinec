import * as React from 'react'

import { cn } from '@/utilities/ui'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  const numWidth = typeof width === 'string' ? parseInt(width, 10) : width

  return (
    <div
      className={cn('w-full', className)}
      style={
        numWidth && numWidth < 100
          ? { flexBasis: `calc(${numWidth}% - 0.5rem)`, flexGrow: 0, flexShrink: 0 }
          : undefined
      }
    >
      {children}
    </div>
  )
}
