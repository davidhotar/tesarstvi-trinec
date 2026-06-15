import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { getTextareaValidation } from '../validation'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 6, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-muted-foreground/60"> *</span>}
        </Label>
        <TextAreaComponent
          className="min-h-36"
          defaultValue={defaultValue}
          id={name}
          rows={rows}
          aria-invalid={!!errors[name]}
          {...register(name, getTextareaValidation(required))}
        />
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
