/**
 * Created by zhaoyue on 16/2/29.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');

var path = require('path')
// var conf = require('./config/conf-dev');
var productionPath = require('./package.json').name;

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

// var activityId = conf.activityIdRaw;
// var pageId = conf.pageId;

var webpackConfigProduction = {
  entry: {
    index: './src/js/index.jsx'
  },
  output: {
    path: __dirname + '/dist/' + productionPath,
    filename: 'js/[name].bundle.[chunkhash].js',
    // publicPath: '//storage.360buyimg.com/' + appName + '/' + activityId + '/' + pageId + '/production/dev/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        // outputPath=img/使得js中的图片文件名前会加上"img/", html文件与img目录同级
        // 0.11.1 publicPath存在bug
        // https://github.com/webpack-contrib/file-loader/issues/140
        loader: 'url?limit=1000&name=[name].[ext]&outputPath=img/'
      },
      {
        test: /\.(scss|css)/,
        loader: ExtractPlugin.extract('style', ['css!sass'], {
          publicPath: '../'    //替换css文件中图片的路劲,但 url-loader优先级更高
        })
      },
			{
				test: /\.json/,
        loader: 'json'
			}
    ],
    // noParse: [
    //   /\/react\//g
    // ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      mping: 'lib/mping',
			Promise: 'promise-polyfill'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',   //html输出的文件名和相对路径  相对path 仅在server端是的
      template: 'src/index.tpl.html',
      inject: 'body'
    }),
    new ExtractPlugin('css/[name].bundle.[chunkhash].css')
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.min.js', '.jsx'],
    // alias: {
    //   'react': path.join(nodeModulesPath, '/react/dist/react.min'),
    //   'react-dom': path.join(nodeModulesPath, '/react-dom/dist/react-dom.min')
    // }
  },
  devtool: 'source-map'
}

module.exports = webpackConfigProduction;
