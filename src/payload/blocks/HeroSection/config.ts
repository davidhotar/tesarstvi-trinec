import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/payload/fields/linkGroup'

export const HeroSection: Block = {
  slug: 'heroSection',
  interfaceName: 'HeroSectionBlock',
  imageURL: '/images/blocks/hero-section.svg',
  imageAltText: 'Full-width hero with background image and stats',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'source',
          type: 'select',
          defaultValue: 'manual',
          options: [
            { label: 'Manual value', value: 'manual' },
            { label: 'Google rating (auto)', value: 'googleRating' },
            { label: 'Google review count (auto)', value: 'googleReviewCount' },
          ],
          admin: {
            description:
              'Auto options pull the live value from Google Business Profile. The label stays whatever you set below.',
          },
        },
        {
          name: 'value',
          type: 'text',
          admin: {
            description: 'Shown only when Source is "Manual value". Ignored for auto sources.',
            condition: (_, siblingData) => (siblingData?.source ?? 'manual') === 'manual',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Hero Sections',
    singular: 'Hero Section',
  },
}
