import type { Metadata } from 'next'

import type { Media, Page, Portfolio, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { DEFAULT_OG_IMAGE, SITE_NAME } from '@/constants/site'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + DEFAULT_OG_IMAGE

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Portfolio> | null
  /** Path prefix for the canonical/OG url, e.g. '/portfolio'. Defaults to root. */
  pathPrefix?: string
}): Promise<Metadata> => {
  const { doc, pathPrefix = '' } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  const path = !slug || slug === 'home' ? '/' : `${pathPrefix}/${slug}`
  const isHome = path === '/'

  // Title fallback chain: explicit SEO meta title → the document's own title
  // (e.g. the portfolio item name) → bare brand. Falling back to doc.title keeps
  // pages without an SEO title unique and descriptive instead of all sharing
  // "Tesařství Třinec". The home page is excluded from the doc.title step (its
  // title is the generic "Home").
  const pageTitle = doc?.meta?.title || (isHome ? undefined : doc?.title)

  // A plain string lets the layout's title.template append "| Tesařství Třinec".
  // On the home page we emit `absolute` so the brand isn't doubled.
  const title: Metadata['title'] =
    pageTitle && !isHome ? pageTitle : { absolute: pageTitle || SITE_NAME }
  const ogTitle = pageTitle || SITE_NAME

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: path,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title: ogTitle,
      url: path,
    }),
    title,
  }
}
