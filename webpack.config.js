const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "public", "src/entry.js"),
  output: {
    path: path.join(__dirname, "public/dist"),
    filename: "main.js",
    publicPath: "/dist/"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["env"] }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "postcss-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader", "postcss-loader"],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("[name].css"), require("autoprefixer")]
}