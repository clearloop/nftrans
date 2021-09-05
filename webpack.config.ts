/**
 * webpack config
 */

import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { Configuration as WebpackConfiguration } from "webpack";

import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  entry: {
    background: "./src/background/index.ts",
    popup: "./src/popup/index.ts",
  },
  output: {
    filename: "bundle.[name].js",
    path: path.resolve(__dirname, "extension"),
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: ["manifest.json"],
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.[name].css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@nftrans": path.resolve(__dirname, "src/"),
      "@design": path.resolve(__dirname, "design/"),
    },
  },
};

export default config;
