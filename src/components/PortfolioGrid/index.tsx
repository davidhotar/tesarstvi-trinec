'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Card, CardPortfolioData } from '@/components/Card'
import Link from 'next/link'
import type { Category } from '@/payload-types'

export type PortfolioGridProps = {
  posts: CardPortfolioData[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
  limit?: number
  heading?: string
  showAllTab?: boolean
  initialCategorySlug?: string
}

export function PortfolioGrid({
  posts,
  categories,
  limit,
  heading,
  showAllTab = false,
  initialCategorySlug,
}: PortfolioGridProps) {
  const categoriesWithCounts = useMemo(() => {
    return categories
      .map((cat) => {
        const count = posts.filter((post) =>
          post.categories?.some((c) => (typeof c === 'object' ? c.id : c) === cat.id),
        ).length
        return { ...cat, count }
      })
      .filter((cat) => cat.count > 0)
      .sort((a, b) => (a.title ?? '').localeCompare(b.title ?? '', 'cs'))
  }, [categories, posts])

  const initialCategoryId = useMemo(() => {
    if (showAllTab) return null
    if (initialCategorySlug) {
      const match = categoriesWithCounts.find((c) => c.slug === initialCategorySlug)
      if (match) return match.id
    }
    return categoriesWithCounts[0]?.id ?? null
  }, [showAllTab, initialCategorySlug, categoriesWithCounts])

  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId)

  const filteredPosts = useMemo(() => {
    let filtered = posts
    if (activeCategoryId !== null) {
      filtered = posts.filter((post) =>
        post.categories?.some(
          (c) => (typeof c === 'object' ? c.id : c) === activeCategoryId,
        ),
      )
    }
    return limit ? filtered.slice(0, limit) : filtered
  }, [posts, activeCategoryId, limit])

  const activeCategory = categoriesWithCounts.find((c) => c.id === activeCategoryId)
  const totalForActive = activeCategoryId === null
    ? posts.length
    : activeCategory?.count ?? 0
  const showMoreHref = activeCategoryId === null
    ? '/portfolio'
    : `/portfolio?category=${activeCategory?.slug ?? ''}`
  const isLimited = !!limit

  return (
    <div>
      <div className="container">
        <div className="mb-10 md:mb-14 flex flex-wrap items-end justify-between gap-4">
          {heading && (
            <div>
              <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            </div>
          )}
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="Filtrovat kategorie"
          >
            {showAllTab && (
              <Button
                variant={activeCategoryId === null ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
                role="tab"
                aria-selected={activeCategoryId === null}
                onClick={() => setActiveCategoryId(null)}
              >
                Vše
              </Button>
            )}
            {categoriesWithCounts.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategoryId === cat.id ? 'default' : 'ghost'}
                size="sm"
                className="rounded-full"
                role="tab"
                aria-selected={activeCategoryId === cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className={cn(
            'grid grid-cols-1 gap-3',
            isLimited
              ? filteredPosts.length >= 3
                ? 'md:grid-cols-3 md:grid-rows-2'
                : 'md:grid-cols-2'
              : 'sm:grid-cols-2 lg:grid-cols-3 md:gap-4',
          )}
        >
          {filteredPosts.map((post, index) => {
            const isFeatured = isLimited
              ? index === 0 && filteredPosts.length >= 3
              : index % 7 === 0
            return (
              <div
                key={post.slug}
                className={cn(
                  'portfolio-scale-in',
                  isFeatured && (isLimited ? 'md:row-span-2' : 'sm:col-span-2 lg:col-span-2'),
                )}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Card
                  className={cn(
                    'h-full',
                    isLimited && 'rounded-xl',
                    isLimited && (isFeatured ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'),
                  )}
                  doc={post}
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

      {isLimited && (
        <div className="container mt-6 flex justify-center">
          <Button variant="ghost" className="rounded-lg" asChild>
            <Link href={showMoreHref}>
              {totalForActive > limit
                ? `Zobrazit všech ${totalForActive} realizací →`
                : `Zobrazit portfolio →`}
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
