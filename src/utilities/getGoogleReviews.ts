export interface GoogleReviews {
  /** Average star rating from Google Business Profile (0–5). */
  rating: number
  /** Total number of Google reviews. */
  reviewCount: number
  /** Direct link to leave/read reviews on Google, if available. */
  profileUrl: string | null
}

/**
 * Public Featurable widget ID (safe to expose — it is embedded client-side on the
 * page). Overridable via env so the widget can be swapped without a code change.
 */
const WIDGET_ID = process.env.FEATURABLE_WIDGET_ID || 'bb5fc7bf-6031-408d-ad1a-dc1098349672'

/**
 * Returns the resolved public Featurable widget ID. Safe to pass to the client
 * (it is embedded on the page anyway) — used by the Google reviews badge widget.
 */
export function getFeaturableWidgetId(): string {
  return WIDGET_ID
}

/** Used when Featurable is unreachable so the UI never breaks. */
const FALLBACK: GoogleReviews = { rating: 5, reviewCount: 0, profileUrl: null }

/**
 * Fetches aggregate Google review data (average rating + total count) from the
 * free Featurable API. Cached by Next.js and revalidated daily; tag
 * `google-reviews` allows manual revalidation. Individual review text is not
 * used — testimonials remain manually curated in Payload.
 */
export async function getGoogleReviews(): Promise<GoogleReviews> {
  if (!WIDGET_ID) return FALLBACK

  try {
    const res = await fetch(`https://api.featurable.com/v1/widgets/${WIDGET_ID}`, {
      next: { revalidate: 86400, tags: ['google-reviews'] },
    })

    if (!res.ok) return FALLBACK

    const data = (await res.json()) as {
      success?: boolean
      averageRating?: number
      totalReviewCount?: number
      profileUrl?: string
    }

    if (!data?.success) return FALLBACK

    return {
      rating: typeof data.averageRating === 'number' ? data.averageRating : FALLBACK.rating,
      reviewCount:
        typeof data.totalReviewCount === 'number' ? data.totalReviewCount : FALLBACK.reviewCount,
      profileUrl: typeof data.profileUrl === 'string' ? data.profileUrl : null,
    }
  } catch {
    return FALLBACK
  }
}

/** True if any stat in the list is configured to pull from Google. */
export function statsUseGoogle(
  stats: { source?: string | null }[] | null | undefined,
): boolean {
  return Boolean(
    stats?.some((s) => s.source === 'googleRating' || s.source === 'googleReviewCount'),
  )
}

/**
 * Resolves the display value for a stat item based on its configured source.
 * Falls back to the manually-entered value for `manual` (or when Google data
 * is unavailable).
 */
export function formatGoogleStatValue(
  source: string | null | undefined,
  manualValue: string | null | undefined,
  reviews: GoogleReviews | null,
): string {
  if (reviews) {
    if (source === 'googleRating') return reviews.rating.toFixed(1)
    if (source === 'googleReviewCount') return `${reviews.reviewCount}+`
  }
  return manualValue ?? ''
}
