import { getPayload } from 'payload'
import config from '../src/payload.config'

// Usage:
//   pnpm payload run scripts/reset-admin-password.ts <email> <new-password>
// Resets a user's password directly in the DB (no email required).
async function resetAdminPassword() {
  const [email, newPassword] = process.argv.slice(2)

  if (!email || !newPassword) {
    console.error('Usage: pnpm payload run scripts/reset-admin-password.ts <email> <new-password>')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (docs.length === 0) {
    console.error(`No user found with email: ${email}`)
    process.exit(1)
  }

  await payload.update({
    collection: 'users',
    id: docs[0].id,
    data: { password: newPassword }, // Payload hashes this automatically
  })

  console.log(`✅ Password updated for ${email}`)
  process.exit(0)
}

resetAdminPassword()
