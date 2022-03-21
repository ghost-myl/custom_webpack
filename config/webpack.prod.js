/**
 * tree shaking   去除无用代码
 * 前提：1、必须使用ES6代码
 *      2、开启production环境会自动开启tree shaking
 * 作用：减少代码体积
 *
 * 在package.json中配置
 *  sideEffects:false  所有代码都没有副作用    (都可以进行tree  shaking)
 *   问题：可能会把css/@babel/polyfile (副作用)文件干掉
 *   解决："sideEffects":["*.css"]
 * */
const WorkboxPlugin = require('workbox-webpack-plugin'); // 引入 PWA 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css文件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js打包文件 优化build速度、优化start速度

module.exports = merge(common, {
  // 启动环境
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      chunkFilename: '[id].css',
    }),
    new CssMinimizerPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
});
