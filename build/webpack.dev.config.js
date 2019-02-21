const webpack = require("webpack");
const path = require("path");
const baseConfig = require("./webpack.base.config.js");

module.exports = Object.assign({}, baseConfig, {
  mode: "development",
  devtool: "source-map",
  plugins: [...baseConfig.plugins, new webpack.HotModuleReplacementPlugin()],
  devServer: {
    host: "localhost",
    port: 8088,
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: "/",
    open: true,
    contentBase: path.resolve(__dirname, "../dist"),
    compress: true,
    progress: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:8888",
        changeOrigin: true
      }
    }
  }
});
