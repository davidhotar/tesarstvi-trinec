import React from 'react'
import Link from 'next/link'
import type { ServiceDeepDiveBlock as ServiceDeepDiveBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { IconCheck } from '@tabler/icons-react'

const Checklist: React.FC<{
  heading?: string | null
  items?: Array<{ text: string; id?: string | null }> | null
}> = ({ heading, items }) => {
  if (!items?.length) return null
  return (
    <div>
      {heading && (
        <h3 className="font-heading text-lg font-semibold">{heading}</h3>
      )}
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

const ShowcaseContent: React.FC<Pick<ServiceDeepDiveBlockProps, 'subServices' | 'images' | 'checklist'>> = ({
  subServices,
  images,
  checklist,
}) => {
  return (
    <>
      {subServices && subServices.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {subServices.map((sub, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold">
                  {sub.title}
                </CardTitle>
                <CardDescription>{sub.description}</CardDescription>
              </CardHeader>
              {sub.tags && sub.tags.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sub.tags.map((t, j) => (
                      <Badge key={j} variant="outline">
                        {t.tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {(images?.length || checklist?.items?.length) && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          {images?.[0] && typeof images[0].image === 'object' && (
            <div className="overflow-hidden rounded-xl">
              <Media
                resource={images[0].image}
                imgClassName="w-full object-cover"
                preferredSize="medium"
              />
              {images[0].caption && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {images[0].caption}
                </p>
              )}
            </div>
          )}
          <Checklist heading={checklist?.heading} items={checklist?.items} />
        </div>
      )}
    </>
  )
}

const GalleryContent: React.FC<Pick<ServiceDeepDiveBlockProps, 'images' | 'checklist' | 'tip'>> = ({
  images,
  checklist,
  tip,
}) => {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr]">
        <Checklist heading={checklist?.heading} items={checklist?.items} />
        {images && images.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              typeof img.image === 'object' && (
                <div key={i} className="overflow-hidden rounded-xl">
                  <Media
                    resource={img.image}
                    imgClassName="w-full object-cover"
                    preferredSize="medium"
                  />
                  {img.caption && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {img.caption}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {tip?.text && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border-2 border-dashed border-border p-4">
          <IconCheck className="size-5 shrink-0 text-primary" />
          <p className="text-sm">
            <strong>Tip:</strong> {tip.text}
          </p>
        </div>
      )}
    </>
  )
}

export const ServiceDeepDiveBlock: React.FC<ServiceDeepDiveBlockProps> = ({
  number,
  badge,
  badgeVariant,
  title,
  description,
  variant,
  subServices,
  images,
  checklist,
  tip,
  ctaLabel,
  ctaLink,
  background,
}) => {
  return (
    <section
      id={`service-${number}`}
      className={cn(
        'py-16 lg:py-20',
        background === 'muted' ? 'bg-muted/50' : 'bg-background',
      )}
    >
      <div className="container">
        <div className="flex gap-8 lg:gap-12">
          {/* Numbered sidebar */}
          <div className="hidden shrink-0 flex-col items-center md:flex" style={{ width: 60 }}>
            <span className="font-heading text-5xl font-bold text-primary">
              {number}
            </span>
            <div className="mt-3 w-px flex-1 border-l-2 border-dashed border-border" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {/* Mobile number */}
            <span className="mb-4 block font-heading text-4xl font-bold text-primary md:hidden">
              {number}
            </span>

            {badge && (
              <Badge
                variant={badgeVariant === 'accent' ? 'default' : 'secondary'}
                className="mb-3"
              >
                {badge}
              </Badge>
            )}

            <h2 className="font-heading text-3xl font-bold leading-tight lg:text-5xl">
              {title}
            </h2>

            {description && (
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}

            {variant === 'showcase' ? (
              <ShowcaseContent
                subServices={subServices}
                images={images}
                checklist={checklist}
              />
            ) : (
              <GalleryContent
                images={images}
                checklist={checklist}
                tip={tip}
              />
            )}

            {ctaLabel && ctaLink && (
              <div className="mt-8">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href={ctaLink}>{ctaLabel}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
