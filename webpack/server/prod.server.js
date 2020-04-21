const merge = require('webpack-merge');
const baseConfig = require('./base.server');

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    namedModules: true,
  },
});
