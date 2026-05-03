import type { Block } from 'payload'

export const TestimonialsSection: Block = {
  slug: 'testimonialsSection',
  interfaceName: 'TestimonialsSectionBlock',
  labels: {
    singular: 'Testimonials Section',
    plural: 'Testimonials Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'sourceLabel',
      type: 'text',
    },
    {
      name: 'reviewsUrl',
      type: 'text',
      admin: {
        description: 'URL to external reviews page (e.g. Google Reviews)',
      },
    },
    {
      name: 'reviewsButtonLabel',
      type: 'text',
      defaultValue: 'Všechny recenze',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.reviewsUrl),
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}
