// @ts-ignore
import path from 'path';
import { Configuration } from 'webpack';
// @ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// @ts-ignore
import TerserPlugin from 'terser-webpack-plugin';
// @ts-ignore
import autoprefixer from 'autoprefixer';

// noinspection JSUnusedGlobalSymbols
export default (env: Record<string, boolean>): Configuration => {
  const isProd = !!env.production;

  return {
    entry: './assets/main.ts',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
    },

    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        '@': path.resolve(__dirname, 'resources', 'assets'),
      },
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    autoprefixer({
                      grid: true,
                    }),
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProd,
                sassOptions: {
                  silenceDeprecations: [
                    'mixed-decls',
                    'color-functions',
                    'global-builtin',
                    'import',
                  ],
                }
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),
    ],

    devtool: isProd ? false : 'source-map',
    mode: isProd ? 'production' : 'development',

    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
          extractComments: false,
        }),
      ],
    },

  };
}