const path = require('path');
const { webpack } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPLugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

module.exports = {
  mode: 'development',
  entry: '../src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@assets': path.join(__dirname, '../assets'),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    hot: isDev,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: '../index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPLugin({
      filename: 'style.css',
    }),
  ],
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPLugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPLugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
// {
//   loader: MiniCssExtractPLugin.loader,
//   option: {
//     hmr: true,
//     reloadAll: true,
//   },
// },
