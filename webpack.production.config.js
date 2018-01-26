const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: __dirname + '/app/main.js', //唯一入口文件
    output: {
        path: __dirname + '/build',
        filename: 'bundle-[hash].js'
    },
    devtool: 'null', //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: './public', //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转 SPA默认跳转index.html
        inline: true, //实时刷新,
        hot: true
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node__modules/
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true, //指定使用css modules
                    localIdentName: '[name]__[local]--[hash:base64:5]' //指定css的类名格式
                }
            }, {
                loader: 'postcss-loader'
            }]
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有,翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(), //压缩js代码
        new ExtractTextPlugin("Greeter.css"), //分离js和css
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
}