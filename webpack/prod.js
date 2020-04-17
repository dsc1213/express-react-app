const merge = require('webpack-merge');
const baseConfig = require('./base');
const TerserPlugin = require('terser-webpack-plugin');

const minimizer = [
  new TerserPlugin({
    terserOptions: {
      sourceMap: true,
      extractComments: 'all',
      chunkFilter: (chunk) => {
        // Exclude uglification for the `vendor` chunk
        if (chunk.name === 'vendor') {
          return false;
        }
        return true;
      },
    },
  }),
];

module.exports = merge.smart(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer,
  },
});
