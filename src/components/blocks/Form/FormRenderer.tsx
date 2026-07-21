'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

type FormValues = Record<string, unknown>

const FALLBACK_ERROR = 'Něco se pokazilo. Zkuste to prosím znovu.'
const SUBMIT_ERROR = 'Odeslání se nezdařilo. Zkuste to prosím znovu.'

/**
 * Build RHF default values from CMS field definitions (name → defaultValue).
 * Avoids passing the raw fields array, which is not a valid RHF values object.
 */
const buildDefaultValues = (formFields: FormType['fields']): FormValues => {
  const defaults: FormValues = {}

  if (!formFields) return defaults

  for (const field of formFields) {
    if (!field || typeof field !== 'object') continue
    if (field.blockType === 'message') continue
    if (!('name' in field) || !field.name) continue

    if (field.blockType === 'checkbox') {
      defaults[field.name] = 'defaultValue' in field ? Boolean(field.defaultValue) : false
      continue
    }

    defaults[field.name] =
      'defaultValue' in field && field.defaultValue != null ? field.defaultValue : ''
  }

  return defaults
}

export const FormRenderer: React.FC<{
  form: FormType
  submitIcon?: React.ReactNode
}> = ({ form: formFromProps, submitIcon }) => {
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps

  const defaultValues = useMemo(
    () => buildDefaultValues(formFromProps.fields),
    [formFromProps.fields],
  )

  const formMethods = useForm<FormValues>({
    defaultValues,
    // Validate a field once it's been blurred, then keep it live on every change,
    // so users get feedback as they go instead of only after pressing submit.
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const isSubmittingRef = useRef(false)
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormValues) => {
      // Ref guards against double-submit before React re-renders disabled state
      if (isSubmittingRef.current) return
      isSubmittingRef.current = true

      const submitForm = async () => {
        setError(undefined)
        setIsLoading(true)

        // Coerce null/undefined to '' — Postgres form_submissions.submission_data.value is NOT NULL
        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value: value == null ? '' : String(value),
        }))

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            isSubmittingRef.current = false
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || SUBMIT_ERROR,
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          isSubmittingRef.current = false
          setIsLoading(false)
          setError({
            message: FALLBACK_ERROR,
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <FormProvider {...formMethods}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <RichText data={confirmationMessage} />
      )}
      {error && (
        <div
          className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error.message || FALLBACK_ERROR}
        </div>
      )}
      {!hasSubmitted && (
        <form id={String(formID)} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4">
            {formFromProps &&
              formFromProps.fields &&
              formFromProps.fields?.map((field, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Field: React.FC<any> =
                  fields?.[field.blockType as keyof typeof fields]
                if (Field) {
                  return (
                    <Field
                      key={index}
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  )
                }
                return null
              })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Odesláním formuláře souhlasíte se zpracováním osobních údajů za účelem
            vyřízení poptávky. Vaše data nebudou sdílena s třetími stranami a budou
            použita výhradně pro komunikaci s vámi.
          </p>

          <Button
            form={String(formID)}
            type="submit"
            variant="default"
            size="lg"
            className="mt-4 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Odesílání, počkejte prosím…' : submitButtonLabel}
            {!isLoading && submitIcon}
          </Button>
        </form>
      )}
    </FormProvider>
  )
}
