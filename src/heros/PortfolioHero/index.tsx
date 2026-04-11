import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Portfolio } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PortfolioHero: React.FC<{
  post: Portfolio
}> = ({ post }) => {
  const { categories, heroImage, location, populatedAuthors, publishedAt, title, year } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  return (
    <div className="relative -mt-[10.4rem] flex items-end min-h-[85vh]">
      {/* Background image */}
      <div className="absolute inset-0">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="object-cover" resource={heroImage} />
        )}
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/20 dark:from-black dark:via-black/40 dark:to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent dark:from-black/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pb-12 md:pb-16 text-foreground dark:text-white">
        <div className="max-w-4xl">
          {/* Categories */}
          {hasCategories && (
            <div className="portfolio-fade-up text-[0.65rem] uppercase tracking-[0.25em] text-portfolio-accent font-medium mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-[1px] bg-portfolio-accent" />
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const isLast = index === categories.length - 1
                  return (
                    <React.Fragment key={index}>
                      {categoryTitle || 'Bez kategorie'}
                      {!isLast && <React.Fragment> · </React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1
            className="portfolio-fade-up text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-8"
            style={{ animationDelay: '100ms' }}
          >
            {title}
          </h1>

          {/* Accent line */}
          <div
            className="portfolio-line-reveal h-[2px] bg-portfolio-accent w-20 mb-8"
            style={{ animationDelay: '300ms' }}
          />

          {/* Meta info */}
          <div
            className="portfolio-fade-up flex flex-wrap gap-x-10 gap-y-4 text-sm"
            style={{ animationDelay: '400ms' }}
          >
            {hasAuthors && (
              <div>
                <p className="text-foreground/40 dark:text-white/40 text-xs uppercase tracking-wider mb-1">Autor</p>
                <p className="text-foreground/90 dark:text-white/90">{formatAuthors(populatedAuthors)}</p>
              </div>
            )}
            {location && (
              <div>
                <p className="text-foreground/40 dark:text-white/40 text-xs uppercase tracking-wider mb-1">Lokace</p>
                <p className="text-foreground/90 dark:text-white/90">{location}</p>
              </div>
            )}
            {year && (
              <div>
                <p className="text-foreground/40 dark:text-white/40 text-xs uppercase tracking-wider mb-1">Rok</p>
                <p className="text-foreground/90 dark:text-white/90">{year}</p>
              </div>
            )}
            {publishedAt && (
              <div>
                <p className="text-foreground/40 dark:text-white/40 text-xs uppercase tracking-wider mb-1">Publikováno</p>
                <time className="text-foreground/90 dark:text-white/90" dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
