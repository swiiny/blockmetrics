module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'max-len': 'off',
    'no-unused-expressions': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-await-in-a-loop': 'off',
    'no-console': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'no-throw-literal': 'off',
    'no-promise-executor-return': 'off',
  },
};
