const path = require('path');
const webpack = require('webpack')
let _outPath = "electron"
module.exports = {
  target: 'electron-main', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, _outPath)
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.RUN_ENV':`"${process.env.RUN_ENV}"`,
    }),
  ]
};