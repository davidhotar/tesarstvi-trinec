'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Portfolio } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPortfolioData = Pick<Portfolio, 'slug' | 'categories' | 'meta' | 'title' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPortfolioData
  relationTo?: 'portfolio'
  showCategories?: boolean
  title?: string
  featured?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, featured } = props

  const { slug, categories, heroImage, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}
  const cardImage = heroImage ?? metaImage

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative overflow-hidden hover:cursor-pointer',
        featured ? 'aspect-[4/3]' : 'aspect-[3/4]',
        className,
      )}
      ref={card.ref}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {!cardImage && (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
            Žádný obrázek
          </div>
        )}
        {cardImage && typeof cardImage !== 'string' && (
          <Media
            fill
            imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            resource={cardImage}
          />
        )}
      </div>

      {/* Gradient overlay — always visible at bottom, stronger on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 text-white">
        {/* Categories */}
        {showCategories && hasCategories && (
          <div className="text-[0.65rem] uppercase tracking-[0.2em] text-portfolio-accent font-medium mb-2 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: categoryTitle } = category
                const isLast = index === categories.length - 1
                return (
                  <Fragment key={index}>
                    {categoryTitle || 'Bez kategorie'}
                    {!isLast && <Fragment> · </Fragment>}
                  </Fragment>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        {titleToUse && (
          <h3
            className={cn(
              'font-semibold leading-tight tracking-tight transition-transform duration-500 group-hover:-translate-y-1',
              featured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl',
            )}
          >
            <Link className="no-underline text-white" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}

        {/* Description — revealed on hover */}
        {description && (
          <p className="text-sm text-white/70 mt-2 line-clamp-2 translate-y-4 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
            {sanitizedDescription}
          </p>
        )}

        {/* Bottom accent line */}
        <div className="h-[2px] bg-portfolio-accent mt-4 w-0 transition-all duration-700 ease-out group-hover:w-16" />
      </div>
    </article>
  )
}
