// yarn add "@typescript-eslint/eslint-plugin" "@typescript-eslint/parser" "eslint-config-prettier" "eslint-plugin-import" "eslint-plugin-no-only-tests" "eslint-plugin-prettier" "eslint-plugin-react" "eslint-plugin-react-hooks" "eslint-plugin-simple-import-sort"
module.exports = {
  ignorePatterns: ['*.mdx', 'output.tsx'],

  plugins: [
    'react-hooks',
    'no-only-tests',
    '@typescript-eslint',
    'import',
    'simple-import-sort',
  ],

  parser: '@typescript-eslint/parser',

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],

  env: { es6: true },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      ecmaVersion: 10,
    },
    sourceType: 'module',
  },

  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },

  rules: {
    // imports
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // react
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-children-prop': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/jsx-no-literals': 1,
    'react/self-closing-comp': 'error',
    'react/no-unescaped-entities': [
      'error',
      {
        forbid: [
          {
            char: '>',
            alternatives: ['&gt;'],
          },
          {
            char: '"',
            alternatives: ['&quot;', '&ldquo;', '&#34;', '&rdquo;'],
          },
          {
            char: '}',
            alternatives: ['&#125;'],
          },
        ],
      },
    ],

    // dev/test logging and comments
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-only-tests/no-only-tests': 'error',
    'no-debugger': 'error',
    'no-warning-comments': [
      'error',
      { terms: ['fixme'], location: 'anywhere' },
    ],

    // typescript
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,

    // change to warning until we can resolve to make similar to old @typescript-eslint/camelcase
    // this is similar but errors out a lot more cases such as Cell or ReactComponents returned from functions
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['property', 'parameterProperty', 'method', 'accessor'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        // filter: {
        //   // you can expand this regex as you find more cases that require quoting that you want to allow
        //   regex: "[_-]",
        //   match: false,
        // },
      },
      {
        selector: ['typeParameter', 'typeAlias'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
    'object-shorthand': ['error', 'always'],
    // disable the base rule as it can report incorrect errors
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md#rule-changes
    'no-empty-function': 'off',
  },

  overrides: [
    {
      files: ['*.stories.ts?'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // import sorts see
        // https://github.com/lydell/eslint-plugin-simple-import-sort/
        // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/master/examples/.eslintrc.js
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages. `react` related packages come first.
              // if we had more than one array, each array is separated
              // by a space
              [
                '^react',
                // 3rd party
                '^@?\\w',
                // Kodiak
                '^@kodiak-ui(.*)',
                // styleguide
                '^styleguide',
                // graphql
                '^__generated__.*',
                'app/graphql.*',
                '^app/.*',
                // // Side effect imports.
                '^\\u0000',
                // Parent imports. Put `..` last.
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
                // Other relative imports. Put same-folder imports and `.` last.
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$',
                // Style imports.
                '^.+\\.s?css$',
              ],
            ],
          },
        ],
      },
    },
  ],
}
