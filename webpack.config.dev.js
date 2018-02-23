var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');

var path = require('path');

module.exports = {

  entry: {
    index: './src/js/index.jsx'
  },

  output: {
    path: __dirname + '/src/',
    filename: 'js/[name].bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(scss|css)/,
        loader: ExtractPlugin.extract('style',['css!sass'], {
          //替换css文件中的图片路劲,但 url-loader优先级更高，与输出图片文件的位置无关
          //css中涉及到的图片output到本地目录的路径由url-loader的name或output决定
          publicPath: '../'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=1000&name=./img/[name].[ext]'
      },
			{
				test: /\.json/,
        loader: 'json'
			}
    ]
  },

  plugins: [
		new webpack.DefinePlugin({
      'process.env': {
				'STATIC_ENV':  JSON.stringify(false)
      }
    }),
    new webpack.ProvidePlugin({
      mping: 'lib/mping',
			Promise: 'promise-polyfill'
    }),
    new HtmlWebpackPlugin({
      filename: './index.html', //相对publicPath
      template: './src/index.tpl.html',  //相对config
      inject: 'body',
      hash: true
    }),
    new ExtractPlugin('css/[name].bundle.css')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map'
}
