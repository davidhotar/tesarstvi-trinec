import { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import {
  HeroSection,
  PortfolioSection,
  ServicesSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
} from '@/components/homepage'
import { NumberedCardGrid } from '@/components/NumberedCardGrid'
import {
  IconPhone,
  IconMapPin,
  IconFileDescription,
  IconHammer,
} from '@tabler/icons-react'

const processSteps = [
  {
    number: '01',
    icon: IconPhone,
    title: 'Zavoláte / napíšete',
    description: 'Krátký telefonát, zjistíme co potřebujete.',
  },
  {
    number: '02',
    icon: IconMapPin,
    title: 'Přijedeme se podívat',
    description: 'Zaměření a poradenství u vás zdarma.',
  },
  {
    number: '03',
    icon: IconFileDescription,
    title: 'Návrh + cenová nabídka',
    description: 'Do 5 dnů. Bez závazku, bez skrytých nákladů.',
  },
  {
    number: '04',
    icon: IconHammer,
    title: 'Postavíme',
    description: 'Termín dodržíme. Vždy.',
  },
]

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
      <NumberedCardGrid
        title="Bez stresu, bez překvapení."
        items={processSteps}
        showConnector
      />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
    </>
  )
}
