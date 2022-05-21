module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': 'off', // disables line length check
    'no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-console': 'off', // TODO: Delete on v1
    camelcase: 'off',
    'no-unused-vars': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off', // TODO: Fix for V1
    'import/no-cycle': 'off', // TODO: Fix vor V1
    'no-param-reassign': ['error', { props: false }],
    'react/jsx-props-no-spreading': ['off', {
      html: 'ignore',
      custom: 'ignore',
    }],
  },
};
