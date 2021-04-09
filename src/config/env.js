/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */
/**
 * Created by hacfin005 on 2018/11/22.
 */
/**
 * Created by hacfin005 on 2018/11/22.
 */
// var $_cloud_config = {
//     $product:"v2",
//     $version: "2.5.0",
//     $clouds : [
//         {
//             code       : 'account',
//             name       : "用户中心",
//             keywords   : "",
//             description: "用户登录注册找回密码的平台，用于其它系统的登陆",
//             api_url    : "http://192.168.123.22:8213",
//             ui_url     : "http://192.168.123.90:8217",
//             logo       : "",
//             display    : 1
//         },
//         {
//             code       : 'pan',
//             name       : "云盘",
//             keywords   : "云盘, 分享, 传输, 存储,  拍照, 上传, 下载,文件, 照片, 相册, 传文件, cloud",
//             description: "云盘是华科飞扬公司为用户精心打造的一项智能云服务, 您可以通过云盘方便地在手机和电脑之间同步文件、推送照片和传输数据",
//             api_url    : "http://192.168.123.22:8223",
//             ui_url     : "http://192.168.123.90:8227",
//             logo       : "",
//             display    : 1
//         },
//
//         {
//             code       : 'opens',
//             name       : "学院",
//             keywords   : "",
//             description: "公开课为各行业培训场景而生。满足教育线上培训、企业内训、客户产品培训等各行业多场景应用,让培训学习更有价值",
//             api_url    : "http://192.168.123.22:8253",
//             ui_url     : "http://192.168.123.90:8257",
//             logo       : "",
//             display    : 1
//         },
//         // {
//         //     code       : 'edu',
//         //     name       : "云学院",
//         //     keywords   : "",
//         //     description: "云学院，一个专注职业技能提升的在线学习平台。立足于实用性的要求，可申请讲师，聚合了丰富的学习内容，包括课程、文章、短视频、音频等。平台提倡系统化的学习，旨在帮助用户获得全面的、非零散的知识和技能，实现学有所长，并能学以致用！",
//         //     api_url    : "http://192.168.123.22:8233",
//         //     ui_url     : "http://192.168.123.90:8237",
//         //     logo       : "",
//         //     display    : 1
//         // },
//         {
//             code       : 'live',
//             name       : "直播服务器",
//             keywords   : "",
//             description: "",
//             api_url    : "http://192.168.123.22:8631",
//             ui_url     : "http://192.168.123.90:8638",
//             logo       : "",
//             display    : 0
//         },
//         {
//             code       : 'conference',
//             name       : "互动服务器",
//             keywords   : "",
//             description: "",
//             api_url    : "https://conference-test.bogo365.net:3004",
//             ui_url     : "http://39.107.112.100:3001",
//             logo       : "",
//             display    : 0
//         },
//         {
//             code       : 'interact',
//             name       : "消息服务器",
//             keywords   : "",
//             description: "",
//             api_url    : "ws://192.168.123.22:2346",
//             ui_url     : "",
//             logo       : "",
//             display    : 0
//         },
//     ],
//     $company: {
//         website    : "播谷网",
//         keywords   : "华科飞扬",
//         description: "",
//         owner      : "北京华科飞扬科技股份公司",
//         owner_url  : "http://hacfin.com/",
//         icp        : "京ICP备09019116号-3",
//         icp_url:"https://beian.miit.gov.cn/#/Integrated/recordQuery",
//         contact    : {
//             phone   : "",
//             email   : "",
//             contact : "",
//             location: "",
//         },
//         feedback   : {
//             api_url: "",
//         }
//     },
//     $clouds_parse:function(key){
//         var curSys = {};
//         this.$clouds.forEach(function(item,i){
//             if(item.code == key){
//                 curSys = item;
//             }
//         })
//         return curSys;
//
//     },
//     $show_list:function(self){
//         var menuList = [];
//         this.$clouds.forEach(function(item,i){
//             if(item.display == 1 && item.code != self && item.code != 'account'){
//                 menuList.push(item)
//             }
//         })
//         return menuList;
//     },
// };

var account = $_cloud_config.$clouds_parse('account');
var open = $_cloud_config.$clouds_parse('opens');
var baseUrl = account.api_url;
var company = $_cloud_config.$company;
var g_loading = []
export {
    baseUrl,
    account,
    open,
    company,
    g_loading
}