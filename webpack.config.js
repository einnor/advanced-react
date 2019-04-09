const path = require('path');

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
  entry: ['@babel/polyfill', './lib/renderers/dom.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;