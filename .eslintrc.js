module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 'off',
    'import/prefer-default-export':
      'off',
    'linebreak-style': 0,
    '@typescript-eslint/no-namespace':
      'off',
    '@typescript-eslint/no-unused-vars':
      'off',
    'prefer-promise-reject-errors':
      'off',
    'react/require-default-props':
      'off',
    'default-param-last': 0,
    'react/jsx-props-no-spreading': 0,
    'max-len': ['error', { code: 120 }],
    'react/function-component-definition':
      [
        2,
        {
          namedComponents:
            'arrow-function',
          unnamedComponents:
            'arrow-function',
        },
      ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor:
          ['state'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
