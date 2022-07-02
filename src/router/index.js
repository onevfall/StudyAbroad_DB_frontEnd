import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import NewsPage from '../views/NewsPage.vue'
import LoginPage from '../views/LoginPage.vue'
import store from '../store/index'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path:'/home',
    name:'home',
    component:HomePage,
    meta:{
      title:'首页'
    }
  },
  {
    path:'/news',
    name:'news',
    component:NewsPage,
    meta:{
      title:'留学快讯',
      requireAuth:true
    }
  },
  {
    path:'/login',
    name:'login',
    component:LoginPage,
    meta:{
      title:'用户登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(to=>{
  document.title=to.meta.title;//更改标题
})

router.beforeEach(to=>{
  if(to.matched.some(record=>record.meta.requireAuth)){
    //如果需要验证登录状态
    if(store.state.is_login==true){
      return true
    }
    else{
      ElMessage({
        message: '请先登录',
        type: 'warning',
      })
      return{
        path:'/login',
        query:{redirect:to.fullPath}
      }
    }
  }
  else{
    return true
  }
})
export default router
