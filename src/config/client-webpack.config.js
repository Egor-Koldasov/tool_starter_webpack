const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
const reactLoadableTransformer = require('react-loadable-ts-transformer');

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
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: '/node_modules/',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
              before: [reactLoadableTransformer],
          }),
      },
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new ReactLoadableSSRAddon({filename: 'loadable-assets-manifest.json'}),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', '..', 'dist', 'client'),
    publicPath: '/bundle/',
  },
  ...devConfig,
};
