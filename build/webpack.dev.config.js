const webpack = require("webpack");
const path = require("path");
const baseConfig = require("./webpack.base.config.js");

module.exports = Object.assign({}, baseConfig, {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: path.resolve(__dirname, "../src/index.js")
  },
  plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()]
});
