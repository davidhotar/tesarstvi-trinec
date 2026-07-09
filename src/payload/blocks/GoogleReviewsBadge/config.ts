import type { Block } from 'payload'

export const GoogleReviewsBadge: Block = {
  slug: 'googleReviewsBadge',
  interfaceName: 'GoogleReviewsBadgeBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Volitelný nadpis nad odznakem recenzí (nepovinné).',
      },
    },
    {
      name: 'widgetId',
      type: 'text',
      admin: {
        description:
          'Přepíše výchozí Featurable widget ID. Ponechte prázdné pro použití výchozího (env FEATURABLE_WIDGET_ID).',
      },
    },
  ],
  labels: {
    singular: 'Google recenze (odznak)',
    plural: 'Google recenze (odznaky)',
  },
}
