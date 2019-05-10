const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackConfig = require('./webpack.config.common');

const dirAssets = path.join(__dirname, 'assets');

module.exports = merge(webpackConfig, {

    mode: 'production',

    devtool: '',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
			{ 
				from: dirAssets,
				to: path.resolve(__dirname, 'dist', 'assets'),
			}
		]),
    ]

});
