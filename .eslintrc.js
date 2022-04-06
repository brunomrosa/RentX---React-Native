module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:import/errors', 'plugin:import/warnings'],
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
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/prefer-default-export': 'off',

    'react/require-default-props': 'off',
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'react/jsx-props-no-spreading': ['warn', { custom: 'ignore' }],
  },
  settings: {
    'import/core-modules': ['@expo/vector-icons'],
  },
};
