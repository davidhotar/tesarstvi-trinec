import type { Metadata } from 'next/types'

import { CtaBanner } from '@/components/about'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  searchParams: Promise<{ category?: string }>
}

export default async function Page({ searchParams }: Args) {
  const { category } = await searchParams
  const payload = await getPayload({ config: configPromise })

  const [posts, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: 0,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
        meta: true,
        location: true,
        year: true,
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    }),
  ])

  const categories = categoriesResult.docs.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  return (
    <div className="relative bg-black text-white dark:bg-background dark:text-foreground">
      <PageClient />

      {/* Hero header */}
      <div className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-portfolio-accent/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container relative">
          <div className="portfolio-fade-up">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-portfolio-accent font-medium mb-6">
              Naše realizace
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
              Portfolio
            </h1>
            <div className="portfolio-line-reveal h-[2px] bg-portfolio-accent w-24 mt-8" style={{ animationDelay: '300ms' }} />
          </div>

          <div className="portfolio-fade-up mt-8" style={{ animationDelay: '200ms' }}>
            <p className="text-sm text-white/50 dark:text-foreground/50">
              Celkem {posts.totalDocs} realizací
            </p>
          </div>
        </div>
      </div>

      <div className="pb-24">
        <Suspense>
          <PortfolioGrid
            posts={posts.docs}
            categories={categories}
            initialCategorySlug={category}
          />
        </Suspense>
      </div>

      <CtaBanner />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Portfolio | Tesařství Třinec`,
  }
}
