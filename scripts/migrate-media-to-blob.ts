/**
 * Migrate local media files from public/media/ to Vercel Blob Storage.
 *
 * Usage:
 *   npx tsx scripts/migrate-media-to-blob.ts
 *
 * Requires BLOB_READ_WRITE_TOKEN and DATABASE_URL in .env
 */

import 'dotenv/config'
import { put } from '@vercel/blob'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { Media as MediaType } from '../src/payload-types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const MEDIA_DIR = path.resolve(__dirname, '../public/media')

const IMAGE_SIZE_NAMES = ['thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og'] as const

async function uploadToBlob(filename: string): Promise<string> {
  const filePath = path.join(MEDIA_DIR, filename)
  const buffer = await readFile(filePath)
  const result = await put(filename, buffer, {
    access: 'public',
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  return result.url
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('Missing BLOB_READ_WRITE_TOKEN in environment')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // Fetch all media documents
  const { docs: allMedia } = await payload.find({
    collection: 'media',
    limit: 0, // all
    depth: 0,
  })

  console.log(`Found ${allMedia.length} media documents to migrate`)

  let successCount = 0
  let errorCount = 0

  for (const doc of allMedia) {
    const mediaDoc = doc as MediaType
    try {
      const filename = mediaDoc.filename
      if (!filename) {
        console.warn(`  [SKIP] Doc ${mediaDoc.id} has no filename`)
        continue
      }

      console.log(`  Uploading: ${filename}`)

      // Upload the main file
      const mainUrl = await uploadToBlob(filename)

      // Upload image size variants
      const sizesUpdate: Record<string, { url: string }> = {}
      if (mediaDoc.sizes) {
        for (const sizeName of IMAGE_SIZE_NAMES) {
          const sizeData = (mediaDoc.sizes as Record<string, any>)[sizeName]
          if (sizeData?.filename) {
            try {
              const sizeUrl = await uploadToBlob(sizeData.filename)
              sizesUpdate[sizeName] = { ...sizeData, url: sizeUrl }
            } catch (err) {
              console.warn(`    [WARN] Failed to upload size "${sizeName}" (${sizeData.filename}): ${err}`)
            }
          }
        }
      }

      // Update the document in DB with new URLs
      await payload.update({
        collection: 'media',
        id: mediaDoc.id,
        data: {
          url: mainUrl,
          ...(Object.keys(sizesUpdate).length > 0 ? { sizes: { ...mediaDoc.sizes, ...sizesUpdate } } : {}),
        } as any,
      })

      successCount++
      console.log(`  [OK] ${filename} -> ${mainUrl}`)
    } catch (err) {
      errorCount++
      console.error(`  [ERROR] Doc ${mediaDoc.id}: ${err}`)
    }
  }

  console.log(`\nMigration complete: ${successCount} succeeded, ${errorCount} failed`)
  process.exit(0)
}

main()
