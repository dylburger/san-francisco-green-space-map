const path = require('path');

module.exports = {
  context: path.join(__dirname, '/src'),
  entry: './app',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, '/config'),
      path.join(__dirname, '/src'),
      path.join(__dirname, '/node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
};
