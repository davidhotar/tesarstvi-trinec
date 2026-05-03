import type { Block } from 'payload'
import { iconOptions } from '../shared/iconOptions'

export const ServicesSection: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  imageURL: '/images/blocks/services-section.svg',
  imageAltText: 'Three-column service cards with icons',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          required: true,
        },
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
          name: 'items',
          type: 'array',
          minRows: 1,
          required: true,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'linkLabel',
          type: 'text',
        },
        {
          name: 'linkUrl',
          type: 'text',
          admin: {
            description: 'URL for the service card link (e.g. /sluzby#pergoly)',
          },
        },
      ],
    },
  ],
}
