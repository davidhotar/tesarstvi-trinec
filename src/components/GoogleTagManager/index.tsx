import Script from 'next/script'
import React from 'react'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

/**
 * Google Tag Manager container script. Renders nothing unless
 * `NEXT_PUBLIC_GTM_ID` (e.g. `GTM-XXXXXXX`) is set, so local/preview
 * environments stay tracking-free by default.
 *
 * Place near the top of <body>; pair with <GoogleTagManagerNoScript /> as the
 * first child of <body> for the no-JS fallback.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}

/**
 * <noscript> iframe fallback for Google Tag Manager. Must be rendered as the
 * first child of <body>. Renders nothing unless `NEXT_PUBLIC_GTM_ID` is set.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
