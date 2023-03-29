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
    <div class="flex-grow" />
    <el-menu-item index="home" @click="goHome">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>留学服务</template>
      <el-menu-item index="newsHome" @click="goNewsHome">留学快讯</el-menu-item>
      <el-menu-item index="school_center" @click="goSchoolCenter"
      >找对学校</el-menu-item
      >
      <el-menu-item index="institution_center" @click="goInstitutionCenter"
        >看看机构</el-menu-item
      >
      <el-menu-item index="writer_center" @click="goInstitutionCenter"
        >文书服务</el-menu-item
      >
    </el-sub-menu>
    
    <el-sub-menu index="3">
      <template #title>说说留学</template>
      <el-menu-item index="qa_center" @click="goQACenter">留学问答</el-menu-item>
      <el-menu-item index="blog" @click="goBlog">动态分享</el-menu-item>
    </el-sub-menu>
    

    <el-sub-menu index="6" v-if="is_login == false">
      <template #title>登录/注册</template>
      <el-menu-item index="login" @click="goLogin">登录</el-menu-item>
      <el-menu-item index="register" @click="goRegister">注册</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="7" v-else>
      <template #title>
        <el-avatar shape="square" :size="30" :src="this.$store.state.user_info.user_profile" />
        <span style="margin-left:10px">{{ this.$store.state.user_info.user_name }}</span>
      </template>

      <el-menu-item index="person_space" @click="goPersonSpace"
        >个人空间</el-menu-item
      >
      <el-menu-item index="blog_edit" @click="goBlogEdit"
        >动态发布</el-menu-item
      >
      <el-menu-item index="question_edit" @click="goQuestionEdit"
        >我要提问</el-menu-item
      >
      <el-menu-item index="person_info" @click="goPersonInformation"
        >账户设置</el-menu-item
      >
      <el-menu-item index="7-5" @click="loginOut">退出登录</el-menu-item>
    </el-sub-menu>
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
    goNewsHome() {
      router.push({
        name: "newsHome",
      });
    },
    goBlog() {
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
    goAnswerDetail() {
      router.push({
        name: "answer_detail",
        query: { question_id: 1, answer_id: 1 }, //模拟带参数路由
      });
    },
    goInstitutionCenter() {
      router.push({
        name: "institution_center",
      });
    },
    goSchoolCenter() {
      router.push({
        name: "school_center",
      });
    },
    //测试高校
    goSchoolDetail() {
      router.push({
        name: "school_detail",
      });
    },
    goPersonInformation() {
      router.push({
        name: "person_info",
      });
    },
    goPersonSpace() {
      router.push({
        name: "person_space",
        query: {
          host_id: this.$store.state.user_info.user_id,
        },
      });
    },
    //测试机构
    goInstitutionDetail() {
      router.push({
        name: "institution_detail",
      });
    },
    //测试问题
    goQuestion() {
      router.push({
        name: "question",
        query: { question_id: 12 }, //模拟带参数路由
      });
    },
    goQACenter() {
      router.push({
        name: "qa_center",
      });
    },
    goBlogEdit() {
      router.push({
        name: "blog_edit",
      });
    },
    goQuestionEdit() {
      router.push({
        name: "question_edit",
      });
    },
    //退出账号并跳转至首页
    loginOut() {
      this.$store.commit("loginOut");
      ElMessage({
        message: "账号已退出！",
        type: "success",
        showClose: true,
        duration: 2000,
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
.flex-grow {
  flex-grow: 0.89;
}
</style>
