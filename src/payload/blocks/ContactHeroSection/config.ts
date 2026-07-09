import type { Block } from 'payload'

export const ContactHeroSection: Block = {
  slug: 'contactHeroSection',
  dbName: 'contact_hero',
  interfaceName: 'ContactHeroSectionBlock',
  imageURL: '/images/blocks/contact-hero-section.svg',
  imageAltText: 'Contact hero with cards grid',
  labels: {
    singular: 'Contact Hero Section',
    plural: 'Contact Hero Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: true,
      defaultValue: 'Kontakt · Po-Pá 7:00-17:00',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'clock',
          options: [
            { label: 'Clock', value: 'clock' },
            { label: 'Check', value: 'check' },
            { label: 'Star', value: 'star' },
            { label: 'Shield', value: 'shield' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'personName',
      type: 'text',
      required: true,
    },
    {
      name: 'personTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'personPhone',
      type: 'text',
      admin: {
        description: 'Phone number for the person CTA (e.g. tel:+420737136848)',
      },
    },
    {
      name: 'contactCards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Phone', value: 'phone' },
            { label: 'Mail', value: 'mail' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Map Pin', value: 'mapPin' },
          ],
        },
        {
          name: 'badge',
          type: 'text',
          admin: {
            description: 'Optional badge text (e.g. "nejrychlejší")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Main value/heading displayed prominently (e.g. phone number, email)',
          },
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaLink',
          type: 'text',
          required: true,
        },
        {
          name: 'ctaVariant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Primary', value: 'default' },
            { label: 'Outline', value: 'outline' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
