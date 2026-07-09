import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

/**
 * Cached fetch of all redirects, tagged `redirects` so the redirects
 * revalidate hook can invalidate it on-demand.
 *
 * Cache all redirects together to avoid multiple fetches.
 */
export async function getCachedRedirects(depth = 1) {
  'use cache'
  cacheLife('max')
  cacheTag('redirects')

  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
  })

  return redirects
}
