import type { Block } from 'payload'
import { iconOptions } from '../shared/iconOptions'

export const NumberedCardGrid: Block = {
  slug: 'numberedCardGrid',
  interfaceName: 'NumberedCardGridBlock',
  labels: {
    singular: 'Numbered Card Grid',
    plural: 'Numbered Card Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'sideDescription',
      type: 'text',
    },
    {
      name: 'showConnector',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
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
      ],
    },
  ],
}
