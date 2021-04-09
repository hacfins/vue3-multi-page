import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from './app.vue'
import ElementPlus from 'element-plus';
import '@/style/index.scss'
createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
