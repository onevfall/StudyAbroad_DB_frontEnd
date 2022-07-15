<!--
描述：点赞按钮组件
作者：焦佳宇
-->
<template>
  <div>
    <span style="text-align: left; margin-right: 8px" v-if="is_liked == false">
      <!-- <el-icon :size="this.size" @click="like"><Chicken /></el-icon> -->
      <img src="../assets/favorite.png" :style="{height:this.icon_size+'px'}" @click="like">
    </span>
    <span style="text-align: left; margin-right: 8px" v-else>
      <img src="../assets/favorite_solid.png" :style="{height:this.icon_size+'px'}" @click="unLike">
    </span>
    <span
      :style="{ 'text-align': 'left', 'font-size': this.size }"
      v-if="this.show_num == true"
    >
      {{ like_nums }}
    </span>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  /*
    type: 0-动态、1-动态评论、2-回答、3-回答评论
    content_id:要操作的内容的id
    */
  props: ["content_type", "content_id", "show_num", "size"],
  components: {
    ElMessage,
  },
  data() {
    return {
      is_liked: false,
      dynamic_type: "",
      like_nums: "",
      icon_size:0
    };
  },
  methods: {
    like() {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      } else {
        axios
          .post("like/" + this.dynamic_type, {
            user_id: this.$store.state.user_info.user_id,
            [this.dynamic_type + "_id"]: this.content_id,
          })
          .then((res) => {
            if (res.data.status) {
              this.is_liked = true;
              this.like_nums++;
              this.$emit("giveLike", true);
            } else {
              this.$emit("giveLike", false);
            }
          })
          .catch((errMsg) => {
            alert(
              "对id为" +
                this.content_id +
                "的" +
                this.dynamic_type +
                "点赞，相关API此时未完成"
            );
            console.log(errMsg);
          });
      }
    },
    unLike() {
      axios
        .put("like/" + this.dynamic_type, {
          user_id: this.$store.state.user_info.user_id,
          [this.dynamic_type + "_id"]: this.content_id,
        })
        .then((res) => {
          if (res.data.status) {
            this.is_liked = false;
            this.like_nums--;
            this.$emit("cancelLike", true);
          } else {
            this.$emit("cancelLike", false);
          }
        })
        .catch((errMsg) => {
          alert(
            "取消对id为" +
              this.content_id +
              "的" +
              this.dynamic_type +
              "点赞，相关API此时未完成"
          );
          console.log(errMsg);
        });
    },
  },
  created() {
    //设定大小
    switch(this.size){
      case "xx-small":
        this.icon_size=9;
        break;
      case "x-small":
        this.icon_size=10;
        break;
      case "small":
        this.icon_size=12;
        break;
      case "normal":
        this.icon_size=14;
        break;
      case "large":
        this.icon_size=17;
        break;
      case "x-large":
        this.icon_size=24;
        break;
      case "xx-large":
        this.icon_size=30;
        break;

    }
    //动态改变url
    switch (this.content_type) {
      case "0":
        this.dynamic_type = "blog";
        break;
      case "1":
        this.dynamic_type = "blog_comment";
        break;
      case "2":
        this.dynamic_type = "answer";
        break;
      case "3":
        this.dynamic_type = "answer_comment";
        break;
    }
    //查询是否点过赞
    if (this.$store.state.is_login) {
      axios(
        "like/" +
          this.dynamic_type +
          "?user_id=" +
          this.$store.state.user_info.user_id +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id
      )
        .then((res) => {
          this.like_nums = res.data.data.like_times;
          this.is_liked = res.data.status;
          // console.log(this.is_liked);
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    } else {
      //查询点赞个数
      axios(
        "like/" +
          this.dynamic_type +
          "?user_id=" +
          1 +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id
      )
        .then((res) => {
          this.like_nums = res.data.data.like_times;
          this.is_liked = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    }
  },
};
</script>

<style></style>
