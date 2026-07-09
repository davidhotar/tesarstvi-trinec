import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'

async function getPortfolioSitemap() {
  'use cache'
  cacheLife('max')
  cacheTag('portfolio-sitemap')

  const payload = await getPayload({ config })
  const SITE_URL = getServerSideURL()

  const results = await payload.find({
    collection: 'portfolio',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dateFallback = new Date().toISOString()

  const sitemap = results.docs
    ? results.docs
        .filter((post) => Boolean(post?.slug))
        .map((post) => ({
          loc: `${SITE_URL}/portfolio/${post?.slug}`,
          lastmod: post.updatedAt || dateFallback,
        }))
    : []

  return sitemap
}

export async function GET() {
  const sitemap = await getPortfolioSitemap()

  return getServerSideSitemap(sitemap)
}
