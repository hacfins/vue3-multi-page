/**
 * Created by hacfin005 on 2021/4/9.
 */
const glob       = require("glob")
const is_product = process.env.NODE_ENV == "production"; // 正式环境

const cdn = {
    // 开发环境
    dev  : {
        css: [],
        js : [
            '/assets/vue-3.0.11/dist/vue.global.js'
        ]
    },
    // 生产环境
    build: {
        css: [],
        js : [
            '/web/assets/vue-3.0.11/dist/vue.global.prod.js'
        ]
    }

}

function getEntrys() {
    let pages = {}
    // 调用时在文件vue.config.js中，所以使用'./src/...'的相对路径
    glob.sync("./src/pages/*/*.js").forEach((filePath) => {
        let filePathList = filePath.split("/")
        // 这里使用filePathList.length是因为路径是动态的，当路径改变时保证我们能取到正确的文件名称
        let fileName     = filePathList[filePathList.length - 2];
        var etToZh       = {
            'index'  : '首页',
            'about'  : '关于',
            'home'   : '家庭',
            'noexsit': '404',
            'promote': '升级',
            'update' : '产品动态',
        }
        var page_title   = etToZh[fileName] ? etToZh[fileName] : '';
        pages[fileName]  = {
            is_pro        : is_product,
            cdn           : is_product ? cdn.build : cdn.dev,
            title         : page_title,
            // 入口文件
            entry         : `src/pages/${fileName}/${fileName}.js`,
            // 模板文件
            template      : `src/pages/${fileName}/${fileName}.pug`,
            // 在dist文件夹中的输出位置以及输出名称
            filename      : `html/${fileName}.html`,
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks        : ["runtime", "vendors", "config", "env", "entry", "common", fileName],
            favicon       : 'favicon.ico',
            inject        : true,
            minify        : {
                removeComments       : true,
                collapseWhitespace   : true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'manual'
        }
    })
    pages['config'] = {
        entry: './src/config/config.js'
    }
    return pages
}

module.exports = {
    getEntrys,
    is_product,
}
