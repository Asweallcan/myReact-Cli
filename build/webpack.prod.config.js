const webpack = require("webpack");
const path = require("path");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");

module.exports = Object.assign({}, baseConfig, {
  mode: "production",
  devtool: false,
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        parallel: 4,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ],
    splitChunks: {
      chunks: "all"
    }
  }
});
