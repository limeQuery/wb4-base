const path = require('path')
const Koa = require('koa')
const webpack = require('webpack')
const proxy = require('koa-proxy')
const serve = require('koa-static')
const { info, success, error } = require('./utils')
const { devMiddleware, hotMiddleware } = require('./middleware.js')
const devConfig = require('./webpack.dev.js')

const port = 3333
const app = new Koa()

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(devConfig)
    // compiler.run((err, stats) => {
    //     err && error(err)
    //     info(stats.toString({
    //         chunks: false,  // 使构建过程更静默无输出
    //         colors: true    // 在控制台展示颜色
    //     }))
    //     info('          >>             ')
    // })

    app.use(devMiddleware(compiler));

    app.use(hotMiddleware(compiler));

    app.use(proxy({ host: 'http://10.79.1.176:80', match: /^\/extraClient\// }))

    app.use(serve(__dirname + "../public", { extensions: ['html'] }));


}

app.listen(port, () => success(`Server is running at http://localhost:${port}`))



