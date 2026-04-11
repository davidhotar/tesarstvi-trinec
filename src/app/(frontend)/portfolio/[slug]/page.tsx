import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Portfolio } from '@/payload-types'

import { Media } from '@/components/Media'
import { PortfolioHero } from '@/heros/PortfolioHero'
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

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PortfolioHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />

          {post.gallery && post.gallery.length > 0 && (
            <div className="max-w-[64rem] mx-auto mt-16 md:mt-24">
              <div className="flex items-center gap-4 mb-8">
                <span className="inline-block w-8 h-[1px] bg-portfolio-accent" />
                <h2 className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium">
                  Galerie
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {post.gallery.map((item, index) => (
                  <figure
                    key={item.id || index}
                    className={`group relative overflow-hidden ${
                      index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                    }`}
                  >
                    {item.image && typeof item.image !== 'string' && (
                      <div className={`relative ${index === 0 ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
                        <Media
                          fill
                          imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                          resource={item.image}
                        />
                      </div>
                    )}
                    {item.caption && (
                      <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPortfolioBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
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
