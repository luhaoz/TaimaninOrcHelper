import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import os from "os"


const _src = path.join(__dirname,  "src");


const config: webpack.Configuration = {
  mode: 'production',
  target: 'electron-main',
  entry: {
    "main": path.join(_src, "main.ts")
  },

  output: {
    path: path.join(__dirname,  "electron")
  },
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options:{
              happyPackMode:true,
            }
          },
        ],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    alias: {
      '@': _src
    },
    extensions: ['.tsx', '.ts', '.js', '.json', '.css', '.scss'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':`"${process.env.NODE_ENV}"`,
      'process.env.DEV_MODE':`"${process.env.DEV_MODE}"`,
      'process.env.NODE_TLS_REJECT_UNAUTHORIZED':`0`
    }),
    new ForkTsCheckerWebpackPlugin(),
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: path.join(__dirname, "..", "src", "static"),
//           to: "static"
//         },
//       ]
//     })
//   //   new HtmlWebpackPlugin({
//   //     template: path.join(__dirname, "src", "move_file.html"),
//   //     filename: "move_file.html",
//   //     chunks: ["movefile"]
//   // }),
  ]

};

export default config;