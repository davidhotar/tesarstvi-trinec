import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { SITE_NAME } from '@/constants/site'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

const description =
  'Rodinná tesařská firma z Třince s více než 25 lety zkušeností. Pergoly, přístřešky a dřevostavby na míru.'

export const metadata: Metadata = {
  title: 'O nás',
  description,
  alternates: { canonical: '/o-nas' },
  openGraph: mergeOpenGraph({ title: `O nás | ${SITE_NAME}`, description, url: '/o-nas' }),
}

export default async function ONasPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: 'o-nas',
      },
    },
  })

  const page = result.docs?.[0] || null

  return <>{page?.layout && <RenderBlocks blocks={page.layout} />}</>
}
