const { resolve } = require('path');
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { vendor } = require('./config');

const minimizer = [
  new TerserPlugin({
    terserOptions: {
      extractComments: 'all',
    },
  }),
];

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    vendor,
  },

  output: {
    filename: 'vendor.bundle.js',
    path: resolve('public', 'dist'),
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
        path: path.resolve(__dirname, '../public/dist/[name]-manifest.json'),
      }),
    ];

    return plugins;
  })(),
};
