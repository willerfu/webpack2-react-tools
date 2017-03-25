const { resolve } = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //devtool: 'cheap-eval-source-map',
  entry: [
    // 开启react代码的模块热替换（HMR）
    'react-hot-loader/patch',
    // 为webpack-dev-server的环境打包好运行代码
    // 然后连接到指定服务器域名与端口
    'webpack-dev-server/client?http://localhost:8080',
    // 为热替换（HMR）打包好运行代码
    // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
    'webpack/hot/only-dev-server',
    // 我们app的入口文件
    './index.js'
  ],
  output: {
    // 输出的打包文件
    filename: 'bundle.[hash].js',
    // 输出文件路劲
    path: resolve(__dirname, 'dist'),
    // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
    publicPath: '/'
  },
  context: resolve(__dirname, 'src'),
  devServer: {
    // 开启服务器的模块热替换（HMR）
    hot: true,
    // 开启服务器输出文件的路径
    contentBase: resolve(__dirname, 'src'),
    // 和上文output的"publicPath"值保持一致
    publicPath: '/'
  },

  // loader 配置
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      },
      // {
      //  // css文件打包
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       'style-loader',
      //       'css-loader?importLoaders=1',
      //       'postcss-loader'
      //     ]
      //   })
      // },
      {
        test: /\.(sass|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          'postcss-loader',
          "sass-loader"
        ]
      },
      // {
      //  // scss文件打包
      //   test: /\.(sass|scss)$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       'css-loader?importLoaders=1',
      //       'postcss-loader',
      //       {
      //         loader: "sass-loader",
      //         options: {
      //           sourceMap:true,
      //           //compact({}行), compressed(压缩一行)
      //           outputStyle : 'compressed'
      //        }
      //      }
      //    ]
      //  })
      // },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.(mp4|webm)$/,
        use:['url-loader?limit=10000']
      }
    ],
  },

  // plugins 插件配置
  plugins: [
    // 开启全局的模块热替换（HMR）
    new webpack.HotModuleReplacementPlugin(),
    // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),

    // dist目录下生成html模板文件
    new HtmlWebpackPlugin({
     template: './index.html',
    }),

    // css 单独打包 注意：独立打包出来的css文件，如果修改不会实时反应在浏览器
    // 建议开发环境时 由于需要调试样式，不要分离打包css文件，生产时再打包
    // new ExtractTextPlugin({
    //   filename : 'style.[hash].css' //设置css名称;
    // }),

    // 压缩js
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: { warnings: false }
    // }),

    // autoprefixer 生成浏览器前缀
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function(){
          return [ require("autoprefixer")({ browsers: ['last 2 versions'] }) ]
        }
      }
    })
  ],
};
