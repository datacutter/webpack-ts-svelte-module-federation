import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import SveltePreprocess from "svelte-preprocess";
import type { Configuration } from 'webpack';

export const filename = (ext: string): string => `[name].[fullhash].${ext}`;

const isProd = process.env.NODE_ENV === 'production';

export const webpackConfig: Configuration = {
  entry: {},
  devtool: isProd ? false : 'eval',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: false,
            preprocess: SveltePreprocess({
              scss: true,
              sass: true,
            }),
          },
        },
      },
      // Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      // See: https://github.com/sveltejs/svelte-loader#usage
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.svelte'],
    alias: {
      process: 'process/browser',
      // Note: Later in this config file, we'll automatically add paths from `tsconfig.compilerOptions.paths`
      svelte: path.resolve('../node_modules', 'svelte'),
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: filename('js'),
    chunkFilename: filename('js'),
    publicPath: '/',
    clean: true,
  },
  plugins: [],
};

export default webpackConfig;