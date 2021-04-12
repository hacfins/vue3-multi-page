# vue3-multi-page

## 简介

vue3-multi-page可用于webpack单页面及多页面的开发，它基于 [vue](https://github.com/vuejs/vue) 、 [Element+](https://github.com/element-plus/element-plus) 实现。它使用了最新的前端技术栈，相信不管你的需求是什么，本项目都能帮助到你。

## 安装

``` bash
# install dependencies
npm install
node-sass 和sass-loader 可能安装不成功，需单独安装，image-webpack-loader 使用npm不易安装，请使用cnpm install image-webpack-loader --save-dev

# serve with hot reload at localhost:3000
npm run serve

# build for production with minification
npm run build
```

## 技术构成

- Web框架：Vue3 

- UI框架：Element+

- 构建工具：webpack4+gulp

> 本产品采用 Vue3 框架，主要使用了里面的 vue-route@4、vue-cookies、axios、pug页面继承、vuex@4等技术。

## 目录结构

```
.
├── build                                       
│   ├── utils.js                             // webpack配置共用的方法
├── dist                                        // 线上文件夹
├── public                                      // 静态目录
│   ├── assets                               // 第三方静态文件，主要放置不变的东西例如（Vue、Axios）
│   │   ├── axios-0.21.1                  // 每一个第三方文件名增加版本号
│   ├── font                                 // 放置字体文件,主要使用了iconfont
│   ├── lib                                  // 放置自己封装的lib文件
│   ├── cloud-config.js                      // api url 地址配置文件
├── src                                         // 开发目录
│   ├── api                                  // api文件夹
│   │   ├── getdata.js                    // api接口js文件
│   ├── assets                               // 放置图片
│   ├── common                             
│   │   ├── base.pug                      // 多页面共用的pug文件
│   ├── commponents                          //页面内部自定义组件
│   ├── config                          
│   │   ├── ajax.js                       // Ajax请求js文件
│   │   ├── config.js                     // 引入公共的配置文件
│   │   ├── env.js                        // 环境配置文件
│   │   ├── utils.js                      // 公共的js文件
│   ├── pages                                //页面文件夹
│   │   ├── index                         // 首页
│   │   │   ├── children               // 页面子组件目录
│   │   │   ├── app.vue                // 页面入口Vue
│   │   │   ├── index.js               // 页面入口js
│   │   │   ├── index.pug              // 页面入口pug
│   ├── router                               // 路由文件夹
│   │   └── index.js                      // 路由配置文件
│   └── script                               // 放置共用的JS文件
│   └── store                                // vuex目录文件
│   └── style                                // Css文件
│   │   └── common                        // 共用的Css目录
│   │   └── index.scss                    // Css文件

.
```

## 编码命名规范

1. 英文命名，不可使用汉语拼音

2. 所有的文件夹名，采用 **小写**

3. 所有的文件名，采用 **小写**

4. URL请求地址 一律 **小写**

5. 所有的文件位置按照上面目录结构进行进行放置，不可乱放

6. 禁止使用Jquery及Jquery依赖的插件

> **如果文件名及文件夹名称由多个字母构成使用中划线的方式，例如：header-top！**
> **如果有修改，需要在该文件中详细说明！**

## webpack打包说明

#### 1. js打包：

（1）将配置文件打包到js/config.js

（2）api、config、script中的文件打包到js/env.js

（3）将入口产生的runtime单独打包到js/runtime.js(为了更改某个文件缓存失效的问题)

（4）将入口文件中router、store的配置打包到entry.js

（5）将所有chunks只要共用大于等于2就将其打包到common.js

（6）将nodemodule中的第三方插件打包到vendor.js

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

copyright © 2021 北京华科飞扬科技股份公司
