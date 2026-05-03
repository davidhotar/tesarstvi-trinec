import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPortfolioData } from '@/components/Card'

type Props = {
  posts: CardPortfolioData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            // First item and every 7th item after that are featured (large)
            const isFeatured = index % 7 === 0

            return (
              <div
                className={cn(
                  'portfolio-scale-in',
                  isFeatured && 'sm:col-span-2 lg:col-span-2',
                )}
                key={index}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Card
                  className="h-full"
                  doc={result}
                  relationTo="portfolio"
                  showCategories
                  featured={isFeatured}
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
