import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/payload/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page, Portfolio } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE_NAME } from '@/constants/site'

const generateTitle: GenerateTitle<Portfolio | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${SITE_NAME}` : SITE_NAME
}

const generateURL: GenerateURL<Portfolio | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

/**
 * Form-builder serializes a missing email message via Slate, which returns
 * `undefined`. Template literals then produce the literal body "undefined".
 * Fall back to a submission-data table so notification emails always have content.
 */
const isEmptyEmailHtml = (html?: string) => {
  if (!html) return true
  const normalized = html.replace(/\s/g, '').toLowerCase()
  return (
    normalized === '' ||
    normalized === '<div></div>' ||
    normalized === '<div>undefined</div>' ||
    normalized === 'undefined'
  )
}

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const buildSubmissionTableHtml = (
  submissionData: { field: string; value: string }[] | null | undefined,
) => {
  const rows = (submissionData ?? [])
    .filter((row) => row.field && row.field !== 'formSubmissionID')
    .map(
      ({ field, value }) =>
        `<tr>
          <td style="padding:6px 12px 6px 0;vertical-align:top;font-weight:600;">${escapeHtml(field)}</td>
          <td style="padding:6px 0;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('')

  return `<div>
    <p style="margin:0 0 12px;">Nová poptávka z webu:</p>
    <table style="border-collapse:collapse;">${rows || '<tr><td>(žádná data)</td></tr>'}</table>
  </div>`
}

const beforeEmail: BeforeEmail = (emails, { data }) => {
  const submissionData = data?.submissionData as
    | { field: string; value: string }[]
    | null
    | undefined

  return emails.map((email) => {
    if (!isEmptyEmailHtml(email.html)) return email

    return {
      ...email,
      html: buildSubmissionTableHtml(submissionData),
    }
  })
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'portfolio'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    beforeEmail,
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
]
