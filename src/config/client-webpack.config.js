const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
};

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '..', 'bundle', 'index.tsx'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', '..', 'dist', 'client'),
    publicPath: 'bundle',
  },
  ...devConfig,
};
