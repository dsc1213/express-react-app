const webpack = require('webpack'); // eslint-disable-line
const path = require('path');
const autoprefix = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');

const { getBabelLoaderOptions } = require('./babe-loader-helper');
const vendorManifestJson = require('../public/dist/vendor-manifest.json');

module.exports = {
  entry: {
    inventory: './frontend/index.js',
  },
  output: {
    path: path.resolve('public', 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'babel-loader',
            options: getBabelLoaderOptions({
              id: 'devBuild',
              hot: false,
            }),
          },
        ].filter((l) => !!l),
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'cache-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                autoprefix({
                  overrideBrowserslist: ['last 2 versions'],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
      {
        test: /resources\/dist\/svg-sprite\.svg/,
        use: [{ loader: 'raw-loader' }],
      },
      {
        test: /\.(png|jpg|gif|ttf|woff|woff2|tff|eot|svg|otf|ico|mp4)$/,
        exclude: (fPath) => !!fPath.match(/resources\/dist\/svg-sprite\.svg/),
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]' },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['frontend', 'node_modules'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: (() => {
    const plugins = [
      new CaseSensitivePlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '..'),
        manifest: vendorManifestJson,
      }),
    ];
    return plugins;
  })(),
};
