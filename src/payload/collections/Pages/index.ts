import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '@/payload/blocks/ArchiveBlock/config'
import { CallToAction } from '@/payload/blocks/CallToAction/config'
import { Content } from '@/payload/blocks/Content/config'
import { FormBlock } from '@/payload/blocks/Form/config'
import { HeroSection } from '@/payload/blocks/HeroSection/config'
import { MediaBlock } from '@/payload/blocks/MediaBlock/config'
import { ServicesSection } from '@/payload/blocks/ServicesSection/config'
import { NumberedCardGrid } from '@/payload/blocks/NumberedCardGrid/config'
import { TestimonialsSection } from '@/payload/blocks/TestimonialsSection/config'
import { FAQSection } from '@/payload/blocks/FAQSection/config'
import { PortfolioSection } from '@/payload/blocks/PortfolioSection/config'
import { ProfileHeroSection } from '@/payload/blocks/ProfileHeroSection/config'
import { TimelineSection } from '@/payload/blocks/TimelineSection/config'
import { RegionSection } from '@/payload/blocks/RegionSection/config'
import { CtaBanner } from '@/payload/blocks/CtaBanner/config'
import { ContactHeroSection } from '@/payload/blocks/ContactHeroSection/config'
import { ServiceHero } from '@/payload/blocks/ServiceHero/config'
import { ServiceDeepDive } from '@/payload/blocks/ServiceDeepDive/config'

import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, HeroSection, ServicesSection, NumberedCardGrid, TestimonialsSection, FAQSection, PortfolioSection, ProfileHeroSection, TimelineSection, RegionSection, CtaBanner, ContactHeroSection, ServiceHero, ServiceDeepDive],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
