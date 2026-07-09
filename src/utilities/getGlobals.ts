import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

type Global = keyof Config['globals']

/**
 * Cached global fetch, tagged `global_<slug>` so the collection's
 * revalidate hook can invalidate it on-demand.
 */
export async function getCachedGlobal<T extends Global>(
  slug: T,
  depth = 0,
): Promise<DataFromGlobalSlug<T>> {
  'use cache'
  cacheLife('max')
  cacheTag(`global_${slug}`)

  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug,
    depth,
  })
}
