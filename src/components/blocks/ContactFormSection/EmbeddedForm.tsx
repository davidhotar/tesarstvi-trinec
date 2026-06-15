'use client'
import type { Form as PluginFormType } from '@payloadcms/plugin-form-builder/types'
import type { Form as PayloadFormType } from '@/payload-types'

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

import { FormRenderer } from '@/components/blocks/Form/FormRenderer'

export const EmbeddedForm: React.FC<{ form: PayloadFormType }> = ({ form }) => {
  const formFromProps = form as unknown as PluginFormType

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <FormRenderer
          form={formFromProps}
          submitIcon={<ArrowRight data-icon="inline-end" />}
        />
      </CardContent>
    </Card>
  )
}
