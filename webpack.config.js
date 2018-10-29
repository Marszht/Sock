const path = require('path');  //命令行运行  node 里面的 path 模块
const webpack = require('webpack')   //访问内置插件                            //用于访问内置插件
const HtmlWebpackPlugin = require ('html-webpack-plugin')         //yarn 安装
const ExtractTextPlugin =  require('extract-text-webpack-plugin')  

const CopyWebpackPlugin = require('copy-webpack-plugin');
 //抽离打包css 文本
console.log(path.resolve(__dirname, 'dist'));       //会把dist变成路径 会解析
//  \dist目录
// 模块化导入使用CommonJS 
module.exports = {
    // entry 指示webpack 应使用那个模块作为内部依赖图的开始
    entry: './src/index.js',
    // output 属性告诉 webpack 在哪里输出它所创建的 bundles，
    // 以及如何命名这些文件，默认值为 ./dist。
    output: {
        //   path内置模块 能找到路径  解析路径
        path: path.resolve(__dirname, 'dist'),
        // 
        filename: '[name].js'
    },
    // 模块验证
    module: {
        rules: [
            {
                // \.对点进行转义
                test:/\.js$/,                           //检测所有js 文件
                include: [                             //只检测src目录下的js的src
                     path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'            //首先要安装这些loader  yarn add bable-loader 
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            },
            {
                test: /\.less$/,             //\.对. 进行匹配 $结束匹配
                use: ExtractTextPlugin.extract({
                   use: [
                    'css-loader',
                    'less-loader'
                ]
            })
            },
            {
                test: /\.(png|jpj|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    // 设置模块如何被解析
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils')
        },
        // 自动解析确定的扩展
        extensions: ['.js', '.css', '.less', '.json']
    },
    // 插件plugin 可以用来优化打包和压缩 还有各种各样的业务
    //  首先需要 require()插件 再添加到plugis数组 new 来创建实例
    plugins: [
        // new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            file: 'index.html',                   //一般都这个
            template: 'src/index.html'
        }),
        // new CopyWebpackPlugin([
        //     { from: 'src/assets/favicon.ico',
        // to: 'favicon.ico'}
        // ]),
        new webpack.ProvidePlugin({
              '_': 'lodash'
        })
    ],
    // 用于启动 wenpack 在520 端口
    devServer: {
        port: '1314',
        before(app) {
            app.get('/api/test.json',(req, res) => {
                res.json({
                    code: 200,
                    message: 'Hello world'
                })
            })
        }
    }
}
