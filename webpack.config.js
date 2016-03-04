var webpack = require("webpack");
var css = require("css-loader");
var classNames = require('classnames');

module.exports = {
  entry:"./js/app.jsx",
  output:{
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module:{
    loaders:[{
      test: /\.jsx?$/,
      exclude: [/node_modules/, /bower_components/],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};
