import React from 'react'
import type { ServicesSectionBlock as ServicesSectionBlockProps } from '@/payload-types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import { iconMap } from '@/components/blocks/shared/iconMap'

export const ServicesSectionBlock: React.FC<ServicesSectionBlockProps> = ({
  title,
  services,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-20 flex flex-col items-center gap-2 text-center">
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {services?.map((service, index) => {
            const Icon = iconMap[service.icon]
            const number = String(index + 1).padStart(2, '0')
            return (
              <Card
                key={index}
                className="group relative transition-colors duration-200 hover:ring-primary/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon && <Icon className="size-5" />}
                    </div>
                    <span className="font-heading text-3xl font-bold text-border/60">
                      {number}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl font-bold">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {service.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="mt-auto px-6 pb-6">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1">
                    {service.linkLabel || 'Více o službě'}
                    <IconArrowRight className="size-4" />
                  </span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
