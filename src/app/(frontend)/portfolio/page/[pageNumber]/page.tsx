import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const [posts, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: 12,
      page: sanitizedPageNumber,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
        meta: true,
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      select: {
        title: true,
      },
    }),
  ])

  const categories = categoriesResult.docs.map((cat) => ({
    id: cat.id,
    title: cat.title,
  }))

  return (
    <div className="pb-24">
      <PageClient />

      {/* Hero header */}
      <div className="relative overflow-hidden bg-foreground text-background pt-40 pb-20 md:pt-48 md:pb-24 mb-12 md:mb-16">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

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
            <PageRange
              className="text-sm text-background/50"
              collection="portfolio"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>
        </div>
      </div>

      <PortfolioGrid posts={posts.docs} categories={categories} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Portfolio – strana ${pageNumber} | Tesařství Třinec`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'portfolio',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
