import type { Block } from 'payload'

export const ProfileHeroSection: Block = {
  slug: 'profileHeroSection',
  interfaceName: 'ProfileHeroSectionBlock',
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
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'headingHighlight',
      type: 'text',
      admin: {
        description: 'Word or phrase highlighted in primary color at the end of the heading.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
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
