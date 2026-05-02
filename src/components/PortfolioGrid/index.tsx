'use client'

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/utilities/ui'
import { Card, CardPortfolioData } from '@/components/Card'
import type { Category } from '@/payload-types'

export type PortfolioGridProps = {
  posts: CardPortfolioData[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ posts, categories }) => {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => (a.title ?? '').localeCompare(b.title ?? '', 'cs')),
    [categories],
  )

  const initialCategory = useMemo(() => {
    if (categorySlug) {
      const match = sortedCategories.find((c) => c.slug === categorySlug)
      if (match) return match.id
    }
    return sortedCategories[0]?.id ?? 0
  }, [categorySlug, sortedCategories])

  const [activeCategory, setActiveCategory] = useState<number>(initialCategory)

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (!post.categories || !Array.isArray(post.categories)) return false
      return post.categories.some((cat) => {
        const catId = typeof cat === 'object' ? cat.id : cat
        return catId === activeCategory
      })
    })
  }, [posts, activeCategory])

  return (
    <div>
      {/* Category tabs */}
      <div className="container mb-10 md:mb-14">
        <div className="flex flex-wrap gap-2">
          {sortedCategories.map((cat) => {
            const count = posts.filter((post) =>
              post.categories?.some((c) => (typeof c === 'object' ? c.id : c) === cat.id),
            ).length
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'relative px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium rounded-full transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-portfolio-accent text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80',
                )}
              >
                {cat.title}
                <span className="ml-1.5 text-[0.6rem] opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredPosts.map((result, index) => {
            if (typeof result !== 'object' || result === null) return null
            const isFeatured = index % 7 === 0

            return (
              <div
                className={cn(
                  'portfolio-scale-in',
                  isFeatured && 'sm:col-span-2 lg:col-span-2',
                )}
                key={result.slug}
                style={{ animationDelay: `${index * 60}ms` }}
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
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-sm uppercase tracking-widest">Žádné realizace v této kategorii</p>
          </div>
        )}
      </div>
    </div>
  )
}
