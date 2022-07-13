<!--
描述：导航栏
作者：焦佳宇
-->
<template>
  <el-menu
    :default-active="this.$router.currentRoute.value.name"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#87a5c7"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="0"
      ><img src="../assets/logo.png" class="logo"
    /></el-menu-item>
    <el-menu-item index="home" @click="goHome">首页</el-menu-item>
    <el-menu-item index="school_center" @click="goSchoolCenter">找对学校</el-menu-item>
    <el-sub-menu index="3">
      <template #title>说说留学</template>
      <el-menu-item index="answer_detail" @click="goAnswerDetail">留学问答(测试用 跳转至回答详情界面)</el-menu-item>
      <el-menu-item index="blog" @click="goBlog">动态分享</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="news" @click="goNews">留学快讯</el-menu-item>
    <el-menu-item index="5">留学顾问</el-menu-item>
    <el-menu-item index='blog_detail' @click="goBlogDetail">动态详情(测试用)</el-menu-item>
    <el-sub-menu index="6" v-if="is_login == false">
      <template #title>登录/注册</template>
      <el-menu-item index="login" @click="goLogin">登录</el-menu-item>
      <el-menu-item index="register" @click="goRegister">注册</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="7" v-else>
      <template #title>个人中心</template>
      <el-menu-item index="7-1">我的信息</el-menu-item>
      <el-menu-item index="7-2">发布历史</el-menu-item>
      <el-menu-item index="7-3">关注/收藏</el-menu-item>
      <el-menu-item index="7-4">财务管理</el-menu-item>
      <el-menu-item index="7-5" @click="loginOut">退出登录</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="school_detail" @click="goSchoolDetail">学校详情</el-menu-item>
    <el-menu-item index="institution_detail" @click="goInstitutionDetail">机构详情</el-menu-item>
    <el-menu-item index="question" @click="goQuestion">问题</el-menu-item>
  </el-menu>
</template>

<script>
import router from "@/router";
import { ElMessage } from "element-plus";
export default {
  components: {
    ElMessage,
  },
  data() {
    return {};
  },
  methods: {
    goHome() {
      router.push({ name: "home" });
    },
    goNews() {
      router.push({
        name: "news",
      });
    },
    goBlog(){
       router.push({
        name: "blog",
      });
    },
    goLogin() {
      router.push({
        name: "login",
      });
    },
    goRegister() {
      router.push({
        name: "register",
      });
    },
    //不应该在导航栏，此时仅为测试用
    goBlogDetail(){
      router.push({
        name:"blog_detail"
      })
    },
    //不应该在导航栏，此时仅为测试用
    goAnswerDetail(){
      router.push({
        name:"answer_detail",
        query:{question_id:1,answer_id:1},//模拟带参数路由
      })
    },
    goSchoolCenter(){
      router.push({
        name:'school_center'
      })
    },
    //测试高校
    goSchoolDetail(){
      router.push({
        name:"school_detail"
      })
    },
    //测试机构
    goInstitutionDetail(){
      router.push({
        name:"institution_detail"
      })
    },
    //测试问题
    goQuestion(){
      router.push({
        name:"question"
      })
    },
    //退出账号并跳转至首页
    loginOut() {
      this.$store.commit("loginOut");
      ElMessage({
        message: "账号已退出！",
        type: "success",
        showClose:true,
        duration:2000
      });
      this.$router.replace("/home");
    },
  },
  computed: {
    is_login() {
      return this.$store.state.is_login;
    },
  },
};
</script>

<style scoped>
.logo {
  height: 56px;
}
</style>
