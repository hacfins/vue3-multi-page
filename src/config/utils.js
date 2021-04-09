import VueCookies from 'vue-cookies'
import dtime from 'time-formater'

/**
 * 判断客户端类型
 * @returns {boolean}
 * @constructor
 */
export const IsPC = function () {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents        = ["android", "symbianos", "windows phone",
        "ipad", "ipod", "iphone", "android", "phone", "mobile",
        "wap", "netfront", "java", "opera mobi", "opera mini", "ucweb",
        "windows ce", "symbian", "series", "webos", "sony",
        "blackberry", "dopod", "nokia", "samsung", "palmsource", "xda",
        "pieplus", "meizu", "midp", "cldc", "motorola", "foma",
        "docomo", "up.browser", "up.link", "blazer", "helio", "hosin",
        "huawei", "novarra", "coolpad", "webos", "techfaith",
        "palmsource", "alcatel", "amoi", "ktouch", "nexian",
        "ericsson", "philips", "sagem", "wellcom", "bunjalloo", "maui",
        "smartphone", "iemobile", "spice", "bird", "zte-", "longcos",
        "pantech", "gionee", "portalmmm", "jig browser", "hiptop",
        "benq", "haier", "^lct", "320x320", "240x320", "176x220",
        "w3c ", "acs-", "alav", "alca", "amoi", "audi", "avan", "benq",
        "bird", "blac", "blaz", "brew", "cell", "cldc", "cmd-", "dang",
        "doco", "eric", "hipt", "inno", "ipaq", "java", "jigs", "kddi",
        "keji", "leno", "lg-c", "lg-d", "lg-g", "lge-", "maui", "maxo",
        "midp", "mits", "mmef", "mobi", "mot-", "moto", "mwbp", "nec-",
        "newt", "noki", "oper", "palm", "pana", "pant", "phil", "play",
        "port", "prox", "qwap", "sage", "sams", "sany", "sch-", "sec-",
        "send", "seri", "sgh-", "shar", "sie-", "siem", "smal", "smar",
        "sony", "sph-", "symb", "t-mo", "teli", "tim-", /*"tosh",*/ "tsm-",
        "upg1", "upsi", "vk-v", "voda", "wap-", "wapa", "wapi", "wapp",
        "wapr", "webc", "winw", "winw", "xda", "xda-", "Googlebot-Mobile"];
    var flag          = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

var Message = require('element-plus').ElMessage;
/**
 * 判断是否是safri
 * @returns {boolean}
 * @constructor
 */
export const IsSafri = function () {
    var flag = false;
    if (bowser.safari) {
        flag = true;
    }
    return flag;
}
export const IsAndroid = function () {
    return  bowser.android
}
export const isIE   = function () {
    return bowser.msie

}
export const IsWx = function () {
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象

    return ua.match(/MicroMessenger/i) == "micromessenger";
}

export const IsDD = function () {
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象

    return ua.match(/dingtalk/i) == "dingtalk";
}
export const ellip = function (str,num) {
    if(typeof str == 'undefined'){
        return ''
    }else{
        return str.length > num ? str.substr(0,num) + '...' : str
    }
}

export const formatNumber = function (n) {
    if(!n){
        return 0
    }

    if(n >= 10000){
        return (n / 10000).toFixed(1) + '万'

    }else{
        var b = parseInt(n).toString();
        var len = b.length;
        if(len<=3){return b;}
        var r=len%3;
        // b.slice(r,len).match(/\d{3}/g).join(",") 每三位数加一个逗号。
        return r > 0 ? b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(",")
            : b.slice(r,len).match(/\d{3}/g).join(",");
    }

}

export const f_loading_key = function(arr,key){
    var flag = false;
    var filter_num = arr.filter((item) => {
        return item.key == key

    })
    if(filter_num.length > 0){
        flag = filter_num[0].value
    }else{
        flag = false
    }
    return flag;
}

export const randomBgColor = function (user_name) {
    var result = 0
    for(var i = 0; i < user_name.length; i++){
        result+=user_name.charCodeAt(i)
    }

    var default_color_arr = ['#36D9D9','#3DBAF9','#FFA351','#3A80F7'];
    var randomIndex = result % default_color_arr.length;
    return default_color_arr[randomIndex]
}

/**
 * 设置cookie
 * @param key
 * @param value
 * @param date有效期
 */
export const setCookie = function (key, value, date) {
    if (!date) {
        if (bowser.msie) {
            VueCookies.set(key, value, null, '/');
        } else {
            VueCookies.set(key, value, '0', '/');
        }
    } else {
        VueCookies.set(key, value, date, '/');
    }

}

/**
 * 获取cookie
 * @param key
 */
export const getCookie = function (key) {
    return VueCookies.get(key);

}

/**
 * 删除cookie
 * @param key
 */
export const removeCookie = function (key) {
    return VueCookies.remove(key, '/');

}
/**
 *
 * @param url 插入script标签地址
 * @param callback
 */

export const innerScript  = function (url, callback) {
    var script  = document.createElement('script');
    script.src  = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    script.onload = script.onreadystatechange = function () {

        if (!script.readyState || /loaded|complete/.test(script.readyState)) {

            script.onload = script.onreadystatechange = null;

            if (callback)
                callback()
        }
    };
}

/**
 *
 * @param url css 引用路径
 */

export const innerLink = function (url) {
    var link  = document.createElement('link');
    link.href = url;
    link.rel  = "stylesheet";
    document.head.appendChild(link);
}

/**
 * 获取url相对路径
 * @returns {string}
 */
export const getUrlRelativePath = function () {
    var url    = document.location.toString();
    var arrUrl = url.split("//");

    var start  = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

/**
 * 获得当月的最后一天
 * @returns {number}
 */

export const getCurrentMonthLast = function () {
    var date              = new Date();
    var currentMonth      = date.getMonth();
    var nextMonth         = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay            = 1000 * 60 * 60 * 24;
    return new Date(nextMonthFirstDay - oneDay).getDate();
}

export const isStorageSuport = function (storage) {
    if (!!storage) {
        try {
            storage.setItem("key", "value");
            storage.removeItem("key");
            return true;
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
}

export const getSessionStorage = function (key, expiresTime) {
    if (isStorageSuport(window.sessionStorage)) {
        var returnValue;
        if (expiresTime) {
            if (sessionStorage.getItem(key)) {
                var GetDateTime = new Date().getTime();
                var setDataTime = sessionStorage.getItem(key).split('|')[1];
                if (GetDateTime - setDataTime > expiresTime) {
                    sessionStorage.removeItem(key);
                    returnValue = undefined;
                } else {
                    returnValue = sessionStorage.getItem(key).split('|')[0]
                }
            } else {
                returnValue = undefined;
            }
        } else {
            returnValue = sessionStorage.getItem(key)
        }
        return returnValue;
    } else {
        return getCookie(key);
    }
}

export const setSessionStorage    = function (key, data, expiresTime, stortime) {
    if (isStorageSuport(window.sessionStorage)) {
        if (expiresTime) {
            //存入当前时间，以便在获取的时候超过30天之后又清除缓存
            var SetDateTime = new Date().getTime();
            if (stortime) {
                SetDateTime = stortime;
            }
            data += '|' + SetDateTime + '';
            setLocalStorage(key, SetDateTime)
        }
        sessionStorage.setItem(key, data);
    } else {
        setCookie(key, data);
    }
}
export const deleteSessionStorage = function (key) {
    if (isStorageSuport(window.sessionStorage)) {
        sessionStorage.removeItem(key);
    } else {
        removeCookie(key, '', {expires: -1}); // 删除 cookie
    }
}
export const getLocalStorage      = function (key) {
    if (isStorageSuport(window.localStorage)) {
        return localStorage.getItem(key);
    } else {
        return getCookie(key);
    }
}
export const setLocalStorage      = function (key, data) {
    if (isStorageSuport(window.localStorage)) {
        localStorage.setItem(key, data);
    } else {
        setCookie(key, data);
    }
}

export const deleteLocalStorage = function (key) {
    if (isStorageSuport(window.localStorage)) {
        localStorage.removeItem(key);
    } else {
        removeCookie(key); // 删除 cookie
    }
}

export const timeCustomFormat = function (time,format_str,isnottoday) {
    if (typeof time != "string") {
        return;
    }
    var newstr   = time.replace(/-/g, '/');
    var curY = new Date().getFullYear();
    var today_date = dtime(new Date()).format('YYYY-MM-DD')
    var tomorrow_date = dtime(new Date().getTime() + 86400000).format('YYYY-MM-DD');

    var start_date = dtime(newstr).format('YYYY-MM-DD')


    var paramsY = new Date(newstr).getFullYear();
    var formatStr = 'YYYY-MM-DD HH:mm'
    if(format_str){
        formatStr = format_str
    }
    if(isnottoday){
        if(curY == paramsY){
            formatStr = formatStr.replace('YYYY-','')
        }
    }else{
        if(start_date == today_date){
            formatStr = formatStr.replace('YYYY-MM-DD','今天 ')
        }else if(start_date == tomorrow_date){
            formatStr = formatStr.replace('YYYY-MM-DD','明天 ')
        }else if(curY == paramsY){
            formatStr = formatStr.replace('YYYY-','')
        }
    }

    return  dtime(newstr).format(formatStr)

}

export const timeCustomFormat2 = function (time,format_str) {
    if (typeof time != "string") {
        return;
    }
    var newstr   = time.replace(/-/g, '/');
    var curY = new Date().getFullYear();
    var today_date = dtime(new Date()).format('YYYY-MM-DD')
    var yes_date = dtime(new Date().getTime() - 86400000).format('YYYY-MM-DD');

    var start_date = dtime(newstr).format('YYYY-MM-DD')


    var paramsY = new Date(newstr).getFullYear();
    var formatStr = 'YYYY-MM-DD HH:mm'
    if(format_str){
        formatStr = format_str
    }
    if(start_date == today_date){
        formatStr = formatStr.replace('YYYY-MM-DD ','')
    }else if(start_date == yes_date){
        formatStr = formatStr.replace('YYYY-MM-DD ','昨天 ')
    }else if(curY == paramsY){
        formatStr = formatStr.replace('YYYY-','')
    }
    return  dtime(newstr).format(formatStr)

}

export const B2Kb     = function (fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }


    var kb = 1024;
    var mb = kb * 1024;
    var gb = mb * 1024;
    var tb = gb * 1024;
    return fixed2((fileSize / kb).toString())
    function fixed2(str) {
        var result;
        var dianIndex = str.indexOf('.');
        if (dianIndex != -1) {
            var zs = str.substr(0, dianIndex)
            var xs = str.substring(dianIndex, dianIndex + 3)
            result = zs + xs;

        } else {
            result = str;
        }

        return result;
    }

}
export const Kb2B     = function (fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    var kb = 1024;
    var mb = kb * 1024;
    return accMul(fileSize, kb)

}

export const wm2second = function (wm) {
    var ys = wm % 1000000

    if(ys == 0){
        return wm / 1000000
    }else{
        return (wm / 1000000).toFixed(6)
    }

}

export const Time2Unix = function(dateStr){//dateStr格式为"2014-05-08 00:22:11”
    if (typeof dateStr != "string") {
        console.log("Time2Unix()收到的参数不是字符型");
        return;
    }
    var newstr   = dateStr.replace(/-/g, '/');
    var date     = new Date(newstr);
    var time_str = (date.getTime() - date.getTime() % 1000) / 1000;
    return time_str
}

export const Unix2Time = function(dateStr, type){//dateStr格式为"2014-05-08 00:22:11”
    var dateObj = new Date(parseInt(dateStr) * 1000);
    if (!dateStr) {
        dateObj = new Date();
    }
    if (0 == type) {
        return dateObj.getFullYear() + '-' + PadPre((dateObj.getMonth() + 1), 2) + '-' + PadPre(dateObj.getDate(), 2) + ' '
            + PadPre(dateObj.getHours(), 2) + ':' + PadPre(dateObj.getMinutes(), 2) + ':' + PadPre(dateObj.getSeconds(), 2);
    }else if (1 == type) {
        return dateObj.getFullYear() + '-' + PadPre((dateObj.getMonth() + 1), 2) + '-' + PadPre(dateObj.getDate(), 2) + ' '
            + PadPre(dateObj.getHours(), 2) + ':' + PadPre(dateObj.getMinutes(), 2);
    } else if (2 == type) {
        return dateObj.getFullYear() + '-' + PadPre((dateObj.getMonth() + 1), 2) + '-' + PadPre(dateObj.getDate(), 2);
    } else if (3 == type) {
        return PadPre(dateObj.getHours(), 2) + ':' + PadPre(dateObj.getMinutes(), 2);
    } else if (4 == type) {
        return PadPre(dateObj.getHours(), 2) + ':' + PadPre(dateObj.getMinutes(), 2) +':' + PadPre(dateObj.getSeconds(), 2);
    } else if (5 == type) {
        return  PadPre((dateObj.getMonth() + 1), 2) + '-' + PadPre(dateObj.getDate(), 2);
    } else if (6 == type) {
        return PadPre(dateObj.getHours(), 2) + ':' + PadPre(dateObj.getMinutes(), 2);
    }else {
        return dateObj.Format("yyyy-MM-dd HH:mm")
    }
}
export const PadPre = function(num, n){//dateStr格式为"2014-05-08 00:22:11”
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

/**
 *  整数转换成IP地址
 * @param num 需要转换成IP的整数
 * @returns {string|*}
 */
export const int2Ip = function (num) {
    var str;
    var tt = new Array();
    tt[0]  = (num >>> 24) >>> 0;
    tt[1]  = ((num << 8) >>> 24) >>> 0;
    tt[2]  = (num << 16) >>> 24;
    tt[3]  = (num << 24) >>> 24;
    str    = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}


/**由于Chrome流览器对中文输入的时候拼音也会在输入框中显示导致Maxlength函数截取错误的问题
 * 限制文本框的字数,并给出提示 基于jquery.js 和 layer.js bowser.js
 * @param obj 文本框对象  如: $("#myText")
 * @param maxNum 最大字数  如: 20
 * @param notInput Boolean值 为true时表示不是input,textarea等输入框, 而是div等元素
 */

export const EventBindMaxLen = function (obj, num, notInput) {
    var cplock = false;
    obj.on('input', function () {
        if (bowser.iphone) {
            if (!cplock) {
                MaxLength(obj, num, notInput)
            }
        } else {
            MaxLength(obj, num, notInput)
        }
    }).on('compositionstart', function () {
        cplock = true;
    }).on('compositionend', function () {
        cplock = false;
        MaxLength(obj, num, notInput)

    })
    obj.on('paste', function () {
        setTimeout(function () {
            MaxLength(obj, num, notInput)
        }, 0)

    })
}

/**
 * 限制文本框的字数,并给出提示 基于jquery.js 和 layer.js
 * @param obj 文本框对象  如: $("#myText")
 * @param maxNum 最大字数  如: 20
 * @param notInput Boolean值 为true时表示不是input,textarea等输入框, 而是div等元素
 */
export const MaxLength = function (obj, maxNum, notInput) {
    var inputText, length, $imgCount = 0;
    if (notInput) {
        inputText = obj.html();
        var $img  = obj.find("img");
        $imgCount = $img.length;
    } else {
        inputText = obj.val();
    }

    length = inputText.length + $imgCount;
    if (length > maxNum) {
        //删除多余内容
        var divContent, lastChar;
        for (var i = length; i > maxNum; i--) {
            divContent = obj.html();
            lastChar   = divContent.replace(/^(.*[n])*.*(.|n)$/g, "$2");
            if (lastChar == ">") { //img
                obj.children(":last-child").remove();
            } else { //文本
                divContent = divContent.substring(0, divContent.length - 1);
                obj.html(divContent);
                Set_Focus(obj);

            }
        }
        if (notInput) {
            if ($imgCount == 0) {
                obj.html(inputText.substring(0, maxNum));
                Set_Focus(obj);
            }
        } else {
            obj.val(inputText.substring(0, maxNum));
        }
        var msg = "最多输入" + maxNum + "个字符"
        if (IsPC()) {
            Message.error(msg)
        } else {
            Toast(msg)
        }
    }
}
export const Set_Focus = function (obj) {
    var sel   = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(obj[0]);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

export const rootPath = function () {
    var strFullPath = window.document.location.href;
    var strPath     = window.document.location.pathname;
    var pos         = strFullPath.indexOf(strPath);
    var prePath     = strFullPath.substring(0, pos);
    return prePath;
}


/**
 * 设置图片缩略图的w的参数
 * @returns {string}
 */
export const setImgParam = function (type,imgpath) {
    if(!imgpath){
        return imgpath
    }
    switch(type){
        case 0://上传图片,移动端机构Logo
            imgpath += '?w=100'
            break;
        case 1://PC端列表缩略图
            imgpath += '?w=200'
            break;
        case 2://PC端头部头像
            imgpath += '?w=30'
            break;
        case 3://PC端课堂列表封面,头像
            imgpath += '?w=60'
            break;
        case 4://机构logo
            imgpath += '?w=200'
            break;
        case 5://PC端机构信息资质证明
            imgpath += '?w=300'
            break;
        case 6://Mobile端列表缩略图
            imgpath += '?w=250'
            break;
        case 7://doc
            imgpath += '?w=500'
            break;
        case 8://pcdoc
            imgpath += '?w=1000'
            break;
        case 9://移动端预览图片
            imgpath += '?w=550'
            break;

    }
    return imgpath;
}
function share_makeurl(name, data) {
    var templates = {
        qzone       : 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
        qq          : 'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
        tencent     : 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
        weibo       : 'http://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
        wechat      : '/wechat/share?url={{URL}}&title={{TITLE}}&summary={{SUMMARY}}&pics={{IMAGE}}',
        douban      : 'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
        diandian    : 'http://www.diandian.com/share?lo={{URL}}&ti={{TITLE}}&type=link',
        linkedin    : 'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',
        facebook    : 'https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}',
        twitter     : 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',
        google      : 'https://plus.google.com/share?url={{URL}}'
    };
    if(data['summary'] == undefined){
        data['summary'] = data['description'];
    }
    return templates[name].replace(/\{\{(\w)(\w*)\}\}/g, function (m, fix, key) {
        var nameKey = name + fix + key.toLowerCase();
        key = (fix + key).toLowerCase();

        return encodeURIComponent((data[nameKey] === undefined ? data[key] : data[nameKey]) || '');
    });
}

export const shareFn = function (el, opt) {
    opt.summary     = opt.summary ? filterTitle(opt.summary).replace(/&nbsp;/gi, '').substr(0, 79) : '';

    var reg_key_word = /公司+.*数据+.*/

    if(reg_key_word.test( opt.summary )){

        opt.summary = opt.summary.replace(/数据/gi,'**')
    }
    opt.title = opt.title.replace(/a/gi,'*')
    opt.description = opt.description.replace(/a/gi,'*') + '（分享自 @用户中心）';
    var setdata     = {
        site_url: location.origin,
        source  : location.origin, // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://mooc.boolongo.com" />
        sites   : ['weibo', 'wechat', 'qq', 'qzone'], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
    };
    setdata         = _extendObj(setdata, opt)
    if (IsPC()) {
        //【1.0 PC】
        socialShare(el, setdata);
    } else {
        if (!opt.url) {
            setdata.url = location.href
        }
        var sharT = setdata.title;
        el = typeof el === 'string' ? document.querySelectorAll(el) : el;
        for(var i = 0; i < el.length; i++){
            if(el[i].getAttribute('data-id') == 'weibo'){
                setdata.title = setdata.description;
            }else{
                setdata.title = sharT;
            }
            if (el[i].getAttribute('data-id') == 'weibo' || el[i].getAttribute('data-id') == 'qzone') {
                var $url = share_makeurl(el[i].getAttribute('data-id'), setdata);
                el[i].setAttribute('href',$url)
            }
        }
    }




    //微信浏览器中，打开网页
    if (/MicroMessenger/i.test(navigator.userAgent)) {

        //签名
        sdkSign({
            data     : {'url': location.href},
            callback : function (res) {

                wx.config({
                    debug    : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId    : res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr : res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名，见附录1
                    jsApiList: res.jsApiList
                });

                var shareData = {
                    title   : setdata.title,
                    desc    : setdata.summary,
                    link    : location.href,
                    imgUrl  : setdata.image,
                    trigger : function (res) {
                    },
                    complete: function (res) {
                    },
                    success : function (res) {
                    },
                    cancel  : function (res) {
                    },
                    fail    : function (res) {
                    }
                };

                //监听微信分享
                wx.ready(function () {
                    // 2. 分享接口
                    // 2.1 监听“分享到朋友圈”
                    wx.onMenuShareTimeline(shareData);

                    // 2.2 监听“分享给朋友”
                    wx.onMenuShareAppMessage(shareData);

                    // 2.3 监听“分享到QQ”
                    wx.onMenuShareQQ(shareData);

                    // 2.4 监听“分享到QQ空间”
                    wx.onMenuShareQZone(shareData);

                    // 2.4 监听“分享到微博”
                    wx.onMenuShareWeibo(shareData);
                });

            },
            errorback: function () {

            }
        });
    }


}

function filterTitle(title) {
    return title.replace(/<.*?>/ig, '')

}

export const relativeTime = function(secends){
    if (typeof(secends) == "undefined") {
        return "0秒前"
    }
    if (!_isNumeric(secends)) {
        return "0秒前"
    } else if (parseInt(secends) < 0) {
        return "0秒前"
    }
    var fz = 60 * 1000;//分钟
    var xs = fz * 60;//小时
    var ts = xs * 24;//天数
    var ns = ts * 365;//年
    if (secends >= ns) {
        return Math.round(secends / ns) + "年前";
    } else if (secends >= ts) {
        return Math.round(secends / ts) + "天前";
    } else if (secends >= xs) {
        return Math.round(secends / xs) + "小时前";
    } else if (secends >= fz) {
        return Math.round(secends / fz) + "分钟前";
    } else {
        return secends / 1000 + "秒前";
    }
}
export const second2Time = function (secends,is_tag) {

    function getY(ysecends){
        y = ( ysecends - ysecends % ns ) / ns;
        if(ysecends % ns != 0){
            getD(ysecends % ns)
        }
    }

    function getD(dsecends){
        d = (dsecends - dsecends % ts) / ts;
        if(dsecends % ts != 0){

            getH(dsecends % ts)

        }

    }


    function getH(hsecends){
        h = (hsecends - hsecends % xs) / xs;
        if(hsecends % xs != 0){
            getM(hsecends % xs)

        }

    }

    function getM(msecends){
        m = (msecends - msecends % fz) / fz;
        if(msecends % fz != 0){
            s = msecends % fz
        }

    }

    var fz = 60;//分钟
    var xs = fz * 60;//小时
    var ts = xs * 24;//天数
    var ns = ts * 365;//年

    var y,d,h,m,s;
    var result='';
    if (secends >= ns) {
        getY(secends)

    }else if (secends >= ts) {

        getD(secends)

    } else if (secends >= xs) {
        getH(secends)


    } else if (secends >= fz) {

        getM(secends)

    } else {
        s = secends;

    }

    if(y){
        result += is_tag ? '<em>'+y+'</em>年' : y+'年'
    }
    if(d){
        result += is_tag ?' <em>'+d+'</em>天' : ' '+d+'天'
    }
    if(h){
        result += is_tag ? ' <em>'+h+'</em>小时' : ' '+h+'小时'
    }
    if(m){
        result +=is_tag ? ' <em>'+m+'</em>分钟' : ' '+m+'分钟'
    }
    if(s){
        result +=is_tag ? ' <em>'+s+'</em>秒' : ' '+s+'秒'
    }

    return result

}

export const getUrlPath = function (url){
    if(url.search('//') == -1){
        return url
    }
    var arrUrl = url.split("//");

    var start  = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

export const unionParams = function (initstr,obj,is_back_url,full_path) {

    initstr = initstr ? initstr : '';

    for(var attr in obj){

        if(is_back_url){
            var backurl_index = full_path.search('backurl');
            var attr_search_index = full_path.search(attr)

            if(attr != 'backurl' && attr_search_index > backurl_index && attr != 'statue' && attr != 'msg' && attr != 'key' && attr != 'type'){
                var flag = initstr.search(/\?/gi) != -1
                if(flag){
                    initstr += '&'+attr+'='+obj[attr]+''
                }else{
                    initstr += '?'+attr+'='+obj[attr]+''
                }
            }

        }else{
            var flag = initstr.search(/\?/gi) != -1
            if(flag){
                initstr += '&'+attr+'='+obj[attr]+''
            }else{
                initstr += '?'+attr+'='+obj[attr]+''
            }
        }

    }
    return initstr
}


export const replaceTemplate = function(obj,hasnolink){
    for(var attr in obj){
        if(attr.search('name') != -1){
            obj[attr] = obj[attr].replace(/<br>/gi,'').replace(/[\n]/g,'')
        }
        var reg =  '\\$\{'+attr+'\}';
        if(hasnolink){
            if(attr.search('_url') != -1){
                obj.tt = obj.tt.replace(new RegExp(reg,'g'),'')

            }else{
                obj.tt = obj.tt.replace(new RegExp(reg,'g'),obj[attr])
            }

        }else{
            var blank = '_blank'
            if(!IsPC()){
                blank = '_self'
            }
            if(attr.search('_url') != -1){
                var replace_name = attr.replace('_url','');
                var reg2 = '\\$\{'+replace_name+'\}';
                var link_url = obj[attr];
                if(!IsPC()){
                    var url_path = getUrlPath(obj[attr])
                    if(url_path.search('/m/') == -1){
                        link_url = obj[attr].replace(url_path,'/m'+url_path+'')
                    }

                }
                var link_replace_str = '<a class="msg-link-title" href="'+link_url+'" target="'+blank+'">'+obj[replace_name]+'</a>';
                obj.tt = obj.tt.replace(new RegExp(reg2,'g'),'').replace(new RegExp(reg,'g'),link_replace_str);
            }else{
                if(!obj.hasOwnProperty(attr+'_url')){
                    if(obj.hasOwnProperty('user_name') && (attr == 'nick_name' || attr == 'full_name')){
                        var link = '/u/'+obj['user_name']+'';
                        if(!IsPC()){
                            link = '/m/u/'+obj['user_name']+''
                        }
                        var link_str = '<a class="msg-user-name" href="'+link+'" target="'+blank+'">'+obj[attr]+'</a>';
                        obj.tt = obj.tt.replace(new RegExp(reg,'g'),link_str);;
                    }else{
                        obj.tt = obj.tt.replace(new RegExp(reg,'g'),obj[attr])
                    }

                }

            }
        }

    }

}


/**
 * 两个数相乘
 * @returns {string}
 */
export const accMul = function(arg1,arg2){
    var m=0,s1=arg1.toString(),
        s2=arg2.toString();
    try{
        m+=s1.split(".")[1].length
    }catch(e){

    }
    try{
        m+=s2.split(".")[1].length
    }catch(e){

    }
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

export const randomPoster = function (cid) {
    var result = 0
    for(var i = 0; i < cid.length; i++){
        result+=cid.charCodeAt(i)
    }

    var default_cover_arr = [require('assets/fm-1.jpg'),require('assets/fm-2.jpg'),require('assets/fm-3.jpg'),require('assets/fm-4.jpg')];
    var randomIndex = result % default_cover_arr.length;
    return default_cover_arr[randomIndex]
}




export const fileSize = function(fileSize,isnotdit) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    // var kb = 1024;
    // var mb = kb * 1024;
    // var gb = mb * 1024;
    // var tb = gb * 1024;
    // if (fileSize >= tb) {
    //     return parseFloat((fileSize / tb).toFixed(2)) + "T"
    // } else if (fileSize >= gb) {
    //     return parseFloat((fileSize / gb).toFixed(2)) + "G"
    // } else if (fileSize >= mb) {
    //     return parseFloat((fileSize / mb).toFixed(2)) + "M"
    // } else if (fileSize >= kb) {
    //     return parseFloat((fileSize / kb).toFixed(2)) + "KB"
    // } else {
    //     return fileSize + "B"
    // }


    var kb = 1024;
    var mb = kb * 1024;
    var gb = mb * 1024;
    var tb = gb * 1024;
    if (fileSize >= tb) {
        return  fixed2((fileSize / tb).toString())+ "T"
    } else if (fileSize >= gb) {
        return fixed2((fileSize / gb).toString()) + "G"
    } else if (fileSize >= mb) {
        return fixed2((fileSize / mb).toString()) + "M"
    } else if (fileSize >= kb) {
        return fixed2((fileSize / kb).toString()) + "KB"
    } else {
        return fileSize + "B"
    }
    function fixed2(str){
        var result;
        var dianIndex = str.indexOf('.');
        if(dianIndex != -1){
            var zs = str.substr(0,dianIndex)
            var xs = str.substring(dianIndex,dianIndex+3)
            if(isnotdit){
                result = Math.ceil(zs + xs);
            }else{
                result = zs + xs;
            }


        }else{
            result = str;
        }

        return result;
    }

}
export const toFixed = function(str,s) {
    str = str.toString();
    var save_length = s + 1;
    var result;
    var dianIndex = str.indexOf('.');
    if(dianIndex != -1){
        var zs = str.substr(0,dianIndex)
        var xs = str.substring(dianIndex,dianIndex+save_length)
        result = zs + xs;
    }else{
        result = str;
    }

    return result;

}
export const B2Mb = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }


    var kb = 1024;
    var mb = kb * 1024;
    var gb = mb * 1024;
    var tb = gb * 1024;
    return fixed2((fileSize / mb).toString())
    function fixed2(str){
        var result;
        var dianIndex = str.indexOf('.');
        if(dianIndex != -1){
            var zs = str.substr(0,dianIndex)
            var xs = str.substring(dianIndex,dianIndex+3)
            result = zs + xs;

        }else{
            result = str;
        }

        return result;
    }

}
export const Mb2B = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    var kb = 1024;
    var mb = kb * 1024;
    return  accMul(fileSize,mb)

}

export const B2Bps = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    var Kbps = 128
    var Mbps = Kbps * 1024
    var Gbps = Mbps * 1024;
    var trans_num = 1;
    if(fileSize >= Gbps){
        trans_num = Gbps
    }else if(fileSize >= Mbps){
        trans_num = Mbps
    }else if(fileSize >= Kbps){
        trans_num = Kbps
    }else{
        trans_num = 1
    }
    return fixed2((fileSize / trans_num).toString())
    function fixed2(str){
        var result;
        var dianIndex = str.indexOf('.');
        if(dianIndex != -1){
            var zs = str.substr(0,dianIndex)
            var xs = str.substring(dianIndex,dianIndex+3)
            result = zs + xs;

        }else{
            result = str;
        }

        return result;
    }

}

export const B2Gbps = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }


    var Gbps = 131072 * 1024;//1Mbps = 131072字节/秒
    return fixed2((fileSize / Gbps).toString())
    function fixed2(str){
        var result;
        var dianIndex = str.indexOf('.');
        if(dianIndex != -1){
            var zs = str.substr(0,dianIndex)
            var xs = str.substring(dianIndex,dianIndex+3)
            result = zs + xs;

        }else{
            result = str;
        }

        return result;
    }

}

export const Gbps2B = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    return  accMul(fileSize,131072 * 1024)


}

export const B2Mbps = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }


    var Mbps = 131072;//1Mbps = 131072字节/秒
    return fixed2((fileSize / Mbps).toString())
    function fixed2(str){
        var result;
        var dianIndex = str.indexOf('.');
        if(dianIndex != -1){
            var zs = str.substr(0,dianIndex)
            var xs = str.substring(dianIndex,dianIndex+3)
            result = zs + xs;

        }else{
            result = str;
        }

        return result;
    }

}

export const Mbps2B = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    return  accMul(fileSize,131072)


}

export const B2Kbps = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    var Kbps = 128;//1Kbps = 128字节/秒
    return fixed2((fileSize / Kbps).toString())
    function fixed2(str){
        var result;
        var dianIndex = str.indexOf('.');
        if(dianIndex != -1){
            var zs = str.substr(0,dianIndex)
            var xs = str.substring(dianIndex,dianIndex+3)
            result = zs + xs;

        }else{
            result = str;
        }

        return result;
    }

}
export const Kbps2B = function(fileSize) {
    if (typeof(fileSize) == "undefined") {
        return "-"
    }
    if (!_isNumeric(fileSize)) {
        return "-"
    }
    return  accMul(fileSize,128)


}

export const getLastDay = function (year,month) {
    var next_month_first_day = new Date(year,month,1);   //取当年下一个月中的第一天
    var lastDay = new Date(next_month_first_day.getTime()- 1000* 60*60*24).Format('yyyy-MM-dd')//取当年当月中的最后一天

    return lastDay

}

