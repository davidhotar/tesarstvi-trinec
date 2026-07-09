import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

/**
 * Content-page queries, split for Cache Components.
 *
 * The `queryPublished*` helpers use `'use cache'` so published content
 * prerenders into the static shell, tagged `<collection>_<slug>` so the
 * collection's revalidate hook busts it on publish/delete. The
 * `queryDraft*` helpers are uncached and read request-time draft data;
 * they are only reached inside draft mode (Payload live preview).
 */

export async function queryPublishedPage(slug: string) {
  'use cache'
  cacheLife('max')
  cacheTag(`pages_${slug}`)

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
}

export async function queryDraftPage(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft: true,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
}

export async function queryPublishedPortfolio(slug: string) {
  'use cache'
  cacheLife('max')
  cacheTag(`portfolio_${slug}`)

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'portfolio',
    draft: false,
    limit: 1,
    pagination: false,
    overrideAccess: false,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
}

export async function queryDraftPortfolio(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'portfolio',
    draft: true,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
}
