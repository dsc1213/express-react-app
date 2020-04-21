const { resolve } = require('path');
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { vendor, nodeEnv, webpackAnalyze, appVersion } = require('../config');
const isProd = nodeEnv === 'prod' || nodeEnv === 'production';

const minimizer = [
  new TerserPlugin({
    terserOptions: {
      extractComments: 'all',
    },
  }),
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    vendor,
  },

  output: {
    filename: `vendor.${appVersion}.bundle.js`,
    path: resolve('dist', 'client'),
    library: '[name]_[hash]',
  },

  optimization: {
    minimizer,
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          minChunks: Infinity,
          name: 'vendors',
          enforce: true,
        },
      },
    },
  },

  plugins: (() => {
    const plugins = [
      new CleanWebpackPlugin(),
      new webpack.DllPlugin({
        name: '[name]_[hash]',
        path: path.resolve('dist', 'client/[name]-manifest.json'),
      }),
    ];
    // run webpack-bundle-analyzer
    if (webpackAnalyze === 'true') {
      plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
  })(),
  performance: {
    hints: false,
  },
};
