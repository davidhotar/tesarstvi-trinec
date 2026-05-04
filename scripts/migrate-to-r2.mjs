#!/usr/bin/env node
/**
 * Migrate media from Vercel Blob to Cloudflare R2.
 *
 * Strategy: upload local files from public/media/ to R2 using the exact
 * filenames stored in the DB, so no database changes are needed.
 */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MEDIA_DIR = path.join(__dirname, '..', 'public', 'media')
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images')
const API_URL = 'https://tesarstvi-trinec.vercel.app/api/media'

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || 'auto',
  forcePathStyle: true,
})
const BUCKET = process.env.S3_BUCKET

// Build index of local files by timestamp prefix
const localFiles = fs.readdirSync(MEDIA_DIR)
const imageFiles = fs.readdirSync(IMAGES_DIR).map((f) => `__images__/${f}`)

// Index by timestamp prefix (e.g. "1775934011306")
const byTimestamp = new Map()
for (const f of localFiles) {
  const m = f.match(/^(\d+)_/)
  if (m) {
    if (!byTimestamp.has(m[1])) byTimestamp.set(m[1], [])
    byTimestamp.get(m[1]).push(f)
  }
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  }
  return types[ext] || 'application/octet-stream'
}

/**
 * Find a local file matching a DB filename.
 * DB names have blob suffixes and dedup counters that local files don't.
 */
function findLocalFile(dbFilename) {
  // Direct match
  if (fs.existsSync(path.join(MEDIA_DIR, dbFilename))) return path.join(MEDIA_DIR, dbFilename)

  const ext = path.extname(dbFilename)
  const base = dbFilename.slice(0, -ext.length)

  // Check if it's a sized image (contains WxH pattern)
  const sizeMatch = base.match(/^(.+?)-(\d+x\d+)$/)
  const blobSuffixMatch = base.match(/^(.+?)-([a-zA-Z0-9]{20,})$/)

  // Strip blob suffix first
  let stripped = base
  if (blobSuffixMatch) {
    stripped = blobSuffixMatch[1]
  }

  // Check for sized image with blob suffix: name-1-900x675-BLOBSUFFIX
  const sizedBlobMatch = base.match(/^(.+?)-(\d+x\d+)-([a-zA-Z0-9]{20,})$/)
  if (sizedBlobMatch) {
    stripped = `${sizedBlobMatch[1]}-${sizedBlobMatch[2]}`
  }

  // Try direct match after stripping blob suffix
  const candidate1 = stripped + ext
  if (fs.existsSync(path.join(MEDIA_DIR, candidate1))) return path.join(MEDIA_DIR, candidate1)

  // Strip dedup counter (-1, -2, etc.) from the end or before size
  const dedupAtEnd = stripped.match(/^(.+)-(\d{1,2})$/)
  if (dedupAtEnd) {
    const withoutDedup = dedupAtEnd[1] + ext
    if (fs.existsSync(path.join(MEDIA_DIR, withoutDedup))) return path.join(MEDIA_DIR, withoutDedup)
  }

  // Strip dedup counter before size: name-1-300x225 → name-300x225
  const dedupBeforeSize = stripped.match(/^(.+)-(\d{1,2})-(\d+x\d+)$/)
  if (dedupBeforeSize) {
    const withoutDedup = `${dedupBeforeSize[1]}-${dedupBeforeSize[3]}${ext}`
    if (fs.existsSync(path.join(MEDIA_DIR, withoutDedup))) return path.join(MEDIA_DIR, withoutDedup)
  }

  // Fallback: search by timestamp prefix + find best match
  const tsMatch = dbFilename.match(/^(\d+)_/)
  if (tsMatch) {
    const candidates = byTimestamp.get(tsMatch[1]) || []

    // For sized images, find the local file with same size
    if (sizedBlobMatch || sizeMatch) {
      const sizeStr = sizedBlobMatch ? sizedBlobMatch[2] : sizeMatch[2]
      const sizedLocal = candidates.find((f) => f.includes(`-${sizeStr}.`) || f.includes(`-${sizeStr}-`))
      if (sizedLocal) return path.join(MEDIA_DIR, sizedLocal)
    }

    // For main images, find the base file (no size suffix)
    const baseLocal = candidates.find((f) => {
      const fBase = f.slice(0, -path.extname(f).length)
      return !fBase.match(/-\d+x\d+$/) && f.endsWith(ext)
    })
    if (baseLocal) return path.join(MEDIA_DIR, baseLocal)
  }

  // Special cases: hero, profile, etc.
  const noTimestamp = base.replace(/-[a-zA-Z0-9]{20,}$/, '')
  const noTimestampDedup = noTimestamp.replace(/-\d{1,2}$/, '')
  for (const dir of [MEDIA_DIR, IMAGES_DIR]) {
    for (const name of [noTimestamp + ext, noTimestampDedup + ext]) {
      if (fs.existsSync(path.join(dir, name))) return path.join(dir, name)
    }
  }

  return null
}

async function upload(localPath, r2Key) {
  const body = fs.readFileSync(localPath)
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: r2Key,
      Body: body,
      ContentType: getMimeType(r2Key),
    }),
  )
}

async function main() {
  console.log('Fetching media documents from Payload API...')

  let allDocs = []
  let page = 1
  while (true) {
    const res = await fetch(`${API_URL}?limit=100&page=${page}`)
    const data = await res.json()
    allDocs = allDocs.concat(data.docs)
    if (!data.hasNextPage) break
    page++
  }

  console.log(`Found ${allDocs.length} media documents\n`)

  let uploaded = 0
  let skipped = 0
  let failed = 0
  const failures = []

  for (const doc of allDocs) {
    // Collect all filenames for this doc (main + sizes)
    const files = []
    if (doc.filename) files.push(doc.filename)
    if (doc.sizes) {
      for (const [, size] of Object.entries(doc.sizes)) {
        if (size?.filename) files.push(size.filename)
      }
    }

    for (const dbFilename of files) {
      const localPath = findLocalFile(dbFilename)
      if (!localPath) {
        console.log(`  SKIP (no local file): ${dbFilename}`)
        skipped++
        failures.push(dbFilename)
        continue
      }

      try {
        process.stdout.write(`  Uploading ${dbFilename}...`)
        await upload(localPath, dbFilename)
        console.log(' OK')
        uploaded++
      } catch (err) {
        console.log(` FAIL: ${err.message}`)
        failed++
        failures.push(dbFilename)
      }
    }
  }

  console.log(`\n--- Summary ---`)
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped:  ${skipped}`)
  console.log(`Failed:   ${failed}`)

  if (failures.length > 0) {
    console.log(`\nMissing files:`)
    failures.forEach((f) => console.log(`  ${f}`))
  }
}

main().catch(console.error)
