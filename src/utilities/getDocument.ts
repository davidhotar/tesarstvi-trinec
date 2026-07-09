import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

type Collection = keyof Config['collections']

/**
 * Cached fetch of a single document by slug, tagged `<collection>_<slug>`
 * so the collection's revalidate hook can invalidate it on-demand.
 */
export async function getCachedDocument(collection: Collection, slug: string, depth = 0) {
  'use cache'
  cacheLife('max')
  cacheTag(`${collection}_${slug}`)

  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}
