const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const env = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode: env,
  devtool: false,
  entry: {
    index: path.resolve(__dirname, "src/index.js")
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    chunkFilename: "js/[name].bundle.js"
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".tsx", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: [":data-src"]
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["awesome-typescript-loader", "tslint-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-modules-typescript-loader",
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              filename: "images/[name].[hash].[ext]",
              publicPath: "/"
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              filename: "fonts/[name].[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      hash: true,
      minify: {
        caseSensitive: false,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.WatchIgnorePlugin([/css.d.ts$/]),
    new ExtractTextWebpackPlugin({
      filename: "css/[name].[hash].css",
      allChunks: true
    }),
    new StylelintWebpackPlugin({
      context: "src",
      configFile: path.resolve(__dirname, "./stylelint.config.js"),
      files: "**/*.scss",
      failOnError: false,
      quiet: true,
      fix: true
    }),
    new webpack.DefinePlugin({
      // 把引入的React切换到产品版本
      "process.env.NODE_ENV": '"production"'
    })
    /*
    清理dist文件
      new CleanWebpackPlugin(["dist/js", "dist/index.html"], {
      root: path.resolve(__dirname),
      dry: false
    })
     */
  ],
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ],
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    host: "localhost",
    port: 8088,
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: "/",
    open: true,
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    progress: true,
    proxy: {
      "/api/*": {
        target: "http://localhost:8888",
        changeOrigin: true
      }
    }
  }
};
