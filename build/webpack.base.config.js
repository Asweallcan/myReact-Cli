const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const FirendlyErrorePlugin = require("friendly-errors-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/index.js")
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].bundle.js"
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
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "../src")],
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  require("ts-import-plugin")({
                    libraryName: "antd",
                    libraryDirectory: "es",
                    style: "css"
                  })
                ]
              })
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
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
    new CleanWebpackPlugin(),
    new FirendlyErrorePlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      tsconfig: path.resolve(__dirname, "../tsconfig.json")
    }),
    new StylelintWebpackPlugin({
      context: "src",
      files: "**/*.scss",
      failOnError: false,
      quiet: true,
      fix: true
    }),
    new ExtractTextWebpackPlugin({
      filename: "css/[name].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      filename: "index.html"
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".tsx", ".ts"]
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendor: {
          name: "chunk-vendor",
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
          test: /[/\\]node_modules[/\\]/
        }
      }
    }
  }
};
