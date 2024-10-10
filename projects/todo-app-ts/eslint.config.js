import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

const { pathname: root } = new URL('../src', import.meta.url)

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Asegúrate de que apunte a tu archivo tsconfig.json
        tsconfigRootDir: root, // Esto le indica a TypeScript dónde está la raíz del proyecto
        projectService: true, // Esto habilita el servicio de información de tipos
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tsPlugin
    },
    rules: {
      quotes: ['error', 'single'],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn'
    }
  },
  pluginJs.configs.recommended
  // ...tsPlugin.configs.recommendedTypeChecked
]
