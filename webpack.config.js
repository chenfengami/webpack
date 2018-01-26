const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/app/main.js', //唯一入口文件
    output: {
        path: __dirname + '/public', //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    devtool: 'eval-source-map',

    devServer: {
        contentBase: './build', //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转 单页面 默认跳转index.html
        inline: true, //实时刷新，
        hot: true
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/, //一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                use: {
                    loader: 'babel-loader' //loader的名称（必须）
                },
                exclude: /node_modules/ //手动屏蔽不需要处理的文件(文件夹)(可选)
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, //指定使用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' //指定css的类名格式
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    //插件
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html' //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin() //热加载插件
    ]

}