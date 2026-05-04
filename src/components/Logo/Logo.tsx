import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

interface Props {
  className?: string
  priority?: boolean
}

export const Logo = (props: Props) => {
  const { priority, className } = props

  return (
    <NextImage
      alt="TESARSTVI TRINEC"
      width={867}
      height={216}
      priority={priority}
      quality={80}
      className={cn('max-w-[12rem] w-full h-auto', className)}
      src="/images/logo.png"
    />
  )
}
