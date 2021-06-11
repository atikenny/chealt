const javascriptRules = require('./rules/javascript');
const importRules = require('./rules/import');
const preactRules = require('./rules/preact');
const prettierRules = require('./rules/prettier');

const config = {
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  globals: {
    page: true,
    jestPuppeteer: true
  },
  parser: '@babel/eslint-parser',
  rules: {
    ...javascriptRules,
    ...importRules,
    ...prettierRules,
    ...preactRules
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: ['prettier'],
  plugins: ['import', 'prettier']
};

module.exports = config;
