module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': 'warn',
    'import/extensions': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn'],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'react/jsx-props-no-spreading': ['warn', { custom: 'ignore' }],
    'object-curly-newline': ['off'],
    'no-unused-vars': ['warn'],
    '@typescript-eslint/naming-convention': [
      'off',
      {
        selector: 'default',
        format: ['camelCase'],
      },
    ],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        camelcase: ['off'],
      },
    },
  ],
  settings: {
    'import/core-modules': ['@expo/vector-icons'],
  },
};
