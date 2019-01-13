const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'extension'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: false
  },
  devtool: false,
  watchOptions: {
    ignored: [
      'node_modules',
      'extension/**/*.js'
    ],
    poll: 1000
  }
};
