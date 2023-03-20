# Webpack

* ### entry

  webpack.config.js

  ```js
  module.exports = {
      entry:{ //对象写法   可传两至多个js文件
          script1:'./src/script.js', 
          script2:{
              dependOn:'script1',
              import:'./src/script2.js'
          }
      },
      entry:'./src/script.js'  //字符串写法
  }
  /*
  dependOn: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。
  
  filename: 指定要输出的文件名称。
  
  import: 启动时需加载的模块。
  
  library: 指定 library 选项，为当前 entry 构建一个 library。
  
  runtime: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。
  
  publicPath: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。output.publicPath。
  */
  ```

* ### output

  webpack.config.js

  ```js
  module.exports = {
    output: {
      filename: 'bundle.js', //'[contenthash].bundle.js' contenthash 随机hash值
    },
    output: {
      filename: '[name].js', //name 原名称
      path: __dirname + '/dist', //指定导出路径
    },
  };
  ```

* ### mode

  ```js
  module.exports = {
      mode:'development',//打包方式  development/production
  }
  ```

* ### devtool

  ```js
  module.exports = {
      devtool: 'inline-source-map',
      //source-map 常见的七种
      //选择一种 source map 风格来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
      /*
      eval: 自动找到源文件 /# sourceURL=webpack:///./src/script2.js? //官方推荐
      source-map: 生成.map文件帮你定位错误位置  main文件对.map文件关联
      hidden-source-map: 生成.map文件帮你定位错误位置 无关联
      inline-source-map: 不生产.map文件 关联一个sourceMapingURL可定位源文件错误位置
      eval-source-map: 类似于eval生成一个DataUrl形式的sourcemap在eval后
      cheap-source-map: 类似于source-map不显示列数只显示行数
      cheap-module-source-map: 生成一个没有列信息的(column-mappings)的sourceMaps文件，同时loader的sourcemap也被简化为只包含对应行的
      */
  }
  ```

* ### devServer

  ```js
  module.exports = {
      devServer:{
          compress:true,//将配置压缩后放到浏览器上
          port: 3000, //将server后的端口号设为3000
          headers:{ //设置请求头信息 对象形式  只写一个
              'X-Custom-Foo': 'bar',
          },
          headers:[  //数组形式  可写多个
              {},
              {}
          ],
          headers: () => { //函数写法
             return { 'X-Bar': ['key1=value1', 'key2=value2'] };
          },
          proxy:{
              '/api':'http://memoryx.xyz',
              //默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。如果需要，可以这样修改配置：
              '/api':{
                  target: 'url',
                  secure: false
              }
          },
          proxy: [
              {
                  context:['/auth','/api'],//多对一
                  target: 'url'
              }
          ]，
          http2: true, //可以通过https访问
          host:'0.0.0.0', //在同一局域网时可通过ip:端口号访问
          hot:true, //热更新页面
          
      }
  }
  ```

* ### 路径别名

  ```js
  module.exports = {
      resolve:{
          alias:{
              '@',path.resolve(__dianame,'./src')
          }
      }
  }
  ```

* ### loader

  ##### 安装loader

  ```unkown
  npm install --save-dev css-loader ts-loader
  ```

  ##### 加载

  webpack.config.js

  ```js
  module.exports = {
    module: {
      rules: [
        { test: /\.css$/, use: 'css-loader' }, // /\.css$/ 正则表达式 匹配以css结尾的文件
        { test: /\.ts$/, use: 'ts-loader' }, // /\.ts$/ 匹配以ts结尾的文件 
      ],
      rules: [
        {
          test: /\.css$/,
          use: [
            // [style-loader](/loaders/style-loader)
            { loader: 'style-loader' },
            // [css-loader](/loaders/css-loader)
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            // [sass-loader](/loaders/sass-loader)
            { loader: 'sass-loader' }
          ]
        },
      ]
    },
   //npm i @babel/core @babel/preset-env babel-loader core-js ts-loader
    module: {
          rules: [
              {
                  //正则表达式
                  test: /\.ts$/,
                  //要使用的loader
                  use: [
                      {
                          // 指定加载器
                          loader: 'babel-loader',
                          //设置babel
                          options: {
                              presets: [
                                  [
                                      '@babel/preset-env',
                                      {
                                          //要兼容的目标浏览器
                                          targets: {
                                              "chrome": "88",
                                          },
                                          // 指定corejs的版本
                                          "corejs": "3",
                                          // 使用corejs的方式”usage“ 表示按需加载
                                          "useBuiltIns": "usage"
                                      }
                                  ]
                              ]
                          }
                      },
                      'ts-loader',
                  ]
              }
          ]
      }
  };
  
  ```

  

* ### Module配置项(important)

  webpack.config.js

  ```js
  //parser
  module.exports = {
      module:{
          parser:{
              javascript: {
                  requireEnsure: true, //启用解析 require.ensure 语法的功能
                  commonjsMagicComments: true, //为 CommonJS 启用 魔法注释。
                  dynamicImportMode: 'lazy', //指定动态导入的全局模式
                  //'eager' | 'weak' | 'lazy' | 'lazy-once' 👆
                  dynamicImportPrefetch: false, //指定动态导入的全局 prefetch。
                  //number | boolean 👆 👇
                  dynamicImportPreload: false, //指定动态导入的全局 preload。
                  exportsPresence: 'error', //指出在 \"import ... from ...\" 与 \"export ... from ...\" 中无效导出名称的行为。
                  importExportsPresence: 'error',//指出在 \"import ... from ...\" 中无效导出名称的行为.
                  importMeta:true, //true / false 开始或关闭求值import.meta.
                  importMetaContext: true, //启用/禁用 import.meta.webpackContext 分析。
                  reexportExportsPresence: 'error', //指出在 \"export ... from ...\" 中无效导出名称的行为。当在 TypeScript 重新导出类型，从 \"export ... from ...\" 迁移到 \"export type ... from ...\" 时禁用该配置项是有用的。
                  url: false, //启用 new URL() 语法解析。
                  
              }
          },
          noParse: '/jquery|lodash/',//防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
          noParse:{
              noParse: (content) => /jquery|lodash/.test(content),
          },
          unsafeCache: false,
      }
  }
  ```

  