const utils = require('./utils')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // bundle分析
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')   // js代码压缩


module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        new UglifyJsPlugin(),   // js代码压缩
        new HtmlWebPackPlugin({
            template: utils.resolve('../public/index.html'),
            filename: 'index.html',
            inject: true,    // true：默认值，script标签于html文件的 body 底部注入
            hash: true, // 打包的资源插入html会加上hash
            minify: {
                removeComments: true,               //去注释
                collapseWhitespace: true,           //压缩空格
                removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
            }
        })
    ]
})