'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import React from 'react'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { FormRenderer } from './FormRenderer'

type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    introContent,
  } = props

  return (
    <section id="poptavka" className="hero-glow-bottom scroll-mt-28 bg-muted/40 py-16 lg:py-24">
      <div className="mx-auto w-full max-w-3xl px-4">
        {enableIntro && introContent && (
          <RichText
            className="mb-10 text-center [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:sm:text-4xl [&_p]:mt-3 [&_p]:text-muted-foreground"
            data={introContent}
            enableGutter={false}
            enableProse={false}
          />
        )}
        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <FormRenderer form={formFromProps} />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
