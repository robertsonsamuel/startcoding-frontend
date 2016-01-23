var webpack = require("webpack");

module.exports = {
  entry:"./js/app.js",
  output:{
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
<<<<<<< HEAD
    new webpack.optimize.UglifyJsPlugin({minimize: true})
=======
     new webpack.optimize.UglifyJsPlugin({minimize: true})
>>>>>>> master
  ],
  module:{
    loaders:[
      // JS and JSX
      { test: /\.jsx?$/,
        exclude: [/node_modules/,/bower_components/],
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015']}
      }
    ]
  }
};
