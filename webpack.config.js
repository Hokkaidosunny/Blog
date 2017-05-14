const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'dev';

//entry
function getEntry() {
  return {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ],
    index: './src/index.js'
  };
}

//plugins
const plugins = [
  new LodashModuleReplacementPlugin(),
  //html-plugin
  new HtmlWebpackPlugin({
    title: 'index',
    filename: 'index.html',
    template: 'src/index.html',
    inject: true
  }),
  //DefinePlugin
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  //common chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest'],
    minChunks: Infinity
  }),
  new ChunkManifestPlugin({
    filename: 'manifest.json',
    manifestVariable: 'webpackManifest',
    inlineManifest: true
  }),
  new ExtractTextPlugin('style.[contenthash].css')
];

//开发环境插件
function getDevPlugins() {
  return plugins;
}

//生产环境插件
function getProPlugins() {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,  //no warnings
        drop_console: true  //no console
      }
    })
  );
  return plugins;
}


module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
    chunkFilename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
    sourceMapFilename: '[file].map'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: "css-loader" }, {
              loader: "sass-loader",
              options: {
                includePaths: [
                  path.join(__dirname, "node_modules/bulma")
                ]
              }
            }
          ]
        })
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)$/,
        loader: 'url-loader?limit=50000'
      }, {
        test: /\.md/,
        loader: 'raw-loader'
      }
    ]
  },
  devtool: isDev ? 'inline-source-map' : 'source-map',
  plugins: isDev ? getDevPlugins() : getProPlugins()
};
