module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-debugger': 'error',
    // disable the base rule as it can report incorrect errors
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md#rule-changes
    'no-empty-function': 'off',
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
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
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
        selector: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
    ],

    // "@typescript-eslint/naming-convention": [
    //     "warn",
    //     { "selector": "variableLike", "format": ["camelCase"] }
    //   ],
    'no-warning-comments': [
      'error',
      { terms: ['fixme'], location: 'anywhere' },
    ],
    'react/no-children-prop': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
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
  },
}
