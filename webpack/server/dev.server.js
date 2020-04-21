const merge = require('webpack-merge');
const baseConfig = require('./base.server');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  optimization: {
    minimize: false,
    namedModules: true,
  },
});
