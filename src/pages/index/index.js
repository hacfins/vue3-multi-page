import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from './app.vue'
import ElementPlus from 'element-plus';
import '@/style/index.scss'
import dataV from '@jiaminghi/data-view'
createApp(App).use(router).use(store).use(ElementPlus).use(dataV).component('chart', VueECharts).mount('#app')
