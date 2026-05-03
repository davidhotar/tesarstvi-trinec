import type { Block } from 'payload'

export const TimelineSection: Block = {
  slug: 'timelineSection',
  interfaceName: 'TimelineSectionBlock',
  imageURL: '/images/blocks/timeline-section.svg',
  imageAltText: 'Vertical timeline with alternating cards',
  labels: {
    singular: 'Timeline Section',
    plural: 'Timeline Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'milestones',
      type: 'array',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
