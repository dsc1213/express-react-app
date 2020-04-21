const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { appVersion } = require('../config');

module.exports = {
  context: path.resolve(__dirname),
  entry: ['babel-polyfill', '../../bin/server.js'],
  output: {
    path: path.resolve('dist', 'server'),
    filename: `server.${appVersion}.js`,
    publicPath: '/server/',
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env']],
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], ['@babel/plugin-proposal-class-properties']],
              compact: false,
              babelrc: false,
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env', { targets: { node: '8.10' } }]],
              plugins: [],
              compact: false,
              babelrc: false,
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../.env.build'),
        to: path.resolve('dist', 'server/.env'),
        toType: 'file',
        force: true,
      },
      {
        from: path.resolve(__dirname, '../../views'),
        to: path.resolve('dist', 'server/views'),
        toType: 'dir',
        force: true,
      },
    ]),
  ],
  externals: [nodeExternals()],
  target: 'node',
  node: {
    // Allow these globals.
    __filename: false,
    __dirname: false,
  },
  stats: 'errors-only',
  bail: true,
  performance: {
    hints: false,
  },
};
