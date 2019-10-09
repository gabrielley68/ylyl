var path = require("path");
var webpack = require("webpack");
var BundleTracker = require('webpack-bundle-tracker');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,

    entry: './YLYL/game/jsx/index',

    output: {
        path: path.resolve('./YLYL/static/js/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './YLYL/webpack-stats.json'}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }

};