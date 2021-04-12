import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
const noexsit = () => import(/* webpackChunkName: "noexsit-main" */ '@/pages/noexsit/children/noexsit')
const index = () => import(/* webpackChunkName: "index-main" */ '@/pages/index/children/index')
const index_index = () => import(/* webpackChunkName: "index-main" */ '@/pages/index/children/index-index')
const index_set = () => import(/* webpackChunkName: "index-main" */ '@/pages/index/children/index-set')
const about = () => import(/* webpackChunkName: "about-main" */ '@/pages/about/children/about')
const home = () => import(/* webpackChunkName: "home-main" */ '@/pages/home/children/home')
const routes = [
    {
        path     : '/',
        component: index,
        name     : '',
        children:[{
            path     : '',
            component: index_index,
            name     : '',
        },{
            path     : '/index/set',
            component: index_set,
            name     : '',
        }]
    },
    {
        path     : '/about',
        component: about,
        name     : '',
    },
    {
        path     : '/home',
        component: home,
        name     : '',
    },
    {
        path     : '/:pathMatch(.*)*',
        component: noexsit,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});


export default router;

