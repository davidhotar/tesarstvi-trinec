import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { getEmailValidation } from '../validation'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <div className="space-y-2">
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-muted-foreground/60"> *</span>}
        </Label>
        <Input
          defaultValue={defaultValue}
          id={name}
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors[name]}
          {...register(name, getEmailValidation(required))}
        />
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
