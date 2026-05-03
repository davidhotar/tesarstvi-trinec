import type { Block } from 'payload'

export const ServiceDeepDive: Block = {
  slug: 'serviceDeepDive',
  interfaceName: 'ServiceDeepDiveBlock',
  labels: {
    singular: 'Service Deep Dive',
    plural: 'Service Deep Dives',
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        description: 'Display number (e.g. "01", "02", "03")',
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Label pill (e.g. "Bestseller · 60 % naší práce")',
      },
    },
    {
      name: 'badgeVariant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Accent', value: 'accent' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      options: [
        { label: 'Showcase (cards + image/checklist)', value: 'showcase' },
        { label: 'Gallery (checklist + image grid)', value: 'gallery' },
      ],
    },
    {
      name: 'subServices',
      type: 'array',
      admin: {
        initCollapsed: true,
        condition: (_, siblingData) => siblingData?.variant === 'showcase',
        description: 'Sub-service cards (showcase variant)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
        {
          name: 'tags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'checklist',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'V ceně vždy:',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'tip',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'gallery',
        description: 'Optional tip callout (gallery variant)',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Chci nezávaznou nabídku',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/kontakt',
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Muted', value: 'muted' },
      ],
    },
  ],
}
