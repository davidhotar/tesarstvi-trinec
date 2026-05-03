import type { Block } from 'payload'

export const PortfolioSection: Block = {
  slug: 'portfolioSection',
  interfaceName: 'PortfolioSectionBlock',
  labels: {
    singular: 'Portfolio Section',
    plural: 'Portfolio Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Každý projekt je jiný.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      admin: {
        description: 'Fallback: "Zobrazit portfolio →"',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 5,
      admin: {
        description: 'Max number of portfolio items to show. Leave empty to show all.',
      },
    },
  ],
}
