import type { Portfolio } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { RelatedPortfolioCarousel } from './Carousel'

const LIMIT = 9

type Props = {
  currentId: number
  categories: Portfolio['categories']
}

/**
 * Renders a carousel of other portfolio references at the bottom of a detail page.
 * Items sharing a category with the current one come first; if there aren't enough,
 * the most recent published items fill the rest. The current item is always excluded.
 */
export const RelatedPortfolio: React.FC<Props> = async ({ currentId, categories }) => {
  const payload = await getPayload({ config: configPromise })

  const categoryIds = (categories || [])
    .map((category) => (typeof category === 'object' ? category.id : category))
    .filter((id): id is number => typeof id === 'number')

  // Preserve insertion order (related first, then fill) while de-duplicating.
  const collected = new Map<number, Portfolio>()

  if (categoryIds.length > 0) {
    const related = await payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: LIMIT,
      sort: '-publishedAt',
      where: {
        and: [
          { id: { not_equals: currentId } },
          { _status: { equals: 'published' } },
          { categories: { in: categoryIds } },
        ],
      },
    })

    related.docs.forEach((doc) => collected.set(doc.id, doc))
  }

  if (collected.size < LIMIT) {
    const fill = await payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: LIMIT,
      sort: '-publishedAt',
      where: {
        and: [{ id: { not_equals: currentId } }, { _status: { equals: 'published' } }],
      },
    })

    for (const doc of fill.docs) {
      if (collected.size >= LIMIT) break
      if (!collected.has(doc.id)) collected.set(doc.id, doc)
    }
  }

  const posts = Array.from(collected.values())

  if (posts.length === 0) return null

  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-24 md:mt-32 px-3 md:px-4">
      <div className="flex items-center gap-4 mb-8">
        <span className="inline-block w-8 h-[1px] bg-portfolio-accent" />
        <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
          Další reference
        </h2>
      </div>
      <RelatedPortfolioCarousel posts={posts} />
    </div>
  )
}
