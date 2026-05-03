import type { Block } from 'payload'

export const CtaBanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: {
    singular: 'CTA Banner',
    plural: 'CTA Banners',
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
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Zavolat',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      defaultValue: 'tel:+420737136848',
    },
    {
      name: 'ratingText',
      type: 'text',
      admin: {
        description: 'E.g. "4.9 · 87 hodnocení na Google"',
      },
    },
  ],
}
