const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postCSS = require('../../../postcss.config');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const autoprefixer = require('autoprefixer');

const webpackConfig = {
    entry: {
        bundle: ['babel-polyfill', 'url-search-params-polyfill', `${__dirname}/../../app/bootstrap.tsx`]
    },
    output: {
        path: path.resolve(__dirname, './../../../dist'),
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            app: path.resolve(__dirname, './../../app'),
            common: path.resolve(__dirname, './../../common'),
            assets: path.resolve(__dirname, './../../assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('tslint-loader'),
                enforce: 'pre',
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
                }
            },
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(__dirname, './../../app'),
                    path.resolve(__dirname, './../../common'),
                    path.resolve(__dirname, './../../storage')
                ],
                loader: require.resolve('awesome-typescript-loader')
            },

            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            // {
            //     test: /\.svg$/,
            //     use: [
            //         {
            //             loader: 'svg-sprite-loader'
            //         },
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 regExp: /^.*utsettelse-background.*\.svg$/i,
            //                 outputPath: 'assets/',
            //                 name: '[name].[ext]',
            //                 publicPath: '/dist/assets'
            //             }
            //         },
            //     ]
            // },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader'
            }
        ]
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css?[hash]-[chunkhash]-[name]',
            disable: false,
            allChunks: true
        }),
        new SpriteLoaderPlugin()
    ]
};

module.exports = webpackConfig;
