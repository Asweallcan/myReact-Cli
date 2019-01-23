const webpack = require("webpack");
const path = require("path");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = Object.assign({}, baseConfig, {
  mode: "production",
  devtool: false,
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
    rxjs: ["rxjs", "redux-observable"],
    redux: ["redux", "react-redux", "redux-logger"],
    react: ["react", "react-dom", "react-router-dom"],
    i18n: ["i18next", "react-i18next", "i18next-xhr-backend", "i18next-browser-languagedetector"]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../"),
      dry: false,
      beforeEmit: true
    }),
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
