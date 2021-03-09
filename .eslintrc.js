module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/triple-slash-reference': 1,
    '@typescript-eslint/no-invalid-void-type': 1,
    '@typescript-eslint/explicit-member-accessibility': 1,
    '@typescript-eslint/no-parameter-properties': 1,
    '@typescript-eslint/prefer-function-type': 1,
    '@typescript-eslint/consistent-type-assertions': 1,
    '@typescript-eslint/consistent-type-definitions': 1,
    'no-inner-declarations': 1,
    'no-lone-blocks': 1,
    'symbol-description': 1,
  },
};
