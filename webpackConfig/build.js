const webpack = require("webpack")
const ora = require("ora");
const { warn} = require("./utils")
const prodConfig = require("./webpack.prod.js")


// 启动动画
const spinner = ora('\n打包中....\n')
spinner.start()


// 开始构建
webpack(prodConfig, (err, stats) => {
    // 停止动画
    spinner.stop()
    // 打包出错，抛出异常信息
    if (err) throw err
    // 控制台输出打包成功信息
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
    // 分割线
    warn(('------------------------------------------------------------------------------------------------'))
    process.exit(); // 终止终端进程
})