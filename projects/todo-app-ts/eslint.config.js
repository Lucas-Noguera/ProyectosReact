import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'; // Asegúrate de importar el plugin
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import babelParser from '@babel/eslint-parser' // Importa el parser

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: babelParser, // Configura el parser aquí para compatibilidad con flat config
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react', '@babel/preset-typescript']
        },
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      },
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      react, // Agregar el plugin aquí
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'off', // Desactiva la regla de TypeScript
      'quotes': ['error', 'single'], // Asegúrate de verificar comillas simples
      'indent': ['error', 2], // Verifica la indentación
      'space-in-parens': ['error', 'never'], // Espacios en paréntesis
      'react/jsx-indent': ['error', 2], // Verifica la indentación de JSX
      'react/jsx-indent-props': ['error', 2], // Verifica la indentación de propiedades de JSX
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }], // Verifica la cantidad de propiedades por línea
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'], // Verifica la ubicación de los corchetes de cierre de JSX
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }], // Verifica la separación de etiquetas JSX
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }], // Verifica la separación de corchetes de JSX
      'react/prop-types': 'off', // Desactiva la regla de prop-types
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // Agrega esta línea
      'react/self-closing-comp': ['error', { component: true, html: false }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  }
)
