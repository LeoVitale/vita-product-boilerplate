import { config } from '@repo/config/eslint/react-internal.js';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: ['.expo/**', 'node_modules/**'],
  },
  {
    // CommonJS files (metro.config.js, etc.)
    files: ['*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
