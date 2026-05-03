'use client'

import React from 'react'
import type { FAQSectionBlock as FAQSectionBlockProps } from '@/payload-types'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import { cn } from '@/utilities/ui'
import { IconChevronDown } from '@tabler/icons-react'

export const FAQSectionBlock: React.FC<FAQSectionBlockProps> = ({
  title,
  description,
  faqs,
}) => {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Left column — sticky on desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-1 h-1 w-10 rounded-full bg-primary" />
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {/* Right column — FAQ items */}
          <AccordionPrimitive.Root
            type="single"
            collapsible
            defaultValue="item-0"
            className="flex flex-col gap-3"
          >
            {faqs?.map((faq, i) => (
              <AccordionPrimitive.Item
                key={i}
                value={`item-${i}`}
                className="group rounded-xl border border-border/60 bg-card transition-colors duration-200 data-open:border-primary/40 data-open:bg-card"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex w-full items-center gap-4 p-5 text-left outline-none">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground transition-colors duration-200 group-data-open:bg-primary/15 group-data-open:text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-heading text-base font-medium sm:text-lg">
                      {faq.question}
                    </span>
                    <IconChevronDown
                      className={cn(
                        'size-5 shrink-0 text-muted-foreground transition-transform duration-300',
                        'group-data-open:rotate-180 group-data-open:text-primary',
                      )}
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-open:animate-accordion-down data-closed:animate-accordion-up">
                  <div className="px-5 pb-5 pl-[4.25rem]">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  )
}
