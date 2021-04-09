/**
 * API缓存文件
 */
import {authViewList} from '@/api/getdata'
import {getLocalStorage, getSessionStorage, setSessionStorage,setLocalStorage} from '@/config/utils';
var expiresTime = 2 * 60 * 60 * 1000;
export default {
    viewData: (username,fn) => {
        var session_key = 'ha_view_'+username;
        if (sessionStorage.getItem(session_key)) {
            var session_key_cnt = sessionStorage.getItem(session_key)
            var storeTime = session_key_cnt.substr(session_key_cnt.lastIndexOf('|') + 1 ,session_key_cnt.length);
        }
        var updateTime = getLocalStorage(session_key);
        if (storeTime < updateTime) {
            sessionStorage.removeItem(session_key)
        }
        var val = getSessionStorage(session_key, expiresTime);
        if (!val) {
            authViewList({
                data    : {},
                callback: (res) => {
                    if (storeTime < updateTime) {
                        setSessionStorage(session_key, JSON.stringify(res), expiresTime, updateTime); //存储为Json串
                    } else {
                        setSessionStorage(session_key, JSON.stringify(res), expiresTime); //存储为Json串
                    }
                    fn(JSON.parse(getSessionStorage(session_key, expiresTime)));
                }
            })
        } else {
            fn(JSON.parse(val));
        }
    },
    update_view_time:function(){
        var upTime = new Date().getTime();
        for (var attr in localStorage){
            if(attr.search('ha_view_') != -1){
                setLocalStorage(attr,upTime)
            }
        }
    },

}