import type { Portfolio, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

async function getArchivePosts(categoryIds: number[], limit: number) {
  'use cache'
  cacheLife('max')
  cacheTag('portfolio')

  const payload = await getPayload({ config: configPromise })

  const fetchedPosts = await payload.find({
    collection: 'portfolio',
    depth: 1,
    limit,
    ...(categoryIds.length > 0
      ? {
          where: {
            categories: {
              in: categoryIds,
            },
          },
        }
      : {}),
  })

  return fetchedPosts.docs
}

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Portfolio[] = []

  if (populateBy === 'collection') {
    const categoryIds = (categories || [])
      .map((category) => (typeof category === 'object' ? category.id : category))
      .filter((id): id is number => typeof id === 'number')

    posts = await getArchivePosts(categoryIds, limit)
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Portfolio[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
