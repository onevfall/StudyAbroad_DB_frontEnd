import {
    createApp
} from 'vue'

//引入UI组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//引入 router，Vuex，axios
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

//引入mock
import mock from './mock/index'

//引入 根组件
import App from './App.vue'


//配置全局baseURL默认值
axios.defaults.baseURL="/api"
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
const app = createApp(App).use(ElementPlus).use(store).use(router).use(VueAxios,axios).use(mock)

//初始化图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')