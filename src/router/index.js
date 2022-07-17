import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import NewsHomePage from '../views/NewsHomePage.vue'
import NewsPage from '../views/NewsPage.vue'
import BlogPage from '../views/BlogPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BlogDetail from '../views/BlogDetail.vue'
import AnswerDetail from '../views/AnswerDetail.vue'
import SchoolDetail from '../views/SchoolDetail.vue'

import InstitutionDetail from '../views/InstitutionDetail.vue'
import SchoolCenterPage from '../views/SchoolCenterPage.vue'
import InstitutionCenter from '../views/InstitutionCenter.vue'
import PersonInformation from '../views/PersonInformation.vue'

import store from '../store/index'
import QuestionPage from '../views/QuestionPage.vue'
import QACenterPage from '../views/QACenterPage.vue'
import QuestionCheckCenter from '../views/QuestionCheckCenter.vue'
import QuestionCheck from '../views/QuestionCheck.vue'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/newsHome',
    name: 'newsHome',
    component: NewsHomePage,
    meta: {
      title: '留学快讯首页',
      requireAuth: true
    }
  },
  {
    path: '/news',
    name: 'news',
    component: NewsPage,
    meta: {
      title: '留学快讯',
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: {
      title: '用户注册'
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogPage,
    meta: {
      title: '动态'
    }
  },
  //动态详情页面放在此目前做测试，真正使用时采用嵌套路由的方式使用
  {
    path: '/blog_detail',//路径暂且做测试
    name: 'blog_detail',
    component: BlogDetail,
    meta: {
      title: '动态详情'
    }
  },
  //回答详情页面同样作为临时测试使用
  {
    path: '/answer_detail',//路径暂且做测试
    name: 'answer_detail',
    component: AnswerDetail,
    meta: {
      title: '回答详情'
    }
  },
  {
    path: '/school_detail',//路径暂且做测试
    name: 'school_detail',
    component: SchoolDetail,
    meta: {
      title: '学校详情'
    }
  },
  {
    path: '/person_info',
    name: 'person_info',
    component: PersonInformation,
    meta: {
      title: '个人信息',
      // requireAuth: true
    }
  },
  {
    path: '/institution_detail',//路径暂且做测试
    name: 'institution_detail',
    component: InstitutionDetail,
    meta: {
      title: '机构详情'
    }
  },
  {
    path: '/school_center',
    name: 'school_center',
    component: SchoolCenterPage,
    meta: {
      title: '大学中心'
    }
  },
  {
    path: '/institution_center',
    name: 'institution_center',
    component: InstitutionCenter,
    meta: {
      title: '机构中心'
    }
  },
  {
    path: '/question',
    name: 'question',
    component: QuestionPage,
    meta: {
      title: '问题'
    }
  },
  {
    path: '/qa_center',
    name: 'qa_center',
    component: QACenterPage,
    meta: {
      title: '问答首页'
    }
  },
  {
    path: '/question_check_center',
    name: 'question_check_center',
    component: QuestionCheckCenter,
    meta: {
      title: '问题审核中心'
    }
  },
  {
    path: '/question_check',
    name: 'question_check',
    component: QuestionCheck,
    meta: {
      title: '问题审核'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.afterEach(to=>{
  document.title=to.meta.title;//更改标题
  window.scrollTo(0, 0)
})

router.beforeEach(to=>{
  if(to.name)
  if(to.matched.some(record=>record.meta.requireAuth)){
    //如果需要验证登录状态
    if (store.state.is_login == true) {
      return true
    }
    else {
      ElMessage({
        message: '请先登录',
        type: 'warning',
        showClose: true,
        duration: 2000
      })
      return {
        path: '/login',
        query: { redirect: to.fullPath }
      }
    }
  }
  else {
    return true
  }
})
export default router
