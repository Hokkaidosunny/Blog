const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin= require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'dev';
const isPro = !isDev;

function getPlugins() {
  const plugins = [];
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  );

  if (isPro) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,  //no warnings
          drop_console: true  //no console
        }
      })
    );
  }
  return plugins;
}


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build/'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: 'url-loader?limit=50000'
      }
    ]
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
  plugins: getPlugins(),
};
