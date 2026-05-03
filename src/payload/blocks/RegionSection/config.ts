import type { Block } from 'payload'

export const RegionSection: Block = {
  slug: 'regionSection',
  interfaceName: 'RegionSectionBlock',
  imageURL: '/images/blocks/region-section.svg',
  imageAltText: 'Region info with map and locations',
  labels: {
    singular: 'Region Section',
    plural: 'Region Sections',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
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
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'locations',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
