import type { Block } from 'payload'

import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

export const ProfileHeroSection: Block = {
  slug: 'profileHeroSection',
  interfaceName: 'ProfileHeroSectionBlock',
  imageURL: '/images/blocks/profile-hero-section.svg',
  imageAltText: 'Profile hero with image and stats',
  labels: {
    singular: 'Profile Hero Section',
    plural: 'Profile Hero Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'O nás · od roku 2014',
    },
    {
      name: 'richText',
      type: 'richText',
      required: true,
      label: 'Heading & Description',
      admin: {
        description:
          'Use H1 for the heading (bold text = primary color highlight). Paragraph text becomes the description.',
      },
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1'] }),
          BoldFeature(),
          ItalicFeature(),
        ],
      }),
    },
    {
      name: 'personName',
      type: 'text',
      required: true,
    },
    {
      name: 'personTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'personImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'quote',
      type: 'text',
      admin: {
        description: 'Short quote displayed over the hero image.',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Zavolat',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: 'tel:+420737136848',
    },
    {
      name: 'badges',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'select',
          defaultValue: 'top-left',
          options: [
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Right', value: 'top-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Right', value: 'bottom-right' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
