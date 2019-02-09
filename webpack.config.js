const path = require('path');

module.exports = {
  entry: [
    './src/js/app.js',
    './src/scss/app.scss'
  ],
  output: {
    path: path.join(__dirname, 'extension'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
					},
					{
						loader: 'sass-loader'
					}
				]
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
      'extension/**/*.js',
      'extension/**/*.css'
    ],
    poll: 1000
  }
};
