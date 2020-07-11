// @ts-check

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const env = process.env.NODE_ENV === "development" ? "development" : "production";

/** @type { import('webpack').Configuration } */
const config = {
    entry: path.resolve("./src/index.tsx"),
    mode: env,
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve("./build"),
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Calendar App",
            template: "!!handlebars-loader!src/index.handlebars",
        }),
    ],
    devtool: "source-map",
    performance: {
        hints: process.env.NODE_ENV === "production" ? "warning" : false,
    },
};

module.exports = config;
