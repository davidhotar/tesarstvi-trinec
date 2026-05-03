import type { Block } from 'payload'
import { iconOptions } from '../shared/iconOptions'

export const NumberedCardGrid: Block = {
  slug: 'numberedCardGrid',
  interfaceName: 'NumberedCardGridBlock',
  imageURL: '/images/blocks/numbered-card-grid.svg',
  imageAltText: 'Four numbered cards in a row',
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
      name: 'glowEffect',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
      defaultValue: 'none',
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
