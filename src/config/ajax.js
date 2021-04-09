import {baseUrl,g_loading} from './env'
import axios from 'axios'

var Message = require('element-plus').ElMessage;

function buildParams(params) {
    var result = [];

    for (var i in params) {
        result.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
    }

    return result.join('&');
}

function randomNum(n) {
    var t = '';
    for (var i = 0; i < n; i++) {
        t += Math.floor(Math.random() * 10);
    }
    return t;
}

function getAllReqUrl(config){
    var src    = config.url;
    var jsonp   = 'Axios' + randomNum(21) + '_' + new Date().getTime();
    if (config.params) {
        var params = buildParams(config.params);

        if (params) {
            src += (src.indexOf('?') >= 0 ? '&' : '?') + params;
        }
    }
    src += (src.indexOf('?') >= 0 ? '&' : '?') + buildParams({
            callback: jsonp,
            _       : (new Date().getTime())
        });
    return src

}

function jsonpAdapter(config) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        var src    = config.url;

        if (config.params) {
            var params = buildParams(config.params);

            if (params) {
                src += (src.indexOf('?') >= 0 ? '&' : '?') + params;
            }
        }

        script.async = true;

        var jsonp   = 'Axios' + randomNum(21) + '_' + new Date().getTime();
        var old     = window[jsonp];
        var isAbort = false;

        window[jsonp] = function (responseData) {
            window[jsonp] = old;

            if (isAbort) {
                return;
            }

            var response = {
                data  : responseData,
                status: 200
            }

            resolve(response);
        };

        src += (src.indexOf('?') >= 0 ? '&' : '?') + buildParams({
                callback: jsonp,
                _       : (new Date().getTime())
            });

        script.onload = script.onreadystatechange = function () {

            if (!script.readyState || /loaded|complete/.test(script.readyState)) {

                script.onload = script.onreadystatechange = null;

                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                script = null;
            }
        };

        if (config.cancelToken) {
            config.cancelToken.promise.then(function (cancel) {
                if (!script) {
                    return;
                }

                isAbort = true;
                reject(cancel);
            });
        }

        script.src = src;

        document.head.appendChild(script);
    });
};

export default function (url = '', options, type,loading_key) {
    //补充为完整url
    url = baseUrl + url;
    if(loading_key){
        var isexsit = g_loading.some((sitem) => {
            return sitem.key == loading_key

        })
        if(!isexsit){
            g_loading.push({
                key:loading_key,
                value:true
            })
        }else{
            g_loading.filter((item) => {
                return item.key == loading_key

            })[0].value = true
        }


    }

    //  post 使用data作为参数，get使用params作为参数
    var all_req_str = getAllReqUrl({
        url:url,
        params : options.data,
    })
    var pd_length = 8000
    if(type == 'GET'){
        if(all_req_str.length <= pd_length){
            type = 'GET'
        }else{
            type = 'POST'
        }
    }
    var config;
    if (type == 'POST') {
        config = {
            method         : type,
            url            : url,
            data           : options.data,
            withCredentials: true
        }
    } else {
        config = {
            method : type,
            url    : url,
            params : options.data,
            adapter: jsonpAdapter
        }
    }

    //成功的回调
    function success(res) {
        loadingCallBack();
        switch (res.data.code) {
            case 200:
                if (options.callback) {
                    if (typeof (res.data["count"]) != 'undefined') {
                        if(typeof (res.data["time"]) != 'undefined'){
                            options.callback(res.data.result, res.data["count"],res.data["time"]);
                        }else{
                            options.callback(res.data.result, res.data["count"]);
                        }
                    } else if (typeof (res.data["allcount"]) != 'undefined') {
                        options.callback(res.data.result, res.data["count"], res.data["allcount"]);
                    } else if (res.data.result) {
                        if(typeof (res.data["time"]) != 'undefined'){
                            options.callback(res.data.result,res.data["time"]);
                        }else{
                            options.callback(res.data.result);
                        }
                    } else {
                        options.callback(res.data);
                    }
                }
                break;
            case 404:
                Message.error(res.data.msg)
                break;
            case 458:
                Message.error(res.data.msg)
                setTimeout(() => {
                    location.href = '/passport/login';
                },2000)
                break;
            case 403://缺少令牌

                var path =  getUrlRelativePath();
                if(path.search(/^(\/m)?\/u\//gi) == -1){
                    location.href = '/passport/login';

                }

                break;
            case 461://令牌无效
            case 462://过期
                location.href = '/passport/login';
                break;
            case 463://异地登录，被迫下线
                Message.error(res.data.msg)
                setTimeout(() => {
                    location.href = '/passport/login';
                },2000)

                break;
            case 524://系统检测到有攻击行为存在
                Message.error(res.data.msg)
                break;
            case 706:
                var reURL = document.location.href
                if (reURL.indexOf("/product/auth") == -1)
                    document.location.href = "/product/auth";
                break;
            case 711:
                Message.error(res.data.msg)
                var reURL = document.location.href.substr(rootPath().length);
                if (reURL.indexOf('/product/active') == -1)
                    document.location.href = "/product/active";
                break;
            case 712:
                document.location.href = "/";
                break;
            default :
                if (typeof (options["errorback"]) != 'undefined') {
                    if(typeof (res.data["time"]) != 'undefined'){
                        options.errorback(res.data.msg, res.data.code, res.data.result,res.data["time"]);
                    }else{
                        options.errorback(res.data.msg, res.data.code, res.data.result);
                    }

                } else {
                    Message.error(res.data.msg)
                }
                break;
        }
        options.complete && options.complete(res.data.code)


    }

    //失败回调
    function error(err) {
        loadingCallBack();
        if (options.errorback) {
            options.errorback(err)
        } else {
            Message.error(err)
        }
        options.complete && options.complete()
    }
    function loadingCallBack(){
        if(loading_key){
            g_loading.filter((item) => {
                return item.key == loading_key

            })[0].value = false

        }
    }


    //调用axios
    axios(config).then(success).catch(error);

}

