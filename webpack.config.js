const path = require('path');
let _outPath = "electron"
module.exports = {
  target: 'electron-main', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, _outPath)
  }
};