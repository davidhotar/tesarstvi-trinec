import { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import {
  HeroSection,
  PortfolioSection,
  ServicesSection,
  ProcessSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
} from '@/components/homepage'

export default async function HomePage() {
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

  const page = result.docs?.[0] || null
  const hasPayloadHero = page?.layout && page.layout.length > 0

  return (
    <>
      {hasPayloadHero ? (
        <RenderBlocks blocks={page.layout} />
      ) : (
        <HeroSection />
      )}
      <Suspense>
        <PortfolioSection />
      </Suspense>
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
    </>
  )
}
