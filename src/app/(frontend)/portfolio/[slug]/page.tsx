import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Portfolio } from '@/payload-types'

import { PortfolioGallery } from '@/components/PortfolioGallery'
import { RelatedPortfolio } from '@/components/RelatedPortfolio'
import { PortfolioHero } from '@/components/heros/PortfolioHero'
import { BreadcrumbStructuredData } from '@/components/StructuredData'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'portfolio',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PortfolioItem({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/portfolio/' + decodedSlug
  const post = await queryPortfolioBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  // Automatically include the hero image as the first gallery item so it doesn't
  // have to be added manually. Skip it if it's already present in the gallery.
  const heroImage = post.heroImage
  const heroId = heroImage && typeof heroImage === 'object' ? heroImage.id : heroImage
  const existingGallery = post.gallery ?? []
  const heroAlreadyInGallery = existingGallery.some((item) => {
    const image = item.image
    const imageId = image && typeof image === 'object' ? image.id : image
    return imageId === heroId
  })
  const galleryItems: NonNullable<Portfolio['gallery']> =
    heroImage && !heroAlreadyInGallery
      ? [{ id: 'hero-image', image: heroImage, caption: null }, ...existingGallery]
      : existingGallery

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      <BreadcrumbStructuredData
        items={[
          { name: 'Domů', item: '/' },
          { name: 'Portfolio', item: '/portfolio' },
          { name: post.title, item: `/portfolio/${decodedSlug}` },
        ]}
      />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PortfolioHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
        </div>

        {galleryItems.length > 0 && (
          <div className="w-full max-w-screen-2xl mx-auto mt-16 md:mt-24 px-3 md:px-4">
            <div className="flex items-center gap-4 mb-8">
              <span className="inline-block w-8 h-[1px] bg-portfolio-accent" />
              <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
                Galerie
              </h2>
            </div>
            <PortfolioGallery items={galleryItems} />
          </div>
        )}

        <RelatedPortfolio currentId={post.id} categories={post.categories} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPortfolioBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post, pathPrefix: '/portfolio' })
}

const queryPortfolioBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'portfolio',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
