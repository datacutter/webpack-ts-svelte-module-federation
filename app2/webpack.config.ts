import path from "path";
import { Configuration, container } from 'webpack';
import defaultConfig, { filename } from '../webpack-default-config';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import dep from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const devServer: DevServerConfiguration = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
  port: 9001,
};

export const webpackConfig: Configuration = {
  entry: {
    app: [path.resolve(__dirname, './src/app.ts')],
  },
  devServer,
  output: {
    path: path.resolve(__dirname, '../dist/app2'),
    filename: filename('js'),
    chunkFilename: filename('js'),
    publicPath: isProd ? '/app2/' : 'http://localhost:9001/',
    clean: true,
    uniqueName: 'app2',
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'app2',
      filename: 'remote-app2.js',
      exposes: {
        '.': './src/views/app.svelte',
        './App': './src/views/app.svelte',
        './Header': './src/views/header.svelte',
      },
      shared: {
        'svelte': {
          singleton: true,
          requiredVersion: dep.dependencies['svelte']
        },
      },
    }),
  ],
};
export default Object.assign(defaultConfig, webpackConfig);
