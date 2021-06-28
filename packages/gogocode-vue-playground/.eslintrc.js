module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-debugger': 0,
    'no-unused-vars': 0,
    'vue/no-unused-components': 0,
  },
};