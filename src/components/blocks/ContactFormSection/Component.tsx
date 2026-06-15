import React from 'react'
import type { ContactFormSectionBlock as ContactFormSectionBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Phone } from 'lucide-react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { EmbeddedForm } from './EmbeddedForm'

export const ContactFormSectionBlock: React.FC<ContactFormSectionBlockProps> = ({
  heading,
  description,
  mapImage,
  phoneLabel,
  phoneNumber,
  form,
}) => {
  return (
    <section className="hero-glow-bottom bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>

            {description && (
              <RichText
                className="text-muted-foreground leading-relaxed"
                data={description}
                enableGutter={false}
              />
            )}

            {mapImage && typeof mapImage === 'object' ? (
              <Media
                resource={mapImage}
                imgClassName="h-[280px] w-full rounded-xl object-cover lg:h-[320px]"
                preferredSize="medium"
              />
            ) : (
              <div className="flex h-[280px] items-center justify-center rounded-xl border border-dashed bg-muted text-xs text-muted-foreground lg:h-[320px]">
                Map image
              </div>
            )}

            {phoneNumber && (
              <div className="flex flex-col gap-1">
                {phoneLabel && (
                  <span className="text-sm text-muted-foreground">{phoneLabel}</span>
                )}
                <Link
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-2xl font-bold"
                >
                  <Phone className="size-5 text-primary" />
                  {phoneNumber}
                </Link>
              </div>
            )}
          </div>

          {/* Right column — form */}
          {form && typeof form === 'object' && <EmbeddedForm form={form} />}
        </div>
      </div>
    </section>
  )
}
