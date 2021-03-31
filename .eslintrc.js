module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    semi: [2, 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'react/jsx-indent': ['error', 2],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'prefer-const': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'space-in-parens': ['error', 'never'],
    quotes: ['error', 'single'],
    'space-infix-ops': ['error', { int32Hint: false }],
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'eol-last': ['error', 'always'],
    'no-multi-spaces': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['error', { beforeColon: false }],
    'function-paren-newline': ['error', 'never'],
    'space-before-blocks': 'error',
    'react/display-name': 0,
    'no-useless-catch': 'off'
  }
};