import { resendAdapter } from '@payloadcms/email-resend'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { mcpPlugin } from '@payloadcms/plugin-mcp'

import { Categories } from './payload/collections/Categories'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Portfolio } from './payload/collections/Portfolio'
import { Users } from './payload/collections/Users'
import { Footer } from './payload/globals/Footer/config'
import { Header } from './payload/globals/Header/config'
import { plugins } from './payload/plugins'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {},
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    push: process.env.NODE_ENV !== 'production',
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Pages, Portfolio, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      enabled: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
    }),
    mcpPlugin({
      collections: {
        portfolio: {
          enabled: true,
        },
        pages: {
          enabled: true,
        },
        categories: {
          enabled: true,
        },
        media: {
          enabled: true,
        },
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'noreply@gramino.dev',
    defaultFromName: 'Tesařství Třinec',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
