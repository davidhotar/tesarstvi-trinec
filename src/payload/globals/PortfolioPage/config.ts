import type { GlobalConfig } from 'payload'

import { revalidatePortfolioPage } from './hooks/revalidatePortfolioPage'

export const PortfolioPage: GlobalConfig = {
  slug: 'portfolio-page',
  label: 'Portfolio',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Nastavení stránky Portfolio.',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'CTA sekce (dole na stránce)',
      admin: {
        initCollapsed: false,
        description: 'Výzva k akci ve spodní části stránky Portfolio.',
      },
      fields: [
        {
          name: 'ctaTitle',
          type: 'text',
          required: true,
          defaultValue: 'Máte představu, ale nevíte, kde začít?',
          admin: {
            description: 'Hlavní nadpis',
          },
        },
        {
          name: 'ctaDescription',
          type: 'text',
          defaultValue: 'Zavolejte — rádi vám poradíme.',
          admin: {
            description: 'Text pod nadpisem',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaLabel',
              type: 'text',
              required: true,
              defaultValue: 'Zavolat Petrovi',
              admin: {
                description: 'Text tlačítka',
                width: '50%',
              },
            },
            {
              name: 'ctaLink',
              type: 'text',
              required: true,
              defaultValue: 'tel:+420737136848',
              admin: {
                description: 'Odkaz tlačítka (např. tel:+420737136848)',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'ctaRatingText',
          type: 'text',
          admin: {
            description: 'Volitelné hodnocení vedle tlačítka (např. "4.9 · 87 hodnocení na Google"). Nechte prázdné pro skrytí.',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePortfolioPage],
  },
}
