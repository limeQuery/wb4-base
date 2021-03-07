const utils = require('./utils')
const webpack = require('webpack')


module.exports = {
    entry: {
        react: ['react'],
        reactDom: ['react-dom']
    },
    output: {
        filename: '[name].js',
        path: utils.resolve('../dll'),
        library: '[name]_[hash]'
    },
    plugins: [
        // 生成一个映射打包文件的manifest.json文件
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: utils.resolve('../dll/manifest.json')
        })
    ]
}