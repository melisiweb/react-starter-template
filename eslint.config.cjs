const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');

const simpleImportSort = require('eslint-plugin-simple-import-sort');
const reactRefresh = require('eslint-plugin-react-refresh');
const jsxA11Y = require('eslint-plugin-jsx-a11y');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');
const { version } = require('react');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    ignores: ['**/*.config.*', '.lintstagedrc.cjs'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:testing-library/react',
      'plugin:jest-dom/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'react-refresh': reactRefresh,
      'jsx-a11y': fixupPluginRules(jsxA11Y),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: 'tsconfig.json',
      },
    },

    rules: {
      'react/react-in-jsx-scope': 0,
      'import/prefer-default-export': 0,
      'jsx-a11y/label-has-associated-control': 0,
      'react/jsx-props-no-spreading': 0,
      'no-param-reassign': 0,
      'react/require-default-props': 0,
      'react/button-has-type': 0,
      'simple-import-sort/imports': 1,
      'simple-import-sort/exports': 1,
      '@typescript-eslint/no-shadow': 0,
      '@typescript-eslint/no-unused-vars': 1,
      'no-restricted-syntax': 0,
      'react-refresh/only-export-components': 1,

      'prettier/prettier': [
        0,
        {
          endOfLine: 'auto',
        },
      ],

      'import/extensions': [
        0,
        'never',
        {
          '.js': 'never',
          '.jsx': 'never',
          '.ts': 'never',
          '.tsx': 'never',
        },
      ],
    },
  },
];
