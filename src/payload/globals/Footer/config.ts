import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Rádi se ozveme.',
      admin: {
        description: 'Krátký slogan pod logem (např. "Rádi se ozveme.")',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+420 737 136 848',
          admin: {
            description: 'Telefonní číslo',
            width: '50%',
          },
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'info@tesarstvi-trinec.cz',
          admin: {
            description: 'E-mailová adresa',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'Přátelství 959\n739 61 Třinec',
      admin: {
        description: 'Adresa (každý řádek = nový řádek ve footeru)',
        rows: 3,
      },
    },
    {
      name: 'addressLink',
      type: 'text',
      defaultValue: 'https://maps.app.goo.gl/XGrhpUEEtSBhm175A',
      admin: {
        description: 'Odkaz na Google Maps',
      },
    },
    {
      name: 'businessInfo',
      type: 'text',
      defaultValue: 'Petr Czempka · IČO 06977138 · Po-Pá 7:00-17:00',
      admin: {
        description: 'Obchodní informace (spodní lišta vlevo)',
      },
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: 'Tesařství Třinec',
      admin: {
        description: 'Název pro copyright (spodní lišta vpravo)',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
