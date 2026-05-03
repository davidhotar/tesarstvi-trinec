'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { getClientSideURL } from '@/utilities/getURL'

function resolveRoute(pathname: string): { collection: string; slug: string; label: string } {
  if (pathname.startsWith('/portfolio/') && pathname !== '/portfolio/') {
    const slug = decodeURIComponent(pathname.replace('/portfolio/', '').replace(/\/$/, ''))
    return { collection: 'portfolio', slug, label: 'Portfolio' }
  }
  const slug = pathname === '/' ? 'home' : decodeURIComponent(pathname.replace(/^\/|\/$/g, ''))
  return { collection: 'pages', slug, label: 'Page' }
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const [show, setShow] = useState(false)
  const [docId, setDocId] = useState<string | undefined>()
  const router = useRouter()
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)

  const { collection, slug, label } = resolveRoute(pathname)

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  useEffect(() => {
    if (!show) return
    setDocId(undefined)
    const url = `${getClientSideURL()}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1&depth=0`
    fetch(url, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.docs?.[0]?.id) setDocId(String(data.docs[0].id))
      })
      .catch(() => {})
  }, [show, pathname, collection, slug])

  useEffect(() => {
    if (show && barRef.current) {
      const height = barRef.current.clientHeight
      document.documentElement.style.setProperty('--admin-bar-height', `${height}px`)
    } else {
      document.documentElement.style.setProperty('--admin-bar-height', '0px')
    }
  }, [show])

  return (
    <div
      ref={barRef}
      className={cn('fixed inset-x-0 top-0 z-30 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container flex items-center justify-between py-1.5 text-sm">
        <PayloadAdminBar
          {...adminBarProps}
          unstyled
          id={docId}
          className="flex w-full items-center gap-3 text-white"
          classNames={{
            controls: 'flex items-center gap-3 font-medium [&>a+a]:border-l [&>a+a]:border-white/30 [&>a+a]:pl-3',
            logo: 'shrink-0 no-underline text-white after:content-["|"] after:ml-3 after:text-white/30',
            user: 'mr-auto truncate no-underline text-white',
            edit: 'no-underline text-white',
            create: 'no-underline text-white',
            logout: 'shrink-0 border-l border-white/30 pl-3 no-underline text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: `${label}s`,
            singular: label,
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
        />
      </div>
    </div>
  )
}
