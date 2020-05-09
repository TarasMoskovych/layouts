const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    index: 'index.html',
    port: 4200,
    open: true,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets',
            }
          }
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties']
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      minify: false,
      template: path.join(__dirname, 'src/index.html'),
      inject: 'body',
      hash: false
    }),
  ]
};
