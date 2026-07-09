import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const portfolioPaginationRedirect = {
    destination: '/portfolio',
    permanent: true,
    source: '/portfolio/page/:pageNumber',
  }

  /**
   * Legacy 301 redirects from the previous WordPress/Yoast site
   * (see https://tesarstvi-trinec.cz/sitemap_index.xml).
   *
   * Notes:
   * - 33 of the 35 old /portfolio/<slug>/ URLs kept identical slugs; Next.js
   *   normalizes the trailing slash automatically, so they need no entry here.
   *   Only the two slugs below actually changed / were removed.
   * - Old blog, portfolio tags and author archives have no equivalent on the
   *   new site and are pointed at the most topically relevant page.
   */
  const legacyRedirects = [
    // --- Old top-level pages ---
    { source: '/realizace', destination: '/portfolio', permanent: true },
    { source: '/uzitecne', destination: '/', permanent: true },
    { source: '/jak-pracujeme', destination: '/o-nas', permanent: true },
    // /o-nas/ and /kontakt/ already exist — trailing slash is auto-handled.

    // --- Old blog posts (no blog on the new site) ---
    {
      source: '/2022/04/02/drevena-venkovni-odpocivadla',
      destination: '/portfolio?category=venkovni-odpocivadla',
      permanent: true,
    },
    {
      source: '/2019/07/14/jak-vybrat-drevo-pro-zahradni-domek-pristresek-pro-auto-ci-terasu',
      destination: '/sluzby',
      permanent: true,
    },
    // Catch-all for any other legacy dated /YYYY/MM/DD/... blog URL.
    {
      source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*',
      destination: '/',
      permanent: true,
    },

    // --- Portfolio items whose slug changed ---
    {
      source: '/portfolio/zahradni-domek-pro-2-auta-se-sedlovou-strechou',
      destination: '/portfolio/pristresek-pro-2-auta-se-sedlovou-strechou',
      permanent: true,
    },
    // Leftover Elementor draft, no equivalent.
    { source: '/portfolio/elementor-869', destination: '/portfolio', permanent: true },

    // --- Portfolio category archives -> filtered portfolio grid ---
    { source: '/portfolio-category/altany', destination: '/portfolio?category=altany', permanent: true },
    { source: '/portfolio-category/ostatni', destination: '/portfolio?category=ostatni', permanent: true },
    {
      source: '/portfolio-category/pristresky-pro-auto',
      destination: '/portfolio?category=pristresky-pro-auto',
      permanent: true,
    },
    {
      source: '/portfolio-category/zahradni-domky',
      destination: '/portfolio?category=zahradni-domky',
      permanent: true,
    },
    // "pergoly" has no equivalent category on the new site.
    { source: '/portfolio-category/pergoly', destination: '/portfolio', permanent: true },
    // Any other portfolio category archive -> portfolio.
    { source: '/portfolio-category/:slug*', destination: '/portfolio', permanent: true },

    // --- Portfolio tag archives (no tags on the new site) ---
    { source: '/portfolio-tag/:slug*', destination: '/portfolio', permanent: true },

    // --- Blog category & author archives ---
    { source: '/category/:slug*', destination: '/', permanent: true },
    { source: '/author/:slug*', destination: '/o-nas', permanent: true },
  ]

  return [internetExplorerRedirect, portfolioPaginationRedirect, ...legacyRedirects]
}
