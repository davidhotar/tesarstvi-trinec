'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { Card, CardPortfolioData } from '@/components/Card'
import Link from 'next/link'
import type { Category } from '@/payload-types'

type PortfolioSectionClientProps = {
  posts: CardPortfolioData[]
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
}

const ITEMS_PER_CATEGORY = 5

export function PortfolioSectionClient({ posts, categories }: PortfolioSectionClientProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)

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

  const filteredPosts = useMemo(() => {
    if (activeCategoryId === null) return posts.slice(0, ITEMS_PER_CATEGORY)
    return posts
      .filter((post) =>
        post.categories?.some(
          (c) => (typeof c === 'object' ? c.id : c) === activeCategoryId,
        ),
      )
      .slice(0, ITEMS_PER_CATEGORY)
  }, [posts, activeCategoryId])

  const activeCategory = categoriesWithCounts.find((c) => c.id === activeCategoryId)
  const totalForActive = activeCategoryId === null
    ? posts.length
    : activeCategory?.count ?? 0
  const showMoreHref = activeCategoryId === null
    ? '/portfolio'
    : `/portfolio?category=${activeCategory?.slug ?? ''}`

  return (
    <>
      <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Každý projekt je jiný.
          </h2>
        </div>
        <div
          className="flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Filtrovat kategorie"
        >
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

      <div
        className={cn(
          'grid grid-cols-1 gap-3',
          filteredPosts.length >= 3
            ? 'md:grid-cols-3 md:grid-rows-2'
            : 'md:grid-cols-2',
        )}
      >
        {filteredPosts.map((post, index) => {
          const isFeatured = index === 0 && filteredPosts.length >= 3
          return (
            <div
              key={post.slug}
              className={cn(
                'portfolio-scale-in',
                isFeatured && 'md:row-span-2',
              )}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Card
                className={cn(
                  'h-full rounded-xl',
                  isFeatured ? 'aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]',
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

      <div className="mt-6 flex justify-center">
        <Button variant="ghost" className="rounded-lg" asChild>
          <Link href={showMoreHref}>
            {totalForActive > ITEMS_PER_CATEGORY
              ? `Zobrazit všech ${totalForActive} realizací →`
              : `Zobrazit portfolio →`}
          </Link>
        </Button>
      </div>
    </>
  )
}
