import path from "path";
import { Configuration, container } from 'webpack';
import defaultConfig, { filename } from '../webpack-default-config';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import dep from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const devServer: DevServerConfiguration = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  },
  port: 9000,
};

export const webpackConfig: Configuration = {
  entry: {
    app1: [path.resolve(__dirname, './src/app.ts')],
  },
  devServer,
  output: {
    path: path.resolve(__dirname, '../dist/app1'),
    filename: filename('js'),
    chunkFilename: filename('js'),
    publicPath: '/',
    clean: true,
    uniqueName: 'app1',
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        'app2': `promise new Promise(resolve => {
            const script = document.createElement('script')
            script.src = 'http://localhost:9001/remote-app2.js'
            script.onload = () => {
              resolve(window.app2)
            }
            document.head.appendChild(script);
          })
          `,
      },
      shared: {
        'svelte': {
          singleton: true,
          requiredVersion: dep.dependencies['svelte']
        },
      },
    }),
    // new FederatedTypesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
  ],
};
export default Object.assign(defaultConfig, webpackConfig);