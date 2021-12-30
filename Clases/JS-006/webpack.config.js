const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  mode: "production",
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /.js$|jsx/,
        exclude: /node_modules/,
      },
    ],
  },
};
