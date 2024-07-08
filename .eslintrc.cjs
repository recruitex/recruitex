const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    camelcase: ['error', { allow: ['unstable_*'] }],
    'import/named': 'off',
  },
  overrides: [
    {
      files: [
        '*.config.{ts,js,mjs}',
        './src/app/**/page.tsx',
        './src/app/**/layout.tsx',
        './src/app/**/not-found.tsx',
        './src/app/**/*error.tsx',
        './src/app/apple-icon.tsx',
        './src/app/**/opengraph-image.tsx',
        './src/app/sitemap.ts',
        './src/app/robots.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};
module.exports = config;
