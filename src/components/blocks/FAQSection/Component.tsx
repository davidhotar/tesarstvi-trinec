'use client'

import React from 'react'
import type { FAQSectionBlock as FAQSectionBlockProps } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { IconPhone } from '@tabler/icons-react'

export const FAQSectionBlock: React.FC<FAQSectionBlockProps> = ({
  title,
  description,
  ctaLabel,
  ctaLink,
  faqs,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-sm text-muted-foreground">
                {description}
              </p>
            )}
            {ctaLabel && (
              <Button
                variant="outline"
                className="mt-6 gap-2 rounded-lg"
                {...(ctaLink ? { asChild: true } : {})}
              >
                {ctaLink ? (
                  <a href={ctaLink}>
                    <IconPhone className="size-4" />
                    {ctaLabel}
                  </a>
                ) : (
                  <>
                    <IconPhone className="size-4" />
                    {ctaLabel}
                  </>
                )}
              </Button>
            )}
          </div>
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs?.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-heading font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
