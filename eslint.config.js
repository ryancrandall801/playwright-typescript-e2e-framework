import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import playwright from 'eslint-plugin-playwright';
import globals from 'globals';

export default [
  js.configs.recommended,

  // Scripts (Node)
  {
    files: ['scripts/**/*.js', 'scripts/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      playwright,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  {
    ignores: ['node_modules', 'playwright-report', 'test-results', 'dist'],
  },
];
