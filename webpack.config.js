const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
let _outPath = "electron"
module.exports = {
  target: 'electron-main', 
  entry: {
    main:'./src/main.js',
    proxy:'./src/view/proxy.js'
  },
  output: {
    path: path.resolve(__dirname, _outPath)
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.RUN_ENV':`"${process.env.RUN_ENV}"`,
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "view", "proxy.html"),
        filename: "view/proxy.html",
        chunks: ["proxy"]
    }),
  ]
};