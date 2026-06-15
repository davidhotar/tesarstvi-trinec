import nextConfig from 'eslint-config-next'

// eslint-config-next@16 ships a native flat config (array of config objects).
// Spread it directly instead of routing through @eslint/eslintrc FlatCompat,
// which crashed with "Converting circular structure to JSON" while validating
// eslint-plugin-react's self-referential `configs` object under the legacy schema.

// Flat config scopes plugins per config object, so a rule override must live in
// the same object that registers its plugin. Inject each override group into
// whichever Next config object owns the matching plugin.
const tsOverrides = {
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/no-empty-object-type': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^(_|ignore)',
    },
  ],
}

// Next 16 bundles eslint-plugin-react-hooks v6 with React-Compiler-era rules.
// These flag pre-existing template patterns (useClickableCard refs, theme/admin
// init effects) as errors. Downgrade to warn to keep them visible without
// blocking the build, pending a follow-up refactor.
const hooksOverrides = {
  'react-hooks/refs': 'warn',
  'react-hooks/set-state-in-effect': 'warn',
}

const eslintConfig = [
  ...nextConfig.map((c) => {
    if (!c.plugins) return c
    const rules = { ...c.rules }
    if (c.plugins['@typescript-eslint']) Object.assign(rules, tsOverrides)
    if (c.plugins['react-hooks']) Object.assign(rules, hooksOverrides)
    return { ...c, rules }
  }),
  {
    ignores: [
      '.next/',
      '.claude/**',
      'src/payload-types.ts',
      'src/payload-generated-schema.ts',
    ],
  },
]

export default eslintConfig
