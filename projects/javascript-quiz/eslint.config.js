import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Reglas recomendadas de ESLint, TypeScript y React
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'space-in-parens': ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'react/prop-types': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'react/self-closing-comp': ['error', { component: true, html: false }],
    }
  }
]