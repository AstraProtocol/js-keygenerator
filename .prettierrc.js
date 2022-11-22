module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
};
