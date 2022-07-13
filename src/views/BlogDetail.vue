<!--
描述：动态详情页面
作者：焦佳宇
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <user-info-board
          class="UserInfo"
          :blog_user_info="this.blog_user_info"
        ></user-info-board>
        
        <div v-for="blog in this.blog_relevant" :key="blog">
        <blog-info-board :blog_info="blog" class="BlogCard"/>
        
        </div>
      </el-aside>
      <el-main>
        <like-button :show_num="true" :content_id="0" content_type="0" size="xx-small"></like-button>
        <like-button :show_num="true" :content_id="0" content_type="0" size="x-small"></like-button>
        <like-button :show_num="true" :content_id="0" content_type="0" size="small"></like-button>
        <like-button :show_num="true" :content_id="0" content_type="0" size="normal"></like-button>
        <like-button :show_num="true" :content_id="0" content_type="0" size="large"></like-button>
        <like-button :show_num="true" :content_id="0" content_type="0" size="x-large"></like-button>
        <like-button :show_num="true" :content_id="0" content_type="0" size="xx-large"></like-button>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import UserInfoBoard from "../components/UserInfoBoard.vue";
import BlogInfoBoard from "../components/BlogInfoBoard.vue";
import axios from "axios"
import LikeButton from '../components/LikeButton.vue';
export default {
  components: {
    UserInfoBoard,
    BlogInfoBoard,
    LikeButton
  },
  data() {
    return {
      blog_user_info: "",
      blog_relevant:[],
      blog_detail:""
    };
  },
  created() {
    /*在此处向服务器请求数据，初始化所需变量*/
    //博客用户
    this.blog_user_info = {
      user_id: 5,
      user_email: "",
      user_phone: "17703561185",
      user_password: "",
      user_name: "用户17703561185",
      user_profile:
        "https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/user_profile/5.jpg",
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
    //相关博客
    axios({
      url:"/blog/time?num=3&tag='生活'",
      method:"get"
    }).then(res=>{
      this.blog_relevant=[].concat(res.data.data.blog)
    }).catch(errMsg=>{
      console.log(errMsg);
    })
    //当前博客内容

  },
};
</script>

<style scoped>
.UserInfo {
  margin-top: 20px;
  margin-left: 25px;
}
.BlogCard{
  margin-left: 25px;
  margin-top: 20px;
}
</style>
