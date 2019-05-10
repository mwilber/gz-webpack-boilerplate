const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssPlugin = require('extract-css-chunks-webpack-plugin');

const htmlMetadata = {
    domain: 'greenzeta.com',
    title: 'GreenZeta Webpack Boilerplate',
    author: 'Matthew Wilber',
    description: 'Webpack boilerplate using babel & sass.',
    themecolor: '#7bb951',
    twittername: 'greenzeta',
    facebookid: '631337813',
};

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');
const dirSass = path.join(__dirname, 'styles');

const appShell = path.join(__dirname, 'app-shell.css');

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: path.join(dirApp, 'main')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets,
            dirSass
        ],
        alias: {
			'app-shell': appShell,
		}
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            data: htmlMetadata
        }),
        new CssPlugin({
			filename: './app-shell.css'
		})
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // CSS / SASS
            {
                test: /\.(s)?css/,
                exclude: /app-shell\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [dirSass]
                        }
                    }
                ]
            },

            /* CSS bundling rule, using SASS */
			{
				test: /app-shell\.css$/,
				use: [
					{loader: CssPlugin.loader, options: {publicPath: ''}},
					'css-loader'
				]
			},

            // IMAGES
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};