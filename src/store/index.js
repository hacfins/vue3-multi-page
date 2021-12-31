import { createStore } from 'vuex'
import {getUserInfo, reqOverviewData,
    reqOverviewDataExchange,
    reqOverviewReport,
    reqOverviewUnion,
    reqOverviewRB,
    reqOverviewClassify,
    reqOverviewBag,
    reqOverviewAggregateData} from '@/api/getdata'
import cache from '@/script/cache';


import {
    Overview,
    OverviewReport,
    OverviewDataExchange,
    OverviewUnion,
    OverviewRB,
    OverviewClassify,
    OverviewBag,
    OverviewAggregateData
} from './mutation-types'

const state = {
    usereq:false,
    loginCode:'',
    userInfo: {},
    viewList:{},



    union: {
        memoCount: 0,
        measureCount: 0,
        deptCount: 0,
        chartData: {
            inner: [
                { value: 0, name: '惩戒' },
                { value: 0, name: '激励' }
            ],
            outer: [
                { value: 0, name: '法人惩戒' },
                { value: 0, name: '自然人惩戒' },
                { value: 0, name: '法人激励' },
                { value: 0, name: '自然人激励' }
            ]
        }
    }, // 联合奖惩
    dataExchange: {
        getIn: 0,
        getOut: 0,
        getInCorrect: '0%',
        getOutCorrect: '0%',
        dockedAbnormal: 0,
        dockedNormal: 0,
        chartData: [
            ['product', '归集', '输出'],
            ['1月', 0, 0],
            ['2月', 0, 0],
            ['3月', 0, 0],
            ['4月', 0, 0],
            ['5月', 0, 0],
            ['6月', 0, 0],
            ['7月', 0, 0],
            ['8月', 0, 0],
            ['9月', 0, 0],
            ['10月', 0, 0],
            ['11月', 0, 0],
            ['12月', 0, 0]
        ]
    },
    total: [0, 0, 0, 0, 0, 0, 0, 0],
    rotateData: [
        { name: '法人基础数量', value: 0 },
        { name: '自然人基础数量', value: 0 },
        { name: '法人信用信息', value: 0 },
        { name: '自然人信用信息', value: 0 },
        { name: '法人人均数量', value: 0 },
        { name: '自然人人均数量', value: 0 }
    ],
    redBlackList: {
        redList: {
            signCom: 0,
            taxpayer: 0,
            corp: 0,
            volunteer: 0
        },
        blackList: {
            performed: 0,
            case: 0,
            unpaid: 0,
            lose: 0
        }
    }, // 红黑名称
    collection: {
        lv1: 0,
        lv2: 0,
        resourceCount: 0,
        deptCount: 0,
        chartData: [
            ['product', '信息量'],
            ['基础信息', 0],
            ['业务信息', 0],
            ['司法信息', 0],
            ['行政执法信息', 0],
            ['公共事业信息', 0],
            ['信用评级信息', 0],
            ['其他信息', 0],
            ['累计', 0]
        ]
    }, // 部门数据归集统计
    report: {
        chartData: [
            ['product', '数量'],
            ['1月', 0],
            ['2月', 0],
            ['3月', 0],
            ['4月', 0],
            ['5月', 0],
            ['6月', 0],
            ['7月', 0],
            ['8月', 0],
            ['9月', 0],
            ['10月', 0],
            ['11月', 0],
            ['12月', 0]
        ]
    },
    submission: [
        { name: '部门名称', count: 0, percent: '0%' },
        { name: '部门名称', count: 0, percent: '0%' },
        { name: '部门名称', count: 0, percent: '0%' },
        { name: '部门名称', count: 0, percent: '0%' },
        { name: '部门名称', count: 0, percent: '0%' },
        { name: '部门名称', count: 0, percent: '0%' }
    ]
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


    [Overview](state, res) {
        for (let key in res) {
            state[key] = data[key]
        }
    },
    [OverviewReport](state, res) {
        state.report = res
    },
    [OverviewDataExchange](state, res) {
        state.dataExchange = res
    },
    [OverviewUnion](state,res){
        state.union = res
    },
    [OverviewRB](state,res){
        state.redBlackList = res
    },
    [OverviewClassify](state,res){
        state.collection = res
    },
    [OverviewBag](state,res){
        state.submission = res
    },
    [OverviewAggregateData](state,res){
        state.rotateData = res.rotateData
        state.total = res.total
    }
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


    // 交互
    getOverviewDataExchange({ commit }, params) {
        reqOverviewDataExchange({
            data    : {},
            callback: (res) => {
                res = {
                    getIn: 30,
                    getOut: 30,
                    getInCorrect: '0%',
                    getOutCorrect: '0%',
                    dockedAbnormal: 0,
                    dockedNormal: 0,
                    chartData: [
                        ['product', '归集', '输出'],
                        ['1月', 120, 95],
                        ['2月', 83.1, 73.4],
                        ['3月', 86.4, 65.2],
                        ['4月', 72.4, 53.9],
                        ['5月', 72.4, 53.9],
                        ['6月', 72.4, 53.9],
                        ['7月', 72.4, 53.9],
                        ['8月', 72.4, 53.9],
                        ['9月', 72.4, 53.9],
                        ['10月', 72.4, 53.9],
                        ['11月', 72.4, 53.9],
                        ['12月', 72.4, 53.9]
                    ]
                }
                commit(OverviewDataExchange, res)
            },
        })
    },
    getOverviewReport({ commit }, params) {
        reqOverviewReport({
            data    : {},
            callback: (res) => {
                res = {
                    chartData: [
                        ['product', '数量'],
                        ['1月', 1006],
                        ['2月', 1006],
                        ['3月', 1007],
                        ['4月', 1002],
                        ['5月', 1010],
                        ['6月', 1007],
                        ['7月', 1008],
                        ['8月', 1010],
                        ['9月', 1006],
                        ['10月', 1011],
                        ['11月', 1006],
                        ['12月', 1003]
                    ]
                }

                commit(OverviewReport, res)
            },
        })
    },
    getOverviewUnion({ commit }) {

        reqOverviewUnion({
            data    : {},
            callback: (res) => {
                res = {
                    memoCount: 0,
                    measureCount: 0,
                    deptCount: 0,
                    chartData: {
                        inner: [
                            { value: 1000, name: '惩戒' },
                            { value: 2000, name: '激励' }
                        ],
                        outer: [
                            { value: 400, name: '法人惩戒' },
                            { value: 600, name: '自然人惩戒' },
                            { value: 1400, name: '法人激励' },
                            { value: 600, name: '自然人激励' }
                        ]
                    }
                }
                commit(OverviewUnion, res)
            },
        })
    },
    getOverviewRB({ commit }) {
        reqOverviewRB({
            data    : {},
            callback: (res) => {
                res = {
                    redList: {
                        signCom: 1,
                        taxpayer: 0,
                        corp: 0,
                        volunteer: 0
                    },
                    blackList: {
                        performed: 0,
                        case: 0,
                        unpaid: 0,
                        lose: 0
                    } // 红黑名单
                }
                commit(OverviewRB, res)
            },
        })
    },
    getOverviewClassify({ commit }) {
        reqOverviewClassify({
            data    : {},
            callback: (res) => {
                res = {
                    lv1: 0,
                    lv2: 0,
                    resourceCount: 0,
                    deptCount: 0,
                    chartData: [
                        ['product', '信息量'],
                        ['基础信息', 80],
                        ['业务信息', 100],
                        ['司法信息', 20],
                        ['行政执法信息', 300],
                        ['公共事业信息', 400],
                        ['信用评级信息', 500],
                        ['其他信息', 600],
                        ['累计', 700]
                    ]
                } // 部门数据归集统计
                commit(OverviewClassify, res)
            },
        })
    },
    getOverviewBag({ commit }) {
        reqOverviewBag({
            data    : {},
            callback: (res) => {
                res =  [
                    { name: '部门名称', count: 56987, percent: '95%' },
                    { name: '部门名称', count: 56987, percent: '95%' },
                    { name: '部门名称', count: 56987, percent: '95%' },
                    { name: '部门名称', count: 56987, percent: '95%' },
                    { name: '部门名称', count: 56987, percent: '95%' },
                    { name: '部门名称', count: 56987, percent: '95%' }
                ]
                commit(OverviewBag, res)
            },
        })
    },
    getOverviewAggregateData({ commit }) {
        reqOverviewAggregateData({
            data    : {},
            callback: (res) => {
                res = {
                    total: [0, 0, 0, 0, 0, 0, 0, 0],
                    rotateData: [
                        { name: '法人基础数量', value: 0 },
                        { name: '自然人基础数量', value: 0 },
                        { name: '法人信用信息', value: 0 },
                        { name: '自然人信用信息', value: 0 },
                        { name: '法人人均数量', value: 0 },
                        { name: '自然人人均数量', value: 0 }
                    ],
                }
                commit(OverviewAggregateData, res)
            },
        })
    },
    // 初始
    getOverview({ commit }) {
        reqOverviewData({
            data    : {},
            callback: (res) => {
                res = {
                    union: {
                        memoCount: 10,
                        measureCount: 20,
                        deptCount: 30,
                        chartData: {
                            inner: [
                                { value: 1000, name: '惩戒' },
                                { value: 2000, name: '激励' }
                            ],
                            outer: [
                                { value: 400, name: '法人惩戒' },
                                { value: 600, name: '自然人惩戒' },
                                { value: 1400, name: '法人激励' },
                                { value: 600, name: '自然人激励' }
                            ]
                        }
                    }, // 联合奖惩
                    dataExchange: {
                        getIn: 0,
                        getOut: 0,
                        getInCorrect: '0%',
                        getOutCorrect: '0%',
                        dockedAbnormal: 0,
                        dockedNormal: 0,
                        chartData: [
                            ['product', '归集', '输出'],
                            ['1月', 120, 95],
                            ['2月', 83.1, 73.4],
                            ['3月', 86.4, 65.2],
                            ['4月', 72.4, 53.9],
                            ['5月', 72.4, 53.9],
                            ['6月', 72.4, 53.9],
                            ['7月', 72.4, 53.9],
                            ['8月', 72.4, 53.9],
                            ['9月', 72.4, 53.9],
                            ['10月', 72.4, 53.9],
                            ['11月', 72.4, 53.9],
                            ['12月', 72.4, 53.9]
                        ]
                    },
                    total: [0, 0, 0, 0, 0, 0, 0, 0],
                    rotateData: [
                        { name: '法人基础数量', value: 0 },
                        { name: '自然人基础数量', value: 0 },
                        { name: '法人信用信息', value: 0 },
                        { name: '自然人信用信息', value: 0 },
                        { name: '法人人均数量', value: 0 },
                        { name: '自然人人均数量', value: 0 }
                    ],
                    redBlackList: {
                        redList: {
                            signCom: 0,
                            taxpayer: 0,
                            corp: 0,
                            volunteer: 0
                        },
                        blackList: {
                            performed: 0,
                            case: 0,
                            unpaid: 0,
                            lose: 0
                        }
                    }, // 红黑名单
                    collection: {
                        lv1: 0,
                        lv2: 0,
                        resourceCount: 0,
                        deptCount: 0,
                        chartData: [
                            ['product', '信息量'],
                            ['基础信息', 80],
                            ['业务信息', 100],
                            ['司法信息', 20],
                            ['行政执法信息', 300],
                            ['公共事业信息', 400],
                            ['信用评级信息', 500],
                            ['其他信息', 600],
                            ['累计', 700]
                        ]
                    }, // 部门数据归集统计
                    report: {
                        chartData: [
                            ['product', '数量'],
                            ['1月', 1006],
                            ['2月', 1006],
                            ['3月', 1007],
                            ['4月', 1002],
                            ['5月', 1010],
                            ['6月', 1007],
                            ['7月', 1008],
                            ['8月', 1010],
                            ['9月', 1006],
                            ['10月', 1011],
                            ['11月', 1006],
                            ['12月', 1003]
                        ]
                    },
                    submission: [
                        { name: '部门名称', count: 56987, percent: '95%' },
                        { name: '部门名称', count: 56987, percent: '95%' },
                        { name: '部门名称', count: 56987, percent: '95%' },
                        { name: '部门名称', count: 56987, percent: '95%' },
                        { name: '部门名称', count: 56987, percent: '95%' },
                        { name: '部门名称', count: 56987, percent: '95%' }
                    ]
                } // 数据体
                commit(Overview, res)
            },
        })
    }


}



export default createStore({
    state,
    actions,
    mutations,
})