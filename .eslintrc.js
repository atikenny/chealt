module.exports = {
    env: {
        browser: true,
        jest: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    globals: {
        page: true
    },
    parser: 'babel-eslint',
    rules: {
        'array-bracket-spacing': ['error'],
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
        'import/newline-after-import': ['error'],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1
            }
        ],
        'no-trailing-spaces': ['error'],
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
            }
        ],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': ['error']
    },
    settings: {
        react: {
            version: '16.5.2'
        }
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 8,
        sourceType: 'module'
    },
    plugins: ['import', 'react']
};