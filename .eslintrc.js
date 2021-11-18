module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: [
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Prettier rules
    'max-len': [0, 142],
    code: [0, 142],
    'print-width': [0, 142],
    'no-console': [1],
    'space-before-function-paren': [0],
    'arrow-parens': [0],
    curly: [0],
    'keyword-spacing': [0]
  }
}
