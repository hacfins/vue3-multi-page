import { createStore } from 'vuex'
import {getUserInfo} from '@/api/getdata'
import cache from '@/script/cache';

const state = {
    usereq:false,
    loginCode:'',
    userInfo: {},
    viewList:{},
}

const mutations = {
    userReq(state, status){
        state.usereq = status;
    },
    codeStatus(state, status){
        state.loginCode = status;
    },
    saveUserInfo(state, userInfo){
        state.userInfo = userInfo;
    },
    saveAuthViewList(state, res){
        state.viewList = res;
    },
}

const actions = {
    getUserData({commit}, path){
        getUserInfo({
            data    : {},
            callback: (res) => {
                var provideCode = (res.adcode - res.adcode % 10000) / 10000;
                var cityCode    = (res.adcode - res.adcode % 100) / 100;
                res.region      = [provideCode, cityCode, res.adcode];
                res.imgShow     = true;
                res.nick_name_m = res.nick_name;
                commit('saveUserInfo', res);
                if(typeof path == 'function'){
                    path && path()
                }else{

                }
            },
            complete:(code) => {
                commit('userReq', true);
                commit('codeStatus', code);
            }
        })
    },
    getAuthViewList({commit},username){
        cache.viewData(username,(res) => {
            commit('saveAuthViewList', res);
        })

    },
}



export default createStore({
    state,
    actions,
    mutations,
})