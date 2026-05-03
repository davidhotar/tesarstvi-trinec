'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <p className="mt-0 text-xs text-destructive" role="alert">
      {(errors[name]?.message as string) || 'Toto pole je povinné'}
    </p>
  )
}
