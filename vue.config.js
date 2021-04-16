"use strict"
const path     = require("path");
const utils    = require("./build/utils.js");
let pages      = utils.getEntrys();
let is_product = utils.is_product;

function resolve(dir) {
    return path.join(__dirname, dir)
};

module.exports = {
    publicPath         : is_product ? '/web/' : '/',
    outputDir          : is_product ? resolve('/dist/web/') : 'dist',
    // 多页面multi-page模式下构建应用，每个page应该有一个对应的 JavaScript 入口文件。
    // 这里使用了动态配置pages的方法，减少重复代码的书写，统一配置。
    pages,
    //生产环境JS文件中移除sourceMap
    productionSourceMap: false,
    configureWebpack   : config => {
        if (is_product) {
            //生产环境移除console语句
            config.optimization.minimizer[0].options.terserOptions.compress.warnings      = false;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console  = true;
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs    = ['console.log'];
        }
    },
    chainWebpack       : config => {
        //【1】设置别名
        config.resolve.alias.set('@', resolve('src')).set('common', resolve('src/common')).set('components', resolve('src/components')).set('assets', resolve('src/assets'));

        //【2】设置扩展，主要是为了cdn 的引入
        config.externals({
            'vue'         : 'Vue',
            'vue-router'  : 'VueRouter',
            'axios'       : 'axios',
            'element-plus': 'ElementPlus',
            'vuex'        : 'Vuex',
        });

        //【3】设置pug的使用
        config.module.rules.delete('pug');
        config.module.rule('pug').test(/\.pug$/)
        // this applies to <template lang="pug"> in Vue components
            .oneOf('vue-loader').resourceQuery(/^\?vue/).use('pug-plain').loader(require.resolve('pug-plain-loader')).end().end()
        // this applies to pug imports inside JavaScript, i.e. .pug files
            .oneOf('pug-files').uses.delete('pug-plain-loader').end().use('pug-loader').loader('pug-loader').end()

        //【4】设置image-webpack-loader
        config.module.rule("images").use("image-webpack-loader").loader("image-webpack-loader").options({
            mozjpeg : {
                progressive: true,
                quality    : 65
            },
            // optipng.enabled: false will disable optipng
            optipng : {
                enabled: false,
            },
            pngquant: {
                quality: [0.65, 0.90],
                speed  : 4
            },
            gifsicle: {
                interlaced: false,
            },
        }).end();

        //【5】删除无效的config.html
        config.plugins.delete('html-config');

        //【6】移除预加载配置
        for (var attr in pages) {
            var delete_pre_name      = 'prefetch-' + attr;
            var delete_pre_load_name = 'preload-' + attr;
            config.plugins.delete(delete_pre_name)
            config.plugins.delete(delete_pre_load_name)
        }
        ;

        //【7】代码压缩及分割
        config.optimization.minimize = true;
        config.optimization.splitChunks({
            maxAsyncRequests  : Infinity,
            maxInitialRequests: Infinity,
            cacheGroups       : {
                default: false,
                //【1】提取（api/config/script）配置
                env    : {
                    chunks  : function (chunk) {
                        return chunk.name != 'config'
                    },
                    test    : /[\\/]src[\\/](api|config|script)[\\/]/,
                    priority: 30,
                    name    : `env`,
                },
                //【2】提取PC端入口（/router/store）配置
                entry  : {
                    chunks  : 'initial',
                    test    : /[\\/]src[\\/](router|store)[\\/]index[\\.]js/,
                    priority: 29,
                    name    : `entry`,
                    enforce : true,
                },
                //【3】vendors
                vendors: {
                    chunks  : 'all',
                    test    : /[\\/]node_modules[\\/]/,
                    name    : `vendors`,
                    priority: 27,
                },
                //【4】common
                common : {
                    chunks            : 'all',
                    name              : `common`,
                    minChunks         : 2,
                    enforce           : true,
                    priority          : 21,
                    reuseExistingChunk: true
                },
            }

        });

        //【8】设置编辑后未改变的chunks 保持MD5不变
        config.optimization.runtimeChunk({
            name: (entrypoint) => {
                return 'runtime'
            }
        });

        //【9】生产模式下复制静态文件及.htaccess的配置
        if (is_product) {
            config.plugin('copy').use(require('copy-webpack-plugin'), [
                [{
                    from  : path.resolve(__dirname, './public'),
                    to    : './',
                    ignore: ['.*', 'images/*.*', 'lib/**/*.*','cloud-config.js']
                },{
                    from: path.resolve(__dirname, './.htaccess'),
                    to  : '../'
                },{
                    from: path.resolve(__dirname, './public/cloud-config.js'),
                    to  : '../'
                }]
            ])
        }
        ;
    },
    css                : {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.sass` 这个文件
                // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
                prependData: `@import "~@/style/common/variable.scss"`
            },
            // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
            // 因为 `scss` 语法在内部也是由 sass-loader 处理的
            // 但是在配置 `prependData` 选项的时候
            // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
            // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
            scss: {
                prependData: `@import "~@/style/common/variable.scss";`
            },
        }
    },
    lintOnSave         : false,
    // 服务器配置
    devServer          : {
        clientLogLevel    : 'warning',
        historyApiFallback: {
            //hacfin 路由配置
            index   : '/html/index.html',
            rewrites: [
                {from: /^\/about(\/.*)*$/, to: '/html/about.html'},
                {from: /^\/home(\/.*)*$/, to: '/html/home.html'},
            ]
        },
        port              : 3000,
        overlay           : {
            warnings: false,
            errors  : true
        }
    },
}
