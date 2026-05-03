import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/components/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/components/blocks/CallToAction/Component'
import { ContentBlock } from '@/components/blocks/Content/Component'
import { FormBlock } from '@/components/blocks/Form/Component'
import { HeroSectionBlock } from '@/components/blocks/HeroSection/Component'
import { MediaBlock } from '@/components/blocks/MediaBlock/Component'
import { ServicesSectionBlock } from '@/components/blocks/ServicesSection/Component'
import { NumberedCardGridBlock } from '@/components/blocks/NumberedCardGrid/Component'
import { TestimonialsSectionBlock } from '@/components/blocks/TestimonialsSection/Component'
import { FAQSectionBlock } from '@/components/blocks/FAQSection/Component'
import { PortfolioSectionBlock } from '@/components/blocks/PortfolioSection/Component'
import { ProfileHeroSectionBlock } from '@/components/blocks/ProfileHeroSection/Component'
import { TimelineSectionBlock } from '@/components/blocks/TimelineSection/Component'
import { RegionSectionBlock } from '@/components/blocks/RegionSection/Component'
import { CtaBannerBlock } from '@/components/blocks/CtaBanner/Component'
import { ContactHeroSectionBlock } from '@/components/blocks/ContactHeroSection/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  heroSection: HeroSectionBlock,
  mediaBlock: MediaBlock,
  servicesSection: ServicesSectionBlock,
  numberedCardGrid: NumberedCardGridBlock,
  testimonialsSection: TestimonialsSectionBlock,
  faqSection: FAQSectionBlock,
  portfolioSection: PortfolioSectionBlock,
  profileHeroSection: ProfileHeroSectionBlock,
  timelineSection: TimelineSectionBlock,
  regionSection: RegionSectionBlock,
  ctaBanner: CtaBannerBlock,
  contactHeroSection: ContactHeroSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isFullBleed = ['heroSection', 'servicesSection', 'numberedCardGrid', 'testimonialsSection', 'faqSection', 'portfolioSection', 'profileHeroSection', 'timelineSection', 'regionSection', 'ctaBanner', 'contactHeroSection'].includes(blockType)

              if (isFullBleed) {
                return (
                  <Fragment key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} />
                  </Fragment>
                )
              }

              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
