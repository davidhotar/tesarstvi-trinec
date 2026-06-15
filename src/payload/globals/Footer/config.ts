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
    {
      type: 'collapsible',
      label: 'Strukturovaná data (SEO / Google)',
      admin: {
        initCollapsed: true,
        description:
          'Tato pole se nezobrazují na webu, ale použijí se pro strukturovaná data (JSON-LD) – pomáhají Google zobrazit firmu ve výsledcích vyhledávání a v Mapách.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'legalName',
              type: 'text',
              defaultValue: 'Petr Czempka',
              admin: { description: 'Jméno podnikatele / název firmy', width: '50%' },
            },
            {
              name: 'ico',
              type: 'text',
              defaultValue: '06977138',
              admin: { description: 'IČO', width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'streetAddress',
              type: 'text',
              defaultValue: 'Přátelství 959',
              admin: { description: 'Ulice a číslo popisné', width: '50%' },
            },
            {
              name: 'postalCode',
              type: 'text',
              defaultValue: '739 61',
              admin: { description: 'PSČ', width: '25%' },
            },
            {
              name: 'city',
              type: 'text',
              defaultValue: 'Třinec',
              admin: { description: 'Město', width: '25%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'latitude',
              type: 'number',
              admin: { description: 'Zeměpisná šířka (volitelné, pro Mapy Google)', width: '50%' },
            },
            {
              name: 'longitude',
              type: 'number',
              admin: { description: 'Zeměpisná délka (volitelné, pro Mapy Google)', width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'priceRange',
              type: 'text',
              defaultValue: '$$',
              admin: { description: 'Cenová úroveň (např. $$)', width: '50%' },
            },
            {
              name: 'areaServed',
              type: 'text',
              defaultValue: 'Třinec a okolí',
              admin: { description: 'Oblast působnosti', width: '50%' },
            },
          ],
        },
        {
          name: 'openingHours',
          type: 'array',
          label: 'Otevírací doba',
          admin: { description: 'Otevírací doba pro strukturovaná data (JSON-LD).' },
          defaultValue: [
            { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00' },
          ],
          fields: [
            {
              name: 'days',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Pondělí', value: 'Monday' },
                { label: 'Úterý', value: 'Tuesday' },
                { label: 'Středa', value: 'Wednesday' },
                { label: 'Čtvrtek', value: 'Thursday' },
                { label: 'Pátek', value: 'Friday' },
                { label: 'Sobota', value: 'Saturday' },
                { label: 'Neděle', value: 'Sunday' },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'opens',
                  type: 'text',
                  defaultValue: '07:00',
                  admin: { description: 'Otevírá (HH:MM)', width: '50%' },
                },
                {
                  name: 'closes',
                  type: 'text',
                  defaultValue: '17:00',
                  admin: { description: 'Zavírá (HH:MM)', width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
