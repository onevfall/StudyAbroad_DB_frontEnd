<template>
  <!-- 用户信息展示卡片的封装，需传入用户信息对象 -->
  <el-card class="box-card" :body-style="this.body_style">
    <template #header>
      <div class="card-header">
        <el-avatar
          :src="
            'https://houniaoliuxue.oss-cn-shanghai.aliyuncs.com/user_profile/' +
            this.blog_user_info.user_id +
            '.jpg'
          "
          size="large"
        />
        <span
          ><b>{{ blog_user_info.user_name }}</b></span
        >
        <el-button type="primary" @click="FollowUser">+关注</el-button>
      </div>
    </template>
    <el-row gutter='10' justify="center">
      <el-col span='30' >
         <el-tag class="ml-2" type="warning">同济大学本科</el-tag>
      </el-col>
       <el-col span='30' >
         <el-tag class="ml-2" type="warning">哈佛大学硕士</el-tag>
      </el-col>
       <el-col span='30' >
         <el-tag class="ml-2" type="warning">哈佛大学博士</el-tag>
      </el-col>
    </el-row>
    <div class="user_signature">{{ userSignature }}</div>
    <el-row gutter="40">
      <el-col span="8">
        <div class="info_field">
          <div class="label"><b>粉丝</b></div>
          <div class="figure">{{ followerNum }}</div>
        </div>
      </el-col>
      <el-col span="8"
        ><div class="info_field">
          <div class="label"><b>关注</b></div>
          <div class="figure">{{ followsNum }}</div>
        </div></el-col
      >
      <el-col span="8"
        ><div class="info_field">
          <div class="label"><b>等级</b></div>
          <div class="figure">{{ "lv." + blog_user_info.user_level }}</div>
        </div></el-col
      >
    </el-row>
  </el-card>
</template>
<script>
import { computed } from "@vue/runtime-core";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  props: ["blog_user_info"],
  components: {
    ElMessage,
  },
  data() {
    return {
      body_style: {
        // color: "red",
      },
    };
  },
  computed: {
    followerNum() {
      if (this.blog_user_info.user_follower >= 10000) {
        return (this.blog_user_info.user_follower / 10000).toFixed(1) + "w+";
      } else {
        return this.blog_user_info.user_follower;
      }
    },
    followsNum() {
      if (this.blog_user_info.user_follows >= 10000) {
        return (this.blog_user_info.user_follows / 10000).toFixed(1) + "w+";
      } else {
        return this.blog_user_info.user_follows;
      }
    },
    userSignature() {
      if (this.blog_user_info.user_signature.length >= 1) {
        return this.blog_user_info.user_signature;
      } else {
        return "该用户尚未编写个性签名";
      }
    },
  },
  methods: {
    FollowUser() {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
        this.$router.push("\login");
      } else {
        //若已登录
        if (
          this.$store.state.user_info.user_id == this.blog_user_info.user_id
        ) {
          //若自己关注自己则报错
          ElMessage({
            message: "不可以关注自己哦！",
            type: "warning",
            showClose: true,
            duration: 2000,
          });
        } else {
          axios({
            url: "follow",
            params: {
              user_id: this.$store.state.user_info.user_id,
              follow_user_id: this.blog_user_info.user_id,
            },
            method: "post",
          }).then((res) => {
            if (res.data.status==false) {
              ElMessage({
                message: "已经关注过了！",
                type: "warning",
                showClose: true,
                duration: 2000,
              });
            }else{
              ElMessage({
                message: "成功关注！",
                type: "success",
                showClose: true,
                duration: 2000,
              });
            }
          }).catch(errMsg=>{
            console.log(errMsg);
          });
        }
      }
    },
  },
  beforeMount(){
  
    axios({
      url:'userinfo?user_id='+ 1
    }).then(res=>{
      console.log(res);
    }).catch(errMsg=>{
      console.log(errMsg);
    })
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 350px;
}
.info_field {
  margin-left: 33px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.info_field .label {
  margin-bottom: 5px;
}
.user_signature{
  font-size: small;
  margin-top: 10px;

}
</style>
