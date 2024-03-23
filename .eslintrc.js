module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react-native/sort-styles': [
      'error',
      'asc',
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],
    'linebreak-style': 'off',
    'react/jsx-filename-extension': 'off',
    strict: 'off',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'react/jsx-curly-brace-presence': 'off',
    // 'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-unneeded-ternary': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-boolean-value': 'off',
    'operator-linebreak': 'off',
    'no-nested-ternary': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-shadow': 'off',
    'react/jsx-curly-newline': 'warn',
  },
};
