import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { PortfolioGrid } from '@/components/PortfolioGrid'
import type { PortfolioSectionBlock as PortfolioSectionBlockType } from '@/payload-types'

export const PortfolioSectionBlock: React.FC<PortfolioSectionBlockType> = async ({
  title,
  buttonLabel,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const [postsResult, categoriesResult] = await Promise.all([
    payload.find({
      collection: 'portfolio',
      depth: 1,
      limit: 0,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        heroImage: true,
        meta: true,
        location: true,
        year: true,
      },
    }),
    payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    }),
  ])

  const categories = categoriesResult.docs.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
  }))

  return (
    <section className="py-24">
      <PortfolioGrid
        posts={postsResult.docs}
        categories={categories}
        limit={limit ?? undefined}
        heading={title}
        buttonLabel={buttonLabel ?? undefined}
        showAllTab
      />
    </section>
  )
}
