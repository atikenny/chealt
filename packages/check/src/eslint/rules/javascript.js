const config = {
  'array-bracket-spacing': ['error'],
  'arrow-body-style': ['error'],
  'arrow-parens': ['error'],
  'comma-dangle': ['error', 'never'],
  'comma-spacing': [
    'error',
    {
      before: false,
      after: true
    }
  ],
  complexity: ['error', 10],
  'eol-last': ['error', 'always'],
  eqeqeq: ['error'],
  'func-style': ['error'],
  indent: ['off'], // prefer prettier
  'import/newline-after-import': ['error'],
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1
    }
  ],
  'no-trailing-spaces': ['error'],
  'no-undefined': 'off',
  'object-curly-spacing': ['error', 'always'],
  'padded-blocks': ['error', 'never'],
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: '*',
      next: 'return'
    },
    {
      blankLine: 'always',
      prev: '*',
      next: 'break'
    },
    {
      blankLine: 'always',
      prev: '*',
      next: 'if'
    },
    {
      blankLine: 'always',
      prev: 'if',
      next: '*'
    },
    {
      blankLine: 'always',
      prev: '*',
      next: 'for'
    },
    {
      blankLine: 'always',
      prev: 'for',
      next: '*'
    }
  ],
  quotes: ['error', 'single', { avoidEscape: true }],
  semi: ['error', 'always'],
  'space-in-parens': ['error', 'never'],
  'space-infix-ops': ['error'],

  // recommended
  'array-callback-return': 'error',
  'arrow-spacing': 'error',
  'block-spacing': 'error',
  'brace-style': ['error', '1tbs'],
  camelcase: 'error',
  'callback-return': ['error', ['cb', 'callback', 'next']],
  'class-methods-use-this': 'error',
  'comma-style': ['error', 'last'],
  'computed-property-spacing': 'error',
  'consistent-return': 'error',
  curly: ['error', 'all'],
  'default-case': 'error',
  'dot-location': ['error', 'property'],
  'dot-notation': ['error', { allowKeywords: true }],
  'func-call-spacing': 'error',
  'generator-star-spacing': 'error',
  'guard-for-in': 'error',
  'handle-callback-err': ['error', 'err'],
  'key-spacing': ['error', { beforeColon: false, afterColon: true }],
  'keyword-spacing': 'error',
  'max-len': [
    'error',
    120,
    {
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }
  ],
  'max-statements-per-line': 'error',
  'new-cap': 'error',
  'new-parens': 'error',
  'no-alert': 'error',
  'no-array-constructor': 'error',
  'no-buffer-constructor': 'error',
  'no-caller': 'error',
  'no-confusing-arrow': 'error',
  'no-console': 'error',
  'no-delete-var': 'error',
  'no-else-return': ['error', { allowElseIf: false }],
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-fallthrough': 'error',
  'no-floating-decimal': 'error',
  'no-global-assign': 'error',
  'no-implied-eval': 'error',
  'no-invalid-this': 'error',
  'no-iterator': 'error',
  'no-label-var': 'error',
  'no-labels': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-mixed-requires': 'error',
  'no-mixed-spaces-and-tabs': ['error', false],
  'no-multi-spaces': 'error',
  'no-multi-str': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-object': 'error',
  'no-new-require': 'error',
  'no-new-wrappers': 'error',
  'no-octal': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': 'error',
  'no-path-concat': 'error',
  'no-process-exit': 'error',
  'no-proto': 'error',
  'no-redeclare': 'error',
  'no-restricted-properties': [
    'error',
    { property: 'substring', message: 'Use .slice instead of .substring.' },
    { property: 'substr', message: 'Use .slice instead of .substr.' },
    {
      object: 'assert',
      property: 'equal',
      message: 'Use assert.strictEqual instead of assert.equal.'
    },
    {
      object: 'assert',
      property: 'notEqual',
      message: 'Use assert.notStrictEqual instead of assert.notEqual.'
    },
    {
      object: 'assert',
      property: 'deepEqual',
      message: 'Use assert.deepStrictEqual instead of assert.deepEqual.'
    },
    {
      object: 'assert',
      property: 'notDeepEqual',
      message: 'Use assert.notDeepStrictEqual instead of assert.notDeepEqual.'
    }
  ],
  'no-return-assign': 'error',
  'no-script-url': 'error',
  'no-self-assign': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': 'error',
  'no-tabs': 'error',
  'no-throw-literal': 'error',
  'no-undef': ['error', { typeof: true }],
  'no-undef-init': 'error',
  'no-underscore-dangle': [
    'error',
    {
      allowAfterThis: true,
      allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    }
  ],
  'no-unmodified-loop-condition': 'error',
  'no-unneeded-ternary': 'error',
  'no-unused-expressions': 'error',
  'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }],
  'no-use-before-define': 'error',
  'no-useless-call': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-concat': 'error',
  'no-useless-constructor': 'error',
  'no-useless-escape': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-whitespace-before-property': 'error',
  'no-var': 'error',
  'object-curly-newline': ['error', { consistent: true, multiline: true }],
  'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
  'object-shorthand': 'error',
  'one-var-declaration-per-line': 'error',
  'operator-assignment': 'error',
  'operator-linebreak': 'error',
  'prefer-arrow-callback': 'error',
  'prefer-const': 'error',
  'prefer-numeric-literals': 'error',
  'prefer-promise-reject-errors': 'error',
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'quote-props': ['error', 'as-needed'],
  radix: 'error',
  'require-jsdoc': 'error',
  'require-unicode-regexp': 'error',
  'rest-spread-spacing': 'error',
  'semi-spacing': ['error', { before: false, after: true }],
  'semi-style': 'error',
  'space-before-blocks': 'error',
  'space-unary-ops': ['error', { words: true, nonwords: false }],
  'spaced-comment': ['error', 'always', { exceptions: ['-'] }],
  strict: ['error', 'global'],
  'switch-colon-spacing': 'error',
  'symbol-description': 'error',
  'template-curly-spacing': ['error', 'never'],
  'template-tag-spacing': 'error',
  'unicode-bom': 'error',
  'valid-jsdoc': [
    'error',
    {
      prefer: { return: 'returns' },
      preferType: {
        String: 'string',
        Number: 'number',
        Boolean: 'boolean',
        array: 'Array',
        object: 'Object',
        function: 'Function'
      }
    }
  ],
  'wrap-iife': 'error',
  'yield-star-spacing': 'error',
  yoda: ['error', 'never']
};

module.exports = config;
