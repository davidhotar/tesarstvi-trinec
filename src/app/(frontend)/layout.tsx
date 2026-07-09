import type { Metadata, Viewport } from 'next'

import Script from 'next/script'
import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })
import React from 'react'

import { AdminBar } from '@/components/admin/AdminBar'
import { Footer } from '@/components/Footer/Component'
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/GoogleTagManager'
import { Header } from '@/components/Header/Component'
import { OrganizationStructuredData } from '@/components/StructuredData'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(inter.variable)} lang="cs" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        <OrganizationStructuredData />
        <Providers>
          <div className="noise-overlay z-[1]" />
          <AdminBar />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#191919',
}
