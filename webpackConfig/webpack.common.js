const utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const __isDev__ = process.env.NODE_ENV === 'development'
const outputDir = utils.resolve('../dist')
const browsers = ['last 2 versions', '>1%', 'maintained node versions', 'not dead', 'not ie < 9'] // 浏览器环境


/* 
    hash: webpack打包后生产的哈希值
    chunkhash: 来自同一个chunk的文件使用同一个哈希值
    contenthash： 不同文件内容使用不同的哈希值
*/

module.exports = {
    entry: {
        main :'./src/main.js'
    },
    output: {
        path: outputDir,
        filename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': utils.resolve('../src') // 在项目中使用@符号代替src路径
        },
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],  //  解析扩展。导入文件找不到该文件时，会尝试加入这些后缀继续寻找文件
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(css|less)$/,
                        exclude: /node_modules/,
                        use: [
                            __isDev__ ? 'style-loader' : MiniCssExtractPlugin.loader,   // 开发环境下style-loader支持hmr
                            {
                                loader: 'css-loader',
                                options: { modules: { localIdentName: '[name]__[hash:8]' }, importLoaders: 0, }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    postcssOptions: {
                                        plugins: [
                                            ['postcss-preset-env', { browsers }],
                                            ['postcss-normalize', { browsers }],
                                            'cssnano'
                                        ],
                                    },
                                },
                            },
                            'less-loader'
                        ],
                    },
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { 'modules': false, 'targets': { browsers } }],
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    [
                                        // es6语法新特性        配置：corejs2 腻子脚本polyfill  usage 按需引入新特性
                                        '@babel/plugin-transform-runtime',
                                        { 'corejs': 2, 'useBuildIns': 'usage' }
                                    ]
                                ],
                                cacheDirectory: true // 第二次构建时会沿用第一次构建的缓存
                            }
                        }
                    },
                    {
                        test: /\.(bmp|png|jpe?g|gif|m4a)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8 * 1024,     //小于等于limit值，则会以base64形式加载且体积变大，不会发请求，大于这个值则用file-loader加载
                                    name: 'img/[name]-[hash:8].[ext]'
                                }
                            }
                        ]
                    },
                    {
                        // 字体图标
                        test: /\.(woff|woff2|svg|eot|ttf)$/,
                        exclude: /node_modules/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                limit: 8 * 1024,
                                name: 'fonts/[name].[ext]?[hash:8]',
                                publicPath: ''
                            },
                        }],
                    },
                    {
                        test: /\.(html)$/,
                        use: {
                            loader: 'html-loader'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:10].css',
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
            __isDev__,
        }),
        // 忽略打包manifest里配置的文件
        new webpack.DllReferencePlugin({
            manifest: utils.resolve('../dll/manifest.json')
        }),
        // html自动引入资源
        new addAssetHtmlWebpackPlugin([
            { filepath: utils.resolve('../dll/react.js') },
            { filepath: utils.resolve('../dll/reactDom.js') }
        ])

    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};