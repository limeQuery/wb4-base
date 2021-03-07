const { PassThrough } = require('stream')

exports.devMiddleware = function (compiler, opts = {}) {
    /* webpack-dev-middleware：监听compiler更新并动态编译文件 */
    const middleware = require('webpack-dev-middleware')(compiler, opts)
    return async (ctx, next) => {
        await middleware(ctx.req, {
            get: (header) => { },
            end: (content) => ctx.body = content,
            setHeader: (name, value) => ctx.set(name, value)
        }, next)
    }
}



exports.hotMiddleware = function (compiler, opts = {}) {
    /* webpack-hot-middleware：与客户端建立socket并推送每次compiler更新的文件 */
    const middleware = require('webpack-hot-middleware')(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await middleware(ctx.req, {
            write: stream.write.bind(stream),
            end: (content) => ctx.body = content,
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
}