import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME } from '@/constants/site'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  locale: SITE_LOCALE,
  description: SITE_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}${DEFAULT_OG_IMAGE}`,
    },
  ],
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
