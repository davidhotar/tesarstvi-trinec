import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Alert } from '@/components/ui/alert'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <Alert
        className={cn({
          'border-error bg-error/30 text-error': style === 'error',
          'border-success bg-success/30 text-success': style === 'success',
          'border-warning bg-warning/30 text-warning': style === 'warning',
        })}
        variant={style === 'error' ? 'destructive' : 'default'}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </Alert>
    </div>
  )
}
