const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const vendorManifestJson = require('../../dist/client/vendor-manifest.json');
const { nodeEnv, webpackAnalyze, appVersion } = require('../config');
const isProd = nodeEnv === 'prod' || nodeEnv === 'production';

module.exports = {
  entry: {
    '7BossInventory': './frontend/index.js',
  },
  output: {
    path: path.resolve('dist', 'client'),
    filename: `[name].${appVersion}.bundle.js`,
    publicPath: '',
  },
  stats: {
    children: false,
    // assets: !isProd,
    chunks: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
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
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.woff(\?.+)?$|\.woff2(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: '[path][name].[ext]',
              mimetype: 'application/font-woff',
              outputPath: 'fonts',
            },
          },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
      {
        test: /\.ttf(\?.+)?$|\.eot(\?.+)?$|\.otf(\?.+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: (() => {
    const plugins = [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CaseSensitivePlugin(),
      new MiniCssExtractPlugin({
        filename: `[name].${appVersion}.bundle.css`,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '../..'),
        manifest: vendorManifestJson,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true,
      }),
      new webpack.DefinePlugin({
        APP_VERSION: JSON.stringify(appVersion),
        NODE_ENV: JSON.stringify(nodeEnv),
      }),
    ];
    // run webpack-bundle-analyzer for dev
    if (webpackAnalyze === 'true' && !isProd) {
      plugins.push(new BundleAnalyzerPlugin());
    }
    return plugins;
  })(),
  performance: {
    hints: false,
  },
};
