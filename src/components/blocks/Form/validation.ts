import type { RegisterOptions } from 'react-hook-form'

/**
 * Czech-localized validation messages shared across all form fields.
 */
export const validationMessages = {
  required: 'Toto pole je povinné',
  email: 'Zadejte platnou e-mailovou adresu',
  phone: 'Zadejte platné telefonní číslo',
  minLength: (n: number) => `Zadejte alespoň ${n} znaků`,
  maxLength: (n: number) => `Maximální délka je ${n} znaků`,
  min: (n: number) => `Hodnota musí být alespoň ${n}`,
  max: (n: number) => `Hodnota smí být nejvýše ${n}`,
}

/** Requires a local part, an "@", a domain and a TLD of at least two characters. */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** At least 9 digits, with an optional leading "+" and optional spaces or dashes. */
export const PHONE_REGEX = /^\+?[\d\s-]{9,20}$/

const matches = (value: string, ...patterns: RegExp[]) => patterns.some((p) => p.test(value))

/**
 * Detect what a free-text field is meant to hold based on its name/label so we can
 * apply the right format validation. Fields are CMS-defined, so we infer intent.
 */
const fieldKind = (name?: string, label?: string): 'email' | 'phone' | 'text' => {
  const haystack = `${name ?? ''} ${label ?? ''}`.toLowerCase()
  if (matches(haystack, /e-?mail/)) return 'email'
  if (matches(haystack, /phone/, /telefon/, /\btel\b/, /mobil/)) return 'phone'
  return 'text'
}

/**
 * Build react-hook-form validation rules for a single-line text input. Email- and
 * phone-shaped fields (detected by name/label) get format + length validation; all
 * other text fields get a sane maximum length to guard against abuse.
 */
export const getTextValidation = ({
  name,
  label,
  required,
}: {
  name: string
  label?: string
  required?: boolean | null
}): RegisterOptions => {
  const rules: RegisterOptions = {}

  if (required) rules.required = validationMessages.required

  switch (fieldKind(name, label)) {
    case 'email':
      rules.pattern = { value: EMAIL_REGEX, message: validationMessages.email }
      rules.maxLength = { value: 254, message: validationMessages.maxLength(254) }
      break
    case 'phone':
      rules.pattern = { value: PHONE_REGEX, message: validationMessages.phone }
      rules.maxLength = { value: 20, message: validationMessages.maxLength(20) }
      break
    default:
      rules.maxLength = { value: 200, message: validationMessages.maxLength(200) }
  }

  return rules
}

/** Rules for a dedicated email field (always validated as an email). */
export const getEmailValidation = (required?: boolean | null): RegisterOptions => ({
  ...(required ? { required: validationMessages.required } : {}),
  pattern: { value: EMAIL_REGEX, message: validationMessages.email },
  maxLength: { value: 254, message: validationMessages.maxLength(254) },
})

/** Rules for a multi-line textarea. */
export const getTextareaValidation = (required?: boolean | null): RegisterOptions => ({
  ...(required ? { required: validationMessages.required } : {}),
  maxLength: { value: 2000, message: validationMessages.maxLength(2000) },
})

/** Rules for a numeric field. */
export const getNumberValidation = (required?: boolean | null): RegisterOptions => ({
  ...(required ? { required: validationMessages.required } : {}),
})

/** Rules for a required selection / checkbox. */
export const getRequiredValidation = (required?: boolean | null): RegisterOptions => ({
  ...(required ? { required: validationMessages.required } : {}),
})
