import React from 'react'
import { Star } from 'lucide-react'

import { getGoogleReviews } from '@/utilities/getGoogleReviews'
import { cn } from '@/utilities/ui'

/** Multi-colour Google "G" mark. */
function GoogleGLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.48h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.75Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3a7.2 7.2 0 0 1-4.07 1.16 7.14 7.14 0 0 1-6.71-4.94H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.29 14.32a7.2 7.2 0 0 1 0-4.63V6.6H1.28a12 12 0 0 0 0 10.82l4.01-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.28 6.6l4.01 3.1A7.14 7.14 0 0 1 12 4.75Z"
      />
    </svg>
  )
}

/** Row of five stars with a fractional fill matching `rating` (0–5). */
function Stars({ rating, emptyClassName }: { rating: number; emptyClassName: string }) {
  const pct = (Math.max(0, Math.min(5, rating)) / 5) * 100
  const row = (className: string) =>
    [0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className={cn('size-4 shrink-0', className)} fill="currentColor" stroke="none" />
    ))

  return (
    <span className="relative inline-flex" aria-hidden="true">
      <span className={cn('flex', emptyClassName)}>{row('')}</span>
      <span
        className="absolute inset-0 flex overflow-hidden text-amber-400"
        style={{ width: `${pct}%` }}
      >
        {row('')}
      </span>
    </span>
  )
}

/**
 * Compact, live Google-reviews badge: the Google mark, average rating, star row
 * and total review count, linking to the Google profile. Pulls aggregate data
 * from {@link getGoogleReviews} and self-hides when no reviews are available.
 *
 * Use `variant="onDark"` when placing it over a dark background (e.g. the hero).
 */
export async function GoogleRatingBadge({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'onDark'
}) {
  const google = await getGoogleReviews()

  if (google.reviewCount <= 0) return null

  const onDark = variant === 'onDark'

  const body = (
    <>
      <GoogleGLogo className="size-5 shrink-0" />
      <span className={cn('text-sm font-semibold', onDark ? 'text-white' : 'text-foreground')}>
        {google.rating.toFixed(1)}
      </span>
      <Stars rating={google.rating} emptyClassName={onDark ? 'text-white/25' : 'text-black/10'} />
      <span className={cn('text-xs', onDark ? 'text-white/70' : 'text-muted-foreground')}>
        {google.reviewCount} recenzí
      </span>
    </>
  )

  const wrapperClass = cn(
    'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors',
    onDark
      ? 'border-white/15 bg-white/10 backdrop-blur-sm hover:bg-white/15'
      : 'border-border bg-background hover:bg-muted',
    className,
  )

  if (google.profileUrl) {
    return (
      <a
        href={google.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
        aria-label={`Google hodnocení ${google.rating.toFixed(1)} z 5, ${google.reviewCount} recenzí`}
      >
        {body}
      </a>
    )
  }

  return (
    <div
      className={wrapperClass}
      aria-label={`Google hodnocení ${google.rating.toFixed(1)} z 5, ${google.reviewCount} recenzí`}
    >
      {body}
    </div>
  )
}
