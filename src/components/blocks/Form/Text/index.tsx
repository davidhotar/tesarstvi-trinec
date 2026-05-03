import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
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
        <Input defaultValue={defaultValue} id={name} type="text" aria-invalid={!!errors[name]} {...register(name, { required })} />
        {errors[name] && <Error name={name} />}
      </div>
    </Width>
  )
}
