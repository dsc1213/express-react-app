const {
  MINIFY_OVERRIDE = 'true',
  MINIFY_REMOVE_COMMENTS = 'true',
  MINIFY_COLLAPSE_WHITESPACES = 'true',
  MINIFY_COLLAPSE_BOOLEAN_ATTRIBUTES = 'true',
  MINIFY_REMOVE_ATTRIBUTES_QUOTES = 'true',
  MINIFY_REMOVE_EMPTY_ATTRIBUTES = 'true',
  MINIFY_JS = 'true',
  MINIFY_CSS = 'true',
} = process.env;

module.exports = {
  override: ( MINIFY_OVERRIDE === 'true' ),
  htmlMinifier: {
    removeComments: ( MINIFY_REMOVE_COMMENTS === 'true' ),
    collapseWhitespace: ( MINIFY_COLLAPSE_WHITESPACES === 'true' ),
    collapseBooleanAttributes: ( MINIFY_COLLAPSE_BOOLEAN_ATTRIBUTES === 'true' ),
    removeAttributeQuotes: ( MINIFY_REMOVE_ATTRIBUTES_QUOTES === 'true' ),
    removeEmptyAttributes: ( MINIFY_REMOVE_EMPTY_ATTRIBUTES === 'true' ),
    minifyJS: ( MINIFY_JS === 'true' ),
    minifyCSS: ( MINIFY_CSS === 'true' ),
  },
};
