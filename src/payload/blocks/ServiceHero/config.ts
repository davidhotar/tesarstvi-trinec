import type { Block } from 'payload'

export const ServiceHero: Block = {
  slug: 'serviceHero',
  interfaceName: 'ServiceHeroBlock',
  labels: {
    singular: 'Service Hero',
    plural: 'Service Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        description: 'Small uppercase label above the heading',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'text',
      admin: {
        description: 'Stats or trust line displayed on the right (e.g. "10 let · 142 realizací")',
      },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Konzultace zdarma',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/kontakt',
    },
  ],
}
