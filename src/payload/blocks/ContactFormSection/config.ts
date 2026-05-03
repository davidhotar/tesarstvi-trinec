import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ContactFormSection: Block = {
  slug: 'contactFormSection',
  dbName: 'contact_form',
  interfaceName: 'ContactFormSectionBlock',
  imageURL: '/images/blocks/contact-form-section.svg',
  imageAltText: 'Contact section with map and form',
  labels: {
    singular: 'Contact Form Section',
    plural: 'Contact Form Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phoneLabel',
      type: 'text',
      defaultValue: 'Volejte (Po-Pá 7-17)',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
