/**
 * Created by hacfin005 on 2018/11/22.
 */
var $_cloud_config = {
    $product     : "v3",
    $version     : "1.0.0",
    $clouds      : [
        {
            code       : 'portal',
            name       : "学院-前台",
            keywords   : "",
            description: "公开课为各行业培训场景而生。满足教育线上培训、企业内训、客户产品培训等各行业多场景应用,让培训学习更有价值",
            api_url    : "http://192.168.123.110:8511",
            ui_url     : "http://192.168.123.90:8517",
            logo       : "",
            display    : 1
        },
        {
            code       : 'admin',
            name       : "学院-后台",
            keywords   : "",
            description: "管理机构和课程的系统",
            api_url    : "http://192.168.123.110:8521",
            ui_url     : "http://192.168.123.90:8527",
            logo       : "",
            display    : 1
        },
        {
            code       : 'live',
            name       : "直播服务",
            keywords   : "",
            description: "",
            api_url    : "http://192.168.123.22:8931",
            ui_url     : "",
            logo       : "",
            display    : 0
        },
        {
            code       : 'conference',
            name       : "视频服务",
            keywords   : "",
            description: "",
            api_url    : "https://conference-test.bogo365.net:3004",
            ui_url     : "",
            logo       : "",
            display    : 0
        },
        {
            code       : 'interact',
            name       : "消息服务",
            keywords   : "",
            description: "",
            api_url    : "ws://192.168.123.22:23460",
            ui_url     : "http://192.168.123.22:8671",
            logo       : "",
            display    : 0
        },
    ],
    $company     : {
        website    : "播谷网",
        keywords   : "华科飞扬",
        description: "",
        owner      : "北京华科飞扬科技股份公司",
        owner_url  : "http://hacfin.com/",
        icp        : "京ICP备09019116号-3",
        icp_url    : "https://beian.miit.gov.cn/#/Integrated/recordQuery",
        contact    : {
            phone   : "",
            email   : "",
            contact : "",
            location: "",
        },
        feedback   : {
            api_url: "",
        }
    },
    $clouds_parse: function (key) {
        var curSys = {};
        this.$clouds.forEach(function (item, i) {
            if (item.code == key) {
                curSys = item;
            }
        })
        return curSys;

    },
    $show_list   : function (self) {
        var menuList = [];
        this.$clouds.forEach(function (item, i) {
            if (item.display == 1 && item.code != self && item.code != 'account') {
                menuList.push(item)
            }
        })
        return menuList;
    },
};