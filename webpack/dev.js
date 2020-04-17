const merge = require('webpack-merge');
const baseConfig = require('./base');

module.exports = merge.smart(baseConfig, {
  devtool: 'eval-source-map',
  mode: 'development',
  optimization: {
    minimize: false,
  },
});
