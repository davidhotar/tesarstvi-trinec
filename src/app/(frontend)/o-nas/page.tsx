import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { SITE_NAME } from '@/constants/site'
import { queryDraftPage, queryPublishedPage } from '@/utilities/queryDocBySlug'

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
  const page = draft ? await queryDraftPage('o-nas') : await queryPublishedPage('o-nas')

  return <>{page?.layout && <RenderBlocks blocks={page.layout} />}</>
}
