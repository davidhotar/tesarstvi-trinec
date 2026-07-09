import React from 'react'

import type { GoogleReviewsBadgeBlock as GoogleReviewsBadgeBlockProps } from '@/payload-types'
import { getFeaturableWidgetId } from '@/utilities/getGoogleReviews'
import { FeaturableWidget } from '@/components/FeaturableWidget/FeaturableWidget'

export const GoogleReviewsBadgeBlock = ({ heading, widgetId }: GoogleReviewsBadgeBlockProps) => {
  const resolvedId = widgetId || getFeaturableWidgetId()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="mb-8 text-center font-heading text-3xl font-bold leading-tight sm:text-4xl">
            {heading}
          </h2>
        )}
        <FeaturableWidget widgetId={resolvedId} />
      </div>
    </section>
  )
}
