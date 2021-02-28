const clientConfig = require('./client-webpack.config');
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const serverOverride = {
  target: 'node',
  externals: [webpackNodeExternals()],
  output: {
    ...clientConfig.output,
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '..', '..', 'dist', 'server'),
  },
  entry: {
    index: path.join(__dirname, '..', 'server', 'index.tsx'),
  },
  plugins: [],
};

const serverConfig = {
  ...clientConfig,
  ...serverOverride,
};

module.exports = serverConfig;