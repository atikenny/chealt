const { eslintConfig } = require('@chealt/check');

const config = {
  ...eslintConfig,
  overrides: [
    {
      files: [
        'packages/check/**/*.js',
        'packages/dashboard/**/*.js',
        'packages/jest-puppeteer-env/**/*.js',
        'packages/jest-puppeteer-env-example/**/*.js',
        'packages/mocker/**/*.js',
        'packages/mocker/**/*.cjs',
        './.eslintrc.js'
      ],
      parserOptions: {
        requireConfigFile: false
      }
    }
  ]
};

module.exports = config;
