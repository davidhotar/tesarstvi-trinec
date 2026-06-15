'use client'

import React, { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import type { Portfolio } from '@/payload-types'

import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type GalleryItems = NonNullable<Portfolio['gallery']>

export const PortfolioGallery: React.FC<{ items: GalleryItems }> = ({ items }) => {
  const [index, setIndex] = useState(-1)

  // Map every item so slide indices stay aligned 1:1 with the grid figures.
  const slides = useMemo(
    () =>
      items.map((item) => {
        const image = item.image
        if (!image || typeof image !== 'object') {
          return { src: '' }
        }
        return {
          src: getMediaUrl(image.url),
          alt: image.alt || '',
          width: image.width || undefined,
          height: image.height || undefined,
          description: item.caption || undefined,
        }
      }),
    [items],
  )

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {items.map((item, i) => (
          <figure
            key={item.id || i}
            className={`group relative overflow-hidden ${
              i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
          >
            {item.image && typeof item.image !== 'string' && (
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={item.caption || `Zobrazit obrázek ${i + 1}`}
                className="relative block w-full aspect-[4/3] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent"
              >
                <Media
                  fill
                  imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  resource={item.image}
                />
              </button>
            )}
            {item.caption && (
              <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions, Zoom, Thumbnails]}
        captions={{ descriptionTextAlign: 'center' }}
      />
    </>
  )
}
