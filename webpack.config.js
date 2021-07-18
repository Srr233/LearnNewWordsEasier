const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Study english',
      filename: 'index.html',
      template: './index.html',
    }),
    new CopyPlugin({
        patterns: [
          { from: "./src/assets", to: "assets/" },
          { from: "./style.css", to: "style.css" }
        ],
      }),
  ],
  devServer: {
    contentBase: './dist',
  },
  module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: ['file-loader']
          },
      ]
  }
};