import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    // Aplicar reglas a archivos JavaScript, TypeScript, y React
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // Ignorar la carpeta de salida 'dist'
    ignores: ['dist'],
    languageOptions: {
      parser: tsParser, // Usa el parser de TypeScript
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
        project: './tsconfig.app.json', // Asegúrate de que este archivo esté configurado correctamente
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint, // Agrega el plugin de TypeScript
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      // Reglas recomendadas de ESLint, TypeScript y React
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      
      // Reglas específicas de formato
      'semi': ['error', 'never'], // Coma siempre al final de las declaraciones
      'quotes': ['error', 'single'], // Usa comillas dobles
      'indent': ['error', 2], // Indentación de 2 espacios
      'space-in-parens': ['error', 'never'], // Sin espacios en los paréntesis

      // Reglas de estilo JSX y React
      'react/react-in-jsx-scope': 'off', // No requiere importar React en archivos JSX
      'react/jsx-uses-react': 'off', // Desactiva la validación de uso de React
      'react/jsx-indent': ['error', 2], // Indentación de JSX de 2 espacios
      'react/jsx-indent-props': ['error', 2], // Indentación de props de JSX de 2 espacios
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }], // 1 prop por línea cuando es multilinea
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'], // Etiqueta alineada para el cierre de JSX
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }], // Espacio antes del autocierre
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }], // Sin espacios en las llaves de JSX
      'react/prop-types': 'off', // Desactivar prop-types si se usa TypeScript
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // Evita múltiples líneas vacías
      'react/self-closing-comp': ['error', { component: true, html: false }], // Prefiere componentes auto-cerrados en JSX
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Reglas de react-refresh para componentes exportados
      
      // Otras configuraciones de TypeScript y generales
      '@typescript-eslint/no-unused-vars': ['warn'], // Muestra advertencia para variables sin usar
    },
  },
]
