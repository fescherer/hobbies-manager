import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...eslintPluginTailwindCSS.configs['flat/recommended'],
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'indent': ['error', 2],
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-self-closing-comp': ['error'],
      '@stylistic/array-element-newline': ['warn', 'consistent'],
      '@stylistic/array-bracket-newline': [
        'warn', {
          multiline: true,
        },
      ],
      '@stylistic/brace-style': [
        'warn', '1tbs', {
          allowSingleLine: false,
        },
      ],
      '@stylistic/jsx-newline': [
        'error', {
          prevent: true,
          allowMultilines: true,
        },
      ],
    },
  },
  {
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/button-has-type': ['error'],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    plugins: {
      tailwindcss: eslintPluginTailwindCSS,
    },
    rules: {
      'tailwindcss/no-custom-classname': [
        'warn', {
          callees: ['clsx', 'cn'],
        },
      ],
      'tailwindcss/classnames-order': [
        'warn', {
          callees: ['clsx', 'cn'],
        },
      ],
    },
  },

]
