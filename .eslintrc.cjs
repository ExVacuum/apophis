module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', 50],
  },
  parserOptions: {
    sourceType: 'module',
  },
};
