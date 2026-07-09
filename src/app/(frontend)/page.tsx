import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { queryDraftPage, queryPublishedPage } from '@/utilities/queryDocBySlug'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = draft ? await queryDraftPage('home') : await queryPublishedPage('home')

  return <>{page?.layout && <RenderBlocks blocks={page.layout} />}</>
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPublishedPage('home')

  return generateMeta({ doc: page })
}
