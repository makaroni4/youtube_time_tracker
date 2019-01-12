module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    path: __dirname + "/extension",
    filename: 'extension.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map'
};
