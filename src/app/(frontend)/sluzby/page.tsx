import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { ServiceAnchorNav } from '@/components/ServiceAnchorNav'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { SITE_NAME } from '@/constants/site'
import { queryDraftPage, queryPublishedPage } from '@/utilities/queryDocBySlug'

const description =
  'Pergoly, přístřešky a dřevostavby na míru. Rodinná tesařská firma z Třince s více než 10 lety zkušeností.'

export const metadata: Metadata = {
  title: 'Služby',
  description,
  alternates: { canonical: '/sluzby' },
  openGraph: mergeOpenGraph({ title: `Služby | ${SITE_NAME}`, description, url: '/sluzby' }),
}

export default async function SluzbyPage() {
  const { isEnabled: draft } = await draftMode()
  const page = draft ? await queryDraftPage('sluzby') : await queryPublishedPage('sluzby')
  const blocks = page?.layout || []

  const firstServiceIndex = blocks.findIndex(
    (b) => b.blockType === 'serviceDeepDive',
  )
  const heroBlocks = firstServiceIndex > 0 ? blocks.slice(0, firstServiceIndex) : []
  const restBlocks = firstServiceIndex >= 0 ? blocks.slice(firstServiceIndex) : blocks

  const services = blocks
    .filter(
      (b): b is Extract<typeof b, { blockType: 'serviceDeepDive' }> =>
        b.blockType === 'serviceDeepDive',
    )
    .map((b) => ({ number: b.number, title: b.title }))

  return (
    <>
      {heroBlocks.length > 0 && <RenderBlocks blocks={heroBlocks} />}
      {services.length > 0 && <ServiceAnchorNav services={services} />}
      {restBlocks.length > 0 && <RenderBlocks blocks={restBlocks} />}
    </>
  )
}
