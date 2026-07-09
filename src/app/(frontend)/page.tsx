import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

export default async function HomePage() {
  const page = await queryHomePage()

  return <>{page?.layout && <RenderBlocks blocks={page.layout} />}</>
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryHomePage()

  return generateMeta({ doc: page })
}

const queryHomePage = cache(async () => {
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
        equals: 'home',
      },
    },
  })

  return result.docs?.[0] || null
})
