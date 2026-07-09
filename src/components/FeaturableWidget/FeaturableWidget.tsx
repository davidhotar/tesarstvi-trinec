'use client'

import React, { useEffect } from 'react'

const SCRIPT_SRC = 'https://featurable.com/assets/js/widget.min.js'

/**
 * Renders the Featurable Google-reviews badge (the full visual widget, not just
 * the aggregate numbers). The Featurable script scans the DOM for
 * `[data-featurable-async]` elements on load and mounts the widget into the
 * matching `#featurable-<widgetId>` container. We (re)inject the script on mount
 * so it also runs after client-side navigations, not only on first paint.
 */
export function FeaturableWidget({ widgetId }: { widgetId: string }) {
  useEffect(() => {
    if (!widgetId) return

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [widgetId])

  if (!widgetId) return null

  return <div id={`featurable-${widgetId}`} data-featurable-async />
}
