const webpack = require("webpack");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(baseConfig, {
  mode: "production",
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new BundleAnalyzerPlugin()
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
    ]
  }
});
