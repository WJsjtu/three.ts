const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const development = process.env.NODE_ENV === 'development';

const esConfig = {
    mode: development ? 'development': 'production',
    entry: path.resolve(__dirname, 'es/Three'),
    output: {
        filename: development ? 'three.js' : 'three.min.js',
        path: path.resolve(__dirname, 'build', process.env.BUILD_SOURCE == 'ts' ? 'ts' : 'es'),
        libraryTarget: 'window',
        library: 'THREE'
    },

    resolve: {
        extensions: ['.js', '.glsl']
    },

    devtool: development ? 'source-map' : false,

    module: {
        rules: [
            {
                test: /\.glsl$/,
                exclude: [/node_modules/],
                loader: path.resolve(__dirname, 'glslLoader')
            }, {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
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

if(process.env.ts) {
    esConfig.extensions.unshift('.ts');
    esConfig.rules.module.rules.unshift({
        test: /\.ts$/,
        exclude: [
            /node_modules/
        ],
        loader: 'awesome-typescript-loader'
    });
    esConfig.plugins.unshift(new CheckerPlugin());
}

module.exports = esConfig;