const path = require('path');
const webpack = require('webpack');

const config = {
  resolve: {
    alias: {
      Renderers: path.resolve(__dirname, 'lib/renderers/'),
      Components: path.resolve(__dirname, 'lib/components/'),
    },
    modules: [
      path.resolve('./lib/'),
      path.resolve('./node_modules/'),

    ],
  },
  entry: {
    vendor: [
      '@babel/polyfill',
      'react',
      'react-dom',
      'prop-types',
      'axios',
      'lodash.debounce',
      'lodash.pickby',
    ],
    app: ['./lib/renderers/dom.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};

module.exports = config;