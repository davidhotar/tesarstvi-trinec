import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

/**
 * Renders a JSON-LD <script>. `undefined` values are dropped by JSON.stringify.
 * `<` is escaped so a CMS-entered value containing `</script>` cannot break out
 * of the script element or inject markup (JSON-LD is parsed as JSON, so the
 * escaped `<` is decoded back to `<` by the consumer).
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

/**
 * Organization + LocalBusiness (GeneralContractor) structured data for the whole
 * site. Pulls business details from the Footer global. Rendered once in the root layout.
 */
export async function OrganizationStructuredData() {
  const footer: FooterType = await getCachedGlobal('footer', 1)
  const url = getServerSideURL()

  const openingHoursSpecification = (footer?.openingHours || [])
    .filter((row) => row?.days?.length && row?.opens && row?.closes)
    .map((row) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    }))

  const geo =
    footer?.latitude != null && footer?.longitude != null
      ? { '@type': 'GeoCoordinates', latitude: footer.latitude, longitude: footer.longitude }
      : undefined

  // Only emit a PostalAddress when at least one location field is present —
  // otherwise JSON.stringify would leave a country-only address, which Google
  // flags as incomplete.
  const hasAddress = Boolean(footer?.streetAddress || footer?.postalCode || footer?.city)
  const address = hasAddress
    ? {
        '@type': 'PostalAddress',
        streetAddress: footer?.streetAddress || undefined,
        postalCode: footer?.postalCode || undefined,
        addressLocality: footer?.city || undefined,
        addressCountry: 'CZ',
      }
    : undefined

  const data = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${url}/#business`,
    name: SITE_NAME,
    legalName: footer?.legalName || undefined,
    description: SITE_DESCRIPTION,
    url,
    image: `${url}${DEFAULT_OG_IMAGE}`,
    logo: `${url}/icon-512.png`,
    telephone: footer?.phone || undefined,
    email: footer?.email || undefined,
    priceRange: footer?.priceRange || undefined,
    areaServed: footer?.areaServed || undefined,
    ...(address ? { address } : {}),
    ...(geo ? { geo } : {}),
    ...(footer?.addressLink ? { hasMap: footer.addressLink } : {}),
    ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
    ...(footer?.ico
      ? { identifier: { '@type': 'PropertyValue', propertyID: 'ICO', value: footer.ico } }
      : {}),
    ...(footer?.addressLink ? { sameAs: [footer.addressLink] } : {}),
  }

  return <JsonLd data={data} />
}

/** BreadcrumbList structured data. `item` paths are resolved against the site URL. */
export function BreadcrumbStructuredData({ items }: { items: { name: string; item: string }[] }) {
  const url = getServerSideURL()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item.startsWith('http') ? it.item : `${url}${it.item}`,
    })),
  }
  return <JsonLd data={data} />
}
