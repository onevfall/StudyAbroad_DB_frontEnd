<!--
描述：点赞按钮组件
作者：焦佳宇
-->
<template>
  <div>
    <span style="text-align: left; margin-right: 8px" v-if="is_liked == false">
      <el-icon :size="this.size" @click="like"><Chicken /></el-icon>
    </span>
    <span style="text-align: left; margin-right: 8px" v-else>
      <el-icon :size="this.size" color="#d25f1e" @click="unLike"
        ><Chicken
      /></el-icon>
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
          query: { redirect: this.$route.path },
        });
      } else {
        axios({
          url: "like/" + this.dynamic_type,
          params: {
            user_id: this.$store.state.user_info.user_id,
            [this.dynamic_type + "_id"]: this.content_id,
          },
          method: "post",
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
      axios({
        url: "like/" + this.dynamic_type,
        params: {
          user_id: this.$store.state.user_info.user_id,
          [this.dynamic_type + "_id"]: this.content_id,
        },
        method: "put",
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
      axios({
        url:
          "like/" +
          this.dynamic_type +
          "?user_id=" +
          this.$store.state.user_info.user_id +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id,
        method: "get",
      })
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
      axios({
        url:
          "like/" +
          this.dynamic_type +
          "?user_id=" +
          1 +
          "&" +
          this.dynamic_type +
          "_id=" +
          this.content_id,
        method: "get",
      })
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
