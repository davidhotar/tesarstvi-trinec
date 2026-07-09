import type { Metadata } from 'next/types'

import { CtaBanner } from '@/components/about'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { SITE_NAME } from '@/constants/site'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'
import React, { Suspense } from 'react'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<{ category?: string }>
}

// Cached list data — the same for every visitor; the category filter is applied
// client-side in <PortfolioGrid>. Tagged so portfolio/category edits bust it.
async function getPortfolioListData() {
  'use cache'
  cacheLife('max')
  cacheTag('portfolio')
  cacheTag('categories')

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

  return {
    posts: posts.docs,
    totalDocs: posts.totalDocs,
    categories: categoriesResult.docs.map((cat) => ({
      id: cat.id,
      title: cat.title,
      slug: cat.slug,
    })),
  }
}

// Reads the request-time category filter; wrapped in <Suspense> so the page
// shell (hero) still prerenders statically.
async function PortfolioGridSection({ searchParams }: Args) {
  const { category } = await searchParams
  const { posts, categories } = await getPortfolioListData()

  return (
    <PortfolioGrid
      posts={posts}
      categories={categories}
      initialCategorySlug={category}
      showAllTab
    />
  )
}

export default async function Page({ searchParams }: Args) {
  const { totalDocs } = await getPortfolioListData()

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
              Celkem {totalDocs} realizací
            </p>
          </div>
        </div>
      </div>

      <div className="pb-24">
        <Suspense>
          <PortfolioGridSection searchParams={searchParams} />
        </Suspense>
      </div>

      <CtaBanner />
    </div>
  )
}

export function generateMetadata(): Metadata {
  const description =
    'Naše realizace – tesařské a střešní práce, krovy, pergoly, přístřešky a dřevostavby v Třinci a okolí.'

  return {
    title: 'Portfolio',
    description,
    alternates: { canonical: '/portfolio' },
    openGraph: mergeOpenGraph({
      title: `Portfolio | ${SITE_NAME}`,
      description,
      url: '/portfolio',
    }),
  }
}
