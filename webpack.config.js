const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const development = process.env.NODE_ENV === 'development';

module.exports = {
    mode: development ? 'development': 'production',
    entry: path.join(__dirname, 'src/Three.ts'),
    output: {
        filename: development ? 'Three.js' : 'Three.min.js',
        path: path.join(__dirname, 'build'),
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.js', '.glsl']
    },

    devtool: development ? 'source-map' : false,

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'awesome-typescript-loader'
            }, {
                test: /\.glsl$/,
                exclude: [/node_modules/],
                loader: path.resolve(__dirname, 'glslLoader')
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new UglifyJsPlugin({
            sourceMap: development,
            uglifyOptions: {
                mangle: !development,
                beautify: development,
                compress: development ? false : {
                    warnings: false
                },
                output: {
                    comments: development
                }
            }
        })
    ],
    externals: {
    },
    target: 'web',
    stats: 'normal'
};