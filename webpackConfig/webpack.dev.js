const webpack = require('webpack')
const utils = require('./utils')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebPackPlugin = require('html-webpack-plugin');

if (process.env.NODE_ENV === 'development') {
    const hotModuleEntry = 'webpack-hot-middleware/client.js'
    if (typeof common.entry === 'string') {
        common.entry = [common.entry, hotModuleEntry]
    } else if (Array.isArray(common.entry)) {
        common.entry.push(hotModuleEntry)
    } else if (typeof common.entry === 'object') {
        Object.keys(common.entry).forEach(name => common.entry[name] = [hotModuleEntry].concat(common.entry[name]))
    }
}
module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: utils.resolve(__dirname, 'src'),
        publicPath: '/',// 访问资源加前缀
        host: '127.0.0.1',
        port: 3000,
        hot: true,
        compress: true,
        open: false,
        stats: { colors: true }, // dev控制台输出彩色
        proxy: {}, // 接口请求代理
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: utils.resolve('../public/index.html'),
            filename: 'index.html',
            inject: true,    // true：默认值，script标签于html文件的 body 底部注入
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
})