<template>
  <!-- <div class="common-layout">
    <el-container>
      <el-aside width="450px" style="background-color:black">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div> -->
  <div>
    <user-info-board :blog_user_info="this.blog_user_info"></user-info-board>
    
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
export default {
  components: {
    UserInfoBoard,
  },
  data() {
    return {
      blog_user_info: "",
    };
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    this.blog_user_info = {
      user_id: 9,
      user_email: "",
      user_phone: "17703561185",
      user_password: "",
      user_name: "用户17703561185",
      user_profile: "https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/user_profile/",
      user_createtime: "",
      user_birthday: "",
      user_gender: "",
      user_state: 1,
      user_signature: "精准与否，就是屠宰和手术的区别",
      user_follower: 0,
      user_follows: 0,
      user_level: 3,
      user_coin: 0,
    };
   
    console.log(this.blog_user_info.user_profile);
  },
};
</script>

<style></style>
